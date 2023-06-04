const mongoose=require('mongoose');
const path=require('path');


const userSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        // required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
    
},{
    timestamps:true
});


const User=mongoose.model('User',userSchema);
module.exports=User;