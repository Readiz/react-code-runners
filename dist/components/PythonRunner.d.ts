import React from 'react';
export interface PythonRunnerProps {
    initialCode?: string;
    initialStdin?: string;
    title?: string;
    showTitle?: boolean;
    onResult?: (result: string) => void;
}
export default function PythonRunner({ initialCode, initialStdin, title, showTitle, onResult }: PythonRunnerProps): React.JSX.Element;
