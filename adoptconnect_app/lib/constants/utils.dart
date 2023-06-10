import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

void showSnackBar(BuildContext context, String text) {
  if (context.mounted) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(text),
      ),
    );
  }
}

Future<File?> pickImage() async {
  File? image;
  try {
    var file = await FilePicker.platform.pickFiles(
      type: FileType.image,
    );

    if (file != null && file.files.isNotEmpty) {
      image = File(file.files.single.path!);
    }
  } catch (e) {
    debugPrint(e.toString());
  }

  return image;
}

Future<List<File>> pickDocuments() async {
  List<File> documents = [];
  try {
    var files = await FilePicker.platform.pickFiles(
        type: FileType.custom, allowedExtensions: ['pdf'], allowMultiple: true);

    if (files != null && files.files.isNotEmpty) {
      for (var file in files.files) {
        documents.add(File(file.path!));
      }
    }
  } catch (e) {
    debugPrint(e.toString());
  }

  return documents;
}
