    import React, { useEffect, useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { useDispatch } from 'react-redux'
    import axios from 'axios'
    import { addToCart } from '../Features/CartSlice'
    import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
    import { IoMdEye } from "react-icons/io";

    // Animasi aos
    import AOS from 'aos';
    import 'aos/dist/aos.css';


    function Product() {
        const [product, setProduct] = useState([])
        const [selectedCategory, setSelectedCategory] = useState("all")
        const [loading, setLoading] = useState(true)
        const navigate = useNavigate();
        const dispatch = useDispatch();

        
            // initialize AOS
            useEffect(() => {
                AOS.init();
            }, []);

            const handleAddToCart = (product) => {
                dispatch(addToCart(product))
                // navigate('/cart')
            };



        const getProduct = () => {
            setTimeout(() => {
                axios
                .get("https://fakestoreapi.com/products")
                .then((res) => {
                    const selectedProduct = [...res.data.slice(0, 8), ...res.data.slice(14, 19)];
                    setProduct(selectedProduct)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
            }, 100);
        }

        useEffect(() => {
            getProduct()
        }, []);

        // Untuk design Loading
        if (loading) {
            return (
                <div class="relative flex justify-center items-center mt-20">
                    <div class="absolute animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-black"></div>
                    < img width="96" height="96" src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/96/external-hanger-fashion-royyan-wijaya-detailed-outline-royyan-wijaya-2.png" alt="external-hanger-fashion-royyan-wijaya-detailed-outline-royyan-wijaya-2"  class="rounded-full h-28 w-28"/>
                </div>
            )
        }

        // Fungsi untuk mengubah kategori yang dipilih
        const handleCategoryChange = (category) => {
            setSelectedCategory(category);
        };

        // Fungsi untuk memfilter produk berdasarkan kategori yang dipilih  
        const filterByCategory = (products, category) => {
            if (category === 'all') {
                return products;
            }
            return products.filter(product => product.category === category);
        };


        const filteredProducts = filterByCategory(product, selectedCategory)



        // Untuk Menambahkan Logika Star
        const calculateRating = (rating) => {
            let star = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    star.push(<FaStar key={i} className="text-yellow-500" />);
                } else if (i - rating <= 0.5 && i - rating > 0) { 
                    star.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
                } else {
                    star.push(<FaRegStar key={i} className="text-yellow-500" />);
                }
            }
            return star;
        };

        

    return (
        <div className='mt-20' id='product'>
            <h1 className='text-3xl font-bold ml-[60px] lg:ml-20 mb-6'>Products For You!</h1>
        <div className='flex  gap-4 justify-center p-10 lg:p-0'>
            <button className='px-2 py-1 sm:px-4 sm:py-2 rounded-lg border-2 border-black hover:bg-black hover:text-white duration-300' onClick={() => handleCategoryChange("all")}>All</button>
            <div className="relative w-full max-w-sm   ">
                        <svg className="absolute top-1/2 -translate-y-1/2 left-4 z-10 lg:z-10" width="20" height="20"
                            viewBox="0 0 20 20" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                                stroke="black" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                        <select 
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="h-12 border-2 border-black  text-gray-900 pl-11 text-base font-normal leading- rounded-lg block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50 ">
                            <option value="all">Filter</option>
                            <option value="men's clothing">Men's</option>
                            <option value="women's clothing">Women's</option>
                            <option value="jewelery">Jewelery</option>
                        </select>
                        <svg className="absolute top-1/2 -translate-y-1/2 right-4 z-10 lg:z-10 " width="16" height="16"
                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
        </div>
        <div  className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-0 lg:mt-10 md:mt-10 p-10'> 
            {filteredProducts.map((item) => (
            <div key={item.id} className=' bg-white rounded-lg p-10 shadow-lg' data-aos="fade-up" data-aos-duration="2000">
                <div className='w-32 h-32 flex justify-center items-center overflow-hidden mx-auto mb-8 '>
                <img src={item.image} alt={item.name} width={150} className=' max-w-full max-h-full object-contain ' />
                </div>
                <div className='h-24 mb-4 overflow-hidden items-center'>
                    <p className='font-bold'>{item.title}</p>
                </div>
                <div className='flex lg:flex-row md:flex-col  justify-between   '>
                    <div className='flex mt-auto'>
                    {calculateRating(item.rating.rate)}
                    <p className='ml-1 text-sm'>({item.rating.rate})</p>
                    </div>
                    <div className='mt-auto inline-block text-sm lg:text-base md:text-sm '>
                        <p>Sold: {item.rating.count}</p>
                    </div>
                </div>
                <div className='mt-4'>
                    <p className='font-semibold'>
                    $
                    {item.price}
                    </p>
                    <div className='flex gap-4'>
                    <button className='mt-4 px-4 py-2 bg-black text-white hover:bg-white hover:text-black duration-500 rounded-lg' 
                    onClick={() => handleAddToCart(item)}>
                        +
                    </button>
                    <button className='mt-4 px-3 py-2 bg-black text-white hover:bg-white hover:text-black duration-500 rounded-lg' onClick={() => navigate(`/product/${item.id}`)}>
                        <IoMdEye className='w-6 h-6' />
                    </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    )
    }

    export default Product

