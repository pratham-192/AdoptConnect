import 'package:flutter/material.dart';

class AddChildScreen extends StatefulWidget {
  static const routeName = "/add-child";
  const AddChildScreen({super.key});

  @override
  State<AddChildScreen> createState() => _AddChildScreenState();
}

class _AddChildScreenState extends State<AddChildScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Add Child"),
      ),
      body: const Center(
        child: Text("Add Child"),
      ),
    );
  }
}
