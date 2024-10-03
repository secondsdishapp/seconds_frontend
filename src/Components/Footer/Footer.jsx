// COMPONENTS
import MobileNav from "../MobileNav/MobileNav.jsx";
import ButtonNav from "../ButtonNav/ButtonNav.jsx";

import React from 'react'

export default function Footer({ setMenuToggle }) {
  return (
    <footer>
      <ButtonNav setMenuToggle={setMenuToggle}/>
      {/* <MobileNav /> */}
    </footer>
  )
}
