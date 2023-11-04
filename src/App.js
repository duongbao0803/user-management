import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { Routes, Route, Link, redirect } from "react-router-dom";

import AddForm from "./components/AddForm";
import LoginGoogle from "./components/LoginGoogle";
import EditModal from "./components/EditModal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginGoogle />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/add" element={<AddForm />} />
      <Route path="/edit/:id" element={<EditModal />} />
    </Routes>
  );
}

export default App;
