import React from 'react'

// React Icons
import { FaBox, FaClipboardCheck } from "react-icons/fa";
import { BsClipboard2XFill } from "react-icons/bs";

const ItemBox = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-5'>

        <div className='flex  items-center gap-5 shadow-lg p-5 rounded-lg'>
            <div className='bg-gray-200 rounded-full p-3'>
               <FaBox/>
            </div>
            <div>
                <h1>Total Products</h1>
                <div className='flex items-center gap-2'>
                <p className='text-3xl font-bold'>100</p>
                    <div className='flex items-center gap-1'>
                    <img  src="https://img.icons8.com/fluency-systems-filled/000000/bounce-up.png" alt="bounce-up" className='w-5 h-5 bg-green-500 p-1 rounded-full filter '/>
                    <p className='text-green-500 font-bold'>+2.5%</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex  items-center gap-5 shadow-lg p-5 rounded-lg'>
            <div className='bg-gray-200 rounded-full p-3'>
               <FaClipboardCheck className='text-xl'/>
            </div>
            <div>
                <h1>Completed Order</h1>
                <div className='flex items-center gap-2'>
                <p className='text-3xl font-bold'>220</p>
                <div className='flex items-center gap-1'>
                <img  src="https://img.icons8.com/fluency-systems-filled/000000/bounce-up.png" alt="bounce-up" className='w-5 h-5 bg-green-500 p-1 rounded-full filter '/>
                <p className='text-green-500 font-bold'>+2.5%</p>
                </div>
                </div>
            </div>
        </div>

        <div className='flex  items-center gap-5 shadow-lg p-5 rounded-lg'>
            <div className='bg-gray-200 rounded-full p-3'>
               <BsClipboard2XFill className='text-xl'/>
            </div>
            <div>
                <h1>Canceled Order</h1>
                <div className='flex items-center gap-2'>
                <p className='text-3xl font-bold'>110</p>
                <div className='flex items-center gap-1'>
                <img src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="delete-sign" className='w-5 h-5 bg-red-500 p-1 rounded-full'/>
                <p className='text-red-500 font-bold'>+2.5%</p>
                </div>
                </div>
            </div>
        </div>

        <div className='flex  items-center gap-5 shadow-lg p-5 rounded-lg'>
            <div className='bg-gray-200 rounded-full p-3'>
            <img width="25" height="20" src="https://img.icons8.com/ios-glyphs/30/certificate.png" alt="certificate"/>
            </div>
            <div>
                <h1>Top Products</h1>
                <div className='flex items-center gap-2'>
                <p className='text-3xl font-bold'>100</p>
                <div className='flex items-center gap-1'>
                <img  src="https://img.icons8.com/fluency-systems-filled/000000/bounce-up.png" alt="bounce-up" className='w-5 h-5 bg-green-500 p-1 rounded-full filter '/>
                <p className='text-green-500 font-bold'>+2.5%</p>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ItemBox