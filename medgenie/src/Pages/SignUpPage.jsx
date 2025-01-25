import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const SignUpPage = () => {
    const navigate = useNavigate();

    const navigateTo = (address) => {
        navigate(address);
    };
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/signup`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                    "passwordConfirm": passwordConfirm
                }),
            })
            const data = await response.json();
            if (data.status === 'success') {
                console.log("signed in");
                sessionStorage.setItem("jwt", data.token);
                sessionStorage.setItem("encryptedData", data.data.encryptedData);
                navigateTo('/');
            }
            if (!response.ok) {
                console.log("The status code :", response.status)
                console.log("signup failed");

                toast.error("passwords doesn't match");


                const errorData = await response.json();
                throw new Error(errorData.error);


            }

            window.location.reload();
        } catch (err) {
            console.error(`Error signing in the user`, err.message);

        }
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    }
    return (
        <section className="flex justify-between my-[100px] py-[50px]">
            <div>
                <img src="assets/health-flatline-3a65b.svg" className="h-[500px] " alt="" />
            </div>

            <div className=" w-[475px] shadow-lg px-[35px] py-[20px] rounded-lg">
                <h1 className='text-[40px] font-bold mb-[30px]'>Join MedGenie</h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />
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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />
                <button
                    className="w-[400px] h-[50px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px] "
                    onClick={handleSignUp}
                >Sign Up</button>
                <div className='mt-[10px]'>Already have an account? <Link to="/login" className='text-[#3b82f6] hover:underline'>Login</Link></div>
            </div>

        </section>
    );
}

export default SignUpPage;