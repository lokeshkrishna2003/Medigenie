import { useState } from "react";
import ServicesCard from "../Components/ServicesCard";
import { useNavigate } from "react-router-dom";

const ServicesPage = (props) => {
    const navigate = useNavigate();

    const navigateToDiagnoses = () => {
        navigate("/diagnoses");
    };
    const [serviceCardProps, setServiceCardProps] =
        useState([
            {
                "serviceHeading": "Covid 19 Diagnose",
                "serviceDescription": "The service provides immediate medical care to patients with acute illnesses or injuries that require immediate attention",
                "imgUrl": "/assets/image 27.svg"
            },
            {
                "serviceHeading": "Pneumonia Diagnose",
                "serviceDescription": "The service provides immediate  medical care to patients with acute illnesses or injuries that require immediate attention",
                "imgUrl": "/assets/Screen Shot 2023-09-14 at 14.01.svg"
            },
            {
                "serviceHeading": "Diabetes Diagnose",
                "serviceDescription": "The service provides immediate  medical care to patients with acute illnesses or injuries that require immediate attention",
                "imgUrl": "/assets/Screen Shot 2023-09-14 at 14.01(1).svg"
            },
            {
                "serviceHeading": "Thyroid Diagnose",
                "serviceDescription": "The service provides immediate medical care to patients with acute illnesses or injuries that require immediate attention",
                "imgUrl": "/assets/Screen Shot 2023-09-14 at 14.02.svg"
            }
        ])
    return (
        <section id="ServicesPage" ref={props.ServicesPageSection}>
            <div className="my-[100px]" >
                <p className="flex justify-start text-[#09A4AD] font-bold text-[16px]">DIAGNOSES & TREATMENTS</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 lg:flex lg:justify-between w-full">
                    <h2 className="text-2xl sm:leading-[90px] text-[#000] font-bold flex text-start mt-[20px] sm:text-[46px] sm:w-[540px] ">
                        More than 5 specialty and health care diagnose
                    </h2>
                    <button className="mt-[20px] text-[20px] font-bold text-[#ffffff] bg-[#00A0AA] w-[187px] h-[55px] rounded-lg " onClick={navigateToDiagnoses} > See All diagnoses</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                    {
                        serviceCardProps.map((detail, index) => {
                            return (
                                <ServicesCard
                                    key={index}
                                    serviceHeading={detail.serviceHeading}
                                    serviceDescription={detail.serviceDescription}
                                    imgUrl={detail.imgUrl}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default ServicesPage;