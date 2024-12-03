import { useState } from 'react'
// import supabase from './config/supabaseClient'
import logoLeft from '../../assets/logo-components/Colaborate_Logo_Colab.png'
import logoCenter from '../../assets/logo-components/Colaborate_Logo_Hands.png'
import logoRight from '../../assets/logo-components/Colaborate_Logo_Rate.png'
import InfoForm from './InfoForm'
import InterviewQuestions from './InterviewQuestions'
import supabase from '../../config/supabaseClient'

const WelcomePage = () => {
    const [surveyStep, setSurveyStep] = useState<number>(0);    
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);
    const [incompleteForm, setIncompleteForm] = useState<boolean>(true);

    //InterviewQuestions state
    const [questionCount, setQuestionCount] = useState(0);
    const [answer, setAnswer] = useState('');
    let answerArray: string[] = [];
    const questions: string[] =  [
        "What drives you to create art?",
        "How would you describe your artistic style?",
        "What are the top challenges you face as an artist?",
        "How have you tried to solve them?",
        "Where do you hang out (online or offline) to meet other artist enthusiasts?",
        "What blogs and publications do you read to discover information relevant to the art you create?",
        "Which influencers in the art space do you follow?",
        "What tools do you use primarily to create your art?",
        "How are you currently promoting and monetizing your art?",
        "Who are your clients (friends, art collectors, creative agencies, brands) & how did you originally connect with them?",
        "Can you tell us about any collaborative projects where you created art socially with others?",
        "What causes are you interested in supporting philanthropically?",
        "What is the wildest boundary smashing dream you’ve experienced while sleeping?",
        "Would you be open to participating in a longer format interview?",
        "Would you like to be considered as a potential beta tester for our platform?",
        "How did you find out about us?"
       ]
    
    //InfoForm state
    const [isAdmin, setIsAdmin] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const getInputValue = (inputType: string) => {
      const input = document.getElementById(inputType) as HTMLInputElement;
      return input ? input.value : null;
    }

    const notAllFieldsComplete = () => {
      const requiredFields = [
        'firstName',
        'lastName',
        'age',
        'location',
        'email'
      ]
      return requiredFields.some((field) => getInputValue(field) === '');
    }
    
    const completeSurvey = () => {
      //route to next page
      console.log('going to app...');
    }
    
    const updateAnswer = (event: any) => {
        console.log(event.target.value);
        setAnswer(event.target.value);
    }
    
    const saveAnswer = (newAnswer: string) => {
        answerArray.push(newAnswer);
        setAnswer(()=> {
            console.log(answerArray);
            return '';
        })
    }

    const saveInfo = async (admin?: boolean, firstName?: string, lastName?: string, age?: string, location?: string, email?: string, phoneNumber?: string) => {
      const payload = {
        admin: admin || false,
        first_name: firstName,
        last_name: lastName,
        age: age,
        location: location,
        email: email,
        phone_number: phoneNumber
      }
      const saveProfile = await supabase?.from('user').insert(payload);
      if(saveProfile?.error){
          console.log(saveProfile.error);
      }
    }
    
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
        <div className={surveyStep > 0 ? 'invisible h-0' : 'start-button'}>
        <br />
        Welcome to<br /> <br />
        Co-Lab-o-Rate,<br /> <br />
        an online platform<br /> <br />
        where artists<br /> <br />
        participate in<br /> <br />
        collaborative drawing games<br /> <br />
        and monetize their artwork<br /> <br />
        into products.<br /> <br />
        <br /><br />
        Let us know a bit about you... 
        </div>
        <div className={surveyStep > 0 ? 'invisible h-0' : 'start-button mt-5'}>
          <button className='bg-red-500 text-white p-5 rounded mt-2' 
            onClick={()=>setSurveyStep(surveyStep + 1)}>Get Started!</button>
        </div>
        <div className={surveyStep !== 1  ? 'invisible h-0' : 'survey-container mt-5'}>
          <InfoForm 
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            firstName={firstName} 
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            age={age}
            setAge={setAge}
            location={location}
            setLocation={setLocation}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            submitClicked={submitClicked}
            getInputValue={getInputValue}
          />
        </div>
        <div className={surveyStep < 2  ? 'invisible h-0' : 'survey-container'}>
          <InterviewQuestions 
            questions={questions} 
            questionCount={questionCount} 
            answerArray={answerArray} 
            updateAnswer={updateAnswer} 
            answer={answer} 
            setAnswer={setAnswer} 
          />
        </div>
        <button className={surveyStep < 1  ? 'invisible h-0' : 'bg-red-500 text-white rounded w-20 p-5 leading-none'} 
            onClick={()=> {
              setSubmitClicked(true);
              if(!notAllFieldsComplete()){
                setIncompleteForm(false);
                if(surveyStep===1){
                  saveInfo(isAdmin, firstName, lastName, age, location, email, phoneNumber);
                  setSurveyStep(surveyStep + 1);
                } else {
                  setQuestionCount(()=> {
                    if(questionCount === questions.length){
                        completeSurvey()
                        return questionCount;
                    };
                    saveAnswer(answer);
                    setSurveyStep(surveyStep + 1);
                    return questionCount+1
                    })
                }
              } else {
                setIncompleteForm(true)
              }
            }}>
            {questionCount < questions.length ? "Next" : "Complete"}
        </button>
        <div className={incompleteForm && submitClicked ? "text-pink-600" : 'invisible h-0'}>
            please complete all required fields
        </div>
      </>
    )
}

export default WelcomePage;

