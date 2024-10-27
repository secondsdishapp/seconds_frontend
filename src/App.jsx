import "./App.css";
import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom"
import Navigation from "./Components/Navigation/Navigation.jsx"

// PAGES
import Home from "./Pages/Home";
import TopMenuBar from "./Components/TopMenuBar/TopMenuBar.jsx";
import SidebarMenu from "./Components/SidebarMenu/SidebarMenu.jsx";
import Account from "./Pages/Account.jsx";
import Dishes from "./Pages/Dishes";
import Auth from "./Pages/Auth";
import DishShow from "./Pages/DishShow";
import Map from "./Pages/Map";
import About from "./Pages/About";
import AddDish from "./Pages/AddDish.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import FourOFour from "./Pages/FourOFour";
import zIndex from "@mui/material/styles/zIndex.js";

// protected routes
import ReverseProtectedRoutes from "./Utils/ReverseProtectedRoutes.jsx";
import ProtectedRoutes from "./Utils/ProtectedRoutes.jsx";

// import { set } from "animejs";

// context
import { LocalAuthProvider } from "./Context/LocalAuth/LocalAuthContext.jsx";
import { AuthProvider } from "./Context/AuthContext/AuthContext.jsx";

function App() {

  const [menuToggle, setMenuToggle] = useState(false);
  const [ value, setValue ] = useState(-1);
 
  //PREFERENCES FROM THE PROFILE PAGE
  const [ vegetarian, setVegetarian ] = useState(false);
  const [ vegan, setVegan ] = useState(false);
  const [ glutenFree, setGlutenFree ] = useState(false);
  const [ cuisine, setCuisine ] = useState('');
  const [ search, setSearch ] = useState('');

  return (
    <div>
      <LocalAuthProvider>
      <AuthProvider>
      <TopMenuBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      {menuToggle ? <SidebarMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle}/> : null}
      <main className={`pages ${menuToggle ? "fixed" : ""}`}>
        <Routes>
          <Route path="/" element={<Home cuisine={cuisine} setCuisine={setCuisine} vegetarian={vegetarian} setVegetarian={setVegetarian} vegan={vegan} setVegan={setVegan} glutenFree={glutenFree} setGlutenFree={setGlutenFree} search={search} setSearch={setSearch}/>} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/dishes/:id" element={<DishShow />} />
          <Route path="/map" element={<Map search={search} setSearch={setSearch}/>} />
          <Route path="/adddish" element={<AddDish />} />
          <Route path="/about" element={<About />} />

          <Route element={<ReverseProtectedRoutes />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/myaccount" element={<Account vegetarian={vegetarian} setVegetarian={setVegetarian} vegan={vegan} setVegan={setVegan} glutenFree={glutenFree} setGlutenFree={setGlutenFree}/>} />
          </Route>
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </main>
      <Footer setCuisine={setCuisine} style={{zIndex: "99"}} menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      </AuthProvider>
      </LocalAuthProvider>
    </div>
  );
}

export default App;
