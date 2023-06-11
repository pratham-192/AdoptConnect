import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:adoptconnect_app/constants/utils.dart';
import 'package:adoptconnect_app/features/child_cases/services/child_service.dart';
import 'package:adoptconnect_app/features/worker_profile/services/worker_service.dart';
import 'package:adoptconnect_app/models/child.dart';
import 'package:adoptconnect_app/models/user.dart';
import 'package:api_cache_manager/api_cache_manager.dart';
import 'package:api_cache_manager/models/cache_db_model.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'dart:async';

import 'global_variables.dart';

Future<bool> isConnectedToInternet() async {
  final connectivityResult = await Connectivity().checkConnectivity();

  return connectivityResult != ConnectivityResult.none;
}

StreamSubscription<ConnectivityResult>? internetSubscription;

void startInternetSubscription() {
  stopInternetSubscription();
  internetSubscription = Connectivity().onConnectivityChanged.listen((result) {
    if (result != ConnectivityResult.none) {
      // Internet is available, stop the subscription
      stopInternetSubscription();

      syncData();
    }
  });
}

void stopInternetSubscription() {
  if (internetSubscription != null) {
    internetSubscription!.cancel();
    internetSubscription = null;
  }
}

Future<String> getCacheData(String key) async {
  var cacheData = await APICacheManager().getCacheData(key);
  return cacheData.syncData;
}

void syncData() async {
  if (globalContext == null) return;
  if (!(await isConnectedToInternet())) {
    startInternetSubscription();
    return;
  }

  // Internet available, Perform all write operations
  print("SYNCING");
  syncAddChild(context: globalContext);
  syncEditChild(context: globalContext);
  syncWorker(context: globalContext);
}

void syncWorker({required context}) async {
  if (!await APICacheManager().isAPICacheKeyExist("worker")) return;

  try {
    String workerString = await getCacheData("worker");
    Map<String, dynamic> worker = jsonDecode(workerString);

    WorkerService workerService = WorkerService();
    workerService.editWorker(
      userId: worker["userId"],
      name: worker["name"],
      email: worker["email"],
      avatar: worker["avatarChanged"]
          ? {"data": File(worker["avatar"]["data"])}
          : worker["avatar"],
      user: User.fromJson(worker["user"]),
      context: context,
    );

    await APICacheManager().deleteCache("worker");
  } catch (e) {
    showSnackBar(context, e.toString());
  }
}

void syncAddChild({required context}) async {
  if (!await APICacheManager().isAPICacheKeyExist("addChild")) return;

  try {
    String childrenKeysString = await getCacheData("addChild");
    List<dynamic> childrenKeysDynamic =
        jsonDecode(childrenKeysString).map((item) => item.toString()).toList();
    List<String> childrenKeys = List<String>.from(childrenKeysDynamic);
    ChildService childService = ChildService();

    List<String> unsuccessfulKeys = [];
    for (String key in childrenKeys) {
      try {
        String childString = await getCacheData(key);
        Child child = Child.fromJson(childString);
        child.avatar = {"data": File(child.avatar["data"])};
        child.uploadedDocuments =
            child.uploadedDocuments.map((e) => File(e)).toList();
        childService.addChild(child: child, context: context);

        await APICacheManager().deleteCache(key);
      } catch (e) {
        unsuccessfulKeys.add(key);
        showSnackBar(context, e.toString());
      }
    }

    if (unsuccessfulKeys.isEmpty) {
      await APICacheManager().deleteCache("addChild");
    } else {
      APICacheDBModel cacheDBModel = APICacheDBModel(
          key: "addChild", syncData: jsonEncode(unsuccessfulKeys));
      await APICacheManager().addCacheData(cacheDBModel);
    }
  } catch (e) {
    showSnackBar(context, e.toString());
  }
}

void syncEditChild({required context}) async {
  if (!await APICacheManager().isAPICacheKeyExist("editChild")) return;

  try {
    String childrenKeysString = await getCacheData("editChild");
    List<dynamic> childrenKeysDynamic =
        jsonDecode(childrenKeysString).map((item) => item.toString()).toList();
    List<String> childrenKeys = List<String>.from(childrenKeysDynamic);

    ChildService childService = ChildService();

    List<String> unsuccessfulKeys = [];
    for (String key in childrenKeys) {
      try {
        String childString = await getCacheData(key);
        Map<String, dynamic> childObj = jsonDecode(childString);

        Child child = Child.fromJson(childObj["child"]);
        child.avatar = childObj["avatarChanged"]
            ? {"data": File(child.avatar["data"])}
            : child.avatar;

        child.uploadedDocuments =
            child.uploadedDocuments.map((e) => File(e)).toList();
        childService.editChild(child: child, context: context);

        await APICacheManager().deleteCache(key);
      } catch (e) {
        unsuccessfulKeys.add(key);
        showSnackBar(context, e.toString());
      }
    }

    if (unsuccessfulKeys.isEmpty) {
      await APICacheManager().deleteCache("editChild");
    } else {
      APICacheDBModel cacheDBModel = APICacheDBModel(
          key: "editChild", syncData: jsonEncode(unsuccessfulKeys));
      await APICacheManager().addCacheData(cacheDBModel);
    }
  } catch (e) {
    showSnackBar(context, e.toString());
  }
}

void addChildDataToCache(String childData, String key) async {
  bool childExists = await APICacheManager().isAPICacheKeyExist(key);
  APICacheDBModel cacheDBModel = APICacheDBModel(key: key, syncData: childData);
  await APICacheManager().addCacheData(cacheDBModel);

  if (childExists) return;

  List<String> childrenKeys = [];
  if (await APICacheManager().isAPICacheKeyExist("addChild")) {
    String cachedData = await getCacheData("addChild");
    // childrenKeys = List<String>.from(jsonDecode(cachedData) as List);
    List<dynamic> childrenKeysDynamic =
        jsonDecode(cachedData).map((item) => item.toString()).toList();
    childrenKeys = List<String>.from(childrenKeysDynamic);
  }

  childrenKeys.add(key);
  cacheDBModel =
      APICacheDBModel(key: "addChild", syncData: childrenKeys.toString());
  await APICacheManager().addCacheData(cacheDBModel);
}

void editChildDataToCache(String childData, String key) async {
  bool childExists = await APICacheManager().isAPICacheKeyExist(key);
  APICacheDBModel cacheDBModel = APICacheDBModel(key: key, syncData: childData);
  await APICacheManager().addCacheData(cacheDBModel);

  if (childExists) return;

  List<String> childrenKeys = [];
  if (await APICacheManager().isAPICacheKeyExist("editChild")) {
    String cachedData = await getCacheData("editChild");
    List<dynamic> childrenKeysDynamic =
        jsonDecode(cachedData).map((item) => item.toString()).toList();
    childrenKeys = List<String>.from(childrenKeysDynamic);
  }

  childrenKeys.add(key);
  cacheDBModel =
      APICacheDBModel(key: "editChild", syncData: jsonEncode(childrenKeys));
  await APICacheManager().addCacheData(cacheDBModel);
}
