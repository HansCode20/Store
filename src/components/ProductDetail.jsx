import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'


const ProductDetail = () => {
    const {id} = useParams()
    console.log(id)

    const [Product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    

    const getProduct = () => {
        setLoading(true)
        setTimeout(() => {
        axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
            setLoading(false)
            setProduct(res.data)
            
        })
        .catch((err) => {
            console.log(err)
        })
    }, 2000);
    }

    useEffect(() => {
        getProduct()
    }, [])

    if (loading ) {
        return (
            <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
        );
    }
    

  return (
    <div className='container grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  py-5 lg:py-20  items-center '>
        <div className='mx-auto mt-5 lg:mt-0 '>
            <img src={Product.image} alt="Image" width={300} />
        </div>
        <div className='mx-auto justify-center items-center py-10 lg:py-40 px-10 lg:px-0 lg:w-full md:w-full'> 
            <h1 className='text-3xl font-bold mb-5'>{Product.title}</h1>
            <p className='text-xl font-bold text-[red] mb-5'>${Product.price}</p>
            <p className='text-xl mb-5'>{Product.description}</p>
            <button className='py-3 px-5 bg-black text-white rounded-md hover:bg-gray-200 hover:text-black hover:border-black duration-300'>
                Add to cart
            </button>
        </div>
    </div>
  )
}

export default ProductDetail