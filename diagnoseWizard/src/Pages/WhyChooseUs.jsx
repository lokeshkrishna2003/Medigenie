import { useState } from "react";
import WhyChooseUsPoint from "../Components/WhyChooseUsPoint";
import TypeWriter from "../Components/TypeWriter";
import { useNavigate } from "react-router-dom";

const WhyChooseUs = (props) => {
    const navigate = useNavigate();

    const navigateToHospitals = () => {
        navigate("/hospitals");

    };
    const [points, setPoints] = useState
        ([
            {
                "point": "Safety First Quality Must"
            },
            {
                "point": "Patient-Centric Approach"
            },
            {
                "point": "Focused Leadership"
            },
            {
                "point": "Cutting-Edge Technology"
            },

            {
                "point": "Transparent Pricing"
            },
            {
                "point": "Coordinated Care"
            },
        ])
    const [array, setArray] = useState(["Wellness", "Compassion", "Quality", " Strength", "Fitness", "Resilience", " Energy",]);
    return (
        <section className="my-[100px] text-start" id="WhyChooseUs" ref={props.WhyChooseUsSection}>
            <div >
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 lg:flex lg:justify-between w-full sm:px-[75px] ">

                    <div className="inline-block translate-y-[-128px]">
                        <img src="assets/image 36.svg" alt="" className="z-30 translate-y-[128px] sm:ml-[82px] relative" />
                        <div className="bg-[#FFC567] w-[250px] sm:w-[385px] h-[128px] rounded-xl "> </div>
                    </div>

                    <div>
                        <h3 className="text-start font-bold text-[40px] mb-[30px]">
                            Why Choose Us?
                        </h3>
                        {
                            points.map((detail, index) => {
                                return (
                                    <WhyChooseUsPoint
                                        key={index}
                                        point={detail.point} />
                                )
                            })
                        }
                    </div>
                </div>

                <div className="flex-col lg:w-full text-start mt-5 sm:mt-0 sm:px-[75px]">
                    <h3 className="font-bold text-[40px] text-start mb-[30px]">
                        <TypeWriter array={array} />
                    </h3>
                    <p className="font-medium text-[20px] text-start sm:mb-[45px]">
                        They live in Bookmarks grove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it.
                    </p>
                    <button className="ml-[0px] mt-[20px] bg-[#00A0AA] rounded-xl text-[15px] sm:text-[20px] font-bold text-center p-[15px] text-[#FFF] " onClick={navigateToHospitals}>
                        Take An Appointment
                    </button>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;