import 'dart:convert';
import 'package:adoptconnect_app/models/adoption_flow.dart';
import 'package:intl/intl.dart';

class Child {
  final String id;
  final String childId;
  final String state;
  final String district;
  final String shelterHome;
  final String childName;
  final String linkedWithSAA;
  final String gender;
  final String dateOfBirth;
  final String age;
  final String childClassification;
  final String recommendedForAdoption;
  final String inquiryDateOfAdmission;
  final String reasonForAdmission;
  final String reasonForFlagging;
  final String lastVisit;
  final String lastCall;
  final String caseHistory;
  final String caseStatus;
  final String guardianListed;
  final String familyVisitsPhoneCall;
  final String siblings;
  final DateTime lastDateOfCWCOrder;
  final String lastCWCOrder;
  final String lengthOfStayInShelter;
  final String caringsRegistrationNumber;
  final String dateLFACSRMERUploadedInCARINGS;
  final String createdByUser;
  final String createdDate;
  final int contactNo;
  final String workerAlloted;
  Map<String, dynamic> avatar;
  final String childNote;
  final AdoptionFlow individualAdoptionFlow;
  List<dynamic> uploadedDocuments;

  Child({
    required this.id,
    required this.childId,
    required this.state,
    required this.district,
    required this.shelterHome,
    required this.childName,
    required this.linkedWithSAA,
    required this.gender,
    required this.dateOfBirth,
    required this.age,
    required this.childClassification,
    required this.recommendedForAdoption,
    required this.inquiryDateOfAdmission,
    required this.reasonForAdmission,
    required this.reasonForFlagging,
    required this.lastVisit,
    required this.lastCall,
    required this.caseHistory,
    required this.caseStatus,
    required this.guardianListed,
    required this.familyVisitsPhoneCall,
    required this.siblings,
    required this.lastDateOfCWCOrder,
    required this.lastCWCOrder,
    required this.lengthOfStayInShelter,
    required this.caringsRegistrationNumber,
    required this.dateLFACSRMERUploadedInCARINGS,
    required this.createdByUser,
    required this.createdDate,
    required this.contactNo,
    required this.workerAlloted,
    required this.avatar,
    required this.childNote,
    required this.individualAdoptionFlow,
    required this.uploadedDocuments,
  });

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'child_id': childId,
      'state': state,
      'district': district,
      'shelterHome': shelterHome,
      'childName': childName,
      'linkedWithSAA': linkedWithSAA,
      'gender': gender,
      'dateOfBirth': dateOfBirth,
      'age': age,
      'childClassification': childClassification,
      'recommendedForAdoption': recommendedForAdoption,
      'inquiryDateOfAdmission': inquiryDateOfAdmission,
      'reasonForAdmission': reasonForAdmission,
      'reasonForFlagging': reasonForFlagging,
      'lastVisit': lastVisit,
      'lastCall': lastCall,
      'caseHistory': caseHistory,
      'caseStatus': caseStatus,
      'guardianListed': guardianListed,
      'familyVisitsPhoneCall': familyVisitsPhoneCall,
      'siblings': siblings,
      'lastDateOfCWCOrder': lastDateOfCWCOrder.millisecondsSinceEpoch,
      'Lastcwcorder': lastCWCOrder,
      'lengthOfStayInShelter': lengthOfStayInShelter,
      'caringsRegistrationNumber': caringsRegistrationNumber,
      'dateLFA_CSR_MERUploadedInCARINGS': dateLFACSRMERUploadedInCARINGS,
      'createdByUser': createdByUser,
      'createdDate': createdDate,
      'contactNo': contactNo,
      'worker_alloted': workerAlloted,
      'avatar': avatar,
      'childNote': childNote,
      'individualAdoptionFlow': individualAdoptionFlow.toMap(),
      'uploaded_documents': uploadedDocuments,
    };
  }

  factory Child.fromMap(Map<String, dynamic> map) {
    return Child(
        id: map['_id'] ?? '',
        childId: map['child_id'] ?? '',
        state: map['state'] ?? '',
        district: map['district'] ?? '',
        shelterHome: map['shelterHome'] ?? '',
        childName: map['childName'] ?? '',
        linkedWithSAA: map['linkedWithSAA'] ?? '',
        gender: map['gender'] ?? '',
        dateOfBirth: map['dateOfBirth'] ?? '',
        age: map['age'] ?? '',
        childClassification: map['childClassification'] ?? '',
        recommendedForAdoption: map['recommendedForAdoption'] ?? '',
        inquiryDateOfAdmission: map['inquiryDateOfAdmission'] ?? '',
        reasonForAdmission: map['reasonForAdmission'] ?? '',
        reasonForFlagging: map['reasonForFlagging'] ?? '',
        lastVisit: map['lastVisit'] ?? '',
        lastCall: map['lastCall'] ?? '',
        caseHistory: map['caseHistory'] ?? '',
        caseStatus: map['caseStatus'] ?? '',
        guardianListed: map['guardianListed'] ?? '',
        familyVisitsPhoneCall: map['familyVisitsPhoneCall'] ?? '',
        siblings: map['siblings'] ?? '',
        lastDateOfCWCOrder: map['lastDateOfCWCOrder'] != null
            ? parseDate(map['lastDateOfCWCOrder'])
            : DateTime.now(),
        lastCWCOrder: map['Lastcwcorder'] ?? '',
        lengthOfStayInShelter: map['lengthOfStayInShelter'] ?? '',
        caringsRegistrationNumber: map['caringsRegistrationNumber'] ?? '',
        dateLFACSRMERUploadedInCARINGS:
            map['dateLFA_CSR_MERUploadedInCARINGS'] ?? '',
        createdByUser: map['createdByUser'] ?? '',
        createdDate: map['createdDate'] ?? '',
        contactNo: map['contactNo']?.toInt() ?? 0,
        workerAlloted: map['worker_alloted'] ?? '',
        avatar: map['avatar'] ?? {},
        childNote: map['childNote'] ?? '',
        individualAdoptionFlow:
            AdoptionFlow.fromMap(map['individualAdoptionFlow']),
        uploadedDocuments: List<dynamic>.from(map['uploaded_documents'] ?? []));
  }

  static DateTime parseDate(dynamic dateString) {
    if (dateString is int) {
      return DateTime.fromMillisecondsSinceEpoch(dateString);
    }
    try {
        return DateTime.parse(getFormattedDate(dateString));
    } catch(e){
      return DateTime.now();
    }
  }

  static String getFormattedDate(String dateString) {
    dateString = dateString.replaceAll(" GMT+0530 (India Standard Time)", "");
    DateFormat inputFormat;
    DateTime dateTime;
    try {
      inputFormat = DateFormat("EEE MMM dd yyyy HH:mm:ss");
      dateTime = inputFormat.parse(dateString);
    } catch (e) {
      dateTime = DateTime.parse(dateString);
    }
    DateFormat outputFormat = DateFormat("yyyy-MM-dd");
    String formattedDate = outputFormat.format(dateTime);
    return formattedDate;
  }

  String toJson() => json.encode(toMap());

  factory Child.fromJson(String source) => Child.fromMap(json.decode(source));

  Child copyWith({
    String? id,
    String? childId,
    String? state,
    String? district,
    String? shelterHome,
    String? childName,
    String? linkedWithSAA,
    String? gender,
    String? dateOfBirth,
    String? age,
    String? childClassification,
    String? recommendedForAdoption,
    String? inquiryDateOfAdmission,
    String? reasonForAdmission,
    String? reasonForFlagging,
    String? lastVisit,
    String? lastCall,
    String? caseHistory,
    String? caseStatus,
    String? guardianListed,
    String? familyVisitsPhoneCall,
    String? siblings,
    DateTime? lastDateOfCWCOrder,
    String? lastCWCOrder,
    String? lengthOfStayInShelter,
    String? caringsRegistrationNumber,
    String? dateLFACSRMERUploadedInCARINGS,
    String? createdByUser,
    String? createdDate,
    int? contactNo,
    String? workerAlloted,
    Map<String, dynamic>? avatar,
    String? childNote,
    AdoptionFlow? individualAdoptionFlow,
    List<dynamic>? uploadedDocuments,
  }) {
    return Child(
        id: id ?? this.id,
        childId: childId ?? this.childId,
        state: state ?? this.state,
        district: district ?? this.district,
        shelterHome: shelterHome ?? this.shelterHome,
        childName: childName ?? this.childName,
        linkedWithSAA: linkedWithSAA ?? this.linkedWithSAA,
        gender: gender ?? this.gender,
        dateOfBirth: dateOfBirth ?? this.dateOfBirth,
        age: age ?? this.age,
        childClassification: childClassification ?? this.childClassification,
        recommendedForAdoption:
            recommendedForAdoption ?? this.recommendedForAdoption,
        inquiryDateOfAdmission:
            inquiryDateOfAdmission ?? this.inquiryDateOfAdmission,
        reasonForAdmission: reasonForAdmission ?? this.reasonForAdmission,
        reasonForFlagging: reasonForFlagging ?? this.reasonForFlagging,
        lastVisit: lastVisit ?? this.lastVisit,
        lastCall: lastCall ?? this.lastCall,
        caseHistory: caseHistory ?? this.caseHistory,
        caseStatus: caseStatus ?? this.caseStatus,
        guardianListed: guardianListed ?? this.guardianListed,
        familyVisitsPhoneCall:
            familyVisitsPhoneCall ?? this.familyVisitsPhoneCall,
        siblings: siblings ?? this.siblings,
        lastDateOfCWCOrder: lastDateOfCWCOrder ?? this.lastDateOfCWCOrder,
        lastCWCOrder: lastCWCOrder ?? this.lastCWCOrder,
        lengthOfStayInShelter:
            lengthOfStayInShelter ?? this.lengthOfStayInShelter,
        caringsRegistrationNumber:
            caringsRegistrationNumber ?? this.caringsRegistrationNumber,
        dateLFACSRMERUploadedInCARINGS: dateLFACSRMERUploadedInCARINGS ??
            this.dateLFACSRMERUploadedInCARINGS,
        createdByUser: createdByUser ?? this.createdByUser,
        createdDate: createdDate ?? this.createdDate,
        contactNo: contactNo ?? this.contactNo,
        workerAlloted: workerAlloted ?? this.workerAlloted,
        avatar: avatar ?? this.avatar,
        childNote: childNote ?? this.childNote,
        individualAdoptionFlow:
            individualAdoptionFlow ?? this.individualAdoptionFlow,
        uploadedDocuments: uploadedDocuments ?? this.uploadedDocuments);
  }
}
