/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import AddContact from "@/component/addContact";
import Chatbox from "@/component/chatbox";
import Navbar from "@/component/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChatState } from "@/context/chatProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Chat() {
  const [users, setUsers] = useState<any[]>([]);
  const [user2, setUser2] = useState(null);
  const [uid, setUid] = useState<string>("");
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = ChatState();
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState([]);
  const User = JSON.parse(user || "{}");
  const [add, setAdd] = useState(false);
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(chats.chatId);

    try {
      let chatid;
      for (const chatId in chats) {
        if (chats[chatId]) {
          chatid = chatId;
          // You can perform actions with the user ID
        }
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${User.idToken}`,
        },
      };
      const response = await axios.post(
        `http://localhost:8000/api/send-message/`,
        config,
        { content: message, chatId: chatid }
      );

      // const { content } = response.data;
      setChatMessages([...chatMessages, response.data]);
      fetchMessages();
      console.log(response.data);

      // console.log(chatMessages);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  /////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listusers")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);
  //////////////////////////////////////////////////////
  // const createChat = async (uid: any) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/api/create-chat/${User.uId}`,
  //       { userId: uid }
  //     );

  //     console.log(response.data);

  //     setChats(response.data);
  //   } catch (error) {
  //     console.error("Error creating chat:", error);
  //   }
  // };
  // //////////////////////////////////////////////////////////
  const fetchChats = async (uid: any) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/fetchchat/${uid}`
      );

      // console.log(response.data);
      setUser2(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  ////////////////////////////////////////////////////

  const fetchMessages = async () => {
    try {
      let chatid: string;
      for (const chatId in chats) {
        if (chats[chatId]) {
          chatid = chatId;
          console.log(chatId);
        }
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${User.idToken}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8000/api/messages/${chatid}`,
        config
      );
      // const { chats } = response.data;
      setChatMessages([response.data]);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // fetchMessages();

  /////////////////////////////////////////////////////
  const setU = (uid: string) => {
    setUid(uid);
    fetchChats(uid);
  };

  return (
    <div>
      <Navbar setAdd={setAdd} add={add} />
      <div className=" flex justify-between mt-12 ">
        {!add ? (
          <div className=" grid gap-5">
            {chats.map(
              (user: {
                uid: string;
                photoURL: string;
                displayName: string;
              }) => (
                <div key={user.uid}>
                  {user.uid !== User.uId && (
                    <Card
                      className="flex w-[300px] p-4 gap-4 hover:bg-slate-50 h-[90px]"
                      onClick={() => setU(user.uid)}
                    >
                      <Avatar>
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className=" grid place-items-start">
                        <h1 className=" font-bold">{user.displayName}</h1>
                        <h1>{user.uid}</h1>
                        <div className=" flex justify-center gap-10">
                          <p>Hey! How are you?</p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <AddContact setAdd={setAdd} setChats={setChats} chats={chats} />
        )}
        <Chatbox
          uid={uid}
          chats={chats}
          setChats={setChats}
          setChatMessages={setChatMessages}
          chatMessages={chatMessages}
          setMessage={setMessage}
          message={message}
          sendMessage={sendMessage}
          user2={user2}
          setUser2={setUser2}
        />
      </div>
    </div>
  );
}

export default Chat;
