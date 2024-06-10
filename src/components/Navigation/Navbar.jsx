import React from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi"
import Logo from "../../assets/Images/NoBackgroundLogo.png"

function Navbar() {


  return (
    <div className='flex justify-between items-center p-0 lg:p-1 md:p-1 mx-auto  shadow-md fixed top-0 left-0 right-0 bg-white z-20 '>
      <div className='ml-0 lg:ml-5 md:ml-5'>
        <img src={Logo} alt="Logo" className='w-[100px]' />
      </div>
      <div className='relative mr-0 lg:mr-5 md:mr-5'>
        <button className='relative'>
          <HiOutlineShoppingBag className='text-3xl' />
        </button>
      </div>
    </div>
  )
}

export default Navbar
