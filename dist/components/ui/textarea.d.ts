import React from 'react';
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}
export declare function Textarea({ className, ...props }: TextareaProps): React.JSX.Element;
export {};
