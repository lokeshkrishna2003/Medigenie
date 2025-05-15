import CarousalCardStars from './CarousalCardStars';
import { useEffect, useState } from 'react';

const CarousalCard = (props) => {
    useEffect(() => {
        const starsArray = Array.from({ length: props.count}, (_, index) => (
            <CarousalCardStars key={index} />
        ));
        setStars(starsArray);
    }, [props.count]);

    const [stars, setStars] = useState([]);

    return (
        <div className='my-[25px]'>
            <div className='text-start sm:w-[490px]'>
                <div className='flex '>
                    <img src="assets/Ellipse 10.svg" alt="" />
                    <img src="assets/Vector(16).svg" alt="" className='translate-x-[-150%]' />
                </div>
                <div className='my-[15px] flex'>
                    {stars}
                </div>
                <h1 className='font-bold text-[32px] mb-[15px]'>
                    {props.comment}
                </h1>
                <p className='font-medium text-[20px]'>
                    {props.name}
                </p>
            </div>
        </div>
    );
}

export default CarousalCard;
