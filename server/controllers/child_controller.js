const Child = require('../models/child');
const ChildCategory = require('../models/child_category');
const AdoptionFlow = require('../models/adoption_flow');
const User = require('../models/user');
const { Readable } = require('stream');
const csv = require('csvtojson');
const fs = require('fs');
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
            let flow = await AdoptionFlow.findOne({ childClassification: childclass });
            // console.log(flow);
            child.individualAdoptionFlow.majorTask = flow.majorTask;
            // console.log(await AdoptionFlow.findOne({ childClassification: childclass }))
            // console.log(child.individualAdoptionFlow);
            child.save();
            // console.log(child);

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
        let child = await Child.findOne({ child_id: req.body.child_id }).select('-uploaded_documents');
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
        await AdoptionFlow.create({ childClassification: childclass });
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

module.exports.get_child_category = async function (req, res) {
    try {
        let child_category = await ChildCategory.find({});
        return res.status(200).json({
            response: child_category
        })
    } catch (err) {
        return res.status(200).send("error in getting child category");
    }
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
        for (let u of status_object) {
            let curr_minor = 0;
            let flag = 0;
            if (u.minorTask.length == 0) break;
            for (let minor of u.minorTask) {
                if (minor.minorTaskStatus == 2) {
                    curr_minor = curr_minor + 1;
                }
                if (minor.minorTaskStatus == 0 || minor.minorTaskStatus == 1) {
                    flag = 1;
                }
            }
            if (curr_minor > 0) {
                child.caseStatus = "inprogress"
            }
            u.currMinorTask = curr_minor;
            // u.save();
            if (!flag) {
                curr_major = curr_major + 1;
            } else break;
        }
        // status_object.save();
        child.individualAdoptionFlow.currMajorTask = curr_major;
        child.individualAdoptionFlow.majorTask = status_object;
        if (curr_major == status_object.length) child.caseStatus = "completed";
        else if (curr_major != 0)
            child.save();
        return res.status(200).json({
            response: child
        })

    } catch (err) {
        return res.status(200).send("error in updating the status")
    }

}

module.exports.getChildbyId = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id }).populate('worker_alloted').select('-uploaded_documents');
        res.status(200).json({
            response: child
        })
    } catch (err) {
        return res.status(200).send("error in getting child by id");
    }
}




module.exports.upload = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let docData = {
            name: req.file.originalname,
            data: req.file.buffer
        }
        child.uploaded_documents.push(docData);
        child.save();
        return res.status(200).send("file uploaded successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in uploading files");
    }
}


module.exports.download = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let docId = req.body.docId;
        // let file = child.uploaded_documents;
        // console.log(child);
        let file;
        for (let u of child.uploaded_documents) {
            if (u._id == docId) {
                file = u;
                break;
            }
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        return res.status(200).send(file);
        // const fileStream = new Readable();
        // fileStream.push(file.data);
        // fileStream.push(null);

        // // Pipe the file stream to the response stream
        // fileStream.on('error', (err) => {
        //     console.error('Error reading file stream:', err);
        //     res.status(200).json({ error: 'Failed to read file stream' });
        // });
        // fileStream.pipe(res);

    } catch (err) {
        console.log(err);
        return res.status(200).send("error in downloading files");
    }
}


module.exports.deleteFile = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let docId = req.body.docId;
        if (child.uploaded_documents.length == 0) {
            return res.status(200).send("there is no file to delete");
        }
        let file;
        for (let u of child.uploaded_documents) {
            if (u._id == docId) {
                file = u;
                break;
            }
        }
        if (file == null) return res.status(200).send("not able to fetch the file");
        child.uploaded_documents.pull(file);
        child.save();
        return res.status(200).send("document deleted successfuly");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in deleting the file");
    }

}

module.exports.imageUpload = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        if (!child) return res.status(200).send("child doesn't exists");
        child.avatar = req.file.buffer;
        child.save();
        return res.status(200).send("file uploaded successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in uploading image");

    }
}


module.exports.getImage = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        if (child.avatar) {
            return res.status(200).json({
                response: child.avatar
            })
        }
        else {
            return res.status(200).send("avatar is not uploaded yet");
        }
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in getting image");
    }
}


module.exports.deleteImage = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        child.avatar = null;
        child.save();
        return res.status(200).send("profile image deleted successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in deleting the image");
    }
}


module.exports.getDocuments = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        const modifiedResponse = child.uploaded_documents.map((item) => {
            return {
                name: item.name,
                docId: item._id,
            };
        });
        if (child) {
            return res.status(200).json({
                response: modifiedResponse
            })
        } else return res.status(200).send("child doesn't exists");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in getting documents");
    }
}

