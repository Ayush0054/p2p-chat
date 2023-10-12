import { Route, Routes } from "react-router-dom";
import "./App.css";

import Chat from "./pages/chat";
import Landing from "./pages/landing";
import ProtectedRoute from "./utils/protectedRoute";

function App() {
  const isAuthenticated = localStorage.getItem("authToken");
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* {isAuthenticated && <Route path="/chat" element={<Chat />} />} */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
