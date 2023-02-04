import React from "react";

export default function MessageForm({ onMessageSend, selectedUser }) {
  const [message, setMessage] = React.useState("");

  return (
    <form
      className="flex w-full p-2 "
      onSubmit={(e) => {
        e.preventDefault();
        if (message.trim().length === 0 || !selectedUser) return;
        onMessageSend({
          to: selectedUser.username,
          content: message,
        });
        setMessage("");
      }}
    >
      <input
        className="mr-2 flex-1 border border-gray-500 p-2"
        placeholder="Type your message here"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button type="submit" className="p-1">
        ▶
      </button>
    </form>
  );
}
