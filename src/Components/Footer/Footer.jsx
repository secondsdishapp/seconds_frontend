// COMPONENTS
import MobileNav from "../MobileNav/MobileNav.jsx";
import ButtonNav from "../ButtonNav/ButtonNav.jsx";

import React from 'react'

export default function Footer({count,setCount, menuToggle, setMenuToggle, value, setValue }) {
  return (
    <footer style={{zIndex: "99", backgroundColor: "white"}}>
      <ButtonNav count={count} setCount={setCount} menuToggle={menuToggle} setMenuToggle={setMenuToggle} value={value} setValue={setValue}/>
      {/* <MobileNav /> */}
    </footer>
  )
}
