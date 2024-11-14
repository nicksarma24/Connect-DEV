
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, age, photo } = user || {}; 
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userID) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userID}`, {}, { withCredentials: true });
      console.log("Removed User: " + userID);
      dispatch(removeUserFromFeed(userID));
    } catch (err) {
      console.log(err.message);
    }
  };

  const displayPhoto = photo || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706140800&semt=sph";

  return (
    <div className="card bg-base-300 w-90 shadow-xl border border-solid border-gray-100">
      <figure className="m-2 rounded-lg overflow-hidden max-w-[20rem] max-h-[20rem] min-w-[20rem] min-h-[20rem]"> 
  <div className="w-full h-full rounded-lg">
    <img
      className="w-full h-full object-cover"
      src={displayPhoto}
      alt={`${firstName || "User"} ${lastName || "Profile"}`}
    />
  </div>
</figure>
      <div className="card-body p-2">
        <h2 className="card-title text-lg">{firstName} {lastName}</h2>
        <p className="text-sm">{age}</p>
        <p className="text-sm italic">{about}</p>

        <div className="grid grid-cols-2 gap-2 card-actions justify-center m-2">
          <button 
            className="btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-sm"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button 
            className="btn bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-sm"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
