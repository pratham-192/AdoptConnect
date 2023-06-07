const Child = require('../models/child');
const ChildCategory = require('../models/child_category');
const AdoptionFlow = require('../models/adoption_flow');
const User = require('../models/user');
module.exports.create = async function (req, res) {

    // console.log(req.body);
    try {
        // if (req.user.category != 'admin') {
        //     return res.status(200).send("you are not accessed to create child");
        // }
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
                    avatar: req.body.avatar,
                    childNote: req.body.childNote
                })
            if (req.body.contact_no) child.contactNo = req.body.contact_no;
            child.individualAdoptionFlow.majorTask = await AdoptionFlow.findOne({ childClassification: childclass });


            // console.log("ad");
            // console.log(typeof(req.body.worker_alloted))
            // console.log(User.findById(worker_alloted));
            // child.populate('worker_alloted');
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
        // if (req.user.category != 'admin') {
        //     return res.status(200).send("you are not accessed to update child");
        // }
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
            child.avatar = req.body.avatar;
            child.childNote = req.body.childNote;
            if (req.body.contact_no) child.contactNo = req.body.contact_no;
            if (req.body.childClassification != child.childClassification) {
                child.childClassification = childclass
                child.individualAdoptionFlow.majorTask = await AdoptionFlow.findOne({ childClassification: childclass });
            };
            child.save();
            // child.populate('worker_alloted');
            return res.status(200).json({ response: child });
        } else {
            return res.status(200).send("child not found");

        }
    } catch (err) {
        res.status(200).send("error in updating child details");
    }
}
module.exports.delete_child = async function (req, res) {
    // if (req.user.category != 'admin') {
    //     return res.status(200).send("you are not accessed to delete child. contact to admin");
    // }
    let child = await Child.findOne({ child_id: req.body.child_id })
    if (!child) {
        return res.status(200).send("no child found with given id");
    }
    let worker = User.findById(child.worker_alloted);
    worker.alloted_children.pull(child._id);
    child.remove();
    return res.status(200).send("child deleted");
}


//creation and deletion of child category
module.exports.create_child_category = async function (req, res) {
    // if (req.user.category != 'admin') {
    //     return res.status(200).send("you are not accessed to create child=> contact to admin");
    // }
    try {
        const childclass = req.body.childClassification.toLowerCase();
        const childcategory = await ChildCategory.findOne({ childClassification: childclass })
        if (childcategory) { return res.status(200).send("child category already exist"); }
        const childcateg = await ChildCategory.create({
            childClassification: childclass
        })
        AdoptionFlow.create({ childClassification: childclass });
        return res.status(200).json({
            response: childcateg
        })
    } catch (err) {
        res.status(200).send("error in creating child category");
    }


}
module.exports.delete_child_category = function (req, res) {
    // if (req.user.category != 'admin') {
    //     return res.status(200).send("you are not accessed to delete child=> contact to admin");
    // }
    const childclass = req.body.childClassification.toLowerCase();
    ChildCategory.findOneAndDelete({ childClassification: childclass }, function (err, childcateg) {
        if (err) {
            return res.status(200).send("error in deleting child category");
        }
        return res.status(200).send("child-category deleted successfully");
    })

}

//adoption flow status update
module.exports.statusUpdate = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        // let minorTaskStatus = req.body.minorTaskStatus;
        // let majorTaskPosition = req.body.majorTaskPosition;
        // let minorTaskPosition = req.body.minorTaskPosition;
        // let majorStatus = child.individualAdoptionFlow.majorTask[majorTaskPosition];
        // majorStatus.minorTask[minorTaskPosition].minorTaskStatus = minorTaskStatus;
        // let flag = 0;
        // for (let u of majorStatus.minorTask) {
        //     if (u.minorTaskStatus == 1) {
        //         majorStatus.majorTaskStatus = 1;
        //     }
        //     if (u.minorTaskStatus == 0 || u.minorTaskStatus == 1) {
        //         flag = 1;
        //     }
        // }
        // if (!flag && majorStatus.minorTask.length) {
        //     majorStatus.majorTaskStatus = 2;
        // }
        // child.save();
        // return res.status(200).json({
        //     response: child
        // })
        let status_object = req.body.statusObject;
        let curr_major = 0;
        let curr_flag=0;
        for (let u of status_object) {
            let curr_minor = 0;
            let flag=0;
            if (u.minorTask.length==0)break;
            for (let minor of u.minorTask) {
                if (minor.minorTaskStatus == 1) {
                    curr_minor=curr_minor+1;
                }
                if (minor.minorTaskStatus == 0 || minor.minorTaskStatus == 1) {
                    flag = 1;
                }
            }
            u.currMinorTask=curr_minor;
            u.save();
            if (!flag) {
                curr_major=curr_major+1;
            }else break;
        }
        status_object.save();
        child.individualAdoptionFlow.currMajorTask=curr_major;
        child.individualAdoptionFlow.majorTask=status_object;
        child.save();
        return res.status(200).send(
            "successfully updated"
        )

    } catch (err) {
        return res.status(200).send("error in updating the status")
    }

}
module.exports.getChildbyId = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id }).populate('worker_alloted');
        res.status(200).json({
            response: child
        })
    } catch (err) {
        return res.status(200).send("error in getting child by id");
    }
}
