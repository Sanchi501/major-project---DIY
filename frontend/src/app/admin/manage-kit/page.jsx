'use client';
import axios from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
const ISSERVER = typeof window === "undefined";



const Manageproduct = () => {

    const [productlist, setproductlist] = useState([]);
    const router = useRouter();
    const token = !ISSERVER ? localStorage.getItem('token') : null;

    const fetchProducts = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`)
            .then((res) => {
                console.log(res.status);
                console.log(res.data);
                setproductlist(res.data);
            })
            .catch((err) => {
                if (err?.response?.status === 403) {
                    toast.error('Login is required');
                }

            });


    }

    useEffect(() => {
        fetchProducts();


    }, [])
    
    const deleteproduct = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/delete/${id}`)
            .then((result) => {
                toast.success('Product Deleted Successfully');
                fetchProducts();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong');

            });
    }
    


    return (
        <div className='lg:max-w-[80%] mx-auto'>

            <div className='border rounded-lg shadow-lg p-8'>
                <h1 className='text-center font-bold text-3xl'> Manage Products</h1>
                <hr />

                <table className='w-full'>
                    <thead className='bg-green-600 text-white'>
                        <tr>
                            <th className='p-2 border-white'>item name</th>
                            <th className='p-2 border-white'>price</th>
                            <th className='p-2 border-white'>brand</th>
                            <th className='p-2 border-white'>description</th>
                            <th colSpan={2}>Options</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-200'>
                        {
                            productlist.map((product) => {
                                return <tr key={product._id}>

                                    <td className='p-2 border border-green-700'>{product.itemname}</td>
                                    <td className='p-2 border border-green-700'>{product.price}</td>
                                    <td className='p-2 border border-green-700'>{product.brand}</td>
                                    <td className='p-2 border border-green-700'>{product.description}</td>
                                    <td className='p-2 border border-green-700'>
                                        <button
                                            onClick={() => deleteproduct(product._id )}
                                            className='bg-red-600 text-white px-4 py-2 rounded-lg'>Delete</button>
                                    </td>
                                    <td >
                                        <Link href={'/updateproduct/' + product.itemname} className='bg-yellow-400 text-white px-4 py-2 rounded-lg'>Update</Link>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Manageproduct;