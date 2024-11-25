import { useState } from 'react'
import './App.css'
// import supabase from './config/supabaseClient'
import logoLeft from './assets/logo-components/Colaborate_Logo_Colab.png'
import logoCenter from './assets/logo-components/Colaborate_Logo_Hands.png'
import logoRight from './assets/logo-components/Colaborate_Logo_Rate.png'
import InterviewQuestions from './components/InterviewQuestions'
import InfoForm from './components/InfoForm'

function App() {

  const [surveyStarted, setSurveyStarted] = useState<boolean>(false);
  
  // const sendEmail = async (emailAddress: string) => {
  //   const saveUser = await supabase?.from('user').insert({email: emailAddress, first_name: 'Joe', last_name: 'AB', password: 'abcdefg'});
  //   if(saveUser?.error){
  //     console.log(saveUser.error);
  //   }
  // } 

  return (
    <>
      <div className='flex justify-center'>
        <div className='logo-container flex justify-center'>
          <span className='w-1/3'><img className='object-cover h-40' src={logoLeft}/></span>
          <span className='pl-8'>
            <img src={logoCenter} className="object-cover h-52 logo" alt="logo"/>
          </span>
          <span className='w-1/3 h-40'><img className='object-cover h-40' src={logoRight}/></span>
        </div>
      </div>
      <div>Welcome to<br /> 
      Co-Lab-o-Rate,<br /> 
      an online platform<br /> 
      where artists<br /> 
      participate in<br /> 
      collaborative drawing games<br /> 
      and monetize their artwork<br /> 
      into products.<br /> 
      <br /><br />
      Let us know a bit about you...   </div>
      <div className={surveyStarted ? 'invisible h-0' : 'start-button'}>
        <button className='bg-slate-800 text-white p-5 rounded mt-2' onClick={()=>setSurveyStarted(true)}>Get Started!</button>
      </div>
      <div className={!surveyStarted ? 'invisible' : 'survey-container'}>
        <div>
          <InfoForm/>
          <InterviewQuestions/>
        </div>
      </div>
    </>
  )
}

export default App
