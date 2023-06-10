import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/features/child_cases/screens/add_child_screen.dart';
import 'package:adoptconnect_app/features/child_cases/services/child_service.dart';
import 'package:flutter/material.dart';
import 'package:adoptconnect_app/features/child_cases/widgets/child_list.dart';

class ChildCasesScreen extends StatefulWidget {
  static const String routeName = "/home";
  const ChildCasesScreen({super.key});

  @override
  State<ChildCasesScreen> createState() => _ChildCasesScreenState();
}

class _ChildCasesScreenState extends State<ChildCasesScreen> {
  final ChildService childService = ChildService();

  late Future<bool> cases;

  @override
  void initState() {
    super.initState();
    cases = childService.getAllCasesofWorker(context: context);
  }

  @override
  Widget build(BuildContext context) {
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
      floatingActionButton: FloatingActionButton(
        backgroundColor: GlobalVariables.primaryColor,
        tooltip: "Add Child",
        onPressed: () {
          Navigator.pushNamed(context, AddChildScreen.routeName);
        },
        child: const Icon(
          Icons.add,
          color: Colors.white,
          size: 34,
        ),
      ),
      body: FutureBuilder(
        future: cases,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return const ChildList();
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
