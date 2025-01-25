import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const ConnectWithUs = (props) => {


    const navigate = useNavigate();

    const navigateTo = (address) => {
        navigate(address);
    };
    const encryptedData = sessionStorage.getItem('encryptedData');
    const jwt = sessionStorage.getItem('jwt');
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleSendMessage = async (e) => {
        if (!jwt) {
            toast.error("Please login to send us a message!!");
            navigateTo('/login');
        } else {
            e.preventDefault();
            try {
                const response = await fetch(`http://localhost:3000/sendMessage/${encryptedData}`, {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({

                        "name": name,
                        "message": message
                    }),
                })

                if (response.ok) {
                    toast.success("Thanks for your message!!")
                    console.log("Message sent successfully!");
                    setName("");
                    setMessage("");

                }
                if (!response.ok) {
                    console.log("The status code :", response.status)
                    console.log("message sending failed");
                    if (response.status === 401) {
                        console.log("passwords doesn't match")
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.error);


                }

            } catch (err) {
                console.error(`Error sending the message`, err.message);

            }


        }
    }
    return (
        <section className="py-[100px]" id="ConnectWithUs" ref={props.ConnectWithUsSection}>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 flex text-start justify-between">
                <div className="sm:w-[464px]">
                    <p className="font-bold text-xl sm:text-[12px]  text-[#09A4AD]">
                        Connect With Us
                    </p>
                    <h1 className="text-[30px] leading-[30px] sm:leading-[40px] text-[#000] font-bold flex text-start mt-[20px] sm:text-[40px] mb-[40px]">
                        Connect with DiagnoseWizard, Take a step towards prevention
                    </h1>
                    <p className="font-medium text-[20px]">
                        Far far away, behind the word mountains, far from the countries Waganda and Asgard.
                    </p>
                </div>
                <div className="w-full sm:w-[475px] h-[auto] shadow-lg px-[35px] py-[20px] rounded-lg mt-[30px]">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        ref={props.MessageNameSection}
                        onChange={handleNameChange}
                        className="w-full sm:w-[400px] sm:h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />


                    <input
                        type="text"
                        placeholder="Message"
                        value={message}
                        onChange={handleMessageChange}
                        className="w-full  sm:w-[400px] h-[150px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]" />
                    <button
                        onClick={handleSendMessage}
                        className="w-full sm:w-[400px] h-[50px] bg-[#18A0A9] text-[#FFFFFF] rounded-xl my-[10px] ">
                        Submit Now
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ConnectWithUs;