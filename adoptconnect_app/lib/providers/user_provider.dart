import 'package:adoptconnect_app/models/user.dart';
import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(
    id: '',
    userId: '',
    name: '',
    email: '',
    password: '',
    category: '',
    allotedChildren: [],
    zone: '',
    address: '',
    aadharCardNo: '',
    contactNo: 0,
    avatar: {},
  );

  User get user => _user;

  void setUser(String user) {
    _user = User.fromJson(user);
    notifyListeners();
  }
}
