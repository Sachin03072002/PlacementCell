module.exports.signIn = function (req, res) {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/users/profile')
    // }
    console.log('hi');
    return res.render('signIn', {
        title: "Codeial | Sign In"
    })
}
module.exports.signUp = function (req, res) {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/users/profile')
    // }
    console.log('hi');
    return res.render('signUp', {
        title: "Codeial | Sign In"
    })
}