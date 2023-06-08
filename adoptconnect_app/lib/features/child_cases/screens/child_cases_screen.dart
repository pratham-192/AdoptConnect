import 'dart:convert';

import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/features/child_cases/services/child_service.dart';
import 'package:adoptconnect_app/providers/cases_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ChildCasesScreen extends StatefulWidget {
  static const String routeName = "/home";
  const ChildCasesScreen({super.key});

  @override
  State<ChildCasesScreen> createState() => _ChildCasesScreenState();
}

class _ChildCasesScreenState extends State<ChildCasesScreen> {
  final ChildService childService = ChildService();

  @override
  void initState() {
    super.initState();
    childService.getAllCasesofWorker(context: context);
  }

  @override
  Widget build(BuildContext context) {
    final cases = Provider.of<CasesProvider>(context).cases;
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
      body: cases.isEmpty
          ? const Center(
              child: CircularProgressIndicator.adaptive(),
            )
          : ListView.separated(
              separatorBuilder: (_, __) => const SizedBox(
                    height: 20,
                  ),
              itemCount: cases.length,
              itemBuilder: (context, index) {
                return Text(cases[index].childId);
              }),
      extendBodyBehindAppBar: true,
    );
  }
}
