import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const Profile=()=> {
   const user=useSelector((store)=>store.user)

    return (
      user && (
      <div>
        <h1><EditProfile user={user}></EditProfile></h1>
      </div>
      )
    );
  }

export default Profile;