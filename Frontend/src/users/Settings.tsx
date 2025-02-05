import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCheckSession from "../hooks/useCheckSession";


interface UserData {
    id:number,
    name :string ,
    email:string ,
    password : string,
}
const Settings : React.FC = () =>{
    const [user, setUser] = useState<UserData>();
    const {isLoggedIn,setIsLoggedIn} = useCheckSession ();

    useEffect(() => {
      // Check if session exists and get the user info
      axios.get('http://localhost:8082/auth/check-session', { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            setIsLoggedIn(true); // User is logged in
          } else {
            setIsLoggedIn(false); // No session
          }
        })
        .catch((err) => {
          console.log('No session or error fetching session', err);
          setIsLoggedIn(false); // If error occurs, assume user is not logged in
        });
    }, []);

    useEffect(() => {
        // Make the API call to get user data
        axios
          .get("http://localhost:8082/auth/getUser", { withCredentials: true })
          .then((response) => {
            setUser(response.data.user); // Assuming the user data is returned in `response.data.user`
           // Set loading to false when data is fetched
          })
          .catch((err) => {
            console.log(err)
           
          });
      }, [])

    return (
        <>
        <div className="h-[90vh] px-[10vw] py-[4vh]" >
        
          <div className="h-[100%] flex flex-col justify-center items-center gap-[2rem]">

         {isLoggedIn ? (
          <>
           <div className="flex flex-col gap-[2rem] items-start border px-[2rem] py-[2rem]">
          <p className="text-2xl capitalize">Name : {user?.name}</p>
          <p className="text-2xl capitalize">Email : {user?.email}</p>

          <p className="text-2xl capitalize">Password : *****</p>

          </div>

          <div className="flex gap-[2rem]">
             <Link  to={`/update/${user?.id}`}>
             <button className="px-3 py-2 bg-green-500 rounded ">Update</button>
              </Link>
            <button className="px-3 py-2 bg-red-500 rounded">Delete</button>

          </div></>
         ) : (<h1 className="text-2xl">Please Login to update your credentials</h1>)}

          </div>


        </div>
        </>
    )
}
export default Settings ;