import { useState } from 'react'
import './App.css'
// import supabase from './config/supabaseClient'
import logoLeft from './assets/logo-components/Colaborate_Logo_Colab.png'
import logoCenter from './assets/logo-components/Colaborate_Logo_Hands.png'
import logoRight from './assets/logo-components/Colaborate_Logo_Rate.png'
import InterviewQuestions from './components/InterviewQuestions'

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
      <div className='flex'>
        <span className='w-1/3 align-middle'><img className='object-cover h-50 w-90 pt-7' src={logoLeft}/></span>
        <span className='w-1/3'>
          <img src={logoCenter} className="object-cover h-50 w-90 logo pb-2" alt="logo"/>
        </span>
        <span className='w-1/3'><img className='object-cover h-50 w-90 pt-14' src={logoRight}/></span>
      </div>
      <div>Welcome to Co-Lab-o-Rate, an online platform where artists participate in collaborative drawing games and monetize their artwork into products. Let us know a bit about you...   </div>
      <div className={surveyStarted ? 'invisible h-0' : 'start-button'}>
        <button className='bg-slate-800 text-white p-5 rounded mt-2' onClick={()=>setSurveyStarted(true)}>Get Started!</button>
      </div>
      <div className={!surveyStarted ? 'invisible' : 'survey-container'}>
        <div>
          <InterviewQuestions/>
        </div>
      </div>
    </>
  )
}

export default App
