'use client';
import useCartContext from '@/src/context/CartContext';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import useWishlistContext from '@/src/context/WishlistContext';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';



const ISSERVER = typeof window === "undefined";
const token = !ISSERVER ? localStorage.getItem('token') : null;

const BrowseKits = () => {

  const { addToCart, isInCart } = useCartContext();
  const { addToWishlist, isInWishlist } = useWishlistContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productList, setProductList] = useState([]);;

  const fetchProducts = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`)
    console.log(res.data);
    setProductList(res.data);
  }


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = productList.filter(product => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
    );
  });
  const handleWishlistClick = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" >
      <h1 className="text-3xl font-bold text-center text-teal-500 mb-8"> Browse Kits</h1>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-md p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="ml-4 p-2 border border-gray-300 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
          <option value="Category3">Category 3</option>
        </select>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
              
              <button
                onClick={() => addToWishlist(product)}
                className="text-red-500 hover:text-red-700"
              >
                {isInWishlist(product._id) ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
              </button>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className='mt-2'>{product.description.length > 100 ? `${product.description.substring(0, 100)}...`: product.description}</p>
              <StarRatings
                rating={product.rating}
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="2px"
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => addToCart(product)}
                  disabled={isInCart(product.id)}
                  className={`px-4 py-2 rounded ${isInCart(product.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 text-white hover:bg-teal-700'}`}
                >
                  {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
              <Link className="text-pink-500" href={`/Kit-Detail/${product._id}`}>
View Details
              </Link>


            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default BrowseKits;