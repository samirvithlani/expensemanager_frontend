import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/user/Signup";
import { Login } from "./components/user/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
