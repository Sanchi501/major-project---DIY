'use client';
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'name must be at least 3 characters'),
  email: Yup.string().required('Emial is required').email('email is invalid'),
  password: Yup.string().required('password is required')
    .min(5, 'password must be at least 8 characters')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain an lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .matches(/\W/, 'password must contain a special charachter'),
  confirmPassword: Yup.string().required('confirm password is required')
    .oneOf([Yup.ref('password'), null], 'password must match')

});

const Signup = () => {

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      setSubmitting(true);
      // send values to backend

      axios.post('http://localhost:5000/user/add', values)
        .then((result) => {
          toast.success('User Registred Successfully');
          resetForm();

        })
        .catch((err) => {
          console.log(err);
          console.log(err?.response?.status);
          toast.error(err?.response?.data?.message || 'Something went wrong');
          setSubmitting(false);

        });
    },
    validationSchema: signupSchema
  });
  return (
    <div>
      <h1 className='text-pink-700 text-2xl font-bold uppercase my-10 text-center'>Signup Form</h1>
      <div className='max-w-lg mx-auto rounded-lg shadow-2xl mt-10 p-10'>
        
        <form className='text-pink-700' onSubmit={signupForm.handleSubmit}>

          <label htmlFor='name'> Name</label>
          <input type="text" id='name'
            onChange={signupForm.handleChange}
            value={signupForm.values.name}
            className='hover:shadow-lg w-full p-2 border border-teal-400 rounded-lg my-2 bg-gray-100 '
          />

          {
            (signupForm.touched.name && signupForm.errors.name) && (
              <p className='text-red-500 mb-5 text-sm'> {signupForm.errors.name}</p>
            )
          }
          
          <label htmlFor='email'> Email</label>
          <input type="text" id='email'
            onChange={signupForm.handleChange}
            value={signupForm.values.email}
            className='hover:shadow-lg w-full p-2 border border-teal-400 rounded-lg my-2 bg-gray-100 '
          />

          {
            (signupForm.touched.email && signupForm.errors.email) && (
              <p className='text-red-500 mb-5 text-sm'> {signupForm.errors.email}</p>
            )
          }


          <label htmlFor="password">Password</label>
          <input type="text" id='password'
            onChange={signupForm.handleChange}
            value={signupForm.values.password}
            className='hover:shadow-lg w-full p-2 border border-teal-400 rounded-lg my-2 bg-gray-100'
          />

          {
            (signupForm.touched.password && signupForm.errors.password) && (
              <p className='text-red-500 mb-5 text-sm'> {signupForm.errors.password}</p>
            )
          }
          <label htmlFor=" password"> confirm Password</label>
          <input type="text" id='confirmPassword'
            onChange={signupForm.handleChange}
            value={signupForm.values.confirmPassword}
            className='hover:shadow-lg w-full p-2 border border-teal-400 rounded-lg my-2 bg-gray-100'
          />

          {
            (signupForm.touched.confirmPassword && signupForm.errors.confirmPassword) && (
              <p className='text-red-500 mb-5 text-sm'> {signupForm.errors.confirmPassword}</p>
            )
          }

          <button
            disabled={signupForm.isSubmitting}

            type='submit'
            className='hover:shadow-xl text-pink-700 flex justify-center item-center gap-2 bg-teal-500 mt-6 px-3 py-2 rounded text-white font-bold w-full disabled:bg-gray-600'>
          
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 5l3 3l-3 3" /><path d="M3 18h2.397a5 5 0 0 0 4.096 -2.133l4.014 -5.734a5 5 0 0 1 4.096 -2.133h3.397" /></svg> 
            Submit
          </button>
          
          




        </form>


      {/* <Button>My Button</Button>
    <Button>Submit</Button>
    <Button> Know More</Button>
    <Button> Learn More</Button>

    <TestInput id='name' label='name' type='text' placeholder='Enter your name'/>
    <TestInput id='name' label='Email' type='Email' placeholder='Enter your email' />
    <TestInput id='name' label='Password' type='Password' placeholder='Enter your password'/> */}
    

    </div>
   </div>
    
  )
}


export default Signup;