import 'package:adoptconnect_app/models/adoption_flow.dart';
import 'package:adoptconnect_app/models/major_task.dart';
import 'package:flutter/material.dart';

class ChildStatus extends StatelessWidget {
  final AdoptionFlow adoptionFlow;
  const ChildStatus({super.key, required this.adoptionFlow});

  @override
  Widget build(BuildContext context) {
    try {
      MajorTask currentTask =
          adoptionFlow.majorTask[adoptionFlow.currMajorTask];
      return Text(getStatus(currentTask.majorTaskStatus));
    } catch (e) {
      return const Text("No data");
    }
  }
}

String getStatus(int taskStatus) {
  switch (taskStatus) {
    case 0:
      return "Not Started";
    case 1:
      return "Ongoing";
    case 2:
      return "Adopted";
  }

  return "No data";
}
