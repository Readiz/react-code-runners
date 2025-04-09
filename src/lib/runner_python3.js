// 지능적으로 WASM 파일 경로 감지
const detectPublicPath = () => {
  // 1. 사용자가 설정한 경로 사용
  if (typeof window !== 'undefined' && window.ReactCodeRunners && window.ReactCodeRunners.publicPath) {
    return window.ReactCodeRunners.publicPath;
  }
  
  // 2. Next.js 패턴: 기본적으로 /wasm-files 경로 사용 (public 디렉토리 아래)
  return '/wasm-files';
};

export async function runPython3(src, stdin, args) {
  // RustPython에 대한 경로 설정
  const publicPath = detectPublicPath();
  const rustpythonPath = `${publicPath}/rustpython_wasm.js`;
  
  console.log(`Python WASM 경로: ${rustpythonPath}`);
  
  // RustPython WASM 모듈 동적 로드
  let rustpythonModule;
  try {
    // 이미 로드되었는지 확인
    if (typeof window !== 'undefined' && window.RustPython) {
      rustpythonModule = window.RustPython;
    } else {
      // 동적으로 스크립트 로드
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = rustpythonPath;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load RustPython from ${rustpythonPath}`));
        document.head.appendChild(script);
      });
      
      if (typeof window !== 'undefined' && window.RustPython) {
        rustpythonModule = window.RustPython;
      } else {
        throw new Error('RustPython module not found after loading');
      }
    }
  } catch (error) {
    console.error('Failed to load RustPython:', error);
    return `Error: Failed to load Python interpreter: ${error.message}`;
  }
  
  let output = '';
  
  try {
    // stdout 콜백 설정
    const stdoutCallback = (text) => {
      output += text;
    };
    
    // VM 초기화
    const vm = await rustpythonModule.initVirtualMachine();
    
    // stdout 설정
    vm.setStdout(stdoutCallback);
    
    // stdin 설정 (아직 지원되지 않음, 향후 구현)
    const stdinStr = stdin ? new TextDecoder().decode(stdin) : '';
    
    // 코드 실행
    await vm.exec(src);
    
    return output;
  } catch (error) {
    console.error('Python execution error:', error);
    return `Error: ${error.message}`;
  }
} 