import "./App.css";
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

import { useState } from "react";
// import { set } from "animejs";

function App() {

  const [menuToggle, setMenuToggle] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div>
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      <main style={{overflow:"hidden"}}>
        <Routes>
          <Route path="/" element={<Home count={count}/>} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/dishes/:id" element={<DishShow />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<FourOFour />} />
          <Route path="/map" element={<Map menuToggle={menuToggle}/>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer count={count} setCount={setCount} style={{zIndex: "99"}} menuToogle={menuToggle} setMenuToggle={setMenuToggle} />

    </div>
  );
}

export default App;
