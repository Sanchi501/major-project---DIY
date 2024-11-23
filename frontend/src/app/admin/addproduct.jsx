'use client';
import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';


const AddProduct = () => {


  const productForm = useFormik({
    initialValues: {
      name: '',
      price: '',
      brand: '',
      image: '',
      description: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      setSubmitting(true);
      // send values to backend

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/add`, values)

        .then((result) => {
          toast.success('Product Added Successfully');
          resetForm();

        })
        .catch((err) => {
          console.log(err);
          console.log(err?.response?.status);
          toast.error(err?.response?.data?.message || 'Something went wrong');
          setSubmitting(false);

        });
    }
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'iCloud1234');
    fd.append('cloud_name', 'dvyrpa6vy');

    axios.post('https://api.cloudinary.com/v1_1/dvyrpa6vy/image/upload', fd)

      .then((result) => {
        toast.success('File Uploaded succesfully');
        console.log(result.data);
        productForm.setFieldValue('image', result.data.url);
      })
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong');

      });
  }
  

  return (
    <div>
      <h1 className='text-2xl font-bold uppercase my-10 text-center'>DIY INNOVATES
      </h1>
      <div className='max-w-lg mx-auto rounded-lg shadow-lg mt-10 p-10'>
        <form onSubmit={productForm.handleSubmit}>

          <label htmlFor='name'> Item name </label>
          <input type="text" id='name'
            onChange={productForm.handleChange}
            value={productForm.values.name}
            className='w-full p-2 border rounded-lg my-2 bg-gray-100 '
          />

          {
            (productForm.touched.name && productForm.errors.name) && (
              <p className='text-red-500 mb-5 text-sm'> {productForm.errors.name}</p>
            )
          }
          <label htmlFor="price">Price</label>
          <input type="text" id='price'
            onChange={productForm.handleChange}
            value={productForm.values.price}
            className='w-full p-2 border rounded-lg my-2 bg-gray-100'
          />

          <label htmlFor="Brand">Brand</label>
          <input type="text" id='brand'
            onChange={productForm.handleChange}
            value={productForm.values.brand}
            className='w-full p-2 border rounded-lg my-2 bg-gray-100'
          />

          <label htmlFor="description">Description</label>
          <textarea type="text" id='description'
            onChange={productForm.handleChange}
            value={productForm.values.description}
            className='w-full p-2 border rounded-lg my-2 bg-gray-100'
          ></textarea>

          <label htmlFor="Image">Image</label>
          <input type="file" onChange={uploadFile}

            className='w-full p-2 border rounded-lg my-2 bg-gray-100'
          />

          <button
            disabled={productForm.isSubmitting || !productForm.values.image}

            type='submit'
            className='flex justify-center item-center gap-2 bg-green-700 mt-6 px-3 py-2 rounded text-white font-bold w-full disabled:bg-gray-600'>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
            Search
          </button>





        </form>
      </div>

      {/* <Button>My Button</Button>
    <Button>Submit</Button>
    <Button> Know More</Button>
    <Button> Learn More</Button>

    <TestInput id='name' label='name' type='text' placeholder='Enter your name'/>
    <TestInput id='name' label='Email' type='Email' placeholder='Enter your email' />
    <TestInput id='name' label='Password' type='Password' placeholder='Enter your password'/> */}
    </div>
  )
}


export default AddProduct;