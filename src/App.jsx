import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NearByOptions from "./Pages/NearByOptions";
import DishShow from "./Pages/DishShow";
import FourOFour from "./Pages/FourOFour";
import Login from "./Pages/Login";
import Map from "./Pages/Map";

function App() {
  return (
    <>
      <div className="main-container">
        <main>
          <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nearbyoptions" element={<NearByOptions />} />
            <Route path="/nearbyoptions/:id" element={<DishShow />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<FourOFour />} />
            <Route path="/map" element={<Map />} />
          </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}

export default App;
