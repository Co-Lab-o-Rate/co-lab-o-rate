import { FC, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useNavigate } from "react-router";
import { useSession } from "../../context/SessionContextProvider";
import TermsAndConditions from '../../assets/Terms_and_Conditions.pdf';
import PrivacyPolicy from '../../assets/Privacy_Policy.pdf';

interface ComponentProps {
  //props placeholder
}

interface FormData {
  admin?: boolean | null;
  first_name?: string | null;
  last_name?: string | null;
  age?: string | null;
  location?: string | null;
  phone_number?: string | null;
}

const InfoForm: FC<ComponentProps> = () => {
  useEffect(() => {
    getInfo();
  }, []);

  const auth = useSession();
  const user = auth.session?.user;
  const navigate = useNavigate();

  const [submitClicked, setSubmitClicked] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [consentAgree, setConsentAgree] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    admin: false,
    first_name: "",
    last_name: "",
    age: "",
    location: "",
    phone_number: ""
  });

  const getInfo = async () => {
    try {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);
        if (error) {
          console.log("Error getting form data from database:", error);
        } else {
          setFormData(data[0]);
        }
      }
    } catch {
      console.log("Error in getting data");
    }
  };

  const goToInterview = () => {
    navigate("/interview");
  };

  const handleCheckBox = (event: any) => {
    setDataChanged(true);
    if(event.target.name==='terms_agree'){
      setTermsAgree(!termsAgree);
    } else if(event.target.name==='consent_agree'){
      setConsentAgree(!consentAgree);
    }
  }

  const handleInputChange = (event: any) => {
    setDataChanged(true);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  };

  const getInputValue = (inputType: string) => {
    const input = document.getElementById(inputType) as HTMLInputElement;
    return input ? input.value : null;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();    
    setSubmitClicked(true);
    if (!notAllFieldsComplete()) {
      saveInfo(
        formData.admin ?? false,
        formData.first_name ?? "",
        formData.last_name ?? "",
        formData.age ?? "",
        formData.location ?? "",
        formData.phone_number ?? "",
      );
    }
  }

  const notAllFieldsComplete = () => {    
    const requiredFields = [
      "firstName",
      "lastName",
      "age",
      "location",
      "email"
    ];
    return requiredFields.some((field) => getInputValue(field) === "") || !termsAgree || !consentAgree ;
  };

  const saveInfo = async (
    admin?: boolean,
    firstName?: string,
    lastName?: string,
    age?: string,
    location?: string,
    phoneNumber?: string,
  ) => {    
    const payload = {
      admin: admin,
      first_name: firstName,
      last_name: lastName,
      age: age,
      location: location,
      phone_number: phoneNumber,
    };    

    if (dataChanged && user) {
      const saveProfile = await supabase
        ?.from("profiles")
        .update(payload)
        .eq("id", user.id);
      if (saveProfile?.error) {
        console.log(saveProfile.error);
      } else {
        goToInterview();
      }
    } else {
      goToInterview();
    }
  };

  return (
    <>
      <LogoHeader />
      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <p>
          Thanks for signing up! We'd like to to know a little more about you...
        </p>
        <div className={"mt-2"}>
          <h6>First Name:</h6>
          <input
            className={
              getInputValue("first_name") === "" && submitClicked
                ? "border-2 border-pink-600 bg-teal-100"
                : "bg-teal-100"
            }
            id="first_name"
            name="first_name"
            onChange={handleInputChange}
            value={formData.first_name ?? ""}
          ></input>
          <div
            className={
              getInputValue("first_name") === "" && submitClicked
                ? "text-pink-600"
                : "invisible h-0"
            }
          >
            please enter first name
          </div>
        </div>
        <div className="mt-2">
          <h6>Last Name:</h6>
          <input
            className={
              getInputValue("last_name") === "" && submitClicked
                ? "border-2 border-pink-600 bg-amber-200"
                : "bg-amber-200"
            }
            id="last_name"
            name="last_name"
            onChange={handleInputChange}
            value={formData.last_name ?? ""}
          ></input>
          <div
            className={
              getInputValue("last_name") === "" && submitClicked
                ? "text-pink-600"
                : "invisible h-0"
            }
          >
            please enter last name
          </div>
        </div>
        <div className="mt-2">
          <h6>Age:</h6>
          <input
            className={
              getInputValue("age") === "" && submitClicked
                ? "border-2 border-pink-600 bg-red-200"
                : "bg-red-200"
            }
            id="age"
            name="age"
            onChange={handleInputChange}
            value={formData.age ?? ""}
          ></input>
          <div
            className={
              getInputValue("age") === "" && submitClicked
                ? "text-pink-600"
                : "invisible h-0"
            }
          >
            please enter age
          </div>
        </div>
        <div className="mt-2">
          <h6>Location:</h6>
          <input
            className={
              getInputValue("location") === "" && submitClicked
                ? "border-2 border-pink-600 bg-amber-200"
                : "bg-amber-200"
            }
            id="location"
            name="location"
            onChange={handleInputChange}
            value={formData.location ?? ""}
          ></input>
          <div
            className={
              getInputValue("location") === "" && submitClicked
                ? "text-pink-600"
                : "invisible h-0"
            }
          >
            please enter location
          </div>
        </div>
        <div className="mt-2 mb-5">
          <h6>Phone Number:</h6>
          <input
            className="bg-red-200"
            id="phone_number"
            name="phone_number"
            onChange={handleInputChange}
            value={formData.phone_number ?? ""}
          ></input>
        </div>
        <div>
          <input type="checkbox" id="terms_agree" className="mr-2" name="terms_agree" checked={termsAgree} onChange={handleCheckBox}></input>
          <p className="inline-block">I agree to the </p>
          <a href={TermsAndConditions} target="_blank" className="font-bold"> Terms and Conditions </a>
          <p className="inline-block">and</p>
          <a href={PrivacyPolicy} target="_blank" className="font-bold"> Privacy Policy.</a>
          <div
            className={
             !termsAgree && submitClicked
                ? "text-pink-600"
                : "invisible h-0"
            }
          >
            please check box to agree
          </div>
        </div>
        <div>
          <input type="checkbox" id="consent_agree" className="mr-2" name="consent_agree" checked={consentAgree} onChange={handleCheckBox}></input>
          <p className="inline-block">I consent to receive SMS and acknowledge carrier fees may apply.</p>
          <div
            className={
             !consentAgree && submitClicked
                ? "text-pink-600"
                : "invisible h-0"
            }
          >
            please check box to agree
          </div>
        </div>
       
        <div className="">
          <button
            className="bg-red-500 text-white rounded w-20 p-3 leading-none mt-3"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default InfoForm;
