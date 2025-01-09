import './Avatar.css'

import React from 'react'

export default function Avatar({ displayName}) {

  const avatarURL = `https://avatar.iran.liara.run/username?username=${displayName}`
  return (
    <div className='avatar'>
        {/* <img src="https://avatar.iran.liara.run/public" alt="avatar" /> */}
        <img src={avatarURL} alt="avatar" />
        
    </div>
  )
}
