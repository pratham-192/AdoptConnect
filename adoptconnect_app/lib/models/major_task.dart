import 'dart:convert';
import 'package:adoptconnect_app/models/minor_task.dart';

class MajorTask {
  final String majorTaskStatement;
  final int majorTaskStatus;
  final String majorTaskNote;
  final String iterationMethod;
  final int currMinorTask;
  final List<MinorTask> minorTask;

  MajorTask({
    required this.majorTaskStatement,
    required this.majorTaskStatus,
    required this.majorTaskNote,
    required this.iterationMethod,
    required this.currMinorTask,
    required this.minorTask,
  });

  Map<String, dynamic> toMap() {
    return {
      'majorTaskStatement': majorTaskStatement,
      'majorTaskStatus': majorTaskStatus,
      'majorTaskNote': majorTaskNote,
      'iterationMethod': iterationMethod,
      'currMinorTask': currMinorTask,
      'minorTask': minorTask.map((x) => x.toMap()).toList(),
    };
  }

  factory MajorTask.fromMap(Map<String, dynamic> map) {
    return MajorTask(
      majorTaskStatement: map['majorTaskStatement'] ?? '',
      majorTaskStatus: map['majorTaskStatus']?.toInt() ?? 0,
      majorTaskNote: map['majorTaskNote'] ?? '',
      iterationMethod: map['iterationMethod'] ?? '',
      currMinorTask: map['currMinorTask']?.toInt() ?? 0,
      minorTask: List<MinorTask>.from(
          map['minorTask']?.map((x) => MinorTask.fromMap(x))),
    );
  }

  String toJson() => json.encode(toMap());

  factory MajorTask.fromJson(String source) =>
      MajorTask.fromMap(json.decode(source));

  MajorTask copyWith({
    String? majorTaskStatement,
    int? majorTaskStatus,
    String? majorTaskNote,
    String? iterationMethod,
    int? currMinorTask,
    List<MinorTask>? minorTask,
  }) {
    return MajorTask(
      majorTaskStatement: majorTaskStatement ?? this.majorTaskStatement,
      majorTaskStatus: majorTaskStatus ?? this.majorTaskStatus,
      majorTaskNote: majorTaskNote ?? this.majorTaskNote,
      iterationMethod: iterationMethod ?? this.iterationMethod,
      currMinorTask: currMinorTask ?? this.currMinorTask,
      minorTask: minorTask ?? this.minorTask,
    );
  }
}
