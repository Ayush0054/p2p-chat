/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChatState } from "@/context/chatProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddContact({
  setAdd,
  setChats,
  chats,
}: {
  setAdd: any;
  setChats: any;
  chats: any;
}) {
  const [users, setUsers] = useState<any[]>([]);
  const { user } = ChatState();
  const User = JSON.parse(user || "{}");
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${User.idToken}`,
      },
    };
    axios
      .get("http://localhost:8000/api/listusers", config)
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);
  //////////////////
  const createChat = async (uid: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${User.idToken}`,
        },
      };
      const response = await axios.post(
        `http://localhost:8000/api/create-chat`,

        { userId: uid },
        config
      );

      console.log(response.data);

      setChats([response.data, ...chats]);

      setAdd(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  //   const setU = (uid: string) => {

  //   };
  return (
    <div>
      {users.map(
        (user: { uid: string; photoURL: string; displayName: string }) => (
          <div key={user.uid}>
            {user.uid !== User.uId && (
              <Card
                className="flex w-[300px] p-4 gap-4 hover:bg-slate-50 h-[90px]"
                onClick={() => createChat(user.uid)}
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
  );
}

export default AddContact;
