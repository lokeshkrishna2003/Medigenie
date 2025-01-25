const AboutImageCard = (props) => {
    return (
        <div className="mr-[118px] mt-[35px]">
            <img src={props.imgUrl} alt="" className="z-[-1]" />
            <div className="w-[160px] h-[60px] sm:w-[192px] sm:h-[94px] bg-[#00A0AA] text-[#FFFFFF] px-[25px] py-[15px]  mt-[-47px] z-40 ml-[20px] relative rounded-lg">
                <p className="font-bold text-[10px] sm:text-[16px] text-start">For your health</p>
                <p className="font-bold text-[18px] sm:text-[24px] text-start">{props.docTitle}</p>

            </div>
        </div>
    );
}

export default AboutImageCard;