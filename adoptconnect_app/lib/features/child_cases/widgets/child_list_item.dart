import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/models/child.dart';
import 'package:flutter/material.dart';
import 'child_status.dart';
import 'child_avatar.dart';

class ChildListItem extends StatefulWidget {
  final Child child;
  const ChildListItem({super.key, required this.child});

  @override
  State<ChildListItem> createState() => _ChildListItemState();
}

class _ChildListItemState extends State<ChildListItem> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 90,
      decoration: const BoxDecoration(
        color: GlobalVariables.backgroundColor,
        borderRadius: BorderRadius.all(Radius.circular(8)),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 10,
            blurStyle: BlurStyle.outer,
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
        child: Row(
          children: [
            ChildAvatar(avatar: widget.child.avatar),
            const SizedBox(
              width: 15,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.child.childId,
                  style: const TextStyle(
                      fontSize: 16, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 3),
                Text(
                  widget.child.childName,
                  style: const TextStyle(fontSize: 15),
                ),
                const SizedBox(height: 3),
                ChildStatus(
                  adoptionFlow: widget.child.individualAdoptionFlow,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
