import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCheckSession from "../hooks/useCheckSession";

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
}

const Update: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get user ID from URL
  const [user, setUser] = useState<UserData | null>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    // Fetch user data based on ID from the URL
    axios
      .get(`http://localhost:8082/auth/getUser/${id}`, { withCredentials: true })
      .then((response) => {
        const fetchedUser = response.data.user;
        setUser(fetchedUser);
        setEmail(fetchedUser.email);
        setName(fetchedUser.name);
        setPassword(fetchedUser.password); // Password might be handled differently, e.g., masked
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values = { email, name, password };

    axios
      .put(`http://localhost:8082/auth/update/${id}`, values, { withCredentials: true })
      .then((response) => {
        alert("Your account has been updated!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating account");
      });
  };

  return (
    <div className="h-[90vh] px-[10vw] py-[4vh]">
      <div className="h-[100%] flex justify-center items-center">
        <div className="w-[100%] md:w-[50%] h-[75%] py-6 px-6 flex flex-col justify-center items-center gap-[2rem] rounded-xl focus:ring-[#ABC270] border border-[#ABC270]">
          <h1 className=" text-4xl font-semibold mb-6">Update Profile</h1>
         {isLoggedIn  ? (
           <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
           <div>
             <label htmlFor="name" className=" text-lg">
               Name
             </label>
             <input
               type="text"
               id="name"
               name="name"
               value={user?.name}
               className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#ABC270] border border-[#ABC270]"
               placeholder="Enter your name"
               onChange={(e) => setName(e.target.value)}
               required
             />
           </div>

           <div>
             <label htmlFor="email" className=" text-lg">
               Email
             </label>
             <input
               type="email"
               id="email"
               name="email"
               value={user?.email}
               className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#ABC270] border border-[#ABC270]"
               placeholder="Enter your email"
               onChange={(e) => setEmail(e.target.value)}
               required
             />
           </div>

           <div>
             <label htmlFor="password" className="text-lg">
               Password
             </label>
             <input
               type="password"
               id="password"
               name="password"
               value={password}
               className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#ABC270] border border-[#ABC270]"
               placeholder="Enter your password"
               onChange={(e) => setPassword(e.target.value)}
               required
             />
           </div>

           <div className="flex justify-center">
             <button
               type="submit"
               className="w-full py-2 text-white bg-[#ABC270] font-semibold rounded-md hover:bg-[#ABC270] focus:outline-none focus:ring-2 focus:ring-white transition"
             >
               Update
             </button>
           </div>
         </form>
         ) : (<h1 className="text-xl">Please Login to update your credentials</h1>)}
        </div>
      </div>
    </div>
  );
};

export default Update;
