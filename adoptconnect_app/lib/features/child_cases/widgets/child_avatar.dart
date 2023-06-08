import 'dart:typed_data';

import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:flutter/material.dart';

class ChildAvatar extends StatelessWidget {
  final Map<String, dynamic> avatar;
  const ChildAvatar({super.key, required this.avatar});

  @override
  Widget build(BuildContext context) {
    List<dynamic> bufferDynamic;
    List<int> buffer = [];

    if (avatar["data"] != null) {
      bufferDynamic = avatar["data"];
      buffer = bufferDynamic.map((e) => e as int).toList();
    }

    return CircleAvatar(
      radius: 30,
      backgroundImage: avatar["data"] != null
          ? MemoryImage(Uint8List.fromList(buffer))
          : null,
      backgroundColor: Colors.black12,
      child: avatar["data"] == null ?
       const Icon(Icons.person, color: Colors.black38,) : null,
    );
  }
}