const columnMappings = {
    csvChildId: 'Case Number',
    csvState: 'State',
    csvDistrict: 'District',
    csvShelterHome: 'Shelter Home',
    csvChildName: 'Child Name',
    csvLinkedWithSAA: 'Linked with SAA',
    csvGender: 'Gender',
    csvDateOfBirth: 'Date of Birth',
    csvAge: 'Age',
    csvChildClassification: 'Child Classification',
    csvRecommendedForAdoption: 'Recommended For Adoption Inquiry',
    csvInquiryDateOfAdmission: 'Date of Admission',
    csvReasonForAdmission: 'Reason for Admission',
    csvReasonForFlagging: 'Reason for Flagging',
    csvLastVisit: 'Last Visit Since',
    csvLastCall: 'Last Call Since',
    csvCaseHistory: 'Case History',
    csvGuardianListed: 'Guardian listed',
    csvFamilyVisitsPhoneCall: 'Family Visits /Phone Call',
    csvSiblings: 'Siblings',
    csvLastDateOfCWCOrder: 'Last Date of CWC Order or Review',
    csvLastcwcorder: 'Last CWC Order',
    csvLengthOfStayInShelter: 'Length of stay in the shelter',
    csvCaringsRegistrationNumber: 'CARINGS Registration Number',
    csvDateLFA_CSR_MERUploadedInCARINGS: 'Date the LFA,CSR,MER Uploaded in CARINGS',
    csvCreatedByUser: 'Created by User',
    csvCreatedDate: 'Created Date'
};



module.exports.bulkUpload = async function (req, res) {
    try {
        const results = [];
        const fileBuffer = req.file.buffer;
        const fileContents = fileBuffer.toString(); // Convert file buffer to string

        const csvData = await csv({
            delimiter: ',',
            noheader: false, // Indicates that the CSV file has a header row
            trim: true, // Trim whitespace from values
        }).fromString(fileContents);

        for (const row of csvData) {
            // Extract the necessary fields from the row and create a Child document
            const childData = {
                child_id: row['Case Number'] || undefined,
                state: row[columnMappings.csvState] || undefined,
                district: row[columnMappings.csvDistrict] || undefined,
                shelterHome: row[columnMappings.csvShelterHome] || undefined,
                childName: row[columnMappings.csvChildName] || undefined,
                linkedWithSAA: row[columnMappings.csvLinkedWithSAA] || undefined,
                gender: row[columnMappings.csvGender] || undefined,
                dateOfBirth: row[columnMappings.csvDateOfBirth] || undefined,
                age: row[columnMappings.csvAge] || undefined,
                childClassification: row[columnMappings.csvChildClassification] || undefined,
                recommendedForAdoption: row[columnMappings.csvRecommendedForAdoption] || undefined,
                inquiryDateOfAdmission: row[columnMappings.csvInquiryDateOfAdmission] || undefined,
                reasonForAdmission: row[columnMappings.csvReasonForAdmission] || undefined,
                reasonForFlagging: row[columnMappings.csvReasonForFlagging] || undefined,
                lastVisit: row[columnMappings.csvLastVisit] || undefined,
                lastCall: row[columnMappings.csvLastCall] || undefined,
                caseHistory: row[columnMappings.csvCaseHistory] || undefined,
                guardianListed: row[columnMappings.csvGuardianListed] || undefined,
                familyVisitsPhoneCall: row[columnMappings.csvFamilyVisitsPhoneCall] || undefined,
                siblings: row[columnMappings.csvSiblings] || undefined,
                lastDateOfCWCOrder: row[columnMappings.csvLastDateOfCWCOrder] || undefined,
                Lastcwcorder: row[columnMappings.csvLastcwcorder] || undefined,
                lengthOfStayInShelter: row[columnMappings.csvLengthOfStayInShelter] || undefined,
                caringsRegistrationNumber: row[columnMappings.csvCaringsRegistrationNumber] || undefined,
                dateLFA_CSR_MERUploadedInCARINGS: row[columnMappings.csvDateLFA_CSR_MERUploadedInCARINGS] || undefined,
                createdByUser: row[columnMappings.csvCreatedByUser] || undefined,
                createdDate: row[columnMappings.csvCreatedDate] || undefined,
            };

            //   console.log(childData);

            const child = await Child.create(childData)
            if (req.body.contact_no) child.contactNo = req.body.contact_no;
            let flow = await AdoptionFlow.findOne({ childClassification: childData.childClassification });
            // console.log(flow);
            child.individualAdoptionFlow.majorTask = flow.majorTask;
            // console.log(await AdoptionFlow.findOne({ childClassification: childclass }))
            // console.log(child.individualAdoptionFlow);
            child.save();
        }

        res.status(200).json({ message: 'Bulk upload completed' });
    } catch (err) {
        console.log(err);
        return res.status(200).send('Error in bulk uploading');
    }
};
