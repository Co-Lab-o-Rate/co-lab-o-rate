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
}

const InfoForm: FC<ComponentProps> = ({
    isAdmin, setIsAdmin,
    firstName, setFirstName, 
    lastName, setLastName, 
    age, setAge, 
    location, setLocation,
    email, setEmail,
    phoneNumber, setPhoneNumber
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
            <div className="mt-2">
                <h6>First Name:</h6>
                <input className="bg-teal-100"
                onChange={(event)=>handleInputChange('firstName', event.target.value)}
                value={firstName}
                ></input>
            </div>
            <div className="mt-2">
                <h6>Last Name:</h6>
                <input className="bg-amber-200"
                onChange={(event)=>handleInputChange('lastName', event.target.value)}
                value={lastName}
                ></input>
            </div>
            <div className="mt-2">
                <h6>Age:</h6>
                <input className="bg-red-200"
                onChange={(event)=>handleInputChange('age', event.target.value)}
                value={age}
                ></input>
            </div>
            <div className="mt-2">
                <h6>Location:</h6>
                <input className="bg-amber-200"
                onChange={(event)=>handleInputChange('location', event.target.value)}
                value={location}
                ></input>
            </div>
            <div className="mt-2">
                <h6>Email:</h6>
                <input className="bg-teal-100"
                onChange={(event)=>handleInputChange('email', event.target.value)}
                value={email}
                ></input>
            </div>
            <div className="mt-2 mb-5">
                <h6>Phone Number:</h6>
                <input className="bg-red-200"
                onChange={(event)=>handleInputChange('phoneNumber', event.target.value)}
                value={phoneNumber}
                ></input>
            </div>
        </div>
    )
}

export default InfoForm;