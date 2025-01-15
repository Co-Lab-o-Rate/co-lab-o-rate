import { FC, useState } from "react";
import supabase from "../../config/supabaseClient";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useNavigate } from "react-router";

interface ComponentProps {
  //placeholder for props
}

const Login: FC<ComponentProps> = () => {
  const navigate = useNavigate();
  const [continueClicked, setContinueClicked] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const goToSignUpPage = () => {
    navigate("/sign-up");
  };

  const goToInfoPage = () => {
    navigate("/info-form");
  };

  const handleInputChange = (event: any) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleLogIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (data.session?.access_token) {
        goToInfoPage();
      } else {
        setLoginFailed(true);
        console.log(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    return valid;
  };

  return (
    <>
      <LogoHeader />
      <h2 className="mt-6">Sign in to continue</h2>
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-2 m-auto w-1/2 border-2 border-black rounded">
          <div className="m-auto">
            <h3>email</h3>
          </div>
          <div className="mt-2">
            <input
              id="email"
              type="text"
              name="email"
              className="bg-teal-100 m-5 p-1 border-2 border-blue-600"
              onChange={handleInputChange}
              value={formData.email}
            ></input>
            <div
              className={
                !validateEmail(formData.email) && continueClicked
                  ? "text-pink-600"
                  : "invisible h-0"
              }
            >
              Please enter valid email address
            </div>
          </div>
          <div className="m-auto pb-1">
            <h3>password</h3>
          </div>
          <div>
            <input
              id="password"
              type="password"
              name="password"
              className="bg-teal-100 m-5 p-1 border-2 border-blue-600"
              onChange={handleInputChange}
              value={formData.password}
            ></input>
          </div>
        </div>
        <div className={loginFailed ? "text-pink-600" : "invisible h-0"}>
          Invalid email or password
        </div>
        <div>
          <button
            className="bg-red-500 text-white rounded w-20 p-3 leading-none mt-3"
            onClick={() => {
              setContinueClicked(true);
              if (validateEmail(formData.email)) {
                handleLogIn();
              }
            }}
          >
            {" "}
            submit{" "}
          </button>
        </div>
      </div>
      <span>
        <h4 className="inline-block mt-12"> Haven't signed up yet? </h4>
        <button
          className="inline-block bg-yellow-100 text-black rounded w-30 p-3 leading-none mt-3 ml-3 border-2 border-blue-300"
          onClick={() => goToSignUpPage()}
        >
          Sign Up
        </button>
      </span>
    </>
  );
};

export default Login;
