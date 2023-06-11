import 'package:flutter/material.dart';

import '../../../constants/global_variables.dart';
import '../../../models/message.dart';
import '../screens/message_screen.dart';

class MessageListItem extends StatefulWidget {
  final Message message;
  const MessageListItem({super.key, required this.message});

  @override
  State<MessageListItem> createState() => _MessageListItemState();
}

class _MessageListItemState extends State<MessageListItem> {
  void openMessage() {
    Navigator.pushNamed(context, MessageScreen.routeName,
        arguments: {"message": widget.message});
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: openMessage,
      child: Container(
        height: 90,
        decoration: BoxDecoration(
          color: widget.message.seen > 0
              ? GlobalVariables.backgroundColor
              : Colors.grey[200],
          borderRadius: const BorderRadius.all(Radius.circular(8)),
          boxShadow: const [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 10,
              blurStyle: BlurStyle.outer,
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Hero(
                tag: "from_${widget.message.id}",
                transitionOnUserGestures: true,
                child: Material(
                  type: MaterialType.transparency,
                  child: Row(
                    children: [
                      Text(
                        widget.message.fromUser.name,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Text(
                        "  -  ",
                        style: TextStyle(fontSize: 16),
                      ),
                      Text(
                        widget.message.fromUser.category,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Hero(
                tag: "content_${widget.message.id}",
                transitionOnUserGestures: true,
                child: Material(
                  type: MaterialType.transparency,
                  child: Text(
                    widget.message.content,
                    overflow: TextOverflow.ellipsis,
                    maxLines: 2,
                    style: const TextStyle(fontSize: 15),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
