import { useState } from "react";
import Mapper from "../Components/Mapper";
import {useNavigate } from "react-router-dom";

const Footer = (props) => {
    const navigate = useNavigate();

    const navigateToHospitals = () => {
        navigate("/hospitals");
   
    };

    const [diagnoseDetails, setdiagnoseDetails] = useState([
        { "name": "Covid-19", "link": "#" },
        { "name": "Breast-Cancer", "link": "#" },
        { "name": "Pneumonia", "link": "#" },
        { "name": "Diabetes", "link": "#" },
    ]);
    const [healthCheckUp, setHealthCheckUp] = useState([
        {
            "name": "Woman Health",
            "link":"#"
        },
        {
            "name": "Cancer Screening",
            "link":"#"
        },
        {
            "name":"Cardiac Health" ,
            "link":"#"
        },
        {
            "name": "MRI Checkup",
            "link":"#"
        },
    ])
    const [departments, setDepartments] = useState([
        {
            "name":      "General",
            "link":"#"
        },
        {
            "name":"Dermatology" ,
            "link":"#"
        },
        {
            "name": "Cardiology" ,
            "link":"#"
        },
        {
            "name": "Cancer",
            "link":"#"
        },
    ]);
    const [socials, setSocials] = useState([
        {
            "name":"Instagram" ,
            "link":"#"
        },
        {
            "name": "Linkedin",
            "link":"#"
        },
        {
            "name": "Facebook",
            "link":"#"
        },
        {
            "name": "Twitter",
            "link":"#"
        },
    ]);

const handleFocus=()=>{
    props.MessageNameSection.current.focus();
}

    return (
        <section className="bg-[#18A0A9] text-[#FFFFFF]  py-[100px] !w-[100%]" id="Footer" ref={props.FooterSection}> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex xl:flex justify-around text-start">
                <div className="flex flex-col m-[20px]">
                      <span className="flex  mb-[10px] font-semibold text-[24px]"> <img src="assets/healthcare 1(1).svg" alt="" className="mr-[18px]" />DiagnoseWizard</span>
                    <button className="flex border-[1px] border-[#FFFFFF] p-[10px] rounded-xl py-[15px] my-[10px]" onClick={navigateToHospitals}><img src="/assets/Vector(17).svg" alt="" className="mr-[18px]" />Take an appointment</button>
                    <button className="flex border-[1px] border-[#FFFFFF] p-[10px] rounded-xl py-[15px] my-[10px] " onClick={handleFocus} ><img src="assets/mail_FILL0_wght200_GRAD0_opsz24.svg" alt="" className="mr-[18px] text-[#FFFFFF] w-[18px] " />Message us</button>
                </div>
                <div className="m-[20px]">
                    <p className="font-semibold text-[20px]" >DIAGNOSES</p>
                    <ul>
                        <Mapper list={diagnoseDetails} tag={"li"} style={"font-medium text-[18px]"} />
                    </ul>

                </div>
                <div className="m-[20px]">
                    <p className="font-semibold text-[20px]">HEALTH CHECKUP</p>
                    <ul>
                        <Mapper list={healthCheckUp} tag={"li"} style={"font-medium text-[18px]"} />

                    </ul>
                </div>
                <div className="m-[20px]">
                    <p className="font-semibold text-[20px]">DEPARTMENTS</p>
                    <ul>
                        <Mapper list={departments} tag={"li"} style={"font-medium text-[18px]"} />

                    </ul>
                </div>
                <div className="m-[20px]">
                    <p className="font-semibold text-[20px]">CONTACT US</p>
                    <ul>
                        <Mapper list={socials} tag={"li"} style={"font-medium text-[18px]"} />

                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Footer;