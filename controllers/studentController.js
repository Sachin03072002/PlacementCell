const Student = require('../models/studentForm');
const Interview = require('../models/interview');

module.exports.AddStudent = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('studentForm', {
        title: 'Placement-Cell | Add-Student'
    });
};

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

        return res.redirect('back');
    } catch (err) {
        console.log('error in creating new student', err);
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
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};
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
        return res.redirect('back');
    } catch (err) {
        console.log('error', err);
        return res.redirect('back');
    }
};
module.exports.truncateGmailAddress = (email) => {
    const words = email.split(' ');
    if (words.length <= 10) {
        return email;
    } else {
        const truncatedWords = words.slice(0, 10);
        const truncatedEmail = truncatedWords.join('...');
        return truncatedEmail;
    }
}