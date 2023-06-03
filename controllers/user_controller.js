const User=require('../models/user');
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirmpassword)
    {
        return res.redirect('back');
    }
    User.findOne({user_id:req.body.user_id},function(err,user){
        if(err){console.log("Error in finding the user signing up");
        return;}
        if(!user)
        {
            User.create({
                user_id:req.body.user_id,
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                category:req.body.category
            },function(err,user){
                if(err)
                {
                    console.log("Error in creating the user signing up");
                    return;
                }
                return res.redirect('/users/signup')
            })
        }else{
            return res.redirect('back');

        }
    });
}

module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('UserSignIn',{
        title:"Sign In Page"
    });
}
module.exports.signup=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.render('signup',{
            title:"add employees"
        });
    }

    return res.render('UserSignIn',{
        title:"Sign In Page"
    });
}
module.exports.AdminSignIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('AdminSignIn',{
        title:"Sign In Page"
    });
}
//sign in and create session for the user
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}

module.exports.DestroySession=function(req,res)
{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

