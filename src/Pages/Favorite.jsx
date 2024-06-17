import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorite } from '../Features/CartSlice';

const Favorite = () => {
  const favoriteProducts = useSelector((state) => state.cart.favoriteItems);
  const dispatch = useDispatch();

  return (
    <div className='pt-[140px]'>
      <h1 className="text-3xl font-bold mb-4 text-center">Favorite</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="rounded-lg shadow-md p-4">
            <div>
            <img src={product.image} alt={product.title} className="w-30 h-48 object-cover mb-4 mx-auto" />
            <h2 className="text-lg font-bold mb-2 text-center ">{product.title}</h2>
            </div>
            <div className="flex justify-center gap-10">
              <Link to={`/product/${product.id}`}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '>
                    view details
                </button>
              </Link>
              <button onClick={() => dispatch(removeFromFavorite(product))} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
