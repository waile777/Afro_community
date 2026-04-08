import './navLinks.css'
import { Link } from "react-router-dom";
import { useState } from 'react'

function Navlinks() {
    const [linkSelected, setLinkSelected] = useState('Home')
    const user = JSON.parse(localStorage.getItem('user'));
    const links = [
        { label: "Home", to: "/discover" },
        { label: "Library", to: "/library" },
        { label: "Events", to: "/events" },
        { label: "Upload", to: "/upload", roles: ["dj"] },
        { label: "Become DJ", to: "/become-dj", roles: ["listener"] },

        // { label: "Profile", to: "/profile", auth: true },

        // { label: "About", to: "/about" },
        // { label: "Help", to: "/help" },
        // { label: "Privacy", to: "/privacy" },
        // { label: "Terms", to: "/terms" }
    ];

    const filteredLinks = links.filter(link => {

        // visible for everyone
        if (!link.roles && !link.auth) return true;

        // hide auth links if no user
        if (link.auth && !user) return false;

        // hide role links if no user
        if (link.roles && !user) return false;

        // check roles
        if (link.roles && user) {
            return link.roles.includes(user.role);
        }

        return true;
    });




    return (
        <nav className="nav-links">
            {
                filteredLinks.map((link, i) => {
                    return <Link className={`link ${link.label === linkSelected ? ' clicked' : ''}`} onClick={() => setLinkSelected(link.label)} key={i} to="#">{link.label}</Link>
                })
            }
        </nav>
    )
}

export default Navlinks