import About from "./About";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
    const navigate = useNavigate();
    const navigateToDiagnoses = () => {
        navigate("/diagnoses");
    };
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 font-Satoshi mt-[40px] mb-[100px] w-[100%]" id="Home" ref={props.HomeSection}>
            <div className="flex  ">
                <div className="bg-[#FFC567] rounded-xl shrink-0 md:w-[497px] md:h-[447px] sm:">
                    <img src="/assets/image 32.svg" alt="" className="w-[300px] md:mb-[30px] shrink-0  mt-[-32px] z-30 md:h-[480px] md:w-[450px] " />
                </div>
            </div>
            <div className="lg:ml-[95px] text-start ">
                <p className="text-[15px] sm:text-[20px] text-[#00A0AA] font-bold flex">Welcome to MediGenie</p>
                <h1 className="text-4xl leading-10 sm:leading-[90px] text-[#000] font-bold flex text-start mt-[20px] sm:text-[70px]">
                    Your Journey to
                    Better Health
                    Starts Here</h1>
                <button
                    onClick={navigateToDiagnoses}
                    className="ml-[0px] mt-[30px] sm:mt-[50px] bg-[#00A0AA] rounded-xl text-[15px] sm:text-[20px] font-bold text-center p-[15px] text-[#FFF] " >Discover More</button>
            </div>

        </section>
    );
}

export default Home;