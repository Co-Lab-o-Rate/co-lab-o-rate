import React from "react";
import logo from "../../assets/Colaborate_Logo_Hands.png";
import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const goToWelcome = () => {
    navigate("/");
  };

  const goToHome = () => {
    navigate("/home")
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    goToWelcome();
    if (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-cyan-200 text-indigo-900 border-2 border-rose-600 rounded-3xl p-2 ">
      <ul className="flex justify-around">
        <img className="h-[40px] cursor-pointer" src={logo} onClick={goToHome}/>
        <li className="hover:text-gray-400 cursor-pointer mt-2">Artwork</li>
        <li className="hover:text-gray-400 cursor-pointer mt-2">Games</li>
        <li className="hover:text-gray-400 cursor-pointer mt-2">Connections</li>
        <button
          className="inline-block bg-yellow-100 text-black rounded-xl w-30 p-3 leading-none border-2 border-yellow-500"
          onClick={logout}
        >
          logout
        </button>{" "}
      </ul>
    </nav>
  );
};

export default NavBar;
