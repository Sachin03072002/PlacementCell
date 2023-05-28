module.exports.signIn = function (req, res) {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/users/profile')
    // }
    return res.render('signIn', {
        title: "Codeial | Sign In"
    })
}