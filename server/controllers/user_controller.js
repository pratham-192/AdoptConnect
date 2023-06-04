const User = require('../models/user');
module.exports.profile = function (req, res) {
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })
    return res.status(200).send("profile page");
}

module.exports.create = function (req, res) {
    // console.log(req.body)
    // if(req.body.password!=req.body.confirmpassword)
    // {
    // return res.status(404).send("password doesn't matches");
    // }
    User.findOne({ user_id: req.body.user_id }, function (err, user) {
        if (err) {
            // console.log("Error in finding the user signing up");
            return res.status(404).send("error in finding the user");
        }
        if (!user) {
            User.create({
                user_id: req.body.user_id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                category: req.body.category
            }, function (err, user) {
                if (err) {
                    console.log(err)
                    // console.log("Error in creating the user signing up");
                    return res.status(400).send("Error in creating the user signing up");
                }
                // return res.redirect('/users/signup')
                return res.status(200).json({ "response": user });
            })
        } else {
            return res.status(200).send("user not found");

        }
    });
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        // return res.redirect('/users/profile');
        return res.status(200).send("user is authenticated");
    }

    // return res.render('UserSignIn',{
    //     title:"Sign In Page"
    // });
    return res.status(200).send("user is not authenticated");
}
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        // return res.render('signup',{
        //     title:"add employees"
        // });
        return res.status(200).send("you can now add employees");
    }

    // return res.render('UserSignIn',{
    //     title:"Sign In Page"
    // });
    return res.status(200).send("you are not signed in");
}
module.exports.AdminSignIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).send("you are now logged in");
    }

    // return res.render('AdminSignIn',{
    //     title:"Sign In Page"
    // });

    return res.status(200).send("you are not signed in");
}
//sign in and create session for the user
module.exports.createSession = function (req, res) {
    return res.status(200).send("log in session created");
}

module.exports.DestroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.status(200).send("successfully logged out");
    });
}

module.exports.signupadmin = function (req, res) {
    // return res.render('signupadmin',{
    //     title:'signupadmin'
    // });
    return res.status("admin signed up");
}
module.exports.getLoggedInUser=function(req,res){
    if(req.isAuthenticated){
        return res.status(200).json({response:req.user});
    }
    return res.status(404).send("log in first");
}