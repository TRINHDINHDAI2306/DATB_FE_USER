import React, { useEffect, useState } from "react";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function ChatBody() {
  const [socket, setSocket] = useState();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { chatId } = useParams();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_WEB_SOCKET_DOMAIN || "", {
      path: "/chat",
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: localStorage.accessToken,
          },
        },
      },
    });

    socket.on("connect", () => {
      console.log("connected!");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("receive-users", (users) => {
        setUsers(users);
      });
      socket.on("receive-messages", (msgs) => {
        const newMessages = [...messages, ...msgs];
        setMessages(newMessages);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("receive-users");
        socket.off("receive-messages");
      }
    };
  }, [socket, messages, users]);

  useEffect(() => {
    if (socket) {
      socket.emit("get-users", { chatId });
      socket.emit("get-messages", { chatId });
      socket.emit("join-room", { chatId });
    }
  }, [socket, chatId]);

  return (
    <div className="main__chatbody">
      <ChatList users={users} />
      <ChatContent
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
    </div>
  );
}
