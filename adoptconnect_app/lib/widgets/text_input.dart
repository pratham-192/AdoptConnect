import "package:flutter/material.dart";
import 'package:intl/intl.dart';

class InputText extends StatefulWidget {
  const InputText(
      {Key? key,
      required this.labelText,
      required this.controller,
      this.isPassword = false,
      this.isDate = false,
      this.validate = false,
      this.errorText = "",
      this.keyboardType = TextInputType.text,
      this.enabled = true})
      : super(key: key);

  final String labelText;
  final TextEditingController controller;
  final bool isPassword;
  final bool isDate;
  final bool validate;
  final String errorText;
  final TextInputType keyboardType;
  final bool enabled;

  @override
  State<InputText> createState() => _InputTextState();
}

class _InputTextState extends State<InputText> {
  RegExp emailRegex = RegExp(
      r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+");

  bool _passwordVisible = false;

  @override
  void initState() {
    _passwordVisible = false;
    super.initState();
  }

  void updateDate() async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );

    if (pickedDate != null) {
      setState(() {
        widget.controller.text = DateFormat('yyyy-MM-dd').format(pickedDate);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: TextFormField(
        enabled: widget.enabled,
        readOnly: widget.isDate,
        showCursor: widget.isDate ? true : null,
        textInputAction: TextInputAction.next,
        keyboardType: widget.keyboardType,
        decoration: InputDecoration(
          labelText: widget.labelText,
          errorText: widget.errorText == "" ? null : widget.errorText,
          filled: true,
          fillColor: Colors.white,
          border: const OutlineInputBorder(),
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 10, vertical: 14),
          prefixIcon: widget.isDate
              ? const Icon(
                  Icons.calendar_today_rounded,
                )
              : null,
          suffixIcon: widget.isPassword
              ? IconButton(
                  onPressed: () {
                    setState(() {
                      _passwordVisible = !_passwordVisible;
                    });
                  },
                  icon: _passwordVisible
                      ? const Icon(Icons.visibility_rounded)
                      : const Icon(Icons.visibility_off_rounded),
                )
              : null,
        ),
        onTap: (widget.enabled && widget.isDate) ? updateDate : null,
        obscureText: widget.isPassword && !_passwordVisible,
        controller: widget.controller,
        validator: (value) {
          if (!widget.validate) {
            return null;
          }
          if (value == null || value.isEmpty) {
            return "Please enter your ${widget.labelText.toLowerCase()}";
          }

          if (widget.labelText.toLowerCase() == "email" &&
              !emailRegex.hasMatch(value)) {
            return "Invalid email";
          }

          return null;
        },
      ),
    );
  }
}
