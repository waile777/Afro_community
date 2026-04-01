import './footer.css'
import { Link } from "react-router-dom";

export default function Footer() {

    const user = JSON.parse(localStorage.getItem("user"));

    const links = [
        { label: "Home", to: "/" },
        { label: "Discover", to: "/discover" },
        { label: "Events", to: "/events" },

        { label: "Upload Mix", to: "/upload", roles: ["dj"] },
        { label: "Become DJ", to: "/become-dj", roles: ["listener"] },

        { label: "Profile", to: "/profile", auth: true },

        { label: "About", to: "/about" },
        { label: "Help", to: "/help" },
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" }
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
        <footer className="footer">
            {filteredLinks.map((item, i) => (
                <span key={i}>
                    <Link to={item.to}>{item.label}</Link>
                    {i !== filteredLinks.length - 1 && <span className="dot"> • </span>}
                </span>
            ))}
        </footer>
    );
}