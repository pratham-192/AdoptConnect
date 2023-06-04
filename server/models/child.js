const mongoose = require('mongoose');
const path = require('path');

const childSchema = mongoose.Schema({
    child_id: {
        type: String, 
        unique: true
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
        type: Date
    },
    age: {
        type: Number
    },
    childClassification: {
        type: String,
        unique:true
    },
    recommendedForAdoption: {
        type: String
    },
    inquiryDateOfAdmission: {
        type: Date
    },
    reasonForAdmission: {
        type: String
    },
    reasonForFlagging: {
        type: String
    },
    lastVisit: {
        type: Date
    },
    lastCall: {
        type: Date
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
        type: Date
    },
    createdByUser: {
        type: String
    },
    createdDate: {
        type: Date
    },

    contactNo: [
        {
            type: Number
        }
    ],
    worker_alloted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: {
        type: String
    }

}, {
    timestamps: true
});


const Child = mongoose.model('Child', childSchema);
module.exports = Child;