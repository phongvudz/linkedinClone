import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
} from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import "./Header.css";
import HeaderOption from "./HeaderOption/HeaderOption";

const Header = () => {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
          alt="logo"
        />
        <div className="header__search">
          <Search />
          <input placeholder="Search..." type="text" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={Home} title="Home" />
        <HeaderOption Icon={SupervisorAccount} title="My Network" />
        <HeaderOption Icon={BusinessCenter} title="Jobs" />
        <HeaderOption Icon={Chat} title="Messaging" />
        <HeaderOption Icon={Notifications} title="Notifications" />
        <HeaderOption
          onClick={logoutOfApp}
          avatar="https://png.pngtree.com/element_our/png_detail/20181022/male-worker-icon-graphic-png_189128.jpg"
          title={"Me"}
        />
      </div>
    </div>
  );
};

export default Header;
