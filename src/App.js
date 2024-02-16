import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/user/Signup";
import { Login } from "./components/user/Login";
import { Dashboard } from "./components/user/Dashboard";
import { AddExpense } from "./components/expense/AddExpense";
import { ListExpenses } from "./components/expense/ListExpenses";
import { Navbar } from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state.theme.theme);
  var style ={
    backgroundColor: state === "light" ? "white" : "black",
  }
  return (
    <div style={{backgroundColor:state ==="light"?"white":"black"}}>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path ="/user/dashboard" element ={<Dashboard/>}></Route>
        <Route path = "/expense/add" element = {<AddExpense/>}/>
        <Route path ="/expense/list" element ={<ListExpenses/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
