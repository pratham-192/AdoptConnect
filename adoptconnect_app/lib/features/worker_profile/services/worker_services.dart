import 'dart:convert';
import 'dart:io';
import 'package:adoptconnect_app/constants/error_handling.dart';
import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/constants/utils.dart';
import 'package:adoptconnect_app/models/user.dart';
import 'package:adoptconnect_app/providers/user_provider.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class WorkerService {
  void editWorker({
    required String userId,
    required String name,
    required String email,
    required String password,
    required Map<String, dynamic> avatar,
    required context,
  }) async {
    try {
      User user = Provider.of<UserProvider>(context, listen: false).user;
      Map<String, dynamic> body = {
        "user_id": userId,
        "name": name,
        "email": email,
        "password": password,
        "category": "worker",
        "zone": user.zone,
        "address": user.address,
        "aadharCardNo": user.aadharCardNo,
        "contactNo": user.contactNo.toString(),
      };

      http.Response res = await http.post(
        Uri.parse("$uri/users/update"),
        body: body,
      );
      var userObj = jsonDecode(res.body)["response"];
      if (avatar["data"] != null) {
        try {
          userObj["avatar"] = {"data": avatar["data"].readAsBytesSync()};
        } catch (e) {
          userObj["avatar"] = avatar;
        }
      }

      userObj["alloted_children"] = [];

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () async {
          if (avatar["data"] != null && avatar["data"] is File) {
            await uploadAvatar(
              userId: userId,
              image: avatar["data"],
              context: context,
            );
          }

          SharedPreferences prefs = await SharedPreferences.getInstance();
          Provider.of<UserProvider>(context, listen: false)
              .setUser(jsonEncode(userObj));
          await prefs.setString('user', jsonEncode(userObj));
        },
        errorText: "Error in updating worker profile",
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  Future<void> uploadAvatar({
    required String userId,
    required File image,
    required context,
  }) async {
    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse("$uri/users/image_upload"),
      );

      request.fields['user_id'] = userId;
      request.files.add(http.MultipartFile(
        'file',
        image.readAsBytes().asStream(),
        image.lengthSync(),
        filename: image.path.split('/').last,
      ));

      await request.send();
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
