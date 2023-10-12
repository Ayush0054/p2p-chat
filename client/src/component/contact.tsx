import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

function Contact() {
  return (
    <div>
      <Card className="flex ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1>Ayush</h1>
        </div>
      </Card>
    </div>
  );
}

export default Contact;
