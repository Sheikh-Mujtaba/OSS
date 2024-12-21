import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register : React.FC =()=>{

const [name,setName] = useState<string>('');
const [email,setEmail] = useState<string>('');
const [password,setPassword] = useState<string>('');

const navigateToLogin = useNavigate();



const values = {email , name ,password};

const handleSubmit=(e:React.FormEvent) => {
  e.preventDefault();
  axios.post ('http://localhost:8082/auth/register' , values )
  .then ((res) => {
    if (res.status === 200)
      navigateToLogin('/login')

  })
  .catch (err => alert ('error register'))
}

    return (
        <>
         <div className="px-[6vw] xl:px-[14vw] py-[4vh] h-[90vh]">
  <div className="h-[100%] flex justify-center items-center">
    <div className="w-[100%] md:w-[50%] h-[75%]  py-6 px-6 flex flex-col justify-center items-center gap-[2rem] rounded-xl focus:ring-[#ABC270] border border-[#ABC270]">
      <h1 className=" text-4xl font-semibold mb-6">Register</h1>
      <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>



      <div>
          <label htmlFor="name" className=" text-lg">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#ABC270] border border-[#ABC270]"
            placeholder="Enter your name"
            required
            onChange={e => setName(e.target.value)}
        
          />
        </div>
        
        {/* Email input */}

        <div>
          <label htmlFor="email" className=" text-lg">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#ABC270] border border-[#ABC270]"
            placeholder="Enter your email"
            required
            onChange={e => setEmail (e.target.value)}
        
          />
        </div>
        
        {/* Password input */}
        <div>
          <label htmlFor="password" className="text-lg">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#ABC270] border border-[#ABC270]"
            placeholder="Enter your password"
            required
            onChange={ e=> setPassword (e.target.value)}
          
          />
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#ABC270]  font-semibold rounded-md hover:bg-[#ABC270]focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            Create Account
          </button>
        </div>
      </form>
     <Link to='/login'> <p className="text-[#ABC270] underline">Already have an account</p></Link>
    </div>
  </div>
</div>

        </>

    )
}
export default Register;