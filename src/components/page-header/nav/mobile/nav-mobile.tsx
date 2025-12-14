import NavMobileMenuButton from "./nav-mobile-menu-button";
import NavMobileMenu from "./nav-mobile-menu";
import {useState} from "react";

export default function NavMobile() {

    const [showMenu, setShowMenu] = useState(false);

    return <div>
        <NavMobileMenuButton change={setShowMenu}/>
        <NavMobileMenu show={showMenu} onClose={setShowMenu}/>
    </div>
}