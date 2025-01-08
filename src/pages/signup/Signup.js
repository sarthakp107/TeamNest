import React, { useState } from 'react'
//styles
import './Signup.css';


export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName, thumbnail );
  }


  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    if (!selected) {
      setThumbnailError("Select a file");
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError("Selected file must be an image");
      return
    }
    if (selected.size > 100000) //bytes
    {
      setThumbnailError("Must be less than 100kb");
      return
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("Thumbnail Updated");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label >
        <span>Email: </span>
        <input type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label >
        <span>Password: </span>
        <input type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label >
        <span>Display Name: </span>
        <input type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label >
        <span>Profile Thumbnail: </span>
        <input type="file"
          onChange={handleFileChange}
        // value={thumbnail}
        />

        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      <button className="btn">Signup</button>
    </form>
  )
}
