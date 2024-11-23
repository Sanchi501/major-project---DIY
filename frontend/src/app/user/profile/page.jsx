'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch user data and order history from API
    const fetchUserData = async () => {
      const userData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`);
      setUser(userData.data);
      setName(userData.data.name);
      setEmail(userData.data.email);
      setAddress(userData.data.address);
    };

    const fetchProducts = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`)
      console.log(res.data);
      setProductList(res.data);
    }

    fetchUserData();
    
  }, []);

  const handleSave = async () => {
    // Save updated user data to API
    const updatedUser = { name, email, address };
    await axios.put('/api/user', updatedUser);
    setUser(updatedUser);
    setEditMode(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="text-2xl font-bold md:text-4xl md:leading-tight text-teal-500">Profile</h1>
      <div className="mt-6">
        {editMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium">Name: {user.name}</p>
            <p className="text-lg font-medium">Email: {user.email}</p>
            <p className="text-lg font-medium">Address: {user.address}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold">Order History</h2>
        <div className="mt-4 space-y-4">
          {orderHistory.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orderHistory.map(order => (
              <div key={order.id} className="border p-4 rounded">
                <p className="text-lg font-medium">Order ID: {order.id}</p>
                <p className="text-lg font-medium">Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-lg font-medium">Total: ${order.total.toFixed(2)}</p>
                <div className="mt-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <p>{item.name}</p>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;