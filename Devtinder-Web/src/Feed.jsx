// import axios from "axios"
// import { BASE_URL } from "./utils/constants"
// import { useDispatch, useSelector } from "react-redux"
// import { addFeed } from "./utils/feedSlice"
// import { useEffect } from "react"
// import UserCard from "./UserCard"

// const Feed = () => {
//   const feed=useSelector((store)=>store.feed)
//   console.log(feed)
//   const dispatch=useDispatch()

//   const getFeed=async()=>{
//     if(feed) return;
//     try{const res=await axios.get(BASE_URL+"/feed", {withCredentials: true});
//     dispatch(addFeed(res.data))
//     }catch(err) {console.log(err.message)}
//   }
//   useEffect(()=>{
//     getFeed();
//   },[feed])

//   if(!feed) return ;
//   if(feed.length<=0) return <h1 className="flex justify-center">NO USER FOUND</h1>


//   return (
//     feed && (
//     <div className="flex justify-center mx-4 mt-3 "> <UserCard user={feed[0]}/></div>
//     )
//   )
// }

// export default Feed

import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // To track any error

  // Function to fetch feed
  const getFeed = async () => {
    try {
      // Only make the request if feed is empty or null
      if (!feed || feed.length === 0) {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
        dispatch(addFeed(res.data));
      }
    } catch (err) {
      setError("Failed to load feed.");
      console.error(err.message);
    } finally {
      setLoading(false); // Set loading to false once request completes
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // Dependency on feed so it runs when feed changes

  // Loading and error handling
  if (loading) {
    return <h1 className="flex justify-center">Loading...</h1>;
  }

  if (error) {
    return <h1 className="flex justify-center text-red-500">{error}</h1>;
  }

  // Check if feed is empty after loading
  if (feed && feed.length <= 0) {
    return <h1 className="flex justify-center">No User Found</h1>;
  }

  // Feed loaded successfully, render content
  return (
    <div className="flex justify-center mx-4 mt-3">
      {/* Render UserCard for the first user, you can map through the feed for all users if needed */}
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
