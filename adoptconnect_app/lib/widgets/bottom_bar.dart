import 'package:adoptconnect_app/constants/global_variables.dart';
import 'package:adoptconnect_app/features/child_cases/screens/child_cases_screen.dart';
import 'package:adoptconnect_app/features/messages/screens/messages_screen.dart';
import 'package:adoptconnect_app/features/messages/services/message_service.dart';
import 'package:adoptconnect_app/features/worker_profile/screens/worker_profile.dart';
import 'package:adoptconnect_app/providers/cases_provider.dart';
import 'package:adoptconnect_app/providers/messages_provider.dart';
import 'package:flutter/material.dart';
import 'package:badges/badges.dart' as badges;
import 'package:provider/provider.dart';

import '../constants/connectivity.dart';
import '../providers/user_provider.dart';

class BottomBar extends StatefulWidget {
  static const String routeName = 'actual-home';
  const BottomBar({super.key});

  @override
  State<BottomBar> createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  int _page = 1;
  MessageService messageService = MessageService();

  List<Widget> pages = [
    const WorkerProfile(),
    const ChildCasesScreen(),
    const MessagesScreen(),
  ];

  void updatePage(int page) {
    setState(() => _page = page);
  }

  @override
  void initState() {
    super.initState();
    globalContext = context;
    messageService.getMessages(
      userId: Provider.of<UserProvider>(context, listen: false).user.id,
      context: context,
    );
    syncData();
  }

  @override
  Widget build(BuildContext context) {
    int casesCount = Provider.of<CasesProvider>(context).cases.length;
    int messagesCount = Provider.of<MessagesProvider>(context).messages.length;

    return Scaffold(
      body: pages[_page],
      bottomNavigationBar: BottomNavigationBar(
        onTap: updatePage,
        currentIndex: _page,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.white,
        backgroundColor: GlobalVariables.primaryColor,
        showSelectedLabels: true,
        showUnselectedLabels: false,
        iconSize: 30,
        items: [
          const BottomNavigationBarItem(
            icon: Icon(Icons.account_circle_outlined),
            activeIcon: Icon(Icons.account_circle),
            label: 'Profile',
          ),
          BottomNavigationBarItem(
            icon: badges.Badge(
              badgeContent: Text(
                '$casesCount',
                style: const TextStyle(color: Colors.white, fontSize: 12),
              ),
              badgeStyle: const badges.BadgeStyle(
                elevation: 0,
              ),
              child: const Icon(Icons.person_outlined),
            ),
            activeIcon: badges.Badge(
              badgeContent: Text(
                '$casesCount',
                style: const TextStyle(color: Colors.white, fontSize: 12),
              ),
              badgeStyle: const badges.BadgeStyle(
                elevation: 0,
              ),
              child: const Icon(Icons.person),
            ),
            label: 'Cases',
          ),
          BottomNavigationBarItem(
            icon: badges.Badge(
              badgeContent: Text(
                '$messagesCount',
                style: const TextStyle(color: Colors.white, fontSize: 12),
              ),
              badgeStyle: const badges.BadgeStyle(
                elevation: 0,
              ),
              child: const Icon(Icons.messenger_outline),
            ),
            activeIcon: badges.Badge(
              badgeContent: Text(
                '$messagesCount',
                style: const TextStyle(color: Colors.white, fontSize: 12),
              ),
              badgeStyle: const badges.BadgeStyle(
                elevation: 0,
              ),
              child: const Icon(Icons.messenger),
            ),
            label: 'Messages',
          ),
        ],
      ),
    );
  }
}
