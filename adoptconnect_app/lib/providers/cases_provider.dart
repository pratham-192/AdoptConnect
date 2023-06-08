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
}
