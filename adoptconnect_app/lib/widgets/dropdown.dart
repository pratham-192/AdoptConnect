// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

class Dropdown extends StatefulWidget {
  final String labelText;
  final List<dynamic> items;
  final dynamic dropdownValue;
  final Function updateDropdownValue;
  final bool enabled;

  const Dropdown(
      {Key? key,
      required this.labelText,
      required this.items,
      required this.dropdownValue,
      required this.updateDropdownValue,
      this.enabled = true})
      : super(key: key);

  @override
  State<Dropdown> createState() => _DropdownState();
}

class _DropdownState extends State<Dropdown> {
  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField(
      value: widget.dropdownValue,
      onChanged: widget.enabled
          ? (value) => widget.updateDropdownValue(value)
          : null,
      hint: Text(widget.labelText),
      decoration: InputDecoration(
        enabled: widget.enabled,
        labelText: widget.labelText,
        filled: true,
        fillColor: Colors.white,
        border: const OutlineInputBorder(),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 10, vertical: 12),
      ),
      items: widget.items
          .map(
            (item) => DropdownMenuItem(
              value: item,
              child: Text(item),
            ),
          )
          .toList(),
    );
  }
}
