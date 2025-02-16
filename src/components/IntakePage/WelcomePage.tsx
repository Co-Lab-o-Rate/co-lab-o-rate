import { useNavigate } from "react-router";
import LogoHeader from "../LogoHeader/LogoHeader";

const WelcomePage = () => {
  const navigate = useNavigate();

  const goToSignUpPage = () => {
    navigate("/sign-up");
  };

  const goToVideoPage = () => {
    navigate("/video");
  };

  return (
    <>
      <LogoHeader />
      <div className="flex flex-col">
        <br />
        Welcome to
        <br /> <br />
        Co-Lab-o-Rate,
        <br /> <br />
        a virtual art lab
        <br /> <br />
        where co-creative games
        <br /> <br />
        are engineered into
        <br /> <br />
        monetizable products
        <br /> <br />
        and market insights.
        <br /> <br />
        <div className="flex flex-row justify-center">
          <button
            className="bg-red-500 text-white p-5 rounded m-2"
            onClick={() => goToSignUpPage()}
          >
            Login / Sign Up
          </button>
          <button
            className="bg-red-500 text-white p-5 rounded m-2"
            onClick={() => goToVideoPage()}
          >
            Go to Video
          </button>
        </div>
      </div>
      <div className="bottom-0 mt-20">
        Contact Us: 
        <a className="font-bold" href="mailto:hello@co-lab-o-rate.com" target="_self"> hello@co-lab-o-rate.com</a>
      </div>
    </>
  );
};

export default WelcomePage;
