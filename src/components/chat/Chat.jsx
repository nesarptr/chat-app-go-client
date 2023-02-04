import React, { useState, useContext, useEffect } from "react";

import { connect, sendMsg } from "../../socket";
import axios from "../../axiosConfig";
import UserList from "./UserList";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "../ui/LoadingSpinner";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState({});
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/auth/users");
        setUsers(
          res.data.reduce((acc, cur) => {
            acc[cur.username] = { ...cur };
            return acc;
          }, {})
        );
        connect(onMessage);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getMessages = async (from) => {
    try {
      setMessagesLoading(true);
      const res = await axios.get(`/auth/${from}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setMessagesLoading(false);
    }
  };

  function onMessage(msg) {
    // @ts-ignore
    setMessages((msgs) => [msg, ...msgs]);
    setUsers((users) => {
      const newUsers = { ...users };
      if (newUsers[msg.to]) {
        newUsers[msg.to].latestMessage = msg.content;
      }
      if (newUsers[msg.from]) {
        newUsers[msg.from].latestMessage = msg.content;
      }
      return newUsers;
    });
  }

  const handleUserClick = (user) => {
    getMessages(user.username);
    setSelectedUser(user);
  };

  return (
    <div className="flex h-full">
      {loading ? (
        <div className="self-start pl-8 pt-8">
          <LoadingSpinner />
        </div>
      ) : (
        <UserList onTap={handleUserClick} users={users} />
      )}
      <div className="flex h-full w-3/5 flex-col justify-between">
        {selectedUser && (
          <>
            <div className="bg-gray-800 px-4 py-2">
              <p className="font-medium text-white">
                {
                  // @ts-ignore
                  selectedUser.username
                }
              </p>
            </div>
            {messagesLoading ? (
              <LoadingSpinner />
            ) : (
              <div>
                <MessageList
                  messages={messages}
                  user={user}
                  selectedUser={selectedUser}
                />
                <MessageForm
                  onMessageSend={sendMsg}
                  selectedUser={selectedUser}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
