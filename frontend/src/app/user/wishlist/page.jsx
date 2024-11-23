'use client'
import React from 'react';
import useWishlistContext from '@/src/context/WishlistContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlistContext();

  return (
    <div>
      <div className='container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
        <h1 className='text-3xl font-bold text-center text-teal-500 mb-8'>Your Wishlist</h1>
        <div>
          {wishlistItems.length === 0 ? (
            <p className='mt-10 text-center'>Your wishlist is empty.</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
              {wishlistItems.map(item => ( 
                <div key={item.id} className='border p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300'>
                  <div>
                  <img src={item.image} alt={item.name} className='w-full h-48 object-cover rounded mb-4' />
                    <h2 className='text-xl font-bold'>{item.name}</h2>
                    <p className="mt-2">{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</p>
                    <p className='text-teal-500 mt-2'>${item.price.toFixed(2)}</p>
                  </div >
                  <button 
                    onClick={() => removeFromWishlist(item._id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;