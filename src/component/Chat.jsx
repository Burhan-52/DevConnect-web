import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/slice/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constant";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);

  const [message, setMessage] = useState([]);
  const [newMesage, setNewMessage] = useState("");

  const userId = user?.data?._id;

  const firstName = user?.data.firstName;
  const lastName = user?.data.lastName;
  // const firstName = user?.data?.lastName;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessage((message) => [...message, { firstName, lastName, text }]);
      setNewMessage("");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMesage,
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getMessage = async () => {
    const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const createchat = res.data.data.message.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId.firstName,
        lastName: senderId.lastName,
        text,
      };
    });

    setMessage(createchat);

    console.log(res);
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className="border border-red-200 h-[70vh] w-1/2 mx-auto my-5 bg-base-300 flex flex-col">
      <div className="border-b  border-red-200 p-3 text-xl font-bold">Chat</div>
      <div className="flex-1 overflow-auto p-5">
        {message.map((msg, index) => {
          let checkName =
            msg.firstName === firstName && msg.lastName === lastName;
          return (
            <div
              key={index}
              className={`chat  ${checkName ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header">
                {checkName ? "You" : `${msg.firstName} ${msg.lastName} `}{" "}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center border-t border-red-200 p-4 gap-3">
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary flex-1"
          value={newMesage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
