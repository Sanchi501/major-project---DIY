import React from 'react'

const Input = ({id, label, type, placeholder}) => {
  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <input type={type} placeholder={placeholder}
            className='border bg-black-200 py-1 px-3 rounded w-full'
        />

    </div>
  )
}

export default Input