import 'package:adoptconnect_app/models/adoption_flow.dart';
import 'package:adoptconnect_app/models/major_task.dart';
import 'package:flutter/material.dart';

class ChildStatus extends StatelessWidget {
  final AdoptionFlow adoptionFlow;
  const ChildStatus({super.key, required this.adoptionFlow});

  @override
  Widget build(BuildContext context) {
    String status;
    Color? statusColor;

    try {
      MajorTask currentTask =
          adoptionFlow.majorTask[adoptionFlow.currMajorTask];
      status = getStatus(currentTask.majorTaskStatus);
      statusColor = getStatusColor(currentTask.majorTaskStatus);
    } catch (e) {
      status = "No data";
      statusColor = Colors.black12;
    }

    return Row(
      children: [
        CircleAvatar(
          radius: 6,
          backgroundColor: statusColor,
        ),
        const SizedBox(width: 4),
        Text(status),
      ],
    );
  }
}

String getStatus(int taskStatus) {
  switch (taskStatus) {
    case 0:
      return "Not Started";
    case 1:
      return "Ongoing";
    case 2:
      return "Completed";
  }

  return "No data";
}

Color? getStatusColor(int taskStatus) {
  switch (taskStatus) {
    case 0:
      return Colors.red;
    case 1:
      return Colors.yellow[700];
    case 2:
      return Colors.green;
  }

  return Colors.black12;
}
