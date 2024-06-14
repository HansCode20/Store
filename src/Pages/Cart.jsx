import React, { useEffect } from 'react';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Features/ProductSlice';
import { clearCart, removeFromCart, decreaseCart, increaseCart } from '../Features/CartSlice';
import '../Pages/Cart.css';

// Style Cart

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const cartItems = useSelector((state) => state.cart.cartitems);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handledecreaseQuantity = (item) => {
    dispatch(decreaseCart(item));
  };  

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseCart(item));
  };

  return (
    <div className="pt-[140px]"> {/* Tambahkan padding-top di sini */}
      <div className='flex flex-col justify-center items-center gap-10 '>
        <h1 className='text-5xl font-bold justify-center'>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div>
            <p className='text-3xl font-semibold mb-2'>Your cart is empty</p>
            <div>
              <Link to="/" className='flex items-center justify-center gap-2 group'>
                <FaArrowCircleLeft className='text-3xl group-hover:text-[blue] group-hover:underline'/>
                <span className='text-2xl group-hover:text-[blue] group-hover:underline'>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className='p-4 lg:p-0 md:p-0'> {/* Membuat kontainer bisa di-scroll */}
          {/* Titles */}
            <div className='container mx-auto grid grid-cols-4 gap-4 text-center border-b-2 font-bold  pb-2 mb-4'>
              <h3>Product</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </div>
            {/* Cart Items */}
            <div className='max-h-[70vh] overflow-y-auto w-full scrollbar-hide'>
              {cartItems.map((item) => (
                <div key={item.id} className='container mx-auto grid grid-cols-4 gap-4 items-center justify-center border-b py-4 '>
                  <div className='flex flex-col lg:flex-row md:flex-row items-center justify-center '>
                    <img src={item.image} alt={item.title} className='w-20 h-20 object-cover ' />
                    <div className='ml-4 w-[200px]'>
                      <h3 className='text-lg mb-2 hidden lg:block md:block '>{item.title}</h3>
                      <button onClick={() => handleRemoveFromCart(item)} className='px-2  py-1 bg-black text-white rounded ml-14 lg:ml-0 md:ml-0 mt-5 lg:mt-0 md:mt-0'>Remove</button>
                    </div>
                  </div>
                  <div className='text-center mt-[-50px] lg:mt-0 md:mt-0'>${item.price}</div>
                  <div className='flex items-center  justify-center border-2 p-2 rounded w-20 lg:w-24 md:w-24 gap-2 mx-auto mt-[-50px] lg:mt-0 md:mt-0'>
                    <button onClick={() => handledecreaseQuantity(item)}>-</button>
                    <span className='mx-2'>{item.cartQuantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                  </div>
                  <div className='text-center mt-[-50px] lg:mt-0 md:mt-0'>${item.price * item.cartQuantity}</div>
                </div>
              ))}
            </div>
            {/* Button Clear text */}
            <div className='mt-10 flex flex-col lg:flex-row md:flex-row justify-between'>
              <div>
              <button onClick={handleClearCart} className='bg-red-600 text-white px-4 py-3 rounded hover:bg-red-700'>Clear Cart</button>
              </div>
              <div className='mt-10 lg:mt-0 md:mt-0'>
                {/* Summary Section */}
                <div className='flex justify-between items-center  '>
                  <span className='font-semibold text-xl'>Subtotal</span>
                  <span className='font-semibold text-xl' >${(cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0)).toFixed(2)}</span>
                </div>
                <p className='text-gray-500 mt-2'>Takes and Shipping calculated at checkout</p>
                <button className='bg-blue-600 text-white w-full px-4 py-3 rounded mt-2 hover:bg-blue-700'>Checkout</button>
                <Link to="/" className='flex items-center justify-center mt-2 text-blue-600 hover:underline mb-10'>
                  <FaArrowCircleLeft/>
                  <span className='ml-2 '>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
