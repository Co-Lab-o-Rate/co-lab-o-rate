import { FC, useState } from 'react'
// import supabase from './config/supabaseClient'

interface ComponentProps {
   //props placeholder
}

const InterviewQuestions: FC<ComponentProps> = () => {

    const [questionCount, setQuestionCount] = useState(0);
    const [answer, setAnswer] = useState('');
    // let answerArray: string[] = [];
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

    const handleKeyDown = (e: any) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
      }
    
    const updateAnswer = (event: any) => {
        console.log(event.target.value);
        setAnswer(event.target.value);
    }
    
    // const saveAnswer = (newAnswer: string) => {
    //     answerArray.push(newAnswer);
    //     setAnswer(()=> {
    //         console.log(answerArray);
    //         return '';
    //     })
    // }
    
    return(
        <div>
            <div className='flex flex-col items-center mt-5'>
                <div>
                    {questions[questionCount]}
                </div>
                <textarea className='bg-slate-200 text-black rounded border-solid border-2 border-black p-2 m-2 w-2/3'
                onChange={(event)=>updateAnswer(event)}
                onKeyDown={(event) => handleKeyDown(event)}
                value={answer}
                ></textarea>
                <div>
                    <button className='bg-red-500 text-white rounded w-20 p-3 leading-none mt-3'
                        onClick={()=>{
                            setQuestionCount(questionCount+1)
                            }}>
                        Save and Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InterviewQuestions;