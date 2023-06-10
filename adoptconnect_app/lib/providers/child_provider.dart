import 'package:adoptconnect_app/models/adoption_flow.dart';
import 'package:adoptconnect_app/models/child.dart';
import 'package:flutter/material.dart';

class ChildProvider extends ChangeNotifier {
  Child _child = Child(
      id: '',
      childId: '',
      state: '',
      district: '',
      shelterHome: '',
      childName: '',
      linkedWithSAA: '',
      gender: '',
      dateOfBirth: '',
      age: '',
      childClassification: '',
      recommendedForAdoption: '',
      inquiryDateOfAdmission: '',
      reasonForAdmission: '',
      reasonForFlagging: '',
      lastVisit: '',
      lastCall: '',
      caseHistory: '',
      caseStatus: '',
      guardianListed: '',
      familyVisitsPhoneCall: '',
      siblings: '',
      lastDateOfCWCOrder: DateTime.now(),
      lastCWCOrder: '',
      lengthOfStayInShelter: '',
      caringsRegistrationNumber: '',
      dateLFACSRMERUploadedInCARINGS: '',
      createdByUser: '',
      createdDate: '',
      contactNo: 0,
      workerAlloted: '',
      avatar: {},
      childNote: '',
      individualAdoptionFlow: AdoptionFlow(currMajorTask: 0, majorTask: []),
      uploadedDocuments: [],
      );

  Child get child => _child;

  void setChildFromJson(String child) {
    _child = Child.fromJson(child);
    notifyListeners();
  }

  void setChild(Child child) {
    _child = child;
    notifyListeners();
  }
}
