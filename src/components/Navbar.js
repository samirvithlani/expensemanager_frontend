import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme } from "../redux/ThemeSlice";

export const Navbar = () => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state.theme.theme);
    console.log(state);
  return (
    <div>
      <ul>
        <li>
          <Link to="">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
            <button onClick={()=>dispatch(changeTheme("dark"))}>Change Theme</button>
            </li>
      </ul>
    </div>
  );
};
