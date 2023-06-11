import 'dart:convert';
import 'package:adoptconnect_app/constants/error_handling.dart';
import 'package:adoptconnect_app/constants/utils.dart';
import 'package:adoptconnect_app/providers/messages_provider.dart';
import 'package:api_cache_manager/models/cache_db_model.dart';
import 'package:api_cache_manager/utils/cache_manager.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../../../constants/connectivity.dart';
import '../../../constants/global_variables.dart';

class MessageService {
  Future<bool> getMessages(
      {required String userId, required BuildContext context}) async {
    if (!(await isConnectedToInternet())) {
      if (await APICacheManager().isAPICacheKeyExist("messages")) {
        var cacheData = await APICacheManager().getCacheData("messages");
        String messages = cacheData.syncData;
        if (context.mounted) {
          Provider.of<MessagesProvider>(context, listen: false)
              .setMessages(messages);
        }
      }

      return true;
    }

    try {
      if (context.mounted) {
        http.Response res = await http.post(
          Uri.parse("$uri/users/get_messages"),
          body: {"to_user_id": userId},
        );

        // ignore: use_build_context_synchronously
        httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {
            String messages = jsonEncode(jsonDecode(res.body)["response"]);
            Provider.of<MessagesProvider>(context, listen: false)
                .setMessages(messages);
            APICacheDBModel cacheDBModel =
                APICacheDBModel(key: "messages", syncData: messages);
            await APICacheManager().addCacheData(cacheDBModel);
          },
          errorText: "Error in getting messages",
        );
      }
    } catch (e) {
      if (context.mounted) {
        showSnackBar(context, e.toString());
      }
    }

    return true;
  }
}
