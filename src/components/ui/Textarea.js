import React, { forwardRef } from 'react'

const TextArea = forwardRef((props, ref) => {
  const { onChange, label, defaultValue= "", placeholder, value } = props;

  return (
    <div>
      <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 mt-1">
       {label}
      </label>

      <div className="mt-1">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="bg-gray-100 pl-3 py-2 h-40 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          ref={ref}
        />
      </div>
    </div>
  )
})

TextArea.displayName = 'TextArea';

export default TextArea
