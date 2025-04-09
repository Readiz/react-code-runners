import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
export declare function Button({ children, className, ...props }: ButtonProps): React.JSX.Element;
export {};
