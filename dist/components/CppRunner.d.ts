import React from 'react';
export interface CppRunnerProps {
    initialCode?: string;
    initialStdin?: string;
    title?: string;
    showTitle?: boolean;
    onResult?: (result: string) => void;
}
export default function CppRunner({ initialCode, initialStdin, title, showTitle, onResult }: CppRunnerProps): React.JSX.Element;
