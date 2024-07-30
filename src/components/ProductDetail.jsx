import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './ProductDetail.css'
import { Link } from 'react-router-dom'

// Redux Concept
import { useDispatch } from 'react-redux'
import { addToCart } from '../Features/CartSlice'


const ProductDetail = () => {
    const {id} = useParams()
    console.log(id)

    const [Product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    };
    

    const getProduct = () => {
        setLoading(true)
        setTimeout(() => {
        axios
        .get(`https://restapistore-default-rtdb.asia-southeast1.firebasedatabase.app/Store/${id}.json?auth=QVdNWO3MDXvTdszmf7YUy0tcjRjR3drAmOlmNrc4`)
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
            <div className='flex space-x-2 justify-center items-center bg-white h-screen '>
                <span className='sr-only'>Loading...</span>
                <span class="loader"></span>
            </div>
        );
    }
    

  return (
    <div className='container grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1  py-5 lg:py-20  items-center mt-20'>
        <div className='mx-auto mt-5 lg:mt-0 '>
            <img src={Product.image} alt="Image" width={300} />
        </div>
        <div className='mx-auto justify-center items-center py-10 lg:py-40 px-10 lg:px-0 lg:w-full md:w-full text-left '> 
            <h1 className='text-3xl font-bold mb-5'>{Product.title}</h1>
            <p className='text-xl font-bold text-[red] mb-5'>${Product.price}</p>
            <p className='text-xl mb-5'>{Product.description}</p>
            <div className='flex space-x-5'>
            <button className='py-3 px-5 bg-black text-white rounded-md hover:bg-gray-200 hover:text-black hover:border-black duration-300' onClick={() => handleAddToCart(Product)}>
                Add to cart
            </button>
            <Link to='/'>
            <button className='py-3 px-5 bg-black text-white rounded-md hover:bg-gray-200 hover:text-black hover:border-black duration-300'>
                Back to Home
            </button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail