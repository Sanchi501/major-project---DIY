import React, { useState } from 'react';
import useCartContext from '@/src/context/CartContext';
import Link from 'next/link';

const Checkout = () => {
  const { cartItems, clearCart } = useCartContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <div className='container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
      <h1 className='text-2xl font-bold md:text-4xl md:leading-tight text-teal-500'>Checkout</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
        <div>
          <h2 className='text-xl font-bold mb-4'>Billing Details</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded'
              >
                <option value='Credit Card'>Credit Card</option>
                <option value='PayPal'>PayPal</option>
                <option value='Bank Transfer'>Bank Transfer</option>
              </select>
            </div>
            <button
              type='submit'
              className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700'
            >
              Place Order
            </button>
          </form>
        </div>
        <div>
          <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
          <div className='space-y-4'>
            {cartItems.map(item => (
              <div key={item.id} className='flex justify-between items-center border-b-2 py-4'>
                <div>
                  <h2 className='text-xl font-bold'>{item.name}</h2>
                  <p>{item.description}</p>
                  <p className='text-teal-500'>${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className='flex justify-between items-center mt-6'>
              <h2 className='text-xl font-bold'>Total:</h2>
              <p className='text-teal-500'>${calculateTotal()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-6'>
        <Link href='/cart'>
          <a className='text-teal-500 hover:text-teal-700'>Back to Cart</a>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;