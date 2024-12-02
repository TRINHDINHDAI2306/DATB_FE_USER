import React from "react";
import Avatar from "../chatList/Avatar";

export default function ChatItem(props) {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${
        props.sender === props.profile?.role ? "me" : "participant"
      }`}
    >
      <div
        className={`chat__item__content ${
          props.sender === props.profile?.role
            ? "chat__item__content_me"
            : "chat__item__content_participant"
        }`}
      >
        <div className={`chat__msg`}>{props.message}</div>
        <div className="chat__meta">
          {/* <span>16 mins ago</span>
          <span>Seen 1.03PM</span> */}
        </div>
      </div>
      <Avatar isOnline="active" image={props.image} />
    </div>
  );
}
