import { useNavigate } from "react-router";
import LogoHeader from "../LogoHeader/LogoHeader";

const WelcomePage = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToVideoPage = () => {
    console.log("TBD go to video page");
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
        an online platform
        <br /> <br />
        where artists
        <br /> <br />
        participate in
        <br /> <br />
        collaborative drawing games
        <br /> <br />
        and monetize their artwork
        <br /> <br />
        into products.
        <br /> <br />
        <div className="flex flex-row justify-center">
          <button
            className="bg-red-500 text-white p-5 rounded m-2"
            onClick={() => goToLoginPage()}
          >
            Login/ Sign Up
          </button>
          <button
            className="bg-red-500 text-white p-5 rounded m-2"
            onClick={() => goToVideoPage()}
          >
            Go to Video
          </button>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
