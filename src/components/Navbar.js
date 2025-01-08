//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'

import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar'>
        <ul>
            <li className="logo">
                <img src={Temple} alt="teamNest logo" />
                <span>TeamNest</span>
            </li>

            <li>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </li>

            <li>
                <button className='btn'>Logout</button>
            </li>
        </ul>
    </div>
  )
}
