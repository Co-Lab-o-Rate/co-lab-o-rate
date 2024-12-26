import { FC, useState } from "react";
import supabase from "../../config/supabaseClient";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useNavigate } from "react-router";

interface ComponentProps {
    //props placeholder
}

const SignUpForm: FC<ComponentProps> = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: ''
    })
    const [continueClicked, setContinueClicked] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    const goToLoginPage = () => {
        navigate('/login')
    }

    const handleInputChange = (event: any) => {
        setFormData((prevFormData) => {            
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSignUp = async () => {
        try {
            const { error } = await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.full_name
                        },
                        emailRedirectTo: 'https://co-lab-o-rate.com/info-form'
                    },
                }
            )
            if(error){
                console.log('Error signing up!');
            }
            alert('Check your email for verification link')
        } catch(error) {
            alert(error)
        }
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailRegex.test(email);        
        return valid;
    };

        return(
            <>
                <LogoHeader/>
                <h2 className="mt-6">Sign up to continue</h2>
                <div className="flex flex-col justify-center">
                    <div className="grid grid-cols-2 m-auto">
                        <div className="m-auto"><h3>email</h3></div>
                        <div className='mt-2'>
                            <input id='email' type='text' 
                                name='email'
                                className="bg-teal-100 m-5 p-1 border-2 border-blue-600"
                                onChange={handleInputChange}
                                value={formData.email}
                            >
                            </input>
                            <div className={ !validateEmail(formData.email) && continueClicked ? 'text-pink-600' : 'invisible h-0'}>Please enter valid email address</div>
                        </div>
                        <div className="m-auto"><h3>password</h3></div>
                        <div>
                            <input id='password' type='password'
                                name="password"
                                className="bg-teal-100 m-5 p-1 border-2 border-blue-600"
                                onChange={handleInputChange}
                                value={formData.password}
                            >
                            </input>
                        </div>
                    </div>
                    <div className={ passwordInvalid && continueClicked ? 'text-pink-600' : 'invisible h-0'}>Invalid email or password</div>     
                    <div>
                        <button className="bg-red-500 text-white rounded w-20 p-3 leading-none mt-3"
                        onClick={() => {
                            setContinueClicked(true);
                            if(formData.password.length <=6) {
                                setPasswordInvalid(true);
                            } else if(validateEmail(formData.email)){
                                setPasswordInvalid(false);
                                handleSignUp();
                            }
                        }}
                        > submit </button>
                    </div>
                </div>
                   <span>
                        <h4 className="inline-block"> Already Signed Up? </h4>
                        <button className="inline-block bg-emerald-200 text-black rounded w-30 p-3 leading-none mt-3 ml-3" onClick={()=>goToLoginPage()}>Login</button>
                   </span>
            </>
        )
}

export default SignUpForm