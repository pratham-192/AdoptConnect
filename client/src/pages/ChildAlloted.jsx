import React, { useState } from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChildAlloted = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category={t("App")} title={t("Child Details")} />
      <div className="mt-12 flex flex-col justify-center">
        <div className="pl-3 text-lg font-bold">{t("Child Allocated")}</div>
        <ul class="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <li class="py-4 sm:py-6">
            <div class="flex items-center space-x-4 capitalize">
              <div class="flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Neil Sims
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  Bal Asha, New Delhi
                </p>
              </div>
              <div class="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                surrendered
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChildAlloted;
