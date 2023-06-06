const User = require('../models/user');
const Child = require('../models/child');
module.exports.getAllAdmin = function (req, res) {
    User.find({ category: "admin" }, function (err, alladmin) {
        if (err) {
            res.status(404).send("error in finding all admins");
        }
        res.status(200).json({
            response: alladmin
        })
    })
}
module.exports.getAllWorkers = async function (req, res) {
    try {
        let allworkers = User.find({ category: "worker" })

        // allworkers.populate('alloted_children')
        res.status(200).json({
            response: allworkers
        })
    } catch (err) {
        res.status(404).send("error in finding all workers");
    }

}
module.exports.getAllChild = function (req, res) {
    Child.find({}, function (err, allchild) {
        if (err) {
            res.status(404).send("error in finding all children");
        }
        res.status(200).json({
            response: allchild
        })
    })
}
//request coming from admin/case-manager from worker profile
module.exports.addChildtoWorker=async function(req,res){
    try{
        let child=await Child.findOne({child_id:req.body.child_id});
        let worker=await User.findOne({user_id:req.body.user_id});
        if(!worker.alloted_children.find(child)){

            worker.alloted_children.push(child);
            worker.save();
            let prevWorker=child.worker_alloted;
            if(prevWorker){
                prevWorker.alloted_children.pull(child);
                prevWorker.save();
                child.worker_alloted=worker;
            }else{
                child.worker_alloted=worker;
            }
        }
        return res.status(200).json({response:worker});
    }catch(err){
        return res.status(200).send("eror in adding child");
    }
}

module.exports.deleteChildfromWorker=async function(req,res){
    try{
        let child=await Child.findOne({child_id:req.body.child_id});
        let worker=await User.findOne({user_id:req.body.user_id});
        worker.alloted_children.pull(child);
        child.alloted_children=worker;
        return req.status(200).json({
            response:worker
        })
    }catch(err){
        return res.status(200).send("error in deleting child from worker");
    }
}