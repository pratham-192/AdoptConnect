import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../providers/messages_provider.dart';
import '../widgets/message_list_item.dart';

class MessageList extends StatelessWidget {
  const MessageList({super.key});

  @override
  Widget build(BuildContext context) {
    final messages = Provider.of<MessagesProvider>(context).messages;
    return messages.isEmpty
        ? Container(
            padding: const EdgeInsets.only(top: 80),
            child: const Center(
              child: Text(
                "No Messages!",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          )
        : Scrollbar(
            child: ListView.separated(
                separatorBuilder: (_, __) => const SizedBox(
                      height: 25,
                    ),
                padding: const EdgeInsets.symmetric(horizontal: 35.0),
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  if (index == 0) {
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const SizedBox(height: 150),
                        MessageListItem(
                          message: messages[index],
                        ),
                      ],
                    );
                  }
                  return MessageListItem(
                    message: messages[index],
                  );
                }),
          );
  }
}
