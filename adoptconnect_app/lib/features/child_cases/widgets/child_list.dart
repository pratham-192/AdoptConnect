import 'package:adoptconnect_app/features/child_cases/widgets/child_list_item.dart';
import 'package:adoptconnect_app/providers/cases_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ChildList extends StatefulWidget {
  const ChildList({super.key});

  @override
  State<ChildList> createState() => _ChildListState();
}

class _ChildListState extends State<ChildList> {
  @override
  Widget build(BuildContext context) {
    final cases = Provider.of<CasesProvider>(context).cases +
        Provider.of<CasesProvider>(context).cases +
        Provider.of<CasesProvider>(context).cases +
        Provider.of<CasesProvider>(context).cases +
        Provider.of<CasesProvider>(context).cases;
    return cases.isEmpty
        ? const Center(
            child: CircularProgressIndicator.adaptive(),
          )
        : Scrollbar(
          child: ListView.separated(
              separatorBuilder: (_, __) => const SizedBox(
                    height: 25,
                  ),
              padding: const EdgeInsets.symmetric(horizontal: 35.0),
              itemCount: cases.length,
              itemBuilder: (context, index) {
                if (index == 0) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const SizedBox(height: 170),
                      ChildListItem(
                        child: cases[index],
                      ),
                    ],
                  );
                }
                return ChildListItem(
                  child: cases[index],
                );
              }),
        );
  }
}
