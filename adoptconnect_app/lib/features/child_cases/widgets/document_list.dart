import 'dart:io';
import 'package:flutter/material.dart';
import 'document_list_item.dart';

class DocumentsList extends StatelessWidget {
  const DocumentsList({
    super.key,
    required this.documents,
  });

  final List<File> documents;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      shrinkWrap: true,
      itemCount: documents.length,
      itemBuilder: (context, index) {
        return DocumentListItem(document: documents[index]);
      },
      separatorBuilder: (contact, index) => const SizedBox(height: 15),
    );
  }
}