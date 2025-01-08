import React, { useState } from 'react'

//styles
import './Login.css'

//hook
import { useLogin } from '../../hooks/useLogin';


export default function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login, isPending, error} = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); 

  }
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
        <label>
          <span>Email: </span>
          <input type="text" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}/>
        </label>
        <label>
          <span>Password: </span>
          <input type="text" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}/>
        </label>
       {!isPending && <button className="btn">Login</button>}
       {isPending && <button className="btn">Loading</button>}
       {error && <div className='error'>{error}</div>}
    </form>
  )
}
