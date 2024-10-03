import { useState } from "react";
import TopMenuBar from "../TopMenuBar/TopMenuBar";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Footer from "../Footer/Footer";
import zIndex from "@mui/material/styles/zIndex";

export default function Navigation() {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className="layout-container">
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      {menuToggle ? (
        <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      ) : null}
      <Footer style={{zIndex: "99"}} menuToogle={menuToggle} setMenuToggle={setMenuToggle} />
    </div>
  );
}
