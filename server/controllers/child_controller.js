const Child = require('../models/child');
module.exports.create = function (req, res) {

    // console.log(req.body);
    Child.findOne({ child_id: req.body.child_id }, function (err, child) {
        if (err) {
            // console.log("Error in finding the user signing up");
            return res.status(404).send("error in finding the child");
        }
        if (!child) {
            Child.create({
                child_id: req.body.child_id,
                category: req.body.category,
                name: req.body.name,
                worker_alloted: req.body.worker
            }, function (err, child) {
                if (err) {
                    console.log(err)
                    return res.status(400).send("Error in creating the child");
                }
                return res.status(200).json({ "response": child });
            })
        } else {
            return res.status(200).send("child not found");

        }
    });
}

module.exports.update_details_child = function (req, res) {
    Child.findOne({ child_id: req.body.child_id }, function (err, child) {
        if (err) {
            // console.log("Error in finding the user signing up");
            return res.status(404).send("error in finding the child");
        }
        if (child) {
            child.child_id= req.body.child_id;
            child.category= req.body.category;//child.category
            child.name= req.body.name;
            child.worker_alloted= req.body.worker;//user._id
            child.gender=req.body.gender;
            if(req.body.contact_no)
            child.contactNo.push(req.body.contact_no);
            child.save();
            return res.status(200).json({response:child});
        } else {
            return res.status(200).send("child not found");

        }
    });
}
module.exports.getAllChild=function(req,res){
    Child.find({},function(err,allchild){
        if(err){
            res.status(404).send("error in finding all children");
        }
        res.status(200).json({
            response:allchild
        })
    })
}