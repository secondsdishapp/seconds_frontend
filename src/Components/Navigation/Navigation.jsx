import { useState } from "react";
import TopMenuBar from "../TopMenuBar/TopMenuBar";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Footer from "../Footer/Footer";
import zIndex from "@mui/material/styles/zIndex";

import "./Navigation.css";

export default function Navigation({ menuToggle, setMenuToggle }) {
  

  return (
    <div className={`layout-container ${menuToggle ? "fixed" : ""}`}>
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      {menuToggle ? (
        <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      ) : null}
      <Footer style={{zIndex: "99"}} menuToogle={menuToggle} setMenuToggle={setMenuToggle} />
    </div>
  );
}
