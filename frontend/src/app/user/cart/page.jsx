'use client'
import React from 'react';
import useCartContext from '@/src/context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, calculateTotal, clearCart } = useCartContext();

  return (
    <div>
      <div className='container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
        <h1 className='text-3xl font-bold text-center text-teal-500 mb-8'>Your Cart</h1>
        <div>
          {cartItems.length === 0 ? (
            <p className='mt-10 text-center'>Your cart is empty.</p>
          ) : (
            <div className='grid grid-cols-1 gap-6'>

              {cartItems.map(item => (
                <div key={item.id} className='flex flex-col sm:flex-row justify-between items-center border-b-2 py-4'>
                  <img src={item.image} alt={item.name} className='w-32 h-32 object-cover rounded mt-4 sm:mb-0' />
                  <div className="flex-1 sm:ml-4">
                    <h2 className='text-xl font-bold'>{item.name}</h2>
                    <p>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</p>
                    <p className='text-teal-500 mt-2'>${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className='text-red-500 hover:text-red-700 mt-4 sm:mt-0'
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className='flex justify-between items-center mt-6'>
                <h2 className='text-xl font-bold'>Total:</h2>
                <p className='text-teal-500'>${calculateTotal()}</p>
              </div>
              <div className='flex justify-end mt-6'>
              <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
                <button href='/checkout'>
                  <a className='bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-700'>
                    Proceed to Checkout
                  </a>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;