import { useState } from "react";
import TypeWriter from "../Components/TypeWriter";
const DiagnosesHeading = () => {
    const [array,setarray]=useState(["Diagnoses Today","Tomorrow's Health "])
    return ( 
        <div>
            <h1 className="text-[20px] font-bold text-start" >
          <span className=" text-[35px]">MediGenie:</span>  
         <span className="text-[#18A0A9]"> <TypeWriter array={array}  /></span>
            </h1>
        </div>
     );
}
 
export default DiagnosesHeading;