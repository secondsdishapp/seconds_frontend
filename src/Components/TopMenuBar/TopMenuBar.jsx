import "./TopMenuBar.css";
import { useContext } from "react";
import { LocalAuthContext } from "../../Context/LocalAuth/LocalAuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function TopMenuBar({ menuToggle, setMenuToggle }) {
  // context
  const {
    isLocalLoggedIn
    ,localUser
    ,localLogin
    ,localLogout
    ,localAuthTest
  } = useContext(LocalAuthContext);
  console.log(localAuthTest);
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
            <input id="check" className=""  type="checkbox"  checked={menuToggle} onClick={() => setMenuToggle(!menuToggle)}/>
          </label>
      </div>
    </div>
  )
}