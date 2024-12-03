import { Dispatch, FC, SetStateAction } from "react";

interface ComponentProps {
    isAdmin: boolean;
    setIsAdmin: Dispatch<SetStateAction<boolean>>
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>> 
    age: string;
    setAge: Dispatch<SetStateAction<string>>
    location: string;
    setLocation: Dispatch<SetStateAction<string>>
    email: string;
    setEmail: Dispatch<SetStateAction<string>>
    phoneNumber: string;
    setPhoneNumber: Dispatch<SetStateAction<string>>
    submitClicked: boolean;
    getInputValue: (inputType: string) => string | null;
}

const InfoForm: FC<ComponentProps> = ({
    isAdmin, setIsAdmin,
    firstName, setFirstName, 
    lastName, setLastName, 
    age, setAge, 
    location, setLocation,
    email, setEmail,
    phoneNumber, setPhoneNumber,
    submitClicked, getInputValue
}) => {

    const handleInputChange = (type: string, value: string) => {
        switch(type){
            case('firstName'):
                setFirstName(value);
                break;
            case('lastName'):
                setLastName(value);
                break;
            case('age'):
                setAge(value);
                break;
            case('location'):
                setLocation(value);
                break;
            case('email'):
                setEmail(value);
                break;
            case('phoneNumber'):
                setPhoneNumber(value);
                break;
            default:
                console.log('something went wrong');
        }
    }

    return(
        <div className="flex flex-col">
            <div className="invisible">
                <h6>Admin?</h6>
                <input type='checkbox'
                    onChange={() => setIsAdmin(!isAdmin)}
                >
                </input>
            </div>
            <div className={ "mt-2"}>
                <h6>First Name:</h6>
                <input className={getInputValue('firstName') === '' && submitClicked ? "border-2 border-pink-600 bg-teal-100" : "bg-teal-100"}
                id='firstName'
                onChange={(event)=>handleInputChange('firstName', event.target.value)}
                value={firstName}
                ></input>
                <div className={getInputValue('firstName') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter first name
                </div>
            </div>
            <div className="mt-2">
                <h6>Last Name:</h6>
                <input className={getInputValue('lastName') === '' && submitClicked ? "border-2 border-pink-600 bg-amber-200" : "bg-amber-200"}
                id='lastName'
                onChange={(event)=>handleInputChange('lastName', event.target.value)}
                value={lastName}
                ></input>
                <div className={getInputValue('lastName') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter last name
                </div>
            </div>
            <div className="mt-2">
                <h6>Age:</h6>
                <input className={getInputValue('age') === '' && submitClicked ? "border-2 border-pink-600 bg-red-200" : "bg-red-200"}
                id='age'
                onChange={(event)=>handleInputChange('age', event.target.value)}
                value={age}
                ></input>
                <div className={getInputValue('age') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter age
                </div>
            </div>
            <div className="mt-2">
                <h6>Location:</h6>
                <input className={getInputValue('location') === '' && submitClicked ? "border-2 border-pink-600 bg-amber-200" : "bg-amber-200"}
                id='location'
                onChange={(event)=>handleInputChange('location', event.target.value)}
                value={location}
                ></input>
                 <div className={getInputValue('location') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter location
                </div>
            </div>
            <div className="mt-2">
                <h6>Email:</h6>
                <input className={getInputValue('email') === '' && submitClicked ? "border-2 border-pink-600 bg-teal-100" : "bg-teal-100"}
                id='email'
                onChange={(event)=>handleInputChange('email', event.target.value)}
                value={email}
                ></input>
                  <div className={getInputValue('email') === '' && submitClicked ? "text-pink-600" : "invisible h-0"}>
                    please enter email
                </div>
            </div>
            <div className="mt-2 mb-5">
                <h6>Phone Number:</h6>
                <input className="bg-red-200"
                id='phone'
                onChange={(event)=>handleInputChange('phoneNumber', event.target.value)}
                value={phoneNumber}
                ></input>
            </div>
        </div>
    )
}

export default InfoForm;