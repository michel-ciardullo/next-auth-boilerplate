import React, { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  
}

export default function Label(props: LabelProps) {
  return (
    <label
      {...props}
      className={`block text-sm/6 font-medium text-gray-900 dark:text-gray-100 ${props.className}`}
    >
      {props.children}
    </label>
  );
};
