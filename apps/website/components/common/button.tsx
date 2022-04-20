import React, { forwardRef } from 'react';

type ButtonUse = `primary` | `secondary` | `destructive`;
type ButtonSize = `xs` | `sm` | `md`;
type ButtonType = `button` | `submit`;

type ButtonProps = {
  size?: ButtonSize;
  type?: ButtonType;
  use?: ButtonUse;
  onClick?: (e: any) => void;
  text: string;
  className?: string;
};

const BUTTON_SIZE: { [key in ButtonSize]: string } = {
  md: `text-base px-4 py-2`,
  sm: `text-sm px-3 py-2 leading-4`,
  xs: `text-xs px-2.5 py-1.5`,
};

const BUTTON_COLOR: { [key in ButtonUse]: string } = {
  destructive: `text-white bg-red-600 hover:bg-red-700`,
  primary: `text-white bg-indigo-600 hover:bg-indigo-700`,
  secondary: ``,
};

const Button = forwardRef<HTMLInputElement, ButtonProps>(
  (
    {
      className = ``,
      text,
      use = `primary`,
      size = `xs`,
      type = `button`,
      onClick = () => ({}),
    }: ButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...{ onClick, type }}
        className={`inline-flex items-center border border-transparent
        font-medium rounded shadow-sm focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-indigo-500 justify-center ${BUTTON_SIZE[size]} ${BUTTON_COLOR[use]} ${className}`}
      >
        {text}
      </button>
    );
  }
);

Button.displayName = `Button`;

export default Button;
