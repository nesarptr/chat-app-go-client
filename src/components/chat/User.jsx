import React from "react";

// @ts-ignore
import chatImage from "../../assets/chat.png";

export default function User({ user, onTap }) {
  return (
    <li
      className="flex cursor-pointer flex-col items-center border-b border-gray-700 p-4 lg:flex-row"
      onClick={() => onTap(user)}
    >
      <img
        className="w-16 rounded-full"
        src={chatImage}
        alt={
          // @ts-ignore
          user.username
        }
      />
      <div className="hidden flex-1 sm:block">
        <p className="font-medium">
          {
            // @ts-ignore
            user.username
          }
        </p>
        <p className="text-gray-500">
          {
            // @ts-ignore
            user?.latestMessage || "No Message Found from this user"
          }
        </p>
      </div>
    </li>
  );
}
