import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";

import Avatar from "./Avatar";

export default function ChatList({ users }) {
  const history = useHistory();

  const { infoUser } = useContext(AppContext);

  const selectChat = (e, id) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    history.push(`/chat/${id}`);
  };

  return (
    <div className="main__chatlist">
      {/* <button className="btn">
        <i className="fa fa-plus"></i>
        <span>New conversation</span>
      </button> */}
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {users.map((item, index) => {
          const chattedUser =
            infoUser.role === "USER" ? item.tourGuide : item.user;
            console.log(chattedUser);
          const id = infoUser.role === "USER" ? item.tourGuideId : item.userId;

          return (
            <div
              style={{ animationDelay: `0.${item.animationDelay}s` }}
              onClick={(e) => selectChat(e, id)}
              className={`chatlist__item ${item.active ? item.active : ""} `}
              key={index}
            >
              <Avatar
                image={
                  chattedUser?.avatar
                    ? chattedUser?.avatar
                    : "http://placehold.it/80x80"
                }
                isOnline={item.isOnline}
              />

              <div className="userMeta">
                <p>{chattedUser?.name}</p>
                {/* <span className="activeTime">32 mins ago</span> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
