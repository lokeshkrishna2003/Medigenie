import { useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const encryptedData=sessionStorage.getItem('encryptedData');
    const navigate = useNavigate();

    const navigateToLogin = () => {
         navigate("/login");
     };
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/${encryptedData}`, {
                method: 'PATCH',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    "password": password,
                    "passwordConfirm": passwordConfirm
                }),
            })

            if (response.ok) {
                navigateToLogin();
                toast.success("password successfully changed!!\n Now login to continue!!");
                sessionStorage.clear("encryptedData");
                sessionStorage.clear("jwt");
                

            }
            if (!response.ok) {
                console.log("The status code :", response.status)
                console.log("password changing failed");
                if (response.status === 401) {
                    console.log("passwords doesn't match")
                }
                const errorData = await response.json();
                throw new Error(errorData.error);


            }

        } catch (err) {
            console.error(`Error changing the password`, err.message);

        }

        setPassword("");
        setPasswordConfirm("");
    }
    return (
        <section className="flex justify-between my-[100px] py-[100px]">
            <div>
                <img src="assets/authentication-two-color-b35f8.svg" className="h-[400px] " alt="" />
            </div>

            <div className=" w-[475px] shadow-lg px-[35px] py-[20px] rounded-lg flex flex-col">
                <h1 className='text-[40px] font-bold mb-[30px]'>Change password</h1>


                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />

                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                    className="w-[400px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />

                <button
                    className="w-[400px] h-[50px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px] "
                    onClick={handleChangePassword}
                >Change Password</button>
                <div className='mt-[10px]'>Don't want to change password? <a href="#" className='text-[#3b82f6] hover:underline'>Go to Home</a></div>
            </div>

        </section>
    );
}

export default ChangePassword;