import 'dart:convert';
import 'package:adoptconnect_app/models/user.dart';

class Message {
  final String id;
  final User fromUser;
  final User toUser;
  final String content;
  final int seen;

  Message({
    required this.id,
    required this.fromUser,
    required this.toUser,
    required this.content,
    required this.seen,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'fromUser': fromUser.toMap(),
      'toUser': toUser.toMap(),
      'content': content,
      'seen': seen,
    };
  }

  factory Message.fromMap(Map<String, dynamic> map) {
    return Message(
      id: map['_id'] ?? '',
      fromUser: User.fromMap(map['from_user'] ?? {} as Map<String, dynamic>),
      toUser: User.fromMap(map['to_user'] ?? {} as Map<String, dynamic>),
      content: map['content'] ?? '',
      seen: map['seen'] as int,
    );
  }

  String toJson() => json.encode(toMap());

  factory Message.fromJson(String source) =>
      Message.fromMap(json.decode(source) as Map<String, dynamic>);

  Message copyWith({
    String? id,
    User? fromUser,
    User? toUser,
    String? content,
    int? seen,
  }) {
    return Message(
      id: id ?? this.id,
      fromUser: fromUser ?? this.fromUser,
      toUser: toUser ?? this.toUser,
      content: content ?? this.content,
      seen: seen ?? this.seen,
    );
  }
}
