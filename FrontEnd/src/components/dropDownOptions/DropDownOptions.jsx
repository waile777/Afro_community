import React from 'react'
import './dropDownOptions.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '@/api.js'


function DropDownOptions() {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()


    const handleLogOut = async (e) => {
        e.preventDefault()

        try {
            await api.delete('/logout')
        } catch (err) {
            console.log(err);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/login')
        }
    }

    const links = [
        {
            _id: 1,
            label: "About Us",
            auth: true,
            to: '/you/about-us'
        },
        {
            _id: 2,
            label: "Copyright",
            auth: true,
            to: '/you/copyright'
        },
        {
            _id: 3,
            label: "Sign Out",
            auth: true,
            to: '/'
        },
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
        <>
            {
                filteredLinks.map((link, i) => {
                    if (link.label === "Sign Out") {
                        return (
                            <li key={link._id}>
                                <div className="line"></div>
                                <button className="drop-down-option logout" onClick={handleLogOut}>
                                    {link.label}
                                </button>
                            </li>
                        )
                    }

                    return (
                        <li key={link._id}>
                            {i === filteredLinks.length - 1 && <div className="line"></div>}
                            <Link to={link.to} className="drop-down-option">{link.label}</Link>
                        </li>
                    )
                })
            }
        </>
    )
}

export default DropDownOptions