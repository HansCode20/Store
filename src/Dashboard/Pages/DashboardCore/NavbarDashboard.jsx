import React, { useEffect, useState } from 'react';

// React Icons
import { MdDateRange } from 'react-icons/md';
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

// React Headless UI
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const NavbarDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const date = new Date();
      const hour = date.getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 15) {
        setGreeting("Good Afternoon");
      } else if (hour >= 15 && hour < 18) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    getGreeting();
  }, []);

  useEffect(() => {
    const getUsername = () => {
      setUsername(localStorage.getItem("username"));
    };
    getUsername();

    const getProfileImage = () => {
      setProfileImage(localStorage.getItem("profileImage"));
    };
    getProfileImage();

  }, []);

  useEffect(() => {
    const getCurrentDate = () => {
        const date = new Date();
        const options = {month: 'long', day: 'numeric', year: 'numeric'};
        setCurrentDate(date.toLocaleDateString('en-US', options));
    };
    getCurrentDate();
  }, []);


  return (
    <div className='flex flex-col lg:flex-row justify-between items-center p-5 gap-5 lg:gap-0 md:gap-0 sm:gap-0'>
      <div className='flex flex-col gap-1 mt-0 text-center lg:text-left'>
        <h1 className='text-xl font-bold'>{greeting}, {username}!</h1>
        <p>Here's what's happening with your store today</p>
      </div>
      <div className='flex  items-center gap-3'>
            <div className='bg-gray-200 p-3 rounded-full'>
                <MdDateRange className='text-xl' />
            </div>
        <p className='text-sm mr-3'>{currentDate}</p>
        <div className='relative mr-0 lg:mr-2 sm:mr-2 md:mr-2'>
            <div className='border border-gray-200 p-3 rounded-full'>
                <IoNotifications className='text-2xl' />
            </div>
                <span className='absolute top-0 right-0 w-5 h-5 bg-[#f97f80] text-white rounded-full flex justify-center items-center'>1</span>
        </div>

        <div className='flex items-center gap-2 border-2 border-gray-200 rounded-full'>
            <img src={profileImage} alt="profile" className='w-10 h-10 rounded-full ml-[-10px] ' />
            <Popover className="relative">
                    <PopoverButton>
                        <IoIosArrowDown className='text-xl mr-2 mt-1'/>
                    </PopoverButton>
                <PopoverPanel  className="absolute flex flex-col right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white py-1 p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href="/analytics">Profile</a>
                    <a href="/engagement">Back to store</a>
                </PopoverPanel>
             </Popover>
        </div>

      </div>
    </div>
  );
};

export default NavbarDashboard;
