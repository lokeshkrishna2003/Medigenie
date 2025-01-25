const ServicesCard = (props) => {
    return (
        <div className="flex rounded-lg bg-[#FFFFFF]">
            <div className="m-4 sm:mt-[40px] sm:ml-[40px]">
                <img src={props.imgUrl} alt="" className="hidden sm:block sm:mb-[20px] sm:mr-[44px] sm:justify-start sm:float-left sm:translate-y-[13px] " />
                <div className="flex flex-col float-right sm:w-[326px]">
                    <h2 className="text-2xl text-gray-950 font-bold sm:text-[32px] text-start">
                        {props.serviceHeading}
                    </h2>
                    <p className="font-semibold text-gray-800 text-xl sm:text-[18px]  text-start">
                        {props.serviceDescription}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ServicesCard;