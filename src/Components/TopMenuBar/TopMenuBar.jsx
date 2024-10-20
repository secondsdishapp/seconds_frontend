import "./TopMenuBar.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/FirebaseAuth/AuthContext.jsx';

export default function TopMenuBar({ menuToggle, setMenuToggle }) {

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className={`top-menubar-container ${menuToggle ? "fixed" : ""}`}>
      <img src="/seconds-logo2.png" className="logo" onClick={() => {
          navigate("/");
          setMenuToggle(false);
        }
      }/>
      <div className="hamburger-menu-container" >
          <label className="hamburger-menu" >
            <input id="check" className=""  type="checkbox"  checked={menuToggle} onChange={() => setMenuToggle(!menuToggle)}/>
          </label>
      </div>
    </div>
  )
}