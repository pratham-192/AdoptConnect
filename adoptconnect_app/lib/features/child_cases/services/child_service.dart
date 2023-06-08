import 'dart:convert';
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
            var allotedChildren = jsonDecode(res.body)["response"]["alloted_children"];
            Provider.of<CasesProvider>(context, listen: false).setCases(jsonEncode(allotedChildren));
          },
          errorText: "Error in getting worker's child cases");
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
