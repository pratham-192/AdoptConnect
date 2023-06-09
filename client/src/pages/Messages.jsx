import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { TiTick } from "react-icons/ti";

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
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {allMessages && allMessages.length
          ? allMessages.map((message, index) => {
              return (
                <li className="py-2 sm:py-4" key={index}>
                  <div
                    className={`flex sm:py-2 px-3 rounded py-1 items-center space-x-4 capitalize ${
                      message.seen ? "bg-slate-50" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {message.content}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.category === "admin"
                          ? message.to_user.name
                          : message.from_user.name}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-base text-gray-900 dark:text-white">
                      <span
                        className={`pr-3 ${
                          message.seen ? "text-blue-500" : "text-slate-700"
                        }`}
                      >
                        <TiTick size={22} />
                      </span>
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
