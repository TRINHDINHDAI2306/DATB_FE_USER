import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendGet } from "../../../../utils/api";

import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";

export default function ChatContent({ messages, setMessages, socket }) {
  const { chatId } = useParams();

  const messagesEndRef = createRef(null);

  const [profile, setProfile] = useState({ role: "USER" });

  const [msg, setMsg] = useState("");
  const scrollToBottom = () => {
    messagesEndRef.current.scroll({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getProfile = async () => {
      const res = await sendGet("/auth/me");
      console.log(res);
      if (res) {
        setProfile(res.returnValue);
      }
    };

    getProfile();
  }, []);

  const handleChat = () => {
    if (msg !== "") {
      const newChat = {
        message: msg,
        sender: profile.role,
      };
      setMessages((chatItms) => [...chatItms, newChat]);
      setMsg("");

      socket.emit("send-message", { chatId, content: newChat.message });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSendMessage = (message) => {
    if (socket) {
      socket.emit("message", message);
    }
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
            />
            <p>Tim Hover</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body" ref={messagesEndRef}>
        <div className="chat__items">
          {messages.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 1}
                key={index}
                sender={itm.sender || "USER"}
                message={itm.message}
                profile={profile}
              />
            );
          })}
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msg}
          />
          <button
            className="btnSendMsg"
            id="sendMsgBtn"
            onClick={(e) => handleChat(msg)}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
