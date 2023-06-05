const mongoose=require('mongoose');
const path=require('path');


const adoptionFlowSchema=mongoose.Schema({
    childClassification:{
        type:String,
        required:true,
        unique:true
    },
    majorTask:[
        {
            majorTaskStatement:{
                type:String
            },
            majorStatus:{
                type:Number,
                default:0
            },
            minorTask:[
                {
                    minorTaskStatement:{
                        type:String
                    },
                    minorStatus:{
                        type:Number,
                        default:0
                    }
                }
            ]

        }
    ]
    
},{
    timestamps:true
});


const AdoptionFlow=mongoose.model('AdoptionFlow',adoptionFlowSchema);
module.exports=AdoptionFlow;