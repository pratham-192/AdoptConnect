import 'dart:convert';

import 'package:adoptconnect_app/constants/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<void> httpErrorHandle(
    {required http.Response response,
    required BuildContext context,
    required Function onSuccess,
    String? errorText}) async {
  switch (response.statusCode) {
    case 200:
      await onSuccess();
      break;
    case 400:
      showSnackBar(context, jsonDecode(response.body)["msg"]);
      break;
    case 500:
      showSnackBar(context, jsonDecode(response.body)["error"]);
      break;
    default:
      showSnackBar(context, errorText ?? response.body);
  }
}
