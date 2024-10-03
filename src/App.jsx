import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// COMPONENTS
import Footer from "./Components/Footer/Footer";
import TopMenuBar from "./Components/TopMenuBar/TopMenuBar";
import SidebarMenu from "./Components/SidebarMenu/SidebarMenu";
import FilterMap from "./Components/FilterMap/FilterMap";

// PAGES
import Home from "./Pages/Home";
import Dishes from "./Pages/Dishes";
import DishShow from "./Pages/DishShow";
import FourOFour from "./Pages/FourOFour";
import Login from "./Pages/Login";
import Map from "./Pages/Map";
import About from "./Pages/About";

function App() {

  const [ menuToggle, setMenuToggle ] = useState(false);

  return (
    <div className="main-container">
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle}/>
      {menuToggle ? <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle}/> : 
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/dishes/:id" element={<DishShow />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<FourOFour />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
          </Routes>
      </main>
      }
      <Footer setMenuToggle={setMenuToggle}/>
    </div>
  );
}

export default App;
