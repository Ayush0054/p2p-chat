import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

function Chatbox() {
  return (
    <div>
      <Card>
        <div className=" flex justify-between p-5 w-[800px] ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>Ayush</CardTitle>
        </div>

        <div className=" p-10 border-t-2 border ">
          <div className=" break-words rounded-br-3xl w-[300px] bg-slate-100 mr-48 p-5">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          </div>
          <div className=" break-words rounded-bl-3xl w-[300px] bg-slate-100 ml-96 p-5 ">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum
              dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit
              amet consectetur adipisicing elit.Lorem ipsum dolor sit amet
              consectetur adipisicing elit.Lorem ipsum dolor sit amet
              consectetur adipisicing elit..
            </h1>
          </div>
        </div>
        <div className=" flex justify-center gap-5 m-3">
          <Input placeholder="Type a message" />
          <Button className="w-[100px]">Send</Button>
        </div>
      </Card>
    </div>
  );
}

export default Chatbox;
