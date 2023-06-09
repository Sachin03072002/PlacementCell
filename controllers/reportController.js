const fs = require("fs");
const path = require("path");
const Student = require("../models/studentForm");

//function for the download of the csv file 
module.exports.downloadcsvReport = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            const allStudents = await Student.find({});
            let report = "Student Id, Student Name, Student College, Student Email, Student Status, DSA Final Score, WEB DEB Final Score, React Final Score, Interview Date, Interview Company, Interview Result";

            for (let student of allStudents) {
                let studentData1 = `${student.id},${student.name},${student.college},${student.email},${student.status},${student.dsaScore},${student.webdevScore},${student.reactScore}`;

                if (student.interviews.length > 0) {
                    for (let interview of student.interviews) {
                        let studentData2 = `,${interview.date.toString()},${interview.company},${interview.result}`;
                        report += `\n${studentData1}${studentData2}`;
                    }
                } else {
                    report += `\n${studentData1}`;
                }
            }

            const filePath = path.join(__dirname, "..", "uploads", "studentsReport.csv");

            fs.writeFile(filePath, report, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("back");
                }
                return res.download(filePath);
            });
            req.flash("success", "Downloaded Successfully..:)");
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log(err);
        req.flash("error", "Error in Downloading..:(");
        return res.redirect("back");
    }
};
