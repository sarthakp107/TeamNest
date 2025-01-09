import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { useAuthContext } from '../hooks/useAuthContext'

import React from 'react'

//avatar
import Avatar from './Avatar'


export default function Sidebar() {

    const {user} = useAuthContext();
    const {displayName} = user;
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                <Avatar displayName={user.displayName}/>
                    <p>Hey {displayName}</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink   to="/">
                            <img src={DashboardIcon} alt="dsahboard" />
                            <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                            <img src={AddIcon} alt="Add Project Icon" />
                            <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>

                </nav>
            </div>

        </div>
    )
}
