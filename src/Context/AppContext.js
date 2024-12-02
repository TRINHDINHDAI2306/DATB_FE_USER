import { React, createContext, useEffect, useState } from "react";
import { sendGet } from "../utils/api";
import { message } from "antd";
import { setItem } from "../utils/storage";
export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [provice, setProvice] = useState([]);
  const [infoUser, setInfo] = useState({});
  const Token = localStorage.getItem("accessToken");
  const allChatUsers = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      id: 1,
      name: "Tim Hover",
      active: true,
      isOnline: true,
      chatItms: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          type: "",
          msg: "Hi Tim, How are you?",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
          type: "other",
          msg: "I am fine.",
        },
      ],
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      id: 2,
      name: "Ayub Rossi",
      active: false,
      isOnline: false,
      chatItms: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          type: "",
          msg: "Hi Tim, How are you?",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
          type: "other",
          msg: "I am fine.",
        },
      ],
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      id: 3,
      name: "Hamaad Dejesus",
      active: false,
      isOnline: false,
      chatItms: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          type: "",
          msg: "Hi Tim, How are you?",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
          type: "other",
          msg: "I am fine.",
        },
      ],
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
      id: 4,
      name: "Eleni Hobbs",
      active: false,
      isOnline: true,
      chatItms: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          type: "",
          msg: "Hi Tim, How are you?",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
          type: "other",
          msg: "I am fine.",
        },
      ],
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
      id: 5,
      name: "Elsa Black",
      active: false,
      isOnline: false,
      chatItms: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          type: "",
          msg: "Hi Tim, How are you?",
        },
        {
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
          type: "other",
          msg: "I am fine.",
        },
      ],
    },
  ];
  const getProvice = async () => {
    let respon = await sendGet("/provinces");
    if (respon.returnValue.length >= 0) {
      setProvice(respon.returnValue);
    } else {
      message.error("thất bại");
    }
  };

  const getInfoUser = async () => {
    if (Token) {
      let res = await sendGet("/auth/me");
      if (res.statusCode === 200) {
        setInfo(res.returnValue);
        setItem("user", JSON.stringify(res?.returnValue));
      } else {
        message.error("thất bại");
      }
    }
  };
  useEffect(() => {
    getProvice();
    getInfoUser();
  }, []);
  const [data, setData] = useState([]);
  return (
    <AppContext.Provider
      value={{ allChatUsers, data, setData, provice, infoUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
