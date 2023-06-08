import 'dart:convert';
import 'package:adoptconnect_app/models/major_task.dart';

class AdoptionFlow {
  final int currMajorTask;
  final List<MajorTask> majorTask;
  AdoptionFlow({
    required this.currMajorTask,
    required this.majorTask,
  });

  Map<String, dynamic> toMap() {
    return {
      'currMajorTask': currMajorTask,
      'majorTask': majorTask.map((x) => x.toMap()).toList(),
    };
  }

  factory AdoptionFlow.fromMap(Map<String, dynamic> map) {
    return AdoptionFlow(
      currMajorTask: map['currMajorTask']?.toInt() ?? 0,
      majorTask: List<MajorTask>.from(
          map['majorTask']?.map((x) => MajorTask.fromMap(x))),
    );
  }

  String toJson() => json.encode(toMap());

  factory AdoptionFlow.fromJson(String source) =>
      AdoptionFlow.fromMap(json.decode(source));
  AdoptionFlow copyWith({
    int? currMajorTask,
    List<MajorTask>? majorTask,
  }) {
    return AdoptionFlow(
      currMajorTask: currMajorTask ?? this.currMajorTask,
      majorTask: majorTask ?? this.majorTask,
    );
  }
}
