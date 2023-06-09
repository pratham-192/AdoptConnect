import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_pdfview/flutter_pdfview.dart';

class DocumentListItem extends StatelessWidget {
  const DocumentListItem({
    super.key,
    required this.document,
  });

  final File document;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200,
      child: PDFView(
        filePath: document.path,
        autoSpacing: false,
        pageFling: false,
        enableSwipe: true,
        gestureRecognizers: <Factory<OneSequenceGestureRecognizer>>{
          Factory<OneSequenceGestureRecognizer>(
            () => EagerGestureRecognizer(),
          ),
        },
      ),
    );
  }
}