import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';

const PageNotFound = () => {
    const navigate = useNavigate();

    const navigateTo = (address) => {
        navigate(address);
    };
    const toHome = () => {
        toast.success("Welcome back!!")
        navigateTo('/');
    }
    return (
        <section>
            <div className="absolute" id="NotFound" >
                <div className="flex justify-around translate-y-[100px]">
                    <h1 className="font-bold text-[40px] text-[#18A0A9] text-[Indie Flower] " >I think you lost your way</h1>
                    <button onClick={toHome} className="w-auto h-[50px] bg-[#18A0A9] text-[#FFFFFF] font-bold p-[10px] rounded-xl my-[10px] z-30 "> Return to home</button>
                </div>

                <img src='assets/PageNotFound.png' alt="" className="z-[-1] mx-auto mt-6 scale-[80%]" />

            </div>
        </section>
    );
}

export default PageNotFound;
