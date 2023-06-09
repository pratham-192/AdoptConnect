const User = require('../models/user');
const Child = require('../models/child');
const Message=require('../models/message');
const mongoose = require('mongoose');

module.exports.getAllAdmin = async function (req, res) {
    try {
        let alladmin = await User.find({}).populate('alloted_children');

        res.status(200).json({
            response: alladmin
        })
    } catch (err) {
        return res.status(200).send("error in sending all admins");
    }
}
module.exports.getAllWorkers = async function (req, res) {
    try {
        let allworkers = await User.find({ category: "worker" }).populate('alloted_children');

        // allworkers.populate('alloted_children')
        res.status(200).json({
            response: allworkers
        })
    } catch (err) {
        res.status(200).send("error in finding all workers");
    }

}
// module.exports.getAllCaseManagers = async function (req, res) {
//     try {
//         let allmanagers = await User.find({ category: "manager" }).populate('alloted_children');

//         // allworkers.populate('alloted_children')
//         res.status(200).json({
//             response: allmanagers
//         })
//     } catch (err) {
//         res.status(200).send("error in finding all managers");
//     }

// }
module.exports.getAllChild = async function (req, res) {
    try {
        let allchild = await Child.find({}).populate('worker_alloted');

        // allchild.populate('worker_alloted');
        res.status(200).json({
            response: allchild
        })
    } catch (err) {
        console.log(err);
        res.status(200).send("error in sending all childs");
    }
}
//request coming from admin/case-manager from worker profile
module.exports.addChildtoWorker = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let worker = await User.findOne({ user_id: req.body.user_id });
        if (!worker.alloted_children.includes(child._id)) {

            worker.alloted_children.push(child._id);
            worker.save();
            // console.log(child.worker_alloted);
            let prevWorker = await User.findById(child.worker_alloted);
            // console.log(prevWorker)
            if (prevWorker) {

                prevWorker.alloted_children.pull(child._id);
                prevWorker.save();
                // console.log(prevWorker)
                child.worker_alloted = worker._id;
            } else {
                child.worker_alloted = worker._id;
                // console.log(child.worker_alloted)
            }
            child.save();
            // console.log(child.worker_alloted);


        }
        return res.status(200).json({ response: worker });
    } catch (err) {
        return res.status(200).send("erorr in adding child");
    }
}

module.exports.deleteChildfromWorker = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let worker = await User.findOne({ user_id: req.body.user_id });
        worker.alloted_children.pull(child._id);
        // await Child.findByIdAndUpdate(child._id, { $unset: { worker_alloted: 1 } }, { new: true })
        child.worker_alloted = null;
        worker.save();
        // child.worker_alloted=mongoose.Types.ObjectId();
        child.save();
        return res.status(200).json({
            response: worker
        })
    } catch (err) {
        console.log(err);

        return res.status(200).send("error in deleting child from worker");
    }
}


module.exports.createMessage=async function(req,res){
    try{
        let message=await Message.create({
            from_user:req.body.from_user_id,
            to_user:req.body.to_user_id,
            content:req.body.content
        });
        return res.status(200).send({
            response:message
        })
    }catch(err){
        return res.status(200).send("error in creating message");
    }
}

module.exports.updateMessage=async function(req,res){
    try{
        let messageId=req.body.messageId;
        let message=await Message.findById(messageId);
        if(message.seen==1){
            return res.status(200).send("message already seen");
        }else{
            message.content=req.body.content;
            message.save();
        }
        return res.status(200).json({
            response:message
        })
    }catch(err){
        return res.status(200).send("error in updating message");
    }
}
module.exports.deleteMessage=async function(req,res){
    try{
        let messageId=req.body.messageId;
        let message=await Message.findByIdAndDelete(messageId);
        return res.status(200).send("message deleted");
    }catch(err){
        return res.status(200).send("error in deleting the messages");
    }
}