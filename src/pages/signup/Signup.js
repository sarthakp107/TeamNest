import React, { useState } from 'react'
//styles
import './Signup.css';

//custom hooks
import { useSignup } from '../../hooks/useSignup';


export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  // const [thumbnail, setThumbnail] = useState(null);
  // const [thumbnailError, setThumbnailError] = useState('');

  const {signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName );
    console.log(email, password, displayName ); //should match the order from the hook
  }


  // const handleFileChange = (e) => {
  //   setThumbnail(null);
  //   let selected = e.target.files[0];
  //   console.log(selected)
  //   if (!selected) {
  //     setThumbnailError("Select a file");
  //     return
  //   }
  //   if (!selected.type.includes('image')) {
  //     setThumbnailError("Selected file must be an image");
  //     return
  //   }
  //   if (selected.size > 100000) //bytes
  //   {
  //     setThumbnailError("Must be less than 100kb");
  //     return
  //   }

  //   setThumbnailError(null);
  //   setThumbnail(selected);
  //   console.log("Thumbnail Updated");
  // }

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
      {/* <label >
        <span>Profile Thumbnail: </span>
        <input type="file"
          onChange={handleFileChange}
        />

        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label> */}
      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
