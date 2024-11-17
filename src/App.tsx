import { useState } from 'react'
import './App.css'
import supabase from './config/supabaseClient'
import logoLeft from './assets/logo-components/Colaborate_Logo_Colab.png'
import logoCenter from './assets/logo-components/Colaborate_Logo_Hands.png'
import logoRight from './assets/logo-components/Colaborate_Logo_Rate.png'

function App() {
  
  const [email, setEmail] = useState('')

  const sendEmail = async (emailAddress: string) => {
    const saveUser = await supabase?.from('user').insert({email: emailAddress, first_name: 'Joe', last_name: 'AB', password: 'abcdefg'});
    if(saveUser?.error){
      console.log(saveUser.error);
    }
  } 

  return (
    <>
      <div className='flex'>
        <span className='w-1/3 align-middle'><img className='object-cover h-50 w-90 pt-7' src={logoLeft}/></span>
        <span className='w-1/3'>
          <img src={logoCenter} className="object-cover h-50 w-90 logo pb-2" alt="logo"/>
        </span>
        <span className='w-1/3'><img className='object-cover h-50 w-90 pt-14' src={logoRight}/></span>
      </div>
      <div>Welcome to Co-Lab-o-Rate, an online platform where artists participate in collaborative drawing games and monetize their artwork into products. Let us know a bit about you...   </div>
      <span>
        <button className='bg-slate-800 text-white p-5 rounded' onClick={() => sendEmail(email)}>Get Started!</button>
      </span>
    </>
  )
}

export default App
