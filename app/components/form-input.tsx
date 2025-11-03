import React, { InputHTMLAttributes } from "react";
import { classNames } from "@/utils/functions";

export default function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={classNames(
        'block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
        'bg-white', 'dark:bg-white/5',
        'text-gray-900', 'dark:text-white',
        'outline-gray-300', 'dark:outline-white/10',
        'placeholder:text-gray-400', 'dark:placeholder:text-gray-500',
        'focus:outline-indigo-600', 'dark:focus:outline-indigo-500',
        props.className!
      )}
    />
  );
};
