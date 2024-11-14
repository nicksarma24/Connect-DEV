import Navbar from "./Navbar"
import { Outlet, useNavigate} from "react-router-dom"
// import Footer from "./Footer"
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
// const location = useLocation();

const Body = () => {
  const userData=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchUser=async()=>{
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{ withCredentials: true,})
      dispatch(addUser(res.data))
    } catch(err){
      if(err.response && err.response.status==401){
      navigate("/login") //if the token gets deleted then take user to login page
      } else console.log("Fetch user error",err)
    } 
  }
  useEffect(()=>{
    if(!userData){
    fetchUser();
    }
  },[])

  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        {/* <Footer></Footer>       */}
    </div>
  )
}

export default Body