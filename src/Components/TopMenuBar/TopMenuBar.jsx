import "./TopMenuBar.css";

export default function TopMenuBar({ menuToggle, setMenuToggle }) {
    return (
        <div className="top-menubar-container">
            <img src="/seconds-logo2.png" className="logo"/>
            <div className="hamburger-menu-container" >
                <label className="hamburger-menu" >
                    <input id="check" className=""  type="checkbox"  checked={menuToggle} onClick={() => setMenuToggle(!menuToggle)}/>
                </label>
            </div>
        </div>
    )
}