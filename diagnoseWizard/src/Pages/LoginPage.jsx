import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
const LoginPage = () => {
  const navigate = useNavigate();

 const navigateTo = (address) => {
      navigate(address);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        }),
      })
      const data=await response.json();
      if(data.status==='success'){
      
        sessionStorage.setItem("jwt",data.token);
       
        sessionStorage.setItem("encryptedData",data.data.encryptedData);
        navigateTo('/');
        window.location.reload();
        setEmail("");
        setPassword("");
    
      }
      if (!response.ok) {
        toast.error("Login Failed");

        console.log("The status code :", response.status)
        console.log("login failed");
        if (response.status === 401) {
          console.log("Invalid Credentials")
          toast.error("Wrong Email or Password");

        }
        const errorData = await response.json();
        throw new Error(errorData.error);


      }
     
    } catch (err) {
      console.error(`Error logging the user`, err.message);
    }

  }
  return (
    <section className="flex justify-between my-[100px] py-[100px]" id="LoginPage">
      
      <div>
        <img src="assets/undraw_medicine_b-1-ol.svg" className="h-[400px] " alt="" />
      </div>

      <div className=" w-[475px] shadow-lg px-[35px] py-[20px] rounded-lg">
        <h1 className='text-[40px] font-bold mb-[30px]'>Welcome Back</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="w-[400px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-[400px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />

        <button 
        className="w-[400px] h-[50px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px] "
        onClick={handleLogIn}
        >Login</button>
        <div className='mt-[10px]'>Not registered yet? <Link to="/signup" className='text-[#3b82f6] hover:underline'>Create account</Link></div>
        <Link to="/forgetPassword" className='text-[#3b82f6] hover:underline'>Forget Password?</Link>
      </div>

    </section>
  );
}

export default LoginPage;