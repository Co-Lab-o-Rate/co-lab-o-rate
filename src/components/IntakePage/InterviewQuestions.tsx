import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
// import supabase from './config/supabaseClient'

interface ComponentProps {
    questions: string[];
    questionCount: number;
    answerArray: string[];
    updateAnswer: Dispatch<ChangeEvent<HTMLTextAreaElement>>;
    answer: string;
    setAnswer: Dispatch<SetStateAction<string>>
}

const InterviewQuestions: FC<ComponentProps> = ({questions, questionCount, updateAnswer, answer} : ComponentProps) => {

    const handleKeyDown = (e: any) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
      }


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
            </div>
        </div>
    )
}

export default InterviewQuestions;