import { FC, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useSession } from "../../context/SessionContextProvider";
import { useNavigate } from "react-router";

const HomePage: React.FC = () => {
    return(
        <>
            <LogoHeader />
            <p>Welcome Home</p>
        </>
    )
}

export default HomePage;