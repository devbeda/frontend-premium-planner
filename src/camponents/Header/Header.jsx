import React from 'react'
import { motion } from 'framer-motion'
import logo from "../../assets/images/logo.png"


export default function Header() {
  return (
    <motion.nav
    initial= {{y:-200,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:1}}
    className='w-full h-9 sm:h-16 flex items-center justify-center  bg-yellow-300'>
      <div className='w-[18%] sm:w-[15%] md:w-[8%] pl-3'>
        <img src={logo} className='w-full '/>
      </div>
      <div className=' w-[90%] flex justify-center'>
      <p className='font-button-Text text-white font-semibold text-2xl md:text-3xl'>
        Premium Calculator
       </p>
      </div>
    </motion.nav>
  )
}
