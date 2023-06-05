const Child = require('../models/child');
const ChildCategory = require('../models/child_category');
module.exports.create = async function (req, res) {

    // console.log(req.body);
    try {
        if (req.user.category != 'admin') {
            return res.status(200).send("you are not accessed to create child");
        }
        const childclass = req.body.childClassification.toLowerCase();
        let child = await Child.findOne({ child_id: req.body.child_id });

        let childcategory = await ChildCategory.findOne({ childClassification: childclass })

        if (!childcategory) return res.status(200).send(`${req.body.childClassification} category doesn't exist`);
        if (!child) {
            let child = await Child.create(
                {
                    child_id: req.body.child_id,//required(child_id ===>> caseNumber)
                    state: req.body.state,
                    district: req.body.district,
                    shelterHome: req.body.shelterHome,
                    childName: req.body.childName,
                    linkedWithSAA: req.body.linkedWithSAA,
                    gender: req.body.gender,
                    dateOfBirth: req.body.dateOfBirth,
                    age: req.body.age,
                    childClassification: childclass,//required(abandoned,surrendered.....)
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
                })
            if (req.body.contact_no) child.contactNo.push(req.body.contact_no);
            child.save();
            return res.status(200).json({ "response": child });
        } else {
            return res.status(200).send("child already exists");
        }
    } catch (err) {
        return res.status("some error occured in creating the child")
    }
}

module.exports.update_details_child = async function (req, res) {
    try {
        if (req.user.category != 'admin') {
            return res.status(200).send("you are not accessed to update child");
        }
        const childclass = req.body.childClassification.toLowerCase();
        let child = await Child.findOne({ child_id: req.body.child_id });
        let childcategory = await ChildCategory.findOne({ childClassification: childclass })

        if (!childcategory) return res.status(200).send(`${req.body.childClassification} category doesn't exist`);
        if (child) {
            child.state = req.body.state;
            child.district = req.body.district;
            child.shelterHome = req.body.shelterHome;
            child.childName = req.body.childName;
            child.linkedWithSAA = req.body.linkedWithSAA;
            child.gender = req.body.gender;
            child.dateOfBirth = req.body.dateOfBirth;
            child.age = req.body.age;
            if (req.body.childClassification) child.childClassification = childclass;
            child.recommendedForAdoption = req.body.recommendedForAdoption;
            child.inquiryDateOfAdmission = req.body.inquiryDateOfAdmission;
            child.reasonForAdmission = req.body.reasonForAdmission;
            child.reasonForFlagging = req.body.reasonForFlagging;
            child.lastVisit = req.body.lastVisit;
            child.lastCall = req.body.lastCall;
            child.caseHistory = req.body.caseHistory;
            child.caseStatus = req.body.caseStatus;
            child.guardianListed = req.body.guardianListed;
            child.familyVisitsPhoneCall = req.body.familyVisitsPhoneCall;
            child.siblings = req.body.siblings;
            child.lastDateOfCWCOrder = req.body.lastDateOfCWCOrder;
            child.Lastcwcorder = req.body.Lastcwcorder;
            child.lengthOfStayInShelter = req.body.lengthOfStayInShelter;
            child.caringsRegistrationNumber = req.body.caringsRegistrationNumber;
            child.dateLFA_CSR_MERUploadedInCARINGS = req.body.dateLFA_CSR_MERUploadedInCARINGS;
            child.createdByUser = req.body.createdByUser;
            child.createdDate = req.body.createdDate;
            child.worker_alloted = req.body.worker_alloted;
            child.avatar = req.body.avatar;
            if (req.body.contact_no) child.contactNo.push(req.body.contact_no);
            child.save();
            return res.status(200).json({ response: child });
        } else {
            return res.status(200).send("child not found");

        }
    } catch (err) {
        res.status(200).send("error in updating child details");
    }
}
module.exports.delete_child = function (req, res) {
    if (req.user.category != 'admin') {
        return res.status(200).send("you are not accessed to delete child. contact to admin");
    }
    Child.findOne({ child_id: req.body.child_id }, function (err, child) {
        if (!child) {
            return res.status(200).send("no child found with given id");
        }
        child.remove();
        return res.status(200).send("child deleted");
    })
}


//creation and deletion of child category
module.exports.create_child_category = function (req, res) {
    if (req.user.category != 'admin') {
        return res.status(200).send("you are not accessed to create child=> contact to admin");
    }
    const childclass = req.body.childClassification.toLowerCase();
    ChildCategory.findOne({ childClassification: childclass }, function (err, childcategory) {
        if (err) {
            res.status(200).send("error in finding child category");
        }
        if (childcategory) { return res.status(404).send("child category already exist"); }
        ChildCategory.create({
            childClassification: childclass
        }, function (err, childcateg) {
            if (err) {
                return res.status(200).send("error in creating child category");
            }
            return res.status(200).json({
                response: childcateg
            })
        })

    });

}
module.exports.delete_child_category = function (req, res) {
    if (req.user.category != 'admin') {
        return res.status(200).send("you are not accessed to delete child=> contact to admin");
    }
    const childclass = req.body.childClassification.toLowerCase();
    ChildCategory.findOne({ childClassification: childclass }, function (err, childcateg) {
        if (err) {
            return res.status(200).send("error in deleting child category");
        }
        return res.status(200).send("child-category deleted successfully");
    })

}
