import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Messages = () => {
  const [allMessages, setallMessages] = useState({});
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(async () => {
    if (user.category === "admin") {
      const response = await axios.post(
        "http://localhost:3000/admin/message/get_message",
        {
          from_user_id: JSON.parse(localStorage.getItem("userDetails"))._id,
        }
      );
      console.log(response.data);
      setallMessages(response.data.response);
    } else {
      const response = await axios.post(
        "http://localhost:3000/users/get_messages",
        {
          to_user_id: JSON.parse(localStorage.getItem("userDetails"))._id,
        }
      );
      console.log(response.data);
      setallMessages(response.data.response);
    }
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl capitalize">
      {user.category === "admin" ? (
        <Header category={t("Apps")} title={t("Messages Sent")} />
      ) : (
        <Header category={t("Apps")} title={t("Messages Received")} />
      )}
      <ul class="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {allMessages && allMessages.length
          ? allMessages.map((message) => {
              return (
                <li class="py-4 sm:py-6">
                  <div class="flex items-center space-x-4 capitalize">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {message.content}
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.category === "admin"
                          ? message.to_user.name
                          : message.from_user.name}
                      </p>
                    </div>
                    <div class="inline-flex items-center text-sm text-base text-gray-900 dark:text-white">
                      {new Date(message.createdAt).toLocaleTimeString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                      {", "}
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};
export default Messages;
