import React from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100",
};

export function Button({ variant = "default", className = "", ...props }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
