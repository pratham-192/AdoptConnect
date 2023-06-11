import 'package:adoptconnect_app/features/child_cases/screens/add_child_screen.dart';
import 'package:adoptconnect_app/features/child_cases/screens/child_cases_screen.dart';
import 'package:adoptconnect_app/features/child_cases/screens/child_profile_screen.dart';
import 'package:adoptconnect_app/features/messages/screens/messages_screen.dart';
import 'package:adoptconnect_app/features/worker_profile/screens/worker_profile.dart';
import 'package:adoptconnect_app/widgets/bottom_bar.dart';
import 'package:flutter/material.dart';
import 'features/auth/screens/auth_screen.dart';
import 'features/messages/screens/message_screen.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case AuthScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AuthScreen(),
      );
    case ChildCasesScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const ChildCasesScreen(),
      );
    case ChildProfileScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const ChildProfileScreen(),
      );
    case AddChildScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AddChildScreen(),
      );
    case WorkerProfile.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const WorkerProfile(),
      );
    case MessagesScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const MessagesScreen(),
      );
    case MessageScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const MessageScreen(),
      );
    case BottomBar.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const BottomBar(),
      );
    default:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const Scaffold(
          body: Center(
            child: Text("Screen does not exist!"),
          ),
        ),
      );
  }
}
