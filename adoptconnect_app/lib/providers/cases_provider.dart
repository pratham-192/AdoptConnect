import 'dart:convert';
import 'package:adoptconnect_app/models/child.dart';
import 'package:flutter/material.dart';

class CasesProvider extends ChangeNotifier {
  List<Child> _cases = [];

  List<Child> get cases => _cases;

  void setCases(String cases) {
    List<dynamic> casesList = jsonDecode(cases);
    _cases = List<Child>.from(
        casesList.map((childCase) => Child.fromJson(jsonEncode(childCase))));
    notifyListeners();
  }

  void addChild(Child child) {
    _cases.add(child);
    notifyListeners();
  }

  void editChild(String childId, Child child) {
    if (_cases.isEmpty) return;
    int index = _cases.indexWhere((element) => element.childId == childId);
    _cases[index] = child;
    notifyListeners();
  }
}
