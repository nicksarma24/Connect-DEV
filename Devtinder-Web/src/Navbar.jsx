
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { removeUser } from "./utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user); // Access user from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Fallback photo URL in case user.photo is not set
  const displayPhoto = user?.photo || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706140800&semt=sph";

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
       <Link to="/feed" className="btn btn-ghost text-xl inline-flex items-center">
  <span className="text-blue-500">Dev</span>
  <span className="text-pink-500 -ml-1">Social</span>
</Link>


      </div>

      {user && (
        <div className="flex-none gap-2">
          <span className="text-lg">
            Welcome,{" "}
            <span className="font-bold">
              {user.firstName} {user.lastName}
            </span>
          </span>

          <div className="flex-control">
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    src={displayPhoto} // Use dynamic photo URL from the user object or fallback
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/request">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
