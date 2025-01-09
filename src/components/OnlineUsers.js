import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar';
import './OnlineUsers.css'

import React from 'react'



export default function OnlineUsers() {
    const {documents, error} = useCollection('users');

  return (
    <div className='user-list'>
        <h2>All users</h2>
        {error && <div className='error'>{error}</div>}
        {documents && documents.map(user => (
            <div key={user.id} className="user-list-item">
              {user.online && <span className='online-user'></span>}
                <span>{user.displayName}</span>
                <Avatar displayName={user.displayName}/>
            </div>
        ))}
    </div>
  )
}
