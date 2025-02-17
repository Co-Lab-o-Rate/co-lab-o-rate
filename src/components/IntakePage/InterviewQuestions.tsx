import { FC, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useSession } from "../../context/SessionContextProvider";
import { useNavigate } from "react-router";
// import supabase from './config/supabaseClient'

interface ComponentProps {
  //props placeholder
}

interface Question {
  created_at: string;
  group_id: number | null;
  id: number;
  question_text: string | null;
}

interface prevAnswer {
  id: number;
  created_at: string;
  question_id: number | null;
  profile_id: string | null;
  answer_text: string | null;
}

const InterviewQuestions: FC<ComponentProps> = () => {
  useEffect(() => {
    getQuestions();
    getPrevAnswers();
  }, []);

  const auth = useSession();
  const user = auth.session?.user;
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState<number>(0);
  const [answer, setAnswer] = useState<string | null>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [prevAnswers, setPrevAnswers] = useState<prevAnswer[]>([]);

  const getQuestions = async () => {
    //TBD only get questions that match the user group
    const { data, error } = await supabase.from("questions").select();
    if (data) {
      setQuestions(data);
    } else if (error) {
      console.log("Error in getting questions:", error);
    }
  };

  const getPrevAnswers = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("profile_questions")
        .select()
        .eq("profile_id", user.id);
      if (data) {
        const orderedAnswers = data.sort(
          (a: any, b: any) => a.question_id - b.question_id
        );
        setPrevAnswers(orderedAnswers);
      } else if (error) {
        console.log("Error in getting previous answers:", error);
      }
    }
  };

  const getCurrentAnswer = (index?: number) => {
    const currentAnswer = prevAnswers.filter(
      (answer) => answer.question_id === questions[index ?? 0].id
    )[0]?.answer_text;
    setAnswer(currentAnswer ?? "");
  };

  //adjusts the height of the text box as text is entered
  const handleKeyDown = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const updateAnswer = (event: any) => {
    setAnswer(event.target.value);
    handleKeyDown(event);
  };

  const alreadyAnswered = () => { 
    return prevAnswers.some((prevAnswer) => {
      return prevAnswer.question_id === questions[questionCount].id;
    });
  };

  const saveAnswer = async () => {
    if (answer !== "") {      
      if (alreadyAnswered()) {        
        const { error } = await supabase
          .from("profile_questions")
          .update({
            question_id: questions[questionCount].id,
            profile_id: user?.id,
            answer_text: answer,
          })
          .eq("question_id", questions[questionCount].id);
        if (error) {
          console.log("Error in saving answer:", error);
        } else {
          setQuestionCount(questionCount + 1);
          getCurrentAnswer(questionCount + 1);
          getPrevAnswers();
        }
      } else {
        console.log('in not already answered');

        const { error } = await supabase.from("profile_questions").insert({
          question_id: questions[questionCount].id,
          profile_id: user?.id,
          answer_text: answer,
        });
        if (error) {
          console.log("Error in saving answer:", error);
        } else {
          setQuestionCount(questionCount + 1);
          getCurrentAnswer(questionCount + 1);
          getPrevAnswers();
        }
      }
    }
  };

  const questionComplete = (question: Question) => {
    const isDone = prevAnswers.some((answer) => {
      return answer.question_id === question.id;
    });
    return isDone;
  };

  const goToQuestion = (index: number) => {
    getCurrentAnswer(index);
    setQuestionCount(index);
  };

  const goToHomePage = () => {
    console.log("Going to home page");
    //TBD route to user profile
    navigate("/");
  };

  return (
    <div>
      <LogoHeader />
      <div className="flex flex-col items-center mt-10">
        <div>{questions[questionCount]?.question_text}</div>
        <textarea
          className="bg-slate-200 text-black rounded border-solid border-2 border-black p-2 m-2 w-2/3"
          id="survey-answer"
          onChange={(event) => updateAnswer(event)}
          onKeyDown={(event) => handleKeyDown(event)}
          value={answer || ""}
        ></textarea>
        <div id="survey-tracker" className="mt-12">
          <h3 className="mb-3" >survey progress</h3>
          <div className="w-50">
            {questions.map((question, index) => {
              return (
                <span
                  key={index}
                  className={`survey-tracker-btn ${
                    questionCount === index
                      ? "bg-teal-400"
                      : questionComplete(question)
                      ? "bg-green-100"
                      : "bg-red-100"
                  } 
                    ${
                    index === 0
                        ? "rounded-s-md"
                        : index === questions.length - 1
                        ? "rounded-e-md"
                        : ""
                    }`}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}
                </span>
              );
            })}
          </div>
        </div>
        <div className="mt-2">Click numbers to revisit a question.</div>
        <div className="mt-6">
          <button
            className="bg-red-500 text-white rounded w-30 p-3 leading-none mt-3"
            onClick={saveAnswer}
          >
            Save & Continue
          </button>
          <button
            className="bg-lime-500 text-white rounded w-30 p-3 leading-none mt-3 ml-3"
            onClick={goToHomePage}
          >
            Skip Survey for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
