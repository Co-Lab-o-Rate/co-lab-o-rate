import { useNavigate } from "react-router";
import logoLeft from "../../assets/logo-components/Colaborate_Logo_Colab.png";
import logoCenter from "../../assets/logo-components/Colaborate_Logo_Hands.png";
import logoRight from "../../assets/logo-components/Colaborate_Logo_Rate.png";
import supabase from "../../config/supabaseClient";
import { useSession } from "../../context/SessionContextProvider";
import { useEffect, useState } from "react";

const LogoHeader = () => {

  const navigate = useNavigate();
  const session = useSession();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {    
    if(session.session?.access_token){
      setLoggedIn(true);
    }
  }, [session])

  const goHome = () => {
    navigate('/');
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    goHome();
    if(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex">
        <div className="flex-1"></div>
        <div className="flex justify-center cursor-pointer flex-2" onClick={goHome}>
          <div className="logo-container flex justify-center">
            <span className="w-1/3 h-[8%] mt-1">
              <img className="w-full pt-6" src={logoLeft} />
            </span>
            <span className="w-1/3 h-[8%] mt-1">
              <img
                src={logoCenter}
                className="w-full logo"
                alt="logo"
              />
            </span>
            <span className="w-1/3 h-[8%] mt-1">
              <img className="w-full pt-8" src={logoRight} />
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className={loggedIn ? 'cursor-pointer' : 'hidden'} >
            <button className="inline-block bg-yellow-100 text-black rounded-xl w-30 p-3 leading-none mt-3 ml-3 border-2 border-yellow-500" onClick={logout}>
              logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoHeader;
