const mongoose = require('mongoose');
const path = require('path');

const childSchema = mongoose.Schema({
    child_id: {
        type: String, 
        unique: true,
        required:true
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    shelterHome: {
        type: String
    },
    childName: {
        type: String
    },
    linkedWithSAA: {
        type: String
    },
    gender: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    age: {
        type: Number
    },
    childClassification: {
        type: String,
        required:true
    },
    recommendedForAdoption: {
        type: String
    },
    inquiryDateOfAdmission: {
        type: String
    },
    reasonForAdmission: {
        type: String
    },
    reasonForFlagging: {
        type: String
    },
    lastVisit: {
        type: String
    },
    lastCall: {
        type: String
    },
    caseHistory: {
        type: String
    },
    caseStatus: {
        type: String
    },
    guardianListed: {
        type: String
    },
    familyVisitsPhoneCall: {
        type: String
    },
    siblings: {
        type: String
    },
    lastDateOfCWCOrder: {
        type: Date
    },
    Lastcwcorder: {
        type: String
    },
    lengthOfStayInShelter: {
        type: String
    },
    caringsRegistrationNumber: {
        type: String
    },
    dateLFA_CSR_MERUploadedInCARINGS: {
        type: String
    },
    createdByUser: {
        type: String
    },
    createdDate: {
        type: String
    },

    contactNo: 
        {
            type: Number
        }
    ,
    worker_alloted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: {
        type: String
    },
    childNote:{
        type:String
    },
    individualAdoptionFlow:{
        majorTask:[
            {
                majorTaskStatement:{
                    type:String
                },
                majorTaskStatus:{
                    type:Number,
                    default:0
                },
                majorTaskNote:{
                    type:String
                },
                minorTask:[
                    {
                        minorTaskStatement:{
                            type:String
                        },
                        minorTaskStatus:{
                            type:Number,
                            default:0
                        },
                        minorTaskNote:{
                            type:String
                        }
                    }
                ]
    
            }
        ]
    }

}, {
    timestamps: true
});


const Child = mongoose.model('Child', childSchema);
module.exports = Child;