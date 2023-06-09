import 'dart:convert';
import 'dart:io';
import 'package:adoptconnect_app/constants/error_handling.dart';
import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/constants/utils.dart';
import 'package:adoptconnect_app/providers/cases_provider.dart';
import 'package:adoptconnect_app/providers/user_provider.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

class ChildService {
  void getAllCasesofWorker({required context}) async {
    try {
      String userId =
          Provider.of<UserProvider>(context, listen: false).user.userId;
      http.Response res = await http
          .post(Uri.parse('$uri/users/getworker'), body: {"user_id": userId});

      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () {
            var allotedChildren =
                jsonDecode(res.body)["response"]["alloted_children"];
            Provider.of<CasesProvider>(context, listen: false)
                .setCases(jsonEncode(allotedChildren));
          },
          errorText: "Error in getting worker's child cases");
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  void uploadAvatar({
    required String childId,
    required File image,
    required context,
  }) async {
    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse("$uri/child/image_upload"),
      );

      request.fields['child_id'] = childId;
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

  void uploadDocument({
    required String childId,
    required File document,
    required context,
  }) async {
    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse("$uri/child/document/upload"),
      );

      request.fields['child_id'] = childId;
      request.files.add(http.MultipartFile(
        'file',
        document.readAsBytes().asStream(),
        document.lengthSync(),
        filename: document.path.split('/').last,
      ));

      await request.send();
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
