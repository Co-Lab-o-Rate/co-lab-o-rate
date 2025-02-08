import { useNavigate } from "react-router";
import logoLeft from "../../assets/logo-components/Colaborate_Logo_Colab.png";
import logoCenter from "../../assets/logo-components/Colaborate_Logo_Hands.png";
import logoRight from "../../assets/logo-components/Colaborate_Logo_Rate.png";

const LogoHeader = () => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  return (
    <>
      <div className="flex justify-center cursor-pointer" onClick={goHome}>
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
      <div className={"start-button"}></div>
    </>
  );
};

export default LogoHeader;
