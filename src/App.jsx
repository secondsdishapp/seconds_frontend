import "./App.css";
import { Routes, Route } from "react-router-dom";

// COMPONENTS
import Footer from "./Components/Footer/Footer";

// PAGES
import Home from "./Pages/Home";
import Dishes from "./Pages/Dishes";
import DishShow from "./Pages/DishShow";
import FourOFour from "./Pages/FourOFour";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="main-container">
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/dishes/:id" element={<DishShow />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
