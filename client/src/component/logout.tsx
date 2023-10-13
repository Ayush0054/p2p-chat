// Logout.js
import React from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("authToken");
  return <Redirect to="/login" />;
};

export default Logout;
