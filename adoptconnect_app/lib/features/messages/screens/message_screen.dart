import 'package:flutter/material.dart';

import '../../../models/message.dart';

class MessageScreen extends StatelessWidget {
  static const String routeName = "/message";
  const MessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final arguments =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    Message message = arguments["message"];

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Message"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(35),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Hero(
              tag: "from_${message.id}",
              transitionOnUserGestures: true,
              child: Material(
                type: MaterialType.transparency,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      message.fromUser.name,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      "  -  ",
                      style: TextStyle(fontSize: 20),
                    ),
                    Text(
                      message.fromUser.category,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 40),
            Hero(
              tag: "content_${message.id}",
              transitionOnUserGestures: true,
              child: Material(
                type: MaterialType.transparency,
                child: Text(
                  message.content,
                  style: const TextStyle(fontSize: 18),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
