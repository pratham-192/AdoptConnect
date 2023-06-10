import 'dart:io';

import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/constants/utils.dart';
import 'package:adoptconnect_app/features/worker_profile/services/worker_services.dart';
import 'package:adoptconnect_app/models/user.dart';
import 'package:adoptconnect_app/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../widgets/text_input.dart';
import '../../child_cases/widgets/child_avatar.dart';

class WorkerProfile extends StatefulWidget {
  static const String routeName = "/profile";
  const WorkerProfile({super.key});

  @override
  State<WorkerProfile> createState() => _WorkerProfileState();
}

class _WorkerProfileState extends State<WorkerProfile> {
  final _formKey = GlobalKey<FormState>();
  bool _isEditMode = false;
  File? avatarImage;
  late User _user;
  final WorkerService _workerService = WorkerService();

  final _userIdController = TextEditingController();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  void selectImage() async {
    var res = await pickImage();
    setState(() {
      if (res != null) {
        avatarImage = res;
      }
    });
  }

  void editWorker() {
    if (!_formKey.currentState!.validate()) return;
    _workerService.editWorker(
      userId: _userIdController.text,
      name: _nameController.text,
      email: _emailController.text,
      password: _passwordController.text,
      avatar: avatarImage == null ? _user.avatar : {"data": avatarImage},
      context: context,
    );
    setState(() => _isEditMode = !_isEditMode);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _user = Provider.of<UserProvider>(context).user;
    _userIdController.text = _user.userId;
    _nameController.text = _user.name;
    _emailController.text = _user.email;
    _passwordController.text = _user.password;
  }

  @override
  void dispose() {
    _userIdController.dispose();
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariables.secondaryColor,
      appBar: AppBar(
        centerTitle: true,
        title: _isEditMode ? const Text("Edit Profile") : const Text("Profile"),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor:
            _isEditMode ? Colors.red : GlobalVariables.primaryColor,
        tooltip: "Add Child",
        onPressed: () => setState(() => _isEditMode = !_isEditMode),
        child: Icon(
          _isEditMode ? Icons.close : Icons.edit,
          color: Colors.white,
          size: 34,
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(35),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ChildAvatar(
                      avatar: avatarImage == null
                          ? _user.avatar
                          : {"data": avatarImage?.readAsBytesSync()},
                      isProfile: true,
                    ),
                    const SizedBox(width: 15),
                    Container(
                        child: _isEditMode
                            ? ElevatedButton(
                                onPressed: selectImage,
                                child: const Text("Upload Image"),
                              )
                            : null),
                  ],
                ),
                const SizedBox(height: 20),
                InputText(
                  labelText: "User Id",
                  controller: _userIdController,
                  validate: true,
                  enabled: false,
                ),
                const SizedBox(height: 15),
                InputText(
                  labelText: "Name",
                  controller: _nameController,
                  validate: true,
                  enabled: _isEditMode,
                ),
                const SizedBox(height: 15),
                InputText(
                  labelText: "Email",
                  controller: _emailController,
                  validate: true,
                  enabled: _isEditMode,
                ),
                const SizedBox(height: 15),
                InputText(
                  labelText: "Password",
                  controller: _passwordController,
                  isPassword: true,
                  validate: true,
                  enabled: _isEditMode,
                ),
                const SizedBox(height: 30),
                Container(
                  child: !_isEditMode
                      ? null
                      : ElevatedButton(
                          onPressed: editWorker,
                          style: ElevatedButton.styleFrom(
                              minimumSize: const Size(double.infinity, 40),
                              padding: const EdgeInsets.symmetric(vertical: 14)),
                          child: const Text(
                            "Submit",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
