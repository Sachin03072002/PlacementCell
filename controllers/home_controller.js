module.exports.home = function (req, res) {

    return res.render('studentDetails', {
        title: "Home"
    });
}

// module.exports.actionName = function(req, res){}