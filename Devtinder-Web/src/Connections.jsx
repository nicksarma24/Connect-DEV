// import axios from "axios";
// import { BASE_URL } from "./utils/constants";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnections } from "./utils/ConnectionSlice";

// const Connections = () => {
//     const connections = useSelector((store) => store.connections);
//     const dispatch = useDispatch();

//     const fetchConnections = async () => {
//         try {
//             const res = await axios.get(BASE_URL + "/user/connections", {
//                 withCredentials: true,
//             });
//             dispatch(addConnections(res.data.data));
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         fetchConnections();
//     }, []);

//     if (!connections) return null;
//     if (connections.length === 0) return <h1 className="text-center font-bold">No Connections Found</h1>;
    

//     return (
//         <div className="text-center my-10">
//             <h1 className="text-bold text-2xl">Your Connections</h1>
//             {connections.map((connection) => {
//                 const { _id, firstName, lastName, age, about} = connection;
//                 console.log(age)

//                 return (
//                     <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
//                         <div>
//                             <img 
//                                 // src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706140800&semt=sph" 
//                                 alt="" 
//                                 className="w-20 h-20 rounded-full" 
//                             />
//                         </div>   
//                         <div className="text-left mx-4">
//                             <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
//                             {age !== null && age !== undefined && <p>Age: {age}</p>} 
//                             <p>{`"`+about+`"`}</p>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default Connections;

import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/ConnectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;
    if (connections.length === 0) return <h1 className="text-center font-bold">No Connections Found</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-2xl">Your Connections</h1>
            {connections.map((connection) => {
                const { _id, firstName, lastName, age, about, photo } = connection;
                console.log(age);

                // Use the photo field or fallback to a default image
                const displayPhoto = photo || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706140800&semt=sph";

                return (
                    <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img 
                                src={displayPhoto} 
                                alt={`${firstName}'s profile`} 
                                className="w-20 h-20 rounded-full object-cover" 
                            />
                        </div>   
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age !== null && age !== undefined && <p>Age: {age}</p>} 
                            <p className="italic">{`"` + about + `"`}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;
