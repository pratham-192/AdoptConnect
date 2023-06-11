import 'dart:io';
import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/features/child_cases/services/child_service.dart';
import 'package:adoptconnect_app/features/child_cases/widgets/child_avatar.dart';
import 'package:adoptconnect_app/models/adoption_flow.dart';
import 'package:adoptconnect_app/models/child.dart';
import 'package:adoptconnect_app/providers/child_provider.dart';
import 'package:adoptconnect_app/providers/user_provider.dart';
import 'package:adoptconnect_app/widgets/dropdown.dart';
import 'package:adoptconnect_app/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../../constants/utils.dart';
import '../widgets/document_list.dart';

class ChildProfileScreen extends StatefulWidget {
  static const routeName = "/child";
  const ChildProfileScreen({super.key});

  @override
  State<ChildProfileScreen> createState() => _ChildProfileScreenState();
}

class _ChildProfileScreenState extends State<ChildProfileScreen> {
  late Child _child;
  final _childService = ChildService();
  File? avatarImage;
  List<File> documents = [];
  bool _isEditMode = false;

  final _formKey = GlobalKey<FormState>();
  final _childIdController = TextEditingController();
  final _fullNameController = TextEditingController();
  String _genderValue = "Male";
  final _ageController = TextEditingController();
  final _dateOfBirthController = TextEditingController();
  final _shelterHomeController = TextEditingController();
  final _streetController = TextEditingController();
  final _cityController = TextEditingController();
  String _linkedWithSAAValue = "Yes";
  String _childClassificationValue = "abandoned";
  final _inquiryDateOfAdmissionController = TextEditingController();
  String _caseStatusValue = "inactive";
  final _reasonForAdmissionController = TextEditingController();
  final _caseHistoryController = TextEditingController();
  final _lastVisitController = TextEditingController();
  final _lastCallController = TextEditingController();
  final _guardianListedController = TextEditingController();
  final _familyPhoneCallController = TextEditingController();
  final _noOfSiblingsController = TextEditingController();
  final _lastDateOfCWCOrderController = TextEditingController();
  final _lastCWCOrderController = TextEditingController();
  final _lengthOfStayInShelterController = TextEditingController();
  final _regNoCARINGSController = TextEditingController();
  final _uploadDateFACSRMERController = TextEditingController();
  final _contactNumberController = TextEditingController();

  void _updateGender(String value) {
    setState(() => _genderValue = value);
  }

  void _updateLinkedWithSAA(String value) {
    setState(() => _linkedWithSAAValue = value);
  }

  void _updateChildClassification(String value) {
    setState(() => _childClassificationValue = value);
  }

  void selectImage() async {
    var res = await pickImage();
    setState(() {
      if (res != null) {
        avatarImage = res;
      }
    });
  }

  void selectDocuments() async {
    var res = await pickDocuments();
    setState(() => documents.addAll(res));
  }

  void editChild() {
    if (!_formKey.currentState!.validate()) return;
    var user = Provider.of<UserProvider>(context, listen: false).user;
    Child child = Child(
      id: '',
      childId: _childIdController.text,
      state: _streetController.text,
      district: _cityController.text,
      shelterHome: _shelterHomeController.text,
      childName: _fullNameController.text,
      linkedWithSAA: _linkedWithSAAValue,
      gender: _genderValue,
      dateOfBirth: _dateOfBirthController.text,
      age: _ageController.text,
      childClassification: _childClassificationValue,
      recommendedForAdoption: '',
      inquiryDateOfAdmission: _inquiryDateOfAdmissionController.text,
      reasonForAdmission: _reasonForAdmissionController.text,
      reasonForFlagging: '',
      lastVisit: _lastVisitController.text,
      lastCall: _lastCallController.text,
      caseHistory: _caseHistoryController.text,
      caseStatus: _caseStatusValue,
      guardianListed: _guardianListedController.text,
      familyVisitsPhoneCall: _familyPhoneCallController.text,
      siblings: _noOfSiblingsController.text,
      lastDateOfCWCOrder: DateTime.parse(_lastDateOfCWCOrderController.text),
      lastCWCOrder: _lastCWCOrderController.text,
      lengthOfStayInShelter: _lengthOfStayInShelterController.text,
      caringsRegistrationNumber: _regNoCARINGSController.text,
      dateLFACSRMERUploadedInCARINGS: _uploadDateFACSRMERController.text,
      createdByUser: user.id,
      createdDate: DateTime.now().toIso8601String().substring(0, 10),
      contactNo: int.parse(_contactNumberController.text),
      workerAlloted: user.id,
      avatar: avatarImage == null ? _child.avatar :  {"data": avatarImage},
      childNote: '',
      individualAdoptionFlow: AdoptionFlow(currMajorTask: 0, majorTask: []),
      uploadedDocuments: documents,
    );

    _childService.editChild(child: child, context: context);
  }

