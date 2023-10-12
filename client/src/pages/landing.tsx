import Signup from "@/component/signup";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/component/login";

function Landing() {
  return (
    <div>
      <div className=" m-10 mb-20">
        <h1 className=" text-5xl font-semibold">
          Peer to Peer Chat application
        </h1>
      </div>
      <div className=" flex justify-center">
        <Tabs defaultValue="login" className="w-[400px] ">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            {" "}
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Landing;
