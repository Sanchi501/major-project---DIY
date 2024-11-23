'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ISSERVER = typeof window === "undefined";
const token = !ISSERVER ? localStorage.getItem('token') : null;

const Manageuser = () => {

    const [userlist, setuserlist] = useState([]);
    const router = useRouter();


    const fetchUsers = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getall`, values, {
            headers: {
                'x-auth-token': token
            }
        })
            .then((res) => {
                console.log(res.status);
                console.log(res.data);
                setuserlist(res.data);
            })
            .catch((err) => {
                if (err?.response?.status === 403) {
                    toast.error('Login is required');
                    router.push('/login');
                }
            });
    }
    useEffect(() => {
        fetchUsers();
    }, [])
    const deleteuser = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/delete`, values)
            .then((result) => {
                toast.success('User Deleted Successfully');
                fetchUsers();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong');
            });
    }
    return (
        <div className='lg:max-w-[80%] mx-auto'>

            <div className='border rounded-lg shadow-lg p-8'>
                <h1 className='text-center font-bold text-3xl'> Manage Users</h1>
                <hr />

                <table className='w-full'>
                    <thead className='bg-green-600 text-white'>
                        <tr>
                            <th className='p-2 border-white'>ID</th>
                            <th className='p-2 border-white'>Name</th>
                            <th className='p-2 border-white'>Email</th>
                            <th className='p-2 border-white'>City</th>
                            <th colSpan={2}>Options</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-200'>
                        {
                            userlist.map((user) => {
                                return <tr key={user._id}>

                                    <td className='p-2 border border-green-700'>{user._id}</td>
                                    <td className='p-2 border border-green-700'>{user.name}</td>
                                    <td className='p-2 border border-green-700'>{user.email}</td>
                                    <td className='p-2 border border-green-700'>{user.city}</td>
                                    <td className='p-2 border border-green-700'>
                                        <button
                                            onClick={() => deleteuser(user._id)}
                                            className='bg-red-600 text-white px-4 py-2 rounded-lg'>Delete</button>
                                    </td>
                                    <td >
                                        <Link href={'/updateuser/' + user._id} className='bg-yellow-400 text-white px-4 py-2 rounded-lg'>Update</Link>
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

export default Manageuser;