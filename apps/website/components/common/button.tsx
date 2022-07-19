import React, { forwardRef } from 'react';

export type ButtonUse = `primary` | `secondary` | `destructive` | `disabled`;
type ButtonSize = `xs` | `sm` | `md`;
type ButtonType = `button` | `submit`;

type ButtonProps = {
  size?: ButtonSize;
  type?: ButtonType;
  use?: ButtonUse;
  onClick?: (e) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export const BUTTON_SIZE: { [key in ButtonSize]: string } = {
  md: `text-base px-4 py-2`,
  sm: `text-sm px-3 py-2 leading-4`,
  xs: `text-xs px-2.5 py-1.5`,
};

export const BUTTON_COLOR: { [key in ButtonUse]: string } = {
  destructive: `text-white bg-red-600 hover:bg-red-700`,
  primary: `text-white bg-primary-400 hover:bg-primary-500`,
  secondary: `text-black bg-slate-100 hover:bg-gray-100`,
  disabled: `text-gray-500 bg-gray-200 cursor-not-allowed`,
};

const Button = forwardRef<HTMLInputElement, ButtonProps>(
  (
    {
      className = ``,
      children,
      use = `primary`,
      size = `sm`,
      type = `button`,
      onClick = () => ({}),
      disabled = false,
    }: ButtonProps,
    ref
  ) => {
    const handleDisabledClass = () =>
      disabled ? BUTTON_COLOR['disabled'] : BUTTON_COLOR[use];

    const buttonClass = `${
      BUTTON_SIZE[size]
    } ${handleDisabledClass()} ${className}`;
    return (
      <button
        ref={ref}
        {...{ onClick, type }}
        disabled={disabled}
        className={`inline-flex items-center border border-transparent
        font-medium rounded shadow-sm focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-indigo-500 justify-center ${buttonClass}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = `Button`;

export default Button;
