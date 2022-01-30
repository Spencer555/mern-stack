import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Register() {
  const history = useNavigate()
  const [name, setName]  = useState('')
  const [email, setEmail]  = useState('')
  const [password, setPassword]  = useState('')

async function  registerUser (e) {
  e.preventDefault()
  const response = await fetch('http://localhost:1007/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  body: JSON.stringify({
      name,
      email, 
      password
    })
  })

  const data = await response.json()
  console.log(data)
  if (data.status === 'ok'){
    history('/login')
  }
}

  return (

    <div >
       <h1>Register</h1>
       <form onSubmit={registerUser}>
         <input 
         type='text'
         onChange = {(e) => setName(e.target.value)}
         value={name}
          placeholder='first Name'
          /> 
          <br/>
         <input 
         type='email'
         onChange = {(e) => setEmail(e.target.value)}
         value={email}
          placeholder='email'
          />
          <br/>
         <input
          type='password'
          onChange = {(e) => setPassword(e.target.value)}
          value={password}
           placeholder='password'
           />
           <br/>
           <input type="submit" value='Register User'/>
         </form>      
    </div>
 
  );
}

export default Register;
