'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';

const ISSERVER = typeof window === "undefined";

const Kitdetail = () => {

  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  const [reviewList, setReviewList] = useState([]);

  const reviewRef = useRef(null);

  const [rating, setRating] = useState(3)

  const fetchProductData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getbyid/${id}`)
    console.log(res.data);
    setProductData(res.data);
  }

  useEffect(() => {
    fetchProductData();
  }, [])

  const submitRating = () => {
    const review = reviewRef.current.value;
    const data = {}
    data.rating = rating;
    data.review = review;
    data.product = id;
    console.log(data);
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/add`, data,
       { headers: { 'x-auth-token': localStorage.getItem('token') } })
      .then((result) => {
        console.log(result.data);
        toast.success('review submitted');
      }).catch((err) => {
        console.log(err);
        toast.error('some error occured');
      });

  }
  const fetchreviewData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/getbyproduct/${id}`)
    console.log(res.data);
    setReviewList(res.data);
  }

  const token = !ISSERVER ? localStorage.getItem('token') : null;


  useEffect(() => {
    fetchreviewData();
  }, [])
  return (
    <div>
      <>
        {/* Blog Article */}
        <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl ">
            {
              productData !== null ? (

                <div className="space-y-5 md:space-y-8 grid-cols-2">
                  <div>
                    <figure>
                      <img
                        className="w-full object-cover rounded-xl"
                        src={productData.image}
                        alt="Blog Image"
                      />
                    </figure>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold md:text-3xl dark:text-white">
                      {productData.name}
                    </h2>
                    <p>{productData.description}</p>
                    <p>₹{productData.price}</p>
                  </div>


                  <video src={productData.video} controls></video>

                  <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    changeRating={setRating}
                    numberOfStars={5}
                    name='rating'
                  />

                  <textarea ref={reviewRef}  >

                  </textarea>

                  <button className='' onClick={submitRating} >Submit Review</button>

                </div>

              ) : (
                <h2 className='text-center font-bold text-2xl'>Loading ...</h2>
              )
            }
          </div>
        </div>
      </>

    </div>
  )
}

export default Kitdetail;