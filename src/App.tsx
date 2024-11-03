import { useState } from 'react'
import './App.css'
import supabase from './config/supabaseClient'

function App() {

  const [email, setEmail] = useState('')

  const sendEmail = (emailAddress: string) => {
    console.log(emailAddress);
  } 

  return (
    <>
      <span className='mr-5'>
        <input className='email-input' placeholder='enter your email' onChange={(event) => setEmail(event.target.value)}></input>
      </span>
      <span>
        <button className='bg-slate-800 text-white p-5 rounded' onClick={() => sendEmail(email)}>Submit</button>
      </span>
      <div>
        {email}
      </div>
    </>
  )
}

export default App
