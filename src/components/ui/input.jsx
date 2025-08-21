import React from "react";

export const Input = React.forwardRef(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none " +
        "placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 " +
        className
      }
      {...props}
    />
  );
});
