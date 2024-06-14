import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { HiOutlineShoppingBag } from "react-icons/hi"
import Logo from "../../assets/Images/NoBackgroundLogo.png"

function Navbar() {
  const cartQuantity = useSelector((state) => state.cart.cartTotalQuantity);

 
  return (
    <div className='flex justify-between items-center p-0 lg:p-1 md:p-1 mx-auto  shadow-md fixed top-0 left-0 right-0 bg-white z-20 '>
      <Link to="/">
      <div className='ml-0 lg:ml-5 md:ml-5'>
        <img src={Logo} alt="Logo" className='w-[100px]' />
      </div>
      </Link>

      <Link to="/cart">
      <div className='relative mr-4 lg:mr-5 md:mr-5'>
        <button className='relative'>
          <HiOutlineShoppingBag className='text-3xl' />
          <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center'>
              {cartQuantity}
          </span>
        </button>
      </div>
      </Link>

    </div>
  )
}

export default Navbar
