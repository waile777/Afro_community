import "./dropDownProfile.css"
import { Link } from 'react-router-dom'

import React from 'react'

function DropDownProfile() {
    const user = JSON.parse(localStorage.getItem('user'))

    const links = [
        {
            _id: 1,
            label: "Profile",
            icon: <i className="bi bi-person-fill"></i>,
            auth: true,
            to: '/you/profile'
        },
        {
            _id: 2,
            label: "Likes",
            icon: <i className="bi bi-heart-fill"></i>,
            auth: true,
            to: '/you/likes'
        },
        {
            _id: 3,
            label: "Following",
            icon: <i className="bi bi-person-plus-fill"></i>,
            auth: true,
            to: '/you/following'
        },
        {
            _id: 4,
            label: "Followers",
            icon: <i className="bi bi-people-fill"></i>,
            auth: true,
            roles: ["dj"],
            to: '/you/followers'
        },
        {
            _id: 5,
            label: "Mixes",
            icon: <i className="bi bi-music-note-list"></i>,
            auth: true,
            roles: ["dj"],
            to: '/you/Mixes'
        },
        {
            _id: 6,
            label: "Playlists",
            icon: <i className="bi bi-collection-play-fill"></i>,
            auth: true,
            roles: ["dj", "listener"],
            to: '/you/Playlists'
        }
    ];

    const filteredLinks = links.filter(link => {

        if (!link.roles && !link.auth) return true;

        if (link.roles && !user) return false;

        if (link.auth && !user) return false;

        if (link.roles && user) {
            return link.roles.includes(user.role);
        }

        return true;
    })


    return (
        <ul className="drop-down">
            {
                filteredLinks.map(link => {
                    return (
                        <li key = {link._id}>
                            {link.icon}
                            <Link to={link.to} className="drop-down-link">{link.label}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default DropDownProfile