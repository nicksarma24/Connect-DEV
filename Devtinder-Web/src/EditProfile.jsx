import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({user}) => {
  const [firstName, setFirst] = useState(user.firstName);
  const [lastName, setLast] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const dispatch=useDispatch()
  const [showtoast, setShowtoast]=useState(false)
  const [photo, setphoto]=useState(user.photo)
  
  //i am not keeping age,gender and other stuffs

  const saveProfile=async()=>{
    try{
        const res=await axios.patch(
            BASE_URL+"/profile/edit",{
                firstName, lastName, about,age, photo,
            }, {withCredentials:true}
        )
        
        dispatch(addUser(res?.data?.data))
        setShowtoast(true);
        setTimeout(()=>{
            setShowtoast(false)
        },3000)
    } catch(err){
        console.log("photo ka error hai"+err.message)
    }
  }


  return (
    <>
      <div className="flex justify-evenly">
        <div className="flex my-3">
          <div className="card bg-base-300 md:w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title flex justify-center">
                Edit Your Profile
              </h2>

              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">FirstName</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirst(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">lastName</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLast(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photo} // The photo URL is stored here
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setphoto(e.target.value)} // Update the state when the URL changes
                  />
                </label>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-primary m-4" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <UserCard user={{ firstName, lastName, about, age, photo }} />
        </div>
      </div>
      {showtoast && (
        <div className="toast toast-top  toast-center">
          <div className="alert alert-success flex justify-center">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile