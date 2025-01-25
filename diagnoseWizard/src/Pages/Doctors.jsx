import { useState } from "react";
import DoctorCard from "../Components/DoctorCard";

const Doctors = () => {
    
    const [doctors, setDoctors] = useState
        ([
            {
                "name": "Tender Palm Hospital",
                "rating": "3.8",
                "fullAddress": "Amar Shaheed Path, Sector-7, Sector 7, Gomti Nagar, Lucknow, Ahmamau, Uttar Pradesh 226001",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipMVO4wLdW_tijKWqbR84NECgf8W9Hs5mdQ2wfo2=w408-h306-k-no`,
                "website": `https://www.tenderpalm.com/`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Lucknow,+Uttar+Pradesh/Tender+Palm+Hospital,+Amar+Shaheed+Path,+Sector-7,+Sector+7,+Gomti+Nagar,+Lucknow,+Ahmamau,+Uttar+Pradesh+226001/@26.8018656,81.0127645,16z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be342ab9377f7:0xbab197a93f5a2c9d!2m2!1d81.0098672!2d26.8048692?entry=ttu`,
                "phoneNumber": "05223500111",
            },
            {
                "name": "PANACEA HOSPITAL",
                "rating": "4.7",
                "fullAddress": "4C, 1076, GomtiNagar, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipN0znneSR9v3cPAruQ3iebG0ZOAGa8I9p-C3pQS=w408-h252-k-no`,
                "website": `http://www.panaceahospital.in/`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Lucknow,+Uttar+Pradesh/4C,+PANACEA+HOSPITAL,+1076,+GomtiNagar,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010/@26.8095389,81.0076047,15z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be2cdbe5d3e0f:0x49f7f6d1d95c61f9!2m2!1d81.0122539!2d26.8212187?entry=ttu`,
                "phoneNumber": "09919083111",
            },
            {
                "name": "SHISHU HOSPITAL ",
                "rating": "3.6",
                "fullAddress": "R255+GPW, Amar Shaheed Path, near Dial100 Police office, Gomti Nagar, Lucknow, Uttar Pradesh 226002",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipNZbss7H3K9qwz5xfROA6rMlssGveSR8aH5Y-YE=w426-h240-k-no`,
                "website": `None`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/R255%2BGPW+SHISHU+HOSPITAL+NEAR+INTERNATIONAL+STADIUM,+Amar+Shaheed+Path,+near+Dial100+Police+office,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226002/@26.8027043,81.0125209,16z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be3172ea6d615:0x1c5a8fc407595cbd!2m2!1d81.0093137!2d26.8088506?entry=ttu`,
                "phoneNumber":"Not Available",
            },
            {
                "name": "MEDIHEALTH MULTISPECIALITY HOSPITAL",
                "rating": "4.9",
                "fullAddress": "Padma Tower, Lallan Singh Nagar, Arjunganj, Lucknow, Uttar Pradesh 226002",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipN9y87Z7EIamEVHtuSl2OwveG6aPqZ8y4UKAArX=w426-h240-k-no`,
                "website": `http://medihealthlko.com/`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/MEDIHEALTH+MULTISPECIALITY+HOSPITAL,+Padma+Tower,+Lallan+Singh+Nagar,+Arjunganj,+Lucknow,+Uttar+Pradesh+226002/@26.8014124,81.0003555,15z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be32aec5c584f:0x72cbaa57e0dee88f!2m2!1d80.9956558!2d26.8049613?entry=ttu`,
                "phoneNumber": "07651832332",

            },
            {
                "name": "HealthCity Trauma Centre & Superspeciality Hospital",
                "rating": "4.5",
                "fullAddress": "Health City Hospital Road, NH-A/B, Vijay Khand Rd, Vijay Khand 2, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipO4c8jZsnktIXzfhjY5si3oh_ourIA_u82eNU9J=w408-h306-k-no`,
                "website": `http://www.lucknowhealthcity.com/`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/HealthCity+Trauma+Centre+%26+Superspeciality+Hospital,+Health+City+Hospital+Road,+NH-A%2FB,+Vijay+Khand+Rd,+Vijay+Khand+2,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010/@26.8266132,80.988764,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be2c94da83907:0x2a73095003dbbf46!2m2!1d80.9935299!2d26.8566484?entry=ttu`,
                "phoneNumber": "09455335566",
            },
            {
                "name": "St Joseph Hospital",
                "rating": "3.5",
                "fullAddress": "Captain Manoj Pandey, 5, Gomti Nagar Bypass Rd, Vishal Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipO1Ep7ncZPrp5Ivq1ZynFY-04fgVsAEn3mc5UnZ=w408-h634-k-no`,
                "website": `http://www.stjosephslucknow.org/experts.php`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/St+Joseph+Hospital,+Captain+Manoj+Pandey,+5,+Gomti+Nagar+Bypass+Rd,+Vishal+Khand,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010/@26.8255303,80.9882553,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be2cc31c47117:0xc12c4fd2be195079!2m2!1d80.9923729!2d26.8537749?entry=ttu`,
                "phoneNumber": "05224054228",
            },
            {
                "name": "Divine Heart & Multispeciality Hospital",
                "rating": "4.3",
                "fullAddress": "V25F+MHW, Institutional Area, Viraj Khand Rd, Viraj Khand - 5, Viraj Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipPta74AQaVVZCR4i1Z8r9XUdMOJnnm7pXmiBc2R=w408-h544-k-no`,
                "website": `https://divinehearthospital.com/`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/V25F%2BMHW+Divine+Heart+%26+Multispeciality+Hospital,+Institutional+Area,+Viraj+Khand+Rd,+Viraj+Khand+-+5,+Viraj+Khand,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010/@26.8285572,80.9959259,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be2f3d2796549:0x449251352fb3e3a6!2m2!1d81.0235985!2d26.8588016?entry=ttu`,
                "phoneNumber": "05222721992",
            },
            {
                "name": "Samvedana Multispeciality Hospital",
                "rating": "4.8",
                "fullAddress": "6E/42, Sector 6, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipOZA8u7iARVoE51iFuRg35FdYeFNGNvXAgCHlFs=w426-h240-k-no`,
                "website": `http://samvedanahealthcare.in/`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/Samvedana+Multispeciality+Hospital,+6E%2F42,+Sector+6,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010/@26.811935,80.9943822,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be38abd332c3d:0xbc75ff1d5078a55e!2m2!1d81.0147699!2d26.8329948?entry=ttu`,
                "phoneNumber": "09151391110",
            },
            {
                "name": "Medwell Hospital",
                "rating": "3.5",
                "fullAddress": "Burlington Crossing, 37, Cantonment Rd, Lucknow, Uttar Pradesh 226001",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipP-6G2HNeW_q6bdXpulXH-eANe8guVLXhxINp5e=w408-h306-k-no`,
                "website": `None`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/Medwell+Hospital,+Burlington+Crossing,+37,+Cantonment+Rd,+Lucknow,+Uttar+Pradesh+226001/@26.8185083,80.9608532,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399bfdaec3e250bf:0xad36a89da078eb0a!2m2!1d80.9369493!2d26.8416017?entry=ttu`,
                "phoneNumber": "05224056111",
            },
            {
                "name": "SPARSH MULTISPECIALITY HOSPITAL",
                "rating": "5.0",
                "fullAddress": "Q2W6+PPC, NH731, Bagiamau, Ahmamau, Uttar Pradesh 226002",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipOMmQYFod4fvQ7n6hZ55yRU8N3yqFShVmgiF0Dl=w408-h544-k-no`,
                "website": `None`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/Q2W6%2BPPC+SPARSH+MULTISPECIALITY+HOSPITAL,+NH731,+Bagiamau,+Ahmamau,+Uttar+Pradesh+226002/@26.8021653,81.0107662,16z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be38488ce99bf:0xfaf0343d141a4d2e!2m2!1d81.0117772!2d26.7968186?entry=ttu`,
                "phoneNumber": "Not Available",
            },
            {
                "name": "Nishat Hospital",
                "rating": "3.6",
                "fullAddress": "Nishat hospital, Sri, J.C.Bose Marg, Kaiserbagh Officer's Colony, Lalbagh, Lucknow, Uttar Pradesh 226001",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipP5JvkR1EhMej5Zq_VjDrZB4TtNA--sLw5FaVwQ=w427-h240-k-no`,
                "website": `https://www.nishathospital.com/`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/Nishat+Hospital,+Nishat+hospital,+Sri,+J.C.Bose+Marg,+Kaiserbagh+Officer's+Colony,+Lalbagh,+Lucknow,+Uttar+Pradesh+226001/@26.8206223,80.9596462,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399bfda436a3a617:0xcd75e98e07d9c9d3!2m2!1d80.9363396!2d26.8503694?entry=ttu`,
                "phoneNumber": "05224082590",
            },
            {
                "name": "Sun Hospital Lucknow",
                "rating": "3.5",
                "fullAddress": "4/4, Vaibhav Khand, Effy Tower, opposite Mantri Awas, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
                "imageSrc": `https://lh5.googleusercontent.com/p/AF1QipOqB7S8pOWwZsZz2rQym_6DsABQ58PL6R4FvlRd=w408-h725-k-no`,
                "website": `None`,
                "directions": `https://www.google.com/maps/dir/IIIT+Lucknow+Admin+Block,+Chak+Ganjaria,+C.+G.+City,+Lucknow,+Uttar+Pradesh/Sun+Hospital+Lucknow,+4%2F4,+Vaibhav+Khand,+Effy+Tower,+opposite+Mantri+Awas,+Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010/@26.8316842,80.9755829,13z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x399be37b925b07fb:0xe514a28ec36dcac1!2m2!1d81.0237994!2d26.8004659!1m5!1m1!1s0x399be3f6a53b4b21:0x5abdf5fe86e330ea!2m2!1d81.0208844!2d26.859815?entry=ttu`,
                "phoneNumber": "08960286288",
            }

        ]);
    
    return (
        <section className="my-[100px]">
<div  id="doctor-container">
    {
        doctors.map((details,index)=>{
return(<DoctorCard key={index} name={details.name} rating={details.rating} imageSrc={details.imageSrc} website={details.website} directions={details.directions} phoneNumber={details.phoneNumber}/>)
        })
    }
</div>
        </section>
    );
}

export default Doctors;