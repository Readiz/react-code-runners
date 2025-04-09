interface CompileOptions {
  optimization?: string;
}

export function getCppRunner(
  src: string, 
  argv: string[], 
  compileOptions?: CompileOptions
): Promise<(stdin: ArrayBuffer | Uint8Array) => Promise<string>>;

export function runCpp(
  src: string, 
  stdin: ArrayBuffer | Uint8Array, 
  argv: string[]
): Promise<string>; 