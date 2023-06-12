import 'package:flutter/material.dart';

// String uri = "http://192.168.0.4:3000";
String uri = "https://adoptconnect.onrender.com";
BuildContext? globalContext;
class GlobalVariables {
  // COLORS
  static const appBarGradient = LinearGradient(
    colors: [
      Color.fromARGB(255, 29, 201, 192),
      Color.fromARGB(255, 125, 221, 216),
    ],
    stops: [0.5, 1.0],
  );

  static const primaryColor = Color.fromRGBO(46, 214, 226, 1);
  static const secondaryColor = Color.fromRGBO(234, 254, 255, 1);
  static const backgroundColor = Colors.white;
  static const Color greyBackgroundColor = Color(0xffebecee);
  static var selectedNavBarColor = Colors.cyan[800]!;
  static const unselectedNavBarColor = Colors.black87;
}
