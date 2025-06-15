"use client";

import React from "react";

export interface InputComponentProps {
  id?: string;
  type?: string;
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;   
  value: string;
}

export default function InputComponent({
  label,
  placeholder,
  type = "text",
  onChange,
  value,
}: InputComponentProps) {
  return (
    <div className="relative">
      <p className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-gray-600"
         style={{ fontFamily: 'Lato', fontSize: '16px' }}>
        {label}
      </p>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}  
        className="w-full rounded-lg border border-gray-500 bg-white p-4
                   text-base placeholder-gray-300 focus:border-black focus:outline-none"
        style={{ fontFamily: 'Lato', fontSize: '16px' }}
      />
    </div>
  );
}
