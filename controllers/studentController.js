const Student = require('../models/studentForm');

module.exports.AddStudent = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('studentForm', {
        title: 'Placement-Cell | Add-Student'
    });
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
