import 'dart:convert';
import 'package:adoptconnect_app/models/child.dart';

class User {
  final String id;
  final String userId;
  final String name;
  final String email;
  final String password;
  final String category;
  final List<Child> allotedChildren;
  final String zone;
  final String address;
  final String aadharCardNo;
  final int contactNo;

  User({
    required this.id,
    required this.userId,
    required this.name,
    required this.email,
    required this.password,
    required this.category,
    required this.allotedChildren,
    required this.zone,
    required this.address,
    required this.aadharCardNo,
    required this.contactNo,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'name': name,
      'email': email,
      'password': password,
      'category': category,
      'allotedChildren': allotedChildren,
      'zone': zone,
      'address': address,
      'aadharCardNo': aadharCardNo,
      'contactNo': contactNo,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['_id'] ?? '',
      userId: map['user_id'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      password: map['password'] ?? '',
      category: map['category'] ?? '',
      allotedChildren: List<Child>.from(map['alloted_children']),
      zone: map['zone'] ?? '',
      address: map['address'] ?? '',
      aadharCardNo: map['aadharCardNo'] ?? '',
      contactNo: map['contactNo']?.toInt() ?? 0,
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  User copyWith({
    String? id,
    String? userId,
    String? name,
    String? email,
    String? password,
    String? category,
    List<Child>? allotedChildren,
    String? zone,
    String? address,
    String? aadharCardNo,
    int? contactNo,
  }) {
    return User(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      name: name ?? this.name,
      email: email ?? this.email,
      password: password ?? this.password,
      category: category ?? this.category,
      allotedChildren: allotedChildren ?? this.allotedChildren,
      zone: zone ?? this.zone,
      address: address ?? this.address,
      aadharCardNo: aadharCardNo ?? this.aadharCardNo,
      contactNo: contactNo ?? this.contactNo,
    );
  }
}
