import React from 'react';
import IconTokped from '../../../assets/Images/icon Tokped.svg';
import { IoSearch } from "react-icons/io5";
import { IoFilter } from "react-icons/io5"; 
const LastTransaction = () => {
  const date = new Date();

  const ProductTable = [
    {
      id: 1,
      orderId: "12345",
      name: "Shopee",
      item: "Crop Top pants",
      date: date.toLocaleDateString('en-US'),
      price: "Rp100,000",
      platform: "https://img.icons8.com/color/shopee.png"
    },
    {
      id: 2,
      orderId: "12345",
      name: "Tokopedia",
      item: "T-Shirt Rainbow",
      date: date.toLocaleDateString('en-US'),
      price: "Rp100,000",
      platform: IconTokped
    },
    {
      id: 3,
      orderId: "12345",
      name: "Tokopedia",
      item: "Huzzles black cap", 
      date: date.toLocaleDateString('en-US'),
      price: "Rp100,000",
      platform: IconTokped
    },
    {
      id: 4,
      orderId: "12345",
      name: "Shoopee",
      item: "Crop Top pants",
      date: date.toLocaleDateString('en-US'),
      price: "Rp100,000",
      platform: "https://img.icons8.com/color/shopee.png"
    },
    {
      id: 5,
      orderId: "12345",
      name: "Tiktok",
      item: "Crop Top pants",
      date: date.toLocaleDateString('en-US'),
      price: "Rp100,000",
      platform: "https://img.icons8.com/ios-filled/50/tiktok--v1.png"
    }
  ];

  return (
    <div className=" bg-white rounded-lg">
       <div className='flex  flex-col lg:flex-row justify-between w-2/3 mb-3 items-center mx-auto lg:mx-0 space-y-4  '>
      <h1 className='font-bold text-xl'>Last Transaction</h1>
      <div className='relative flex space-x-4'>
        <input
          type="search"
          className='bg-white w-[200px] border-2 rounded-full pl-[50px] pr-4 py-2 focus:outline-none focus:border-blue-500'
          placeholder='Search'
        />
        <div className='absolute top-3 '>
          <IoSearch className='text-gray-400 text-2xl' />
        </div>
        <div className='border-2 border-gray-200 items-center rounded-full px-3 py-3'>
          <IoFilter className='text-gray-400 text-2xl' />
        </div>
      </div>
    </div>
    <div className='overflow-x-auto'>
      <table className="w-2/3 table-auto text-left border-collapse lg:shadow-md">
        <thead>
          <tr>
            <th className="border-b border-gray-200 p-4 text-gray-600 font-semibold text-sm">
              <input
                type="checkbox"
                className="custom-checkbox"
              />
            </th>
            {["Order ID", "Item", "Date", "Price", "Platform"].map((header) => (
              <th
                key={header}
                className="border-b border-gray-200 p-4 text-gray-600 font-semibold text-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='items-center'>
          {ProductTable.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <input
                  type="checkbox"
                  className='custom-checkbox'
                />
              </td>
              <td className="p-4 font-bold">{product.orderId}</td>
              <td className="p-4 font-bold">{product.item}</td>
              <td className="p-4">{product.date}</td>
              <td className="p-4 font-bold">{product.price}</td>
              <td className="p-4 flex items-center gap-2">
                <div className="flex items-center  gap-2 bg-[#fafafa] rounded-full p-2">
                  <img
                    src={product.platform}
                    alt={product.name}
                    className="w-8 h-8 object-cover object-center"
                  />
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default LastTransaction;
