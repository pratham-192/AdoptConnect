import "package:flutter/material.dart";

class InputText extends StatefulWidget {
  const InputText(
      {Key? key,
      required this.labelText,
      required this.controller,
      this.isPassword = false,
      this.validate = false,
      this.errorText = ""})
      : super(key: key);

  final String labelText;
  final TextEditingController controller;
  final bool isPassword;
  final bool validate;
  final String errorText;

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

  @override
  Widget build(BuildContext context) {
    return Material(
      child: TextFormField(
        textInputAction: TextInputAction.next,
        decoration: InputDecoration(
          labelText: widget.labelText,
          errorText: widget.errorText == "" ? null : widget.errorText,
          filled: true,
          fillColor: Colors.white,
          border: const OutlineInputBorder(),
          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 14),
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