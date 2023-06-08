import 'package:adoptconnect_app/constants/error_handling.dart';
import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/constants/utils.dart';
import 'package:adoptconnect_app/providers/user_provider.dart';
import 'package:adoptconnect_app/widgets/bottom_bar.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  void signInUser(
      {required userId,
      required password,
      required category,
      required context}) async {
    try {
      http.Response res = await http.post(
          Uri.parse(
              '$uri/users/createSession?user_id=$userId&password=$password'),
          body: {"category": category});
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {
            SharedPreferences prefs = await SharedPreferences.getInstance();
            Provider.of<UserProvider>(context, listen: false).setUser(res.body);
            await prefs.setString('user', res.body);
            Navigator.pushNamedAndRemoveUntil(
                context, BottomBar.routeName, (route) => false);
          },
          errorText: "Error in Signing In");
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  void getUserData(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? user = prefs.getString('user');

    if (user == null) {
      prefs.setString('user', '');
      return;
    }

    if (context.mounted) {
      Provider.of<UserProvider>(context, listen: false)
          .setUser(user);
    }
  }
}
