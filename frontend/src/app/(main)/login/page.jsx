'use client';
import useAppContext from '@/src/context/AppContext';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';

const Login = () => {

  const { setLoggedIn } = useAppContext();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/add`, values)
        .then((result) => {
          console.log(result.data);
          localStorage.setItem('token', result.data.token);
          document.cookie = `token=${result.data.token}`;
          setLoggedIn(true);
          toast.success('Login Successfull')
        }).catch((err) => {
          console.log(err);
          console.log(err?.response?.status);
          toast.error('Login Failed');
        });


    }
  })

  return (
    <div className='grid grid-cols-subgrid gap-4 col-span-3 max-w-lg mx-auto mt-10 p-10 rounded-lg'>

      <div className='shadow-2xl rounded-lg border bg-teal-300 p-8'>
        <h1 className='text-center text-3xl font-bold p-4 text-pink-700'>LOGIN</h1>

        <form className='text-pink-700 p-5' onSubmit={loginForm.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' onChange={loginForm.handleChange} value={loginForm.values.email}
            className="hover:shadow-lg w-full py-1 px-4 rounded bg-gray-100 border mt-2" />

          <label htmlFor="password">Password</label>
          <input type="password" id='password'
            onChange={loginForm.handleChange} value={loginForm.values.password}
            className="hover:shadow-lg w-full py-1 px-4 rounded bg-gray-100 border mt-2" />

          <button type="submit"
            className='hover:shadow-lg p-2 bg-gray-50 mt-6 rounded text-l text-pink-700' >Login</button>
        </form>
      </div>

    </div>

  )
}

export default Login;