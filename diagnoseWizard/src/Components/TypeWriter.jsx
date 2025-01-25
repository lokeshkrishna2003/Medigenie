import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

const TypeWriter = (props) => {
    return ( <Typewriter
        words={props.array}
        loop={Infinity}
        cursor
        cursorStyle="_"
        typeSpeed={90}
        deleteSpeed={50}
        delaySpeed={1000}
        cursorColor='#18A0A9'
      /> );
}
 
export default TypeWriter;