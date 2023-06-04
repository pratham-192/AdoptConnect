const User=require('../models/user');
const Child=require('../models/child');
module.exports.getAllAdmin=function(req,res){
    User.find({category:"admin"},function(err,alladmin){
        if(err){
            res.status(404).send("error in finding all admins");
        }
        res.status(200).json({
            response:alladmin
        })
    })
}
module.exports.getAllWorkers=function(req,res){
    User.find({category:"worker"},function(err,allworkers){
        if(err){
            res.status(404).send("error in finding all workers");
        }
        res.status(200).json({
            response:allworkers
        })
    })
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