  late Future<List<File>> docs;

  @override
  void initState() {
    super.initState();
    _child = Provider.of<ChildProvider>(context, listen: false).child;
    docs =
        _childService.getDocuments(childId: _child.childId, context: context);
    _childIdController.text = _child.childId;
    _fullNameController.text = _child.childName;
    _genderValue = _child.gender;
    _ageController.text = _child.age.toString();
    _dateOfBirthController.text = _child.dateOfBirth;
    _shelterHomeController.text = _child.shelterHome;
    _streetController.text = _child.state;
    _cityController.text = _child.district;
    _linkedWithSAAValue = _child.linkedWithSAA;
    _childClassificationValue = _child.childClassification;
    _inquiryDateOfAdmissionController.text = _child.inquiryDateOfAdmission;
    _caseStatusValue = _child.caseStatus;
    _reasonForAdmissionController.text = _child.reasonForAdmission;
    _caseHistoryController.text = _child.caseHistory;
    _lastVisitController.text = _child.lastVisit;
    _lastCallController.text = _child.lastCall;
    _guardianListedController.text = _child.guardianListed;
    _familyPhoneCallController.text = _child.familyVisitsPhoneCall;
    _noOfSiblingsController.text = _child.siblings;
    _lastDateOfCWCOrderController.text =
        DateFormat("yyyy-MM-dd").format(_child.lastDateOfCWCOrder);
    _lastCWCOrderController.text = _child.lastCWCOrder;
    _lengthOfStayInShelterController.text = _child.lengthOfStayInShelter;
    _regNoCARINGSController.text = _child.caringsRegistrationNumber;
    _uploadDateFACSRMERController.text = _child.dateLFACSRMERUploadedInCARINGS;
    _contactNumberController.text = _child.contactNo.toString();
  }

