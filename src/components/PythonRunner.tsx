'use client';

import React, { useState } from 'react';
import { runPython3 } from '../lib/runner_python3';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import dynamic from 'next/dynamic';

// Monaco 에디터를 동적으로 불러오기 (SSR 방지)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export interface PythonRunnerProps {
  initialCode?: string;
  initialStdin?: string;
  title?: string;
  showTitle?: boolean;
  onResult?: (result: string) => void;
}

export default function PythonRunner({ 
  initialCode = `print("Hello, Python World!")`, 
  initialStdin = '',
  title = 'Python 코드 실행기',
  showTitle = true,
  onResult
}: PythonRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(initialStdin);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleRun = async () => {
    setIsLoading(true);
    setOutput('실행 중...');
    setExecutionTime(null);

    try {
      // stdin 인코딩
      const encoder = new TextEncoder();
      const stdinArray = encoder.encode(stdin);
      
      console.log("Python 코드 실행 시작");
      
      // 실행 시간 측정 시작
      const startTime = performance.now();
      
      // 코드 실행
      const result = await runPython3(code, stdinArray, []);
      
      // 실행 시간 측정 종료
      const endTime = performance.now();
      const timeElapsed = endTime - startTime;
      setExecutionTime(timeElapsed);
      
      console.log("Python 코드 실행 완료:", result);
      console.log(`실행 시간: ${timeElapsed.toFixed(2)}ms`);
      
      setOutput(result || '실행 완료');
      if (onResult) {
        onResult(result);
      }
    } catch (err: unknown) {
      console.error("Python 실행 오류:", err);
      const error = err as Error;
      setOutput(`오류 발생: ${error.message}`);
      setExecutionTime(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-md shadow-sm border">
      {showTitle && (
        <CardHeader className="px-3 pb-2">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={`px-3 ${showTitle ? 'pt-0' : 'pt-3'}`}>
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-1">
              Python 코드
            </label>
            <div className="border rounded-md overflow-hidden">
              {/* @ts-ignore */}
              <MonacoEditor
                height="400px"
                language="python"
                value={code}
                theme="vs-dark"
                onChange={(value: string | undefined) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  automaticLayout: true,
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="stdin" className="block text-sm font-medium mb-1">
              표준 입력
            </label>
            <Textarea
              id="stdin"
              value={stdin}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setStdin(e.target.value)}
              placeholder="표준 입력을 입력하세요"
              className="min-h-[80px] font-mono"
            />
          </div>
          
          <Button
            onClick={handleRun}
            disabled={isLoading}
          >
            {isLoading ? '실행 중...' : '실행'}
          </Button>
          
          <div>
            <label htmlFor="output" className="block text-sm font-medium mb-1">
              표준 출력
            </label>
            <div id="output" className="bg-gray-100 p-4 rounded-md min-h-[80px]">
              <pre className="whitespace-pre-wrap">{output}</pre>
              {executionTime !== null && (
                <div className="mt-2 text-sm text-gray-500 border-t border-gray-200 pt-2">
                  실행 시간: {executionTime.toFixed(2)}ms
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 