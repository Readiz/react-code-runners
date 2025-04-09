'use client';

import React, { useState } from 'react';
import { getCppRunner } from '../lib/wasm-clang/runner_cpp';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import dynamic from 'next/dynamic';

// Monaco 에디터를 동적으로 불러오기 (SSR 방지)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export interface CppRunnerProps {
  initialCode?: string;
  initialStdin?: string;
  title?: string;
  showTitle?: boolean;
  onResult?: (result: string) => void;
}

export default function CppRunner({ 
  initialCode = `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`, 
  initialStdin = '',
  title = 'C++ 코드 실행기',
  showTitle = true,
  onResult
}: CppRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(initialStdin);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleRun = async () => {
    setIsLoading(true);
    setIsCompiling(true);
    setOutput('컴파일 중...');
    setExecutionTime(null);

    try {
      // 코드 컴파일 및 러너 생성
      console.log("코드 컴파일 시작");
      // O0 최적화 옵션 적용 (교육 목적)
      const runner = await getCppRunner(code, [], { optimization: 'O0' });
      console.log("코드 컴파일 완료");
      
      setIsCompiling(false);
      setOutput('실행 중...');
      
      // stdin 인코딩
      const encoder = new TextEncoder();
      const stdinArray = encoder.encode(stdin);
      
      // 실행 시간 측정 시작
      const startTime = performance.now();
      
      // 실행 및 결과 출력
      const result = await runner(stdinArray);
      
      // 실행 시간 측정 종료
      const endTime = performance.now();
      const timeElapsed = endTime - startTime;
      setExecutionTime(timeElapsed);
      
      console.log("실행 결과:", result);
      console.log(`실행 시간: ${timeElapsed.toFixed(2)}ms`);
      
      setOutput(result || '실행 완료');
      if (onResult) {
        onResult(result);
      }
    } catch (err: unknown) {
      console.error("컴파일 또는 실행 오류:", err);
      const error = err as Error;
      setOutput(`오류 발생: ${error.message}`);
      setExecutionTime(null);
    } finally {
      setIsLoading(false);
      setIsCompiling(false);
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
              C++ 코드
            </label>
            <div className="border rounded-md overflow-hidden">
              {/* @ts-ignore */}
              <MonacoEditor
                height="400px"
                language="cpp"
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
            {isLoading ? (isCompiling ? '컴파일 중...' : '실행 중...') : '실행'}
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