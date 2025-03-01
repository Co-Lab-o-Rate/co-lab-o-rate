import { FC, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useSession } from "../../context/SessionContextProvider";
import { useNavigate } from "react-router";
import NavBar from "../NavBar/NavBar";

const HomePage: React.FC = () => {
    return(
        <>
            <NavBar />
            <p>Welcome Home</p>
        </>
    )
}

export default HomePage;