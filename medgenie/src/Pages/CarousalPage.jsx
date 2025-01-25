import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import CarousalCard from '../Components/CarousalCard';
import 'swiper/css';
import 'swiper/css/navigation';

import '../App.css';

// import required modules
import { Navigation } from 'swiper/modules';
const CarousalPage = (props) => {
    const [carousalDetails, setCarousalDetails] = useState
        ([
            {
                "count": 5,
                "comment": `"MedGenie is a lifesaver! It helped me understand my symptoms and get a diagnosis quickly. Thanks for the peace of mind!`,
                "name": "Himanshu"
            },
            {
                "count": 4,
                "comment": `"I was worried about my health, but MedGenie provided a clear diagnosis and valuable information. I can't thank you enough!"`,
                "name": "Gyandeep"
            },
            {
                "count": 5,
                "comment": `"What a fantastic resource! The accurate diagnosis I received from MedGenie saved me from unnecessary stress and doctor visits."`,
                "name": "Praveen"
            },
            {
                "count": 5,
                "comment": `"I'm impressed with the accuracy of the diagnoses on MedGenie. It's like having a virtual doctor at my fingertips!."`,
                "name": "Mohit Raghav"
            },


        ])
    return (

        <section className='my-[100px]' id='CarousalPage' ref={props.CarousalPageSection}>
            {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper"> */}
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full justify-between'>
                {
                    carousalDetails.map((details, index) => {
                        return (
                            <CarousalCard key={index} count={details.count} comment={details.comment} name={details.name} />
                        )
                    })
                }
            </div>
            {/* </Swiper> */}
        </section>


    );
}

export default CarousalPage;