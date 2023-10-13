import React, { useState } from "react";
import firebase from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      // get token

      //@ts-ignore
      const idToken = await userCredential.user.getIdToken();
      // console.log(userCredential.user.multiFactor.user.displayName);
      // const name = userCredential.user.multiFactor.user.displayName;
      // const email = userCredential.user.multiFactor.user.email;
      // const photoURL = userCredential.user.multiFactor.user.photoURL;
      // console.log(userCredential.user.multiFactor.user.photoURL);
      axios.post("http://localhost:8000/api/login", { idToken: idToken });
      //@ts-ignore
      console.log(userCredential.user);
      const Tok = {
        idToken: idToken,
        name: await userCredential.user.multiFactor.user.displayName,
        email: await userCredential.user.multiFactor.user.email,
        photoURL: await userCredential.user.multiFactor.user.photoURL,
      };
      localStorage.setItem("token", JSON.stringify(Tok));
      navigate("/chat");
      // You can handle successful login here
    } catch (error) {
      console.error(error);
      // Handle login error here
    }
  };

  return (
    <form className=" grid gap-10" onSubmit={handleLogin}>
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button>Login</Button>
    </form>
  );
};

export default Login;
