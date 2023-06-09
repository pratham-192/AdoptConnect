import 'dart:typed_data';
import 'package:flutter/material.dart';

class ChildAvatar extends StatelessWidget {
  final Map<String, dynamic> avatar;
  final bool isProfile;

  const ChildAvatar({
    Key? key,
    required this.avatar,
    this.isProfile = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<dynamic> bufferDynamic;
    List<int> buffer = [];

    if (avatar["data"] != null) {
      if (avatar["data"].runtimeType != Uint8List) {
        bufferDynamic = avatar["data"];
        buffer = bufferDynamic.map((e) => e as int).toList();
      }
    }

    return CircleAvatar(
      radius: isProfile ? 45 : 30,
      backgroundImage: avatar["data"] != null
          ? MemoryImage(avatar["data"].runtimeType == Uint8List
              ? avatar["data"]
              : Uint8List.fromList(buffer))
          : null,
      backgroundColor: Colors.black12,
      child: avatar["data"] == null
          ? Icon(
              Icons.person,
              color: Colors.black38,
              size: isProfile ? 36 : 24,
            )
          : null,
    );
  }
}
