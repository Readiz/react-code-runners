import API from "./shared.js";

let wasm_id = 0;

// 지능적으로 WASM 파일 경로 감지
const detectPublicPath = () => {
  // 1. 사용자가 설정한 경로 사용
  if (typeof window !== 'undefined' && window.ReactCodeRunners && window.ReactCodeRunners.publicPath) {
    return window.ReactCodeRunners.publicPath;
  }
  
  // 2. Next.js 패턴: 기본적으로 /wasm-files 경로 사용 (public 디렉토리 아래)
  return '/wasm-files';
};

// compileOptions 인자 추가 - 교육 목적으로 O0 최적화를 기본값으로 설정
export async function getCppRunner(src, argv, compileOptions = { optimization: 'O0' }) {
  let stdout = [];
  let logmsg = [];
  const publicPath = detectPublicPath();
  
  const options = {
    async readBuffer(filename) {
      try {
        const response = await fetch(`${publicPath}/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`);
        }
        return response.arrayBuffer();
      } catch (error) {
        console.error(`Error fetching ${filename}:`, error);
        throw error;
      }
    },

    async compileStreaming(filename) {
      try {
        const response = await fetch(`${publicPath}/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`);
        }
        return WebAssembly.compile(await response.arrayBuffer());
      } catch (error) {
        console.error(`Error compiling ${filename}:`, error);
        throw error;
      }
    },

    hostWrite(str) {
      logmsg.push(str);
      if (!str.startsWith('\x1b')) {
        stdout.push(str);
      }
    },

    "memfs": "wasm-clang/memfs.wasm",
    "sysroot": "wasm-clang/sysroot.tar",
    "clang": "wasm-clang/clang.wasm",
    "lld": "wasm-clang/lld.wasm"
  };
  
  // 컴파일 최적화 옵션 설정
  options.optimization = compileOptions.optimization || 'O0';
  
  console.log(`WASM 파일 경로: ${publicPath}`);
  
  const api = new API(options);
  const wasm_name = wasm_id.toString();
  wasm_id += 1;
  try {
    const runner = await api.compileLinkGetRunner(src, wasm_name);
    return async (stdin) => {
      try {
        stdout.splice(0, stdout.length); // reset stdout to be sure
        
        // stdin이 Uint8Array인 경우 ArrayBuffer로 변환
        const stdinBuffer = stdin instanceof Uint8Array ? stdin.buffer : stdin;
        
        const exitCode = await runner(new TextDecoder('utf8').decode(stdinBuffer));
      } catch(err) {
        throw new Error(String(err) + "\n\nLog:\n" + logmsg.join(""));
      }
      const output = stdout.join("");
      stdout.splice(0, stdout.length); // reset stdout
      return output;
    };
  } catch(err) {
    throw new Error(String(err) + "\n\nLog:\n" + logmsg.join(""));
  }
}

export async function runCpp(src, stdin, argv) {
  const runner = await getCppRunner(src, argv);
  return await runner(stdin);
} 