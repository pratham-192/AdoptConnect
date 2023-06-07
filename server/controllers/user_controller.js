const User = require('../models/user');
const Child = require('../models/child');
module.exports.profile = function (req, res) {
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })
    return res.status(200).send("profile page");
}

module.exports.create = async function (req, res) {
    // console.log(req.body)
    // if(req.body.password!=req.body.confirmpassword)
    // {
    // return res.status(404).send("password doesn't matches");
    // }
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        if (!user) {
            let newuser = await User.create({
                user_id: req.body.user_id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                category: req.body.category,
                zone: req.body.zone,
                address: req.body.address,
                aadharCardNo: req.body.aadharCardNo,
                contactNo: req.body.contactNo
            })
            // return res.redirect('/users/signup')
            return res.status(200).json({ "response": newuser });
        } else {
            return res.status(200).send("user already exists");

        }
    } catch (err) {
        res.status(200).send("error in creating user");
    }
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
    return res.status(200).send(req.user);
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
module.exports.getLoggedInUser = function (req, res) {
    if (req.isAuthenticated) {
        return res.status(200).json({ response: req.user });
    }
    return res.status(200).send("log in first");
}

module.exports.update = async function (req, res) {
    // console.log(req.body)
    // if(req.body.password!=req.body.confirmpassword)
    // {
    // return res.status(404).send("password doesn't matches");
    // }
    try {
        let user = await User.findOne({ user_id: req.body.user_id });
        if (user) {
            user.user_id = req.body.user_id;
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.category = req.body.category;
            user.zone = req.body.zone;
            user.address = req.body.address;
            user.aadharCardNo = req.body.aadharCardNo;
            user.contactNo = req.body.contactNo;
            user.save();

            return res.status(200).json({ "response": user });
        } else {
            return res.status(200).send("create user");

        }
    } catch (err) {
        res.status(200).send("error in updating user");
    }
}
module.exports.getWorkerbyId = async function (req, res) {
    try {
        let worker = await User.findOne({ user_id: req.body.user_id }).populate('alloted_children');
        res.status(200).json({
            response: worker
        })
    } catch (err) {
        return res.status(200).send("error in getting worker by id");
    }
}
// module.exports.getManagerbyId=async function(req,res){
//     try{
//         let manager=await User.findOne({user_id:req.body.user_id, category:'manager'}).populate('alloted_children');
//         res.send(200).json({
//             response:manager
//         })
//     }catch(err){
//         return res.status(200).send("error in getting manager by id");
//     }
// }

