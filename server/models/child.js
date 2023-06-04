const mongoose=require('mongoose');
const path=require('path');

const childSchema=mongoose.Schema({
    child_id:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    contactNo:[
        {
            type:Number
        }
    ],
    worker_alloted:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    avatar:{
        type:String
    },
    gender:{
        type:String
    }
    
},{
    timestamps:true
});


const Child=mongoose.model('Child',childSchema);
module.exports=Child;