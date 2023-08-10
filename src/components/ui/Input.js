import React from 'react'

function Input({onChange, label, placeholder="placeholder"}) {
  return (
    <div> <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-1">
   {label}
  </label>

  <div className="mt-1">
    <input
      type="email"
      name="email"
      id="email"
      className="pl-2 bg-gray-100  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div></div>
  )
}

export default Input