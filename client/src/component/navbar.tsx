import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChatState } from "@/context/chatProvider";
import { useNavigate } from "react-router-dom";

function Navbar({ setAdd, add }: { setAdd: any; add: any }) {
  const navigate = useNavigate();
  const { user } = ChatState();
  // console.log(JSON.parse(user));
  const User = JSON.parse(user || "{}");
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const showContacts = () => {
    setAdd(true);
    if (add) {
      setAdd(false);
    }
  };
  return (
    <div className=" rounded-md border border-3 bg-white flex  justify-between items-center p-2 ">
      <div className=" flex gap-5 items-center">
        <h1>Chat-App</h1>
        <Button onClick={showContacts}>Add Contact</Button>
      </div>

      <div className="flex  gap-10 items-center">
        <h1 className=" ">{User.name}</h1>

        <Avatar>
          <AvatarImage src={User.photoURL} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Navbar;
