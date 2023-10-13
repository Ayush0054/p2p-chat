import Chatbox from "@/component/chatbox";
import Contact from "@/component/contact";
import Navbar from "@/component/navbar";
import React from "react";

function Chat() {
  return (
    <div>
      <Navbar />
      <div className=" flex justify-between mt-12 ">
        <div className=" grid gap-5">
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
        </div>
        <Chatbox />
      </div>
    </div>
  );
}

export default Chat;
