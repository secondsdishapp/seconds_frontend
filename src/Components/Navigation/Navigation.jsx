import { useState } from "react";
import TopMenuBar from "../TopMenuBar/TopMenuBar";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Footer from "../Footer/Footer";
import zIndex from "@mui/material/styles/zIndex";

import "./Navigation.css";

export default function Navigation({count, menuToggle, setMenuToggle,setCount }) {
  

  return (
    <div className={`layout-container ${menuToggle ? "fixed" : ""}`}>
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      {menuToggle ? (
        <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      ) : null}
      <Footer count={count} setCount={setCount} style={{zIndex: "99"}} menuToogle={menuToggle} setMenuToggle={setMenuToggle} />
    </div>
  );
}
