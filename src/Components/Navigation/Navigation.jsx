import { useState } from "react";
import TopMenuBar from "../TopMenuBar/TopMenuBar";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Footer from "../Footer/Footer";

export default function Navigation() {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className="layout-container">
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      {menuToggle ? (
        <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      ) : null}
      <Footer setMenuToggle={setMenuToggle} />
    </div>
  );
}
