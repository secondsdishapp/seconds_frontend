import { useState } from "react";
import TopMenuBar from "../TopMenuBar/TopMenuBar";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Footer from "../Footer/Footer";
import zIndex from "@mui/material/styles/zIndex";

import "./Navigation.css";

export default function Navigation({count, menuToggle, setMenuToggle,setCount }) {
  

  return (
    <div className={`layout-container ${menuToggle ? "fixed" : ""}`}>
      {menuToggle ? (
        <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      ) : null}
    </div>
  );
}
