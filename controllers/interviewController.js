const Interview = require('../models/interview');
const Student = require('../models/studentForm');


//renders the addInterview Page
module.exports.addInterview = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }
    return res.render('add_interview', {
        title: 'Placement-Cell | Add-Interview'
    });
}

//creating a new interview
module.exports.create = async (req, res) => {
    try {
        const { company, date } = req.body;
        const newInterview = await Interview.create({
            company,
            date,
        });
        if (!newInterview) {
            console.log("error in creating a new interview");
            return res.redirect("back");
        }
        return res.redirect("/");
    } catch (err) {
        console.log(err);
    }
};

module.exports.enrollInInterview = async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        console.log('Interview:', interview);

        const { email, result } = req.body;

        if (interview) {
            const student = await Student.findOne({ email });
            console.log('Student:', student);

            if (student) {
                // Check if already enrolled
                const alreadyEnrolled = await Interview.findOne({
                    'students.student': student.id
                });

                // Prevent student from enrolling in the same company more than once
                if (alreadyEnrolled && alreadyEnrolled.company === interview.company) {
                    console.log('Already enrolled');
                    return res.redirect('back');
                }
            } else {
                console.log('Student not found');
                return res.redirect('back');
            }

            const studentObj = {
                student: student.id,
                result
            };

            // Update students field of the interview by putting a reference to the newly enrolled student
            const updateInterviewResult = await interview.updateOne({
                $push: { students: studentObj }
            });

            // Update the student's interview information
            const assignedInterview = {
                company: interview.company,
                date: interview.date,
                result
            };

            const updateStudentResult = await student.updateOne({
                $push: { interviews: assignedInterview }
            });
            console.log('Update student result:', updateStudentResult);

            console.log(`Success: ${student.name} enrolled in ${interview.company} interview`);
            return res.redirect('back');
        }

        console.log('Interview not found');
        return res.redirect('back');
    } catch (err) {
        console.log('Error:', err);
        return res.redirect('back');
    }
};


//deallocating students from an interview
module.exports.deallocate = async (req, res) => {
    try {
        const { studentId, interviewId } = req.params;
        //find the interview
        const interview = await Interview.findById(interviewId);
        if (interview) {
            //remove reference of student from interview schema
            await Interview.findOneAndUpdate(
                {
                    _id: interviewId
                },
                {
                    $pull: {
                        students: {
                            student: studentId
                        }
                    }
                }
            );
            //remove interview from stduentd schema using interview company
            await Student.findOneAndUpdate(
                {
                    _id: studentId
                },
                {
                    $pull: {
                        interviews: {
                            company: interview.company
                        }
                    }
                }

            );
            return res.redirect("back");
        }
        return res.redirect("back");
    }
    catch (err) {
        console.log("error", "coludnt deallocate from interview");
    }
};


//function to delete the interview 
module.exports.delete = async (req, res) => {
    try {
        const { studentId, interviewId } = req.params;

        // Find the interview
        const interview = await Interview.findById(interviewId);
        if (!interview) {
            // Interview not found
            return res.redirect("back");
        }

        // Remove the reference of student from the interview schema
        await Interview.findOneAndUpdate(
            { _id: interviewId },
            { $pull: { students: { student: studentId } } }
        );

        // Remove the interview from each student's schema using the interview company
        await Student.updateMany(
            { interviews: { $elemMatch: { company: interview.company } } },
            { $pull: { interviews: { company: interview.company } } }
        );

        // Delete the interview
        await Interview.findByIdAndDelete(interviewId);

        return res.redirect("back");
    } catch (err) {
        console.log('Error:', err);
    }
};
