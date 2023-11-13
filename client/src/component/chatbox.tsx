/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ScrollableFeed from "react-scrollable-feed";

import React from "react";

function Chatbox({
  // uid,
  // chats,
  // setChats,
  chatMessages,
  // setChatMessages,
  message,
  setMessage,
  sendMessage,
  user2,
}: // setUser2,
{
  uid: string;
  chats: any;
  setChats: any;
  chatMessages: any;
  setChatMessages: any;
  message: string;
  setMessage: any;
  sendMessage: any;
  user2: any;
  setUser2: any;
}) {
  // console.log(chatMessages);

  return (
    <div>
      {user2 ? (
        <Card className="] ">
          <div className=" flex justify-between p-5 w-[800px]">
            <Avatar>
              <AvatarImage src={user2.profilePic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>{user2.name}</CardTitle>
          </div>

          <div className=" p-10 border-t-2 border  max-h-[500px] ">
            {
              //@ts-ignore
              <ScrollableFeed className="no-scrollbar  ">
                {(chatMessages.length > 0 && chatMessages.map) ||
                  chatMessages[0].map((message: any) => (
                    <div>
                      {message.sender === user2.uid ? (
                        <div className=" break-words rounded-bl-3xl rounded-tr-3xl rounded-tl-3xl w-[300px] bg-slate-100 ml-96 p-5 m-2 ">
                          <h1>{message.content}</h1>
                        </div>
                      ) : (
                        <div className=" break-words rounded-br-3xl rounded-tr-3xl rounded-tl-3xl w-[300px]  bg-slate-100 mr-48 p-5">
                          <h1>{message.content}</h1>
                        </div>
                      )}
                    </div>
                  ))}
              </ScrollableFeed>
            }
          </div>
          <form className=" flex justify-center gap-5 m-3">
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button className="w-[100px]" onClick={sendMessage}>
              Send
            </Button>
          </form>
        </Card>
      ) : (
        <h1>select user</h1>
      )}
    </div>
  );
}

export default Chatbox;
