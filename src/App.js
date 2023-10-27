import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { Routes, Route, Link, redirect } from "react-router-dom";

import AddForm from "./components/AddForm";
import LoginGoogle from "./components/LoginGoogle";
import EditModal from "./components/EditModal";
import { createContext, useState } from "react";
export const Session = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <Session.Provider value={{ user, setUser }}>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LoginGoogle />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="/edit/:id" element={<EditModal />} />
        </Routes>
      </div>
    </Session.Provider>
  );
}

export default App;