  @override
  void dispose() {
    _childIdController.dispose();
    _fullNameController.dispose();
    _ageController.dispose();
    _dateOfBirthController.dispose();
    _shelterHomeController.dispose();
    _streetController.dispose();
    _cityController.dispose();
    _inquiryDateOfAdmissionController.dispose();
    _reasonForAdmissionController.dispose();
    _caseHistoryController.dispose();
    _lastVisitController.dispose();
    _lastCallController.dispose();
    _guardianListedController.dispose();
    _familyPhoneCallController.dispose();
    _noOfSiblingsController.dispose();
    _lastDateOfCWCOrderController.dispose();
    _lastCWCOrderController.dispose();
    _lengthOfStayInShelterController.dispose();
    _regNoCARINGSController.dispose();
    _uploadDateFACSRMERController.dispose();
    _contactNumberController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariables.secondaryColor,
      appBar: AppBar(
        centerTitle: true,
        title: _isEditMode
            ? const Text("Edit Child Profile")
            : const Text("Child Profile"),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor:
            _isEditMode ? Colors.red : GlobalVariables.primaryColor,
        tooltip: "Add Child",
        onPressed: () => setState(() => _isEditMode = !_isEditMode),
        child: Icon(
          _isEditMode ? Icons.close : Icons.edit,
          color: Colors.white,
          size: 34,
        ),
      ),
      body: Scrollbar(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(35),
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Hero(
                        tag: _child.childId,
                        child: ChildAvatar(
                          avatar: avatarImage == null
                              ? _child.avatar
                              : {"data": avatarImage?.readAsBytesSync()},
                          isProfile: true,
                        ),
                      ),
                      const SizedBox(width: 15),
                      Container(
                          child: _isEditMode
                              ? ElevatedButton(
                                  onPressed: selectImage,
                                  child: const Text("Upload Image"),
                                )
                              : null),
                    ],
                  ),
                  const SizedBox(height: 20),
                  InputText(
                    labelText: "Child Id",
                    controller: _childIdController,
                    validate: true,
                    enabled: false,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Full Name",
                    controller: _fullNameController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  Dropdown(
                    labelText: "Gender",
                    items: const ["Male", "Female"],
                    dropdownValue: _genderValue,
                    updateDropdownValue: _updateGender,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Age",
                    controller: _ageController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Date of Birth",
                    controller: _dateOfBirthController,
                    validate: true,
                    enabled: _isEditMode,
                    isDate: true,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Shelter Home",
                    controller: _shelterHomeController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Address / Street",
                    controller: _streetController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "City",
                    controller: _cityController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  Dropdown(
                    labelText: "Linked with SAA",
                    items: const ["yes", "No"],
                    dropdownValue: _linkedWithSAAValue,
                    updateDropdownValue: _updateLinkedWithSAA,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  Dropdown(
                    labelText: "Child Classification",
                    items: const [
                      "abandoned",
                      "orphaned",
                      "surrendered",
                      "admitted-by-guardians"
                    ],
                    dropdownValue: _childClassificationValue,
                    updateDropdownValue: _updateChildClassification,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Inquiry Date of Admission",
                    controller: _inquiryDateOfAdmissionController,
                    validate: true,
                    enabled: _isEditMode,
                    isDate: true,
                  ),
                  // const SizedBox(height: 15),
                  // Dropdown(
                  //   labelText: "Case Status",
                  //   items: const ["Active", "On Hold", "Adopted", "inactive"],
                  //   dropdownValue: _caseStatusValue,
                  //   updateDropdownValue: _updateCaseStatus,
                  //   enabled: _isEditMode,
                  // ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Reason For Admission",
                    controller: _reasonForAdmissionController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Case History",
                    controller: _caseHistoryController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Last Visit",
                    controller: _lastVisitController,
                    validate: true,
                    enabled: _isEditMode,
                    isDate: true,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Last Call",
                    controller: _lastCallController,
                    validate: true,
                    enabled: _isEditMode,
                    isDate: true,
                  ),
                  const SizedBox(
                    height: 15,
                  ),
                  InputText(
                    labelText: "Guardian Listed",
                    controller: _guardianListedController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Family Phone Call",
                    controller: _familyPhoneCallController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Number of Siblings",
                    controller: _noOfSiblingsController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Last Date of CWC Order",
                    controller: _lastDateOfCWCOrderController,
                    validate: true,
                    enabled: _isEditMode,
                    isDate: true,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Last CWC Order",
                    controller: _lastCWCOrderController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Length of Stay in Shelter",
                    controller: _lengthOfStayInShelterController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "CARINGS Registration Number",
                    controller: _regNoCARINGSController,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "FA CSR MER Upload Date",
                    controller: _uploadDateFACSRMERController,
                    validate: true,
                    enabled: _isEditMode,
                    isDate: true,
                  ),
                  const SizedBox(height: 15),
                  InputText(
                    labelText: "Contact Number",
                    controller: _contactNumberController,
                    keyboardType: TextInputType.phone,
                    validate: true,
                    enabled: _isEditMode,
                  ),
                  const SizedBox(height: 15),
                  FutureBuilder<List<File>>(
                    future: docs,
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return DocumentsList(documents: snapshot.data!);
                      }

                      return const CircularProgressIndicator.adaptive();
                    },
                  ),
                  const SizedBox(height: 15),
                  Container(
                    child: documents.isEmpty
                        ? null
                        : DocumentsList(documents: documents),
                  ),
                  Container(
                    child: !_isEditMode
                        ? null
                        : Column(
                            children: [
                              const SizedBox(height: 15),
                              GestureDetector(
                                onTap: selectDocuments,
                                child: DottedBorder(
                                  borderType: BorderType.RRect,
                                  radius: const Radius.circular(10),
                                  dashPattern: const [10, 4],
                                  strokeCap: StrokeCap.round,
                                  child: Container(
                                    width: double.infinity,
                                    height: 150,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        const Icon(
                                          Icons.folder_open,
                                          size: 40,
                                        ),
                                        const SizedBox(height: 15),
                                        Text(
                                          'Add Documents',
                                          style: TextStyle(
                                            fontSize: 15,
                                            color: Colors.grey.shade500,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 30),
                              ElevatedButton(
                                onPressed: editChild,
                                style: ElevatedButton.styleFrom(
                                    minimumSize:
                                        const Size(double.infinity, 40),
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 14)),
                                child: const Text(
                                  "Submit",
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
