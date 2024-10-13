import "./App.css";
import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation.jsx"

// PAGES
import Home from "./Pages/Home";
import Dishes from "./Pages/Dishes";
import DishShow from "./Pages/DishShow";
import FourOFour from "./Pages/FourOFour";
import Login from "./Pages/Login";
import Map from "./Pages/Map";
import About from "./Pages/About";
import TopMenuBar from "./Components/TopMenuBar/TopMenuBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import zIndex from "@mui/material/styles/zIndex.js";
import SidebarMenu from "./Components/SidebarMenu/SidebarMenu.jsx";

// import { set } from "animejs";

// context
import { LocalAuthContext, LocalAuthProvider } from "./Context/LocalAuth/LocalAuthContext.jsx";

function App() {

  const [menuToggle, setMenuToggle] = useState(false);


  return (
    <div>
      <LocalAuthProvider>
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      {menuToggle ? <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle}/> : null}
      <main className={`pages ${menuToggle ? "fixed" : ""}`}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/dishes/:id" element={<DishShow />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<FourOFour />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer style={{zIndex: "99"}} menuToogle={menuToggle} setMenuToggle={setMenuToggle} />
      </LocalAuthProvider>
    </div>
  );
}

export default App;
