import React, {useState} from 'react'


function Login() {
  const [email, setEmail]  = useState('')
  const [password, setPassword]  = useState('')

async function  loginUser (e) {
  e.preventDefault()
  const res = await fetch('http://localhost:1007/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  body: JSON.stringify({
      email, 
      password
    })
  })

  const data = await res.json()
  console.log(data)

  if(data.user){
    localStorage.setItem('token', data.user)
    alert("login successfull")
    window.location.href ='/quote'
  } else {
    alert('incorrect data pls try again')
  }
}

  return (
    <div >
       <h1>Register</h1>
       <form onSubmit={loginUser}>
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
           <input type="submit" value='Login User'/>
         </form>      
    </div>
  );
}

export default Login;
