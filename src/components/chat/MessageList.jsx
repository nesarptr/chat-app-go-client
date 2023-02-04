import React from "react";

import Message from "./Message";

export default function MessageList({ messages, user, selectedUser }) {
  return (
    <ul className="flex h-[31rem] flex-col-reverse overflow-y-auto p-4">
      {messages.map((message) => (
        <Message
          key={
            // @ts-ignore
            message.ID
          }
          message={message}
          user={user}
          selectedUser={selectedUser}
        />
      ))}
    </ul>
  );
}
