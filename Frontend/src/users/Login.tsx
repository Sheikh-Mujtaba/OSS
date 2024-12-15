import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login : React.FC =()=>{
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');

  const navigateToHome = useNavigate();

  const values = {email,password}

  const handleSubmit=(e:React.FormEvent) => {
    e.preventDefault();
    axios.post ('http://localhost:8082/auth/login' , values  , {withCredentials: true})
    .then ((res) => {
      if (res.status === 200)
        navigateToHome('/home')
      window.location.reload();
  
    })
    .catch (err => alert ('error loging in'))
  }
  

    return (
        <>
         <div className="px-[6vw] xl:px-[14vw] py-[4vh] h-[90vh]">
  <div className="h-[100%] flex justify-center items-center">
    <div className="w-[100%] md:w-[50%] h-[70%] bg-white py-6 px-6 flex flex-col justify-center items-center gap-[2rem] rounded-xl">
      <h1 className=" text-4xl font-semibold mb-6">Login</h1>
      <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit} >
        
        {/* Email input */}
        <div>
          <label htmlFor="email" className=" text-lg">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F29F58] border"
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
            className="w-full mt-2 py-2 px-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F29F58] border"
            placeholder="Enter your password"
            required
            onChange={ e=> setPassword (e.target.value)}
          
          />
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#F29F58]  font-semibold rounded-md hover:bg-[#F29F58] focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            Login
          </button>
        </div>
      </form>
     <Link to='/register'> <p className="text-[#F29F58] underline">Create an account</p></Link>
    </div>
  </div>
</div>

        </>

    )
}
export default Login;