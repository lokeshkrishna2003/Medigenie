import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/signup`, {  
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, passwordConfirm }),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                sessionStorage.setItem("jwt", data.token);
                sessionStorage.setItem("encryptedData", data.data.encryptedData);
                sessionStorage.setItem("email",data.email)
                
                toast.success("Signup successful!");
                setTimeout(() => navigate('/'), 1000);
            } else {
                toast.error(data.message || "Signup failed");
            }
        } catch (err) {
            console.error(`Error signing up:`, err.message);
            toast.error("An error occurred while signing up.");
        }
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    };

    return (
        <section className="flex justify-between my-[100px] py-[50px]">
            <div>
                <img src="assets/health-flatline-3a65b.svg" className="h-[500px]" alt="" />
            </div>

            <div className="w-[475px] shadow-lg px-[35px] py-[20px] rounded-lg">
                <h1 className='text-[40px] font-bold mb-[30px]'>Join MediGenie</h1>

                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border p-[10px]" />

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border p-[10px]" />

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border p-[10px]" />

                <input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border p-[10px]" />

                <button className="w-[400px] h-[50px] bg-[#18A0A9] text-white font-medium rounded-xl my-[10px]"
                    onClick={handleSignUp}>Sign Up</button>

                <div className='mt-[10px]'>Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link></div>
            </div>

            <ToastContainer />
        </section>
    );
}

export default SignUpPage;