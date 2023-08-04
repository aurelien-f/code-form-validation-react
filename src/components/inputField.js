// Create a new file InputField.js in the components folder
import React, { forwardRef } from "react";

const InputField = forwardRef(({ value, onChange, onKeyDown }, ref) => (
  <input
    ref={ref}
    type="text"
    maxLength={1}
    className="w-12 h-12 border border-gray-300 rounded-lg text-2xl text-center mr-2 focus:outline-none focus:border-blue-500"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
));

export default InputField;
