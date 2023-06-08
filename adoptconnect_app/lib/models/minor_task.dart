import 'dart:convert';

class MinorTask {
  final String minorTaskStatement;
  final int minorTaskStatus;
  final String minorTaskNote;

  MinorTask({
    required this.minorTaskStatement,
    required this.minorTaskStatus,
    required this.minorTaskNote,
  });

  Map<String, dynamic> toMap() {
    return {
      'minorTaskStatement': minorTaskStatement,
      'minorTaskStatus': minorTaskStatus,
      'minorTaskNote': minorTaskNote,
    };
  }

  factory MinorTask.fromMap(Map<String, dynamic> map) {
    return MinorTask(
      minorTaskStatement: map['minorTaskStatement'] ?? '',
      minorTaskStatus: map['minorTaskStatus']?.toInt() ?? 0,
      minorTaskNote: map['minorTaskNote'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory MinorTask.fromJson(String source) =>
      MinorTask.fromMap(json.decode(source));

  MinorTask copyWith({
    String? minorTaskStatement,
    int? minorTaskStatus,
    String? minorTaskNote,
  }) {
    return MinorTask(
      minorTaskStatement: minorTaskStatement ?? this.minorTaskStatement,
      minorTaskStatus: minorTaskStatus ?? this.minorTaskStatus,
      minorTaskNote: minorTaskNote ?? this.minorTaskNote,
    );
  }
}
