import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Navbar() {
  const logout = () => {};
  return (
    <div className=" rounded-md border border-3 bg-white flex  justify-between items-center p-2 ">
      <h1>Chat-App</h1>

      <div className="flex  gap-10 items-center">
        <h1 className=" ">Ayush</h1>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Navbar;
