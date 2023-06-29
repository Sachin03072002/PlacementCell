const Student = require('../models/studentForm');
const Interview = require('../models/interview');

//function for rendering the add student page
module.exports.AddStudent = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('studentForm', {
        title: 'Placement-Cell | Add-Student'
    });
};
//function for rendering the student profile page
module.exports.studentProfile = async function (req, res) {
    const student = await Student.findById(req.params.id);

    if (req.isAuthenticated()) {
        return res.render("student_profile", {
            title: "Edit Student",
            student: student,
        });
    }

    return res.redirect("/");
};

//function to add new student form
module.exports.AddNewStudentForm = async function (req, res) {
    // Check if any required field is empty
    if (!req.body.name || !req.body.email || !req.body.college || !req.body.batch || !req.body.status || !req.body.dsaScore || !req.body.webdevScore || !req.body.reactScore) {
        // Handle the case when a required field is empty
        return res.redirect('back');
    }

    try {
        const student = await Student.create({
            name: req.body.name,
            email: req.body.email,
            college: req.body.college,
            batch: req.body.batch,
            status: req.body.status,
            dsaScore: req.body.dsaScore,
            webdevScore: req.body.webdevScore,
            reactScore: req.body.reactScore,
            user: req.user._id
        });
        req.flash("success", "Student Added Successfully....");
        return res.redirect('/');
    } catch (err) {
        console.log('error in creating new student', err);
        req.flash("error", "Stududent not created...");
        return res.redirect('back');
    }
};

// render edit student page
module.exports.editStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (req.isAuthenticated()) {
        return res.render("editStudent", {
            title: "Edit Student",
            student_details: student,
        });
    }

    return res.redirect("/");
};
// update student details
module.exports.update = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        const {
            name,
            college,
            batch,
            dsaScore,
            reactScore,
            webdevScore,
            status,
        } = req.body;

        if (!student) {
            return res.redirect("back");
        }
        student.name = name;
        student.college = college;
        student.batch = batch;
        student.dsaScore = dsaScore;
        student.reactScore = reactScore;
        student.webdevScore = webdevScore;
        student.status = status;

        student.save();
        req.flash("success", "Student updated Successfully....");
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        req.flash("error", "Error in Updating Student...");
        return res.redirect("back");
    }
};

//function to delete the student
module.exports.destroy = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.redirect('back');
        }

        const interviewsOfStudent = student.interviews;

        // Delete the reference of the student from companies in which this student is enrolled
        if (interviewsOfStudent.length > 0) {
            for (let interview of interviewsOfStudent) {
                await Interview.findOneAndUpdate(
                    { company: interview.company },
                    { $pull: { students: { student: studentId } } }
                );
            }
        }

        await Student.deleteOne({ _id: studentId });
        req.flash("success", "Student Deleted Successfully...");
        return res.redirect('/');
    } catch (err) {
        console.log('error', err);
        req.flash("error", "Error in Deleting...");
        return res.redirect('back');
    }
};
