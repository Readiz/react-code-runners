import React from 'react';
interface CardProps {
    className?: string;
    children: React.ReactNode;
}
export declare function Card({ className, children }: CardProps): React.JSX.Element;
interface CardHeaderProps {
    className?: string;
    children: React.ReactNode;
}
export declare function CardHeader({ className, children }: CardHeaderProps): React.JSX.Element;
interface CardTitleProps {
    className?: string;
    children: React.ReactNode;
}
export declare function CardTitle({ className, children }: CardTitleProps): React.JSX.Element;
interface CardContentProps {
    className?: string;
    children: React.ReactNode;
}
export declare function CardContent({ className, children }: CardContentProps): React.JSX.Element;
export {};
