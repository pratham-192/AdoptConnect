const Child = require('../models/child');
module.exports.create = function (req, res) {

    // console.log(req.body);
    if(req.user.category!='admin'){
        return res.status(404).send("you are not accessed to create child");
    }
    Child.findOne({ child_id: req.body.child_id }, function (err, child) {
        if (err) {
            // console.log("Error in finding the user signing up");
            return res.status(404).send("error in finding the child");
        }
        if (!child) {
            Child.create({
                child_id: req.body.child_id,//required(child_id ===>> caseNumber)
                state: req.body.state,
                district: req.body.district,
                shelterHome: req.body.shelterHome,
                childName: req.body.childName,
                linkedWithSAA: req.body.linkedWithSAA,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                age: req.body.age,
                childClassification: req.body.childClassification,//required(abandoned,surrendered.....)
                recommendedForAdoption: req.body.recommendedForAdoption,
                inquiryDateOfAdmission: req.body.inquiryDateOfAdmission,
                reasonForAdmission: req.body.reasonForAdmission,
                reasonForFlagging: req.body.reasonForFlagging,
                lastVisit: req.body.lastVisit,
                lastCall: req.body.lastCall,
                caseHistory: req.body.caseHistory,
                caseStatus: req.body.caseStatus,
                guardianListed: req.body.guardianListed,
                familyVisitsPhoneCall: req.body.familyVisitsPhoneCall,
                siblings: req.body.siblings,
                lastDateOfCWCOrder: req.body.lastDateOfCWCOrder,
                Lastcwcorder: req.body.Lastcwcorder,
                lengthOfStayInShelter: req.body.lengthOfStayInShelter,
                caringsRegistrationNumber: req.body.caringsRegistrationNumber,
                dateLFA_CSR_MERUploadedInCARINGS: req.body.dateLFA_CSR_MERUploadedInCARINGS,
                createdByUser: req.body.createdByUser,
                createdDate: req.body.createdDate,
                worker_alloted: req.body.worker_alloted,
                avatar: req.body.avatar
            }, function (err, child) {
                if (err) {
                    console.log(err)
                    return res.status(400).send("Error in creating the child");
                }
                if (req.body.contact_no) child.contactNo.push(req.body.contact_no);
                child.save();
                return res.status(200).json({ "response": child });
            })
        } else {
            return res.status(200).send("child not found");

        }
    });
}

module.exports.update_details_child = function (req, res) {
    if(req.user.category!='admin'){
        return res.status(404).send("you are not accessed to update child");
    }
    Child.findOne({ child_id: req.body.child_id }, function (err, child) {
        if (err) {
            // console.log("Error in finding the user signing up");
            return res.status(404).send("error in finding the child");
        }
        if (child) {
            state = req.body.state;
            district = req.body.district;
            shelterHome = req.body.shelterHome;
            childName = req.body.childName;
            linkedWithSAA = req.body.linkedWithSAA;
            gender = req.body.gender;
            dateOfBirth = req.body.dateOfBirth;
            age = req.body.age;
            if(req.body.childClassification)childClassification = req.body.childClassification;
            recommendedForAdoption = req.body.recommendedForAdoption;
            inquiryDateOfAdmission = req.body.inquiryDateOfAdmission;
            reasonForAdmission = req.body.reasonForAdmission;
            reasonForFlagging = req.body.reasonForFlagging;
            lastVisit = req.body.lastVisit;
            lastCall = req.body.lastCall;
            caseHistory = req.body.caseHistory;
            caseStatus = req.body.caseStatus;
            guardianListed = req.body.guardianListed;
            familyVisitsPhoneCall = req.body.familyVisitsPhoneCall;
            siblings = req.body.siblings;
            lastDateOfCWCOrder = req.body.lastDateOfCWCOrder;
            Lastcwcorder = req.body.Lastcwcorder;
            lengthOfStayInShelter = req.body.lengthOfStayInShelter;
            caringsRegistrationNumber = req.body.caringsRegistrationNumber;
            dateLFA_CSR_MERUploadedInCARINGS = req.body.dateLFA_CSR_MERUploadedInCARINGS;
            createdByUser = req.body.createdByUser;
            createdDate = req.body.createdDate;
            worker_alloted = req.body.worker_alloted;
            avatar = req.body.avatar;
            if (req.body.contact_no) child.contactNo.push(req.body.contact_no);
            child.save();
            return res.status(200).json({ response: child });
        } else {
            return res.status(200).send("child not found");

        }
    });
}
module.exports.delete_child=function(req,res){
    console.log("sadfsf");
    if(req.user.category!='admin'){
        console.log("anfiksd");
        return res.status(404).send("you are not accessed to delete child");
    }
    Child.findOne({child_id:req.params.id},function(err,child){
        if(!child){
            return res.status(404).send("no child found with given id");
        }
        child.remove();
        return res.status(200).send("child deleted");
    })
}
