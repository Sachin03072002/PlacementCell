const User = require('../models/user');
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'Placement Cell | User Profile',
        profile_user: req.user
    });
}

// update user Details
module.exports.updateUser = async function (req, res) {
    try {
        const user = await User.findById(req.user.id);
        const { name, password, confirm_password } = req.body;

        if (password != confirm_password) {
            return res.redirect("back");
        }

        if (!user) {
            return res.redirect("back");
        }

        user.name = name;
        user.password = password;

        user.save();
        return res.redirect("back");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


module.exports.home = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    return res.render('Home', {
        title: 'Placement Cell | Home'
    })
}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signUp', {
        title: 'Placement-Cell | Sign-Up'
    })
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signIn', {
        title: 'Placement-Cell | Sign-In'
    })
}
module.exports.create = async function (req, res) {
    // Check if any required field is empty
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.Confirmpassword) {
        // Handle the case when a required field is empty
        return res.redirect('back');
    }

    if (req.body.password != req.body.Confirmpassword) {
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };

            const createdUser = await User.create(userData);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding or creating user', err);
        return res.redirect('back');
    }
};



module.exports.createSession = function (req, res) {
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log('Error logging out:', err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
}


