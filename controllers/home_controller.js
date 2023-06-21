const Student = require("../models/studentForm");
const Interview = require("../models/interview");

module.exports.home = async function (req, res) {
    try {
        const students = await Student.find({}).populate("interviews");
        const interviews = await Interview.find({}).populate("students.student");
        console.log('students', interviews);
        return res.render('studentDetails', {
            title: "Placement-Cell | Home",
            students: students,
            all_interviews: interviews,
        });
    } catch (err) {
        console.log('error in fetching students', err);
        return res.redirect('/');
    }
};
module.exports.placement = async function (req, res) {
    try {
        return res.render('placement', {
            title: 'Placement Cell || Placement',
        });
    } catch (err) {
        console.log('error', err);
        return res.redirect('/');
    }
}