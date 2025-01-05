import { FC, useState } from "react";
import supabase from "../../config/supabaseClient";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useNavigate } from "react-router";
import {UserContext, UserContextType} from "../../context/UserContext";
import React from "react";

interface ComponentProps {
    //props placeholder
}

const InfoForm: FC<ComponentProps> = () => {

    const { user } = React.useContext(UserContext) as UserContextType;
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        location: '',
        phoneNumber: ''
    });

    const goToInterview = () => {
        navigate('/interview');
      }

    const handleInputChange = (event: any) => {
        setFormData((prevFormData) => {            
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    const [submitClicked, setSubmitClicked] = useState(false);

    const getInputValue = (inputType: string) => {
      const input = document.getElementById(inputType) as HTMLInputElement;
      return input ? input.value : null;
    }

    const notAllFieldsComplete = () => {
      const requiredFields = [
        'firstName',
        'lastName',
        'age',
        'location',
        'email'
      ]
      return requiredFields.some((field) => getInputValue(field) === '');
    }

    const saveInfo = async (admin?: boolean, firstName?: string, lastName?: string, age?: string, location?: string, phoneNumber?: string) => {
        
        const payload = {
            admin: admin || false,
            first_name: firstName,
            last_name: lastName,
            age: age,
            location: location,
            phone_number: phoneNumber
        }

        const saveProfile = await supabase?.from('profiles').update(payload).eq("id", user.id);

        if(saveProfile?.error){
            console.log(saveProfile.error);
        } else {
            goToInterview();
        }
    }

    return(
        <>
        <LogoHeader/>
        <div className="flex flex-col">
            <div className="invisible">
                <h6>Admin?</h6>
                <input type='checkbox'
                    name='admin'
                    onChange={() => {setIsAdmin(true)}}
                >
                </input>
            </div>
            <p>Thanks for signing up! We'd like to to know a little more about you...</p>
            <div className={ "mt-2"}>
                <h6>First Name:</h6>
                <input className={getInputValue('firstName') === '' && submitClicked ? "border-2 border-pink-600 bg-teal-100" : "bg-teal-100"}
                id='firstName'
                name='firstName'
                onChange={handleInputChange}
                value={formData.firstName}
                ></input>
                <div className={getInputValue('firstName') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter first name
                </div>
            </div>
            <div className="mt-2">
                <h6>Last Name:</h6>
                <input className={getInputValue('lastName') === '' && submitClicked ? "border-2 border-pink-600 bg-amber-200" : "bg-amber-200"}
                id='lastName'
                name='lastName'
                onChange={handleInputChange}                
                value={formData.lastName}
                ></input>
                <div className={getInputValue('lastName') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter last name
                </div>
            </div>
            <div className="mt-2">
                <h6>Age:</h6>
                <input className={getInputValue('age') === '' && submitClicked ? "border-2 border-pink-600 bg-red-200" : "bg-red-200"}
                id='age'
                name='age'
                onChange={handleInputChange}                
                value={formData.age}
                ></input>
                <div className={getInputValue('age') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter age
                </div>
            </div>
            <div className="mt-2">
                <h6>Location:</h6>
                <input className={getInputValue('location') === '' && submitClicked ? "border-2 border-pink-600 bg-amber-200" : "bg-amber-200"}
                id='location'
                name='location'
                onChange={handleInputChange}                
                value={formData.location}
                ></input>
                 <div className={getInputValue('location') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter location
                </div>
            </div>
            <div className="mt-2 mb-5">
                <h6>Phone Number:</h6>
                <input className="bg-red-200"
                id='phoneNumber'
                name='phoneNumber'
                onChange={handleInputChange}                
                value={formData.phoneNumber}
                ></input>
            </div>
            <div className="">
                <button className='bg-red-500 text-white rounded w-20 p-3 leading-none mt-3' 
                    onClick={()=> {
                        setSubmitClicked(true);
                        if(!notAllFieldsComplete()){
                            saveInfo(isAdmin, formData.firstName, formData.lastName, formData.age, formData.location, formData.phoneNumber);
                        }
                    }}>
                    Next
                </button>
            </div>
        </div>
        </>
    )
}

export default InfoForm;