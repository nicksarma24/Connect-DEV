import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "./utils/constants"
import { addRequests, removeRequest } from "./utils/requestSlice"
import { useEffect } from "react"
import axios from "axios"

const Request = () => {
    const requests=useSelector((store)=>store.request)
    const dispatch=useDispatch()

    const reviewRequest=async(status, _id)=>{
        try{
            await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},
                {withCredentials:true}
            )
            dispatch(removeRequest(_id))

        } catch(err){
            console.log(err.message)
        }
    }

    const fetchRequest=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/request/received",{
                withCredentials:true, 
            })
            dispatch(addRequests(res.data.data))
        } catch(err){
            console.log(err.message)
        }
    }
    useEffect(()=>{
        fetchRequest()
    },[])

    if (!requests) return null;
    if (requests.length === 0) return <h1 className="text-center font-bold m-4">No Request Found</h1>;

 return (
    <div className="text-center my-10">
        <h1 className="text-bold text-2xl">Connection Requests</h1>
        {requests.map((request) => {
            const { _id, firstName, lastName, age, about,photo } = request.fromUserID;
            const displayPhoto = photo || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706140800&semt=sph";


            return (
                <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                    {/* Image and Text Container */}
                    <div className="flex items-center">
                        <img 
                            src={displayPhoto}
                            alt="" 
                            className="w-20 h-20 rounded-full" 
                        />
                        <div className="text-left ml-4">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age !== null && age !== undefined && <p>Age: {age}</p>} 
                            <p className="italic">{`"` + about + `"`}</p>
                        </div>
                    </div>

                    {/* Buttons on the Right */}
                    <div className="flex">
                        <button className="btn bg-red-500 mx-2 text-black" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                        <button className="btn bg-green-500 mx-2 text-black" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                    </div>
                </div>
            );
        })}
    </div>
);

              
}

export default Request