const Student = require("../models/studentForm");

module.exports.home = async function (req, res) {
    try {
        const students = await Student.find({});

        return res.render('studentDetails', {
            title: "Placement-Cell | Home",
            students: students
        });
    } catch (err) {
        console.log('error in fetching students', err);
        return res.redirect('/');
    }
};

// module.exports.actionName = function(req, res){}
