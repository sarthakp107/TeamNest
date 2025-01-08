//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'

import React from 'react'
import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
    const{user} = useAuthContext();
    const{logout, error, isPending} = useLogout();

const handleSubmit = (e) => {
    e.preventDefault();
    logout();
}
  return (
    <div className='navbar'>
        <ul>
            <li className="logo">
                <img src={Temple} alt="teamNest logo" />
                <span>TeamNest</span>
            </li>

           { !user && <li>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </li>}

            {user && <li>
                {!isPending && <button className='btn' onClick={handleSubmit}>Logout</button>}
                {isPending && <button className='btn' onClick={handleSubmit} disabled>Loading</button>}
            </li>}
        </ul>
    </div>
  )
}
