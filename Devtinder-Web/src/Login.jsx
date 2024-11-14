import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

export default function Login() {
  const [emailId, setEmaildId] = useState("Lisa@gmail.com");
  const [password, setPassword] = useState("Lisa@123");
  const [firstName, setFirstName]=useState("")
  const [lastName, setLastName]=useState("")
  const [isLoginForm, setIsLoginForm]=useState(true)
  const [error, setError]=useState("")

  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogin = async () => {
  

    try {
      const res = await axios.post(
        BASE_URL+"/login",
        { emailID: emailId, password },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data.user)); // Pass only the user data here
      return navigate("/feed")
    } catch (err) {
      console.log(err)
      setError(err?.response?.data || "Something went wrong")
    }
  };

  const handleSignUp=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/signup", {firstName, lastName, emailID: emailId, password},{ withCredentials: true})
      console.log("this is user data"+res.data.data)
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    } catch(err){
      setError(err?.response?.data || "Something went wrong")
    }
  }


  return (
    // <div className="flex justify-center my-10">
    // <div className="flex justify-center">

    <div className={`flex justify-center ${isLoginForm ? 'my-10' : 'my-1'}`}>

      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
       
          <h2 className="card-title flex justify-center"> 
          {isLoginForm?"Login":"SignUp"}
          </h2>

          <div>
            {!isLoginForm && <>
             <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label> </>
            }

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmaildId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
         <p className="text-red-400">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>
              {isLoginForm? "Login": "SignUp"}
            </button>
          </div>
          <p className="m-auto my-2 cursor-pointer  hover:text-blue-500" onClick={()=>{setIsLoginForm(value=>!value)}}>{isLoginForm? "New User? Signup here": 
          "Existing Usre? Login here"}</p>
        </div>
      </div>
    </div>
  );
}
