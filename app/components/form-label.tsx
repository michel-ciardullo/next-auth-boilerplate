import { LabelHTMLAttributes } from "react";

export default function FormLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={`block text-sm/6 font-medium text-gray-900 dark:text-gray-100 ${props.className}`}
    >
      {props.children}
    </label>
  );
};
