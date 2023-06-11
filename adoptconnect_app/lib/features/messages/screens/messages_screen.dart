import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/features/messages/services/message_service.dart';
import 'package:adoptconnect_app/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/message_list.dart';

class MessagesScreen extends StatefulWidget {
  static const String routeName = "/messages";
  const MessagesScreen({super.key});

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  final MessageService messageService = MessageService();

  late Future<bool> messages;

  @override
  void initState() {
    super.initState();
    messages = messageService.getMessages(
      userId: Provider.of<UserProvider>(context, listen: false).user.id,
      context: context,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariables.secondaryColor,
      appBar: AppBar(
        toolbarHeight: 80,
        centerTitle: true,
        title: const Text(
          "Messages",
          style: TextStyle(fontSize: 24),
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(60),
          ),
        ),
      ),
      body: FutureBuilder(
        future: messages,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return const MessageList();
          }
          return Container(
            padding: const EdgeInsets.only(top: 80),
            child: const Center(
              child: CircularProgressIndicator.adaptive(),
            ),
          );
        },
      ),
      extendBodyBehindAppBar: true,
    );
  }
}
