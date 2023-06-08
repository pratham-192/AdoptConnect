import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ChildCasesScreen extends StatefulWidget {
  static const String routeName = "/home";
  const ChildCasesScreen({super.key});

  @override
  State<ChildCasesScreen> createState() => _ChildCasesScreenState();
}

class _ChildCasesScreenState extends State<ChildCasesScreen> {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context).user;
    return Scaffold(
      backgroundColor: GlobalVariables.secondaryColor,
      appBar: AppBar(
        toolbarHeight: 80,
        centerTitle: true,
        title: const Text(
          "Child Cases",
          style: TextStyle(fontSize: 24),
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(60),
          ),
        ),
      ),
    );
  }
}
