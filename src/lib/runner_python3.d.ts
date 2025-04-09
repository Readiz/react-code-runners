export function runPython3(
  src: string, 
  stdin: ArrayBuffer | Uint8Array, 
  args: string[]
): Promise<string>; 