import 'dart:convert';
import 'package:adoptconnect_app/models/message.dart';
import 'package:flutter/material.dart';

class MessagesProvider extends ChangeNotifier {
  List<Message> _messages = [];

  List<Message> get messages => _messages;

  void setMessages(String messages) {
    List<dynamic> casesList = jsonDecode(messages);
    _messages = List<Message>.from(
        casesList.map((childCase) => Message.fromJson(jsonEncode(childCase))));
    notifyListeners();
  }
}
