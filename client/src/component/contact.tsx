import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

function Contact() {
  return (
    <div>
      <Card className="flex w-[300px] p-4 gap-4 hover:bg-slate-50">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className=" grid place-items-start">
          <h1 className=" font-bold">Ayush</h1>
          <div className=" flex justify-center gap-10">
            <p>Hey! How are you?</p>√
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Contact;
