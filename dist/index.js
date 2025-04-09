'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/*
 * Copyright 2020 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function readStr(u8, o, len = -1) {
  let str = '';
  let end = u8.length;
  if (len != -1)
    end = o + len;
  for (let i = o; i < end && u8[i] != 0; ++i)
    str += String.fromCharCode(u8[i]);
  return str;
}

const API = (function() {

class ProcExit extends Error {
  constructor(code) {
    super(`process exited with code ${code}.`);
    this.code = code;
  }
}
class NotImplemented extends Error {
  constructor(modname, fieldname) {
    super(`${modname}.${fieldname} not implemented.`);
  }
}

class AbortError extends Error {
  constructor(msg = 'abort') { super(msg); }
}

class AssertError extends Error {
  constructor(msg) { super(msg); }
}

function assert(cond) {
  if (!cond) {
    throw new AssertError('assertion failed.');
  }
}

function getInstance(module, imports) {
  return WebAssembly.instantiate(module, imports);
}

function getImportObject(obj, names) {
  const result = {};
  for (let name of names) {
    result[name] = obj[name].bind(obj);
  }
  return result;
}

function msToSec(start, end) {
  return ((end - start) / 1000).toFixed(2);
}

const ESUCCESS = 0;

class Memory {
  constructor(memory) {
    this.memory = memory;
    this.buffer = this.memory.buffer;
    this.u8 = new Uint8Array(this.buffer);
    this.u32 = new Uint32Array(this.buffer);
  }

  check() {
    if (this.buffer.byteLength === 0) {
      this.buffer = this.memory.buffer;
      this.u8 = new Uint8Array(this.buffer);
      this.u32 = new Uint32Array(this.buffer);
    }
  }

  read8(o) { return this.u8[o]; }
  read32(o) { return this.u32[o >> 2]; }
  write8(o, v) { this.u8[o] = v; }
  write32(o, v) { this.u32[o >> 2] = v; }
  write64(o, vlo, vhi = 0) { this.write32(o, vlo); this.write32(o + 4, vhi); }

  readStr(o, len) {
    return readStr(this.u8, o, len);
  }

  // Null-terminated string.
  writeStr(o, str) {
    o += this.write(o, str);
    this.write8(o, 0);
    return str.length + 1;
  }

  write(o, buf) {
    if (buf instanceof ArrayBuffer) {
      return this.write(o, new Uint8Array(buf));
    } else if (typeof buf === 'string') {
      return this.write(o, buf.split('').map(x => x.charCodeAt(0)));
    } else {
      const dst = new Uint8Array(this.buffer, o, buf.length);
      dst.set(buf);
      return buf.length;
    }
  }
}
class MemFS {
  constructor(options) {
    const compileStreaming = options.compileStreaming;
    this.hostWrite = options.hostWrite;
    this.stdinStr = options.stdinStr || "";
    this.stdinStrPos = 0;
    this.memfsFilename = options.memfsFilename;

    this.hostMem_ = null;  // Set later when wired up to application.

    // Imports for memfs module.
    const env = getImportObject(
        this, [ 'abort', 'host_write', 'host_read', 'memfs_log', 'copy_in', 'copy_out' ]);

    this.ready = compileStreaming(this.memfsFilename)
                     .then(module => WebAssembly.instantiate(module, {env}))
                     .then(instance => {
                       this.instance = instance;
                       this.exports = instance.exports;
                       this.mem = new Memory(this.exports.memory);
                       this.exports.init();
                     });
  }

  set hostMem(mem) {
    this.hostMem_ = mem;
  }

  setStdinStr(str) {
    console.log("setStdinStr called with:", str);
    console.log("setStdinStr type:", typeof str);
    this.stdinStr = str;
    this.stdinStrPos = 0;
  }

  addDirectory(path) {
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    this.exports.AddDirectoryNode(path.length);
  }

  addFile(path, contents) {
    const length =
        contents instanceof ArrayBuffer ? contents.byteLength : contents.length;
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    const inode = this.exports.AddFileNode(path.length, length);
    const addr = this.exports.GetFileNodeAddress(inode);
    this.mem.check();
    this.mem.write(addr, contents);
  }

  getFileContents(path) {
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    const inode = this.exports.FindNode(path.length);
    const addr = this.exports.GetFileNodeAddress(inode);
    const size = this.exports.GetFileNodeSize(inode);
    return new Uint8Array(this.mem.buffer, addr, size);
  }

  abort() { throw new AbortError(); }

  host_write(fd, iovs, iovs_len, nwritten_out) {
    this.hostMem_.check();
    assert(fd <= 2);
    let size = 0;
    let str = '';
    for (let i = 0; i < iovs_len; ++i) {
      const buf = this.hostMem_.read32(iovs);
      iovs += 4;
      const len = this.hostMem_.read32(iovs);
      iovs += 4;
      str += this.hostMem_.readStr(buf, len);
      size += len;
    }
    this.hostMem_.write32(nwritten_out, size);
    this.hostWrite(str);
    return ESUCCESS;
  }

  host_read(fd, iovs, iovs_len, nread) {
    this.hostMem_.check();
    assert(fd === 0);
    let size = 0;
    for (let i = 0; i < iovs_len; ++i) {
      const buf = this.hostMem_.read32(iovs);
      iovs += 4;
      const len = this.hostMem_.read32(iovs);
      iovs += 4;
      const lenToWrite = Math.min(len, (this.stdinStr.length - this.stdinStrPos));
      if(lenToWrite === 0){
        break;
      }
      this.hostMem_.write(buf, this.stdinStr.substr(this.stdinStrPos, lenToWrite));
      size += lenToWrite;
      this.stdinStrPos += lenToWrite;
      if(lenToWrite !== len){
        break;
      }
    }
    // For logging
    // this.hostWrite("Read "+ size + "bytes, pos: "+ this.stdinStrPos + "\n");
    this.hostMem_.write32(nread, size);
    return ESUCCESS;
  }

  memfs_log(buf, len) {
    this.mem.check();
    console.log(this.mem.readStr(buf, len));
  }

  copy_out(clang_dst, memfs_src, size) {
    this.hostMem_.check();
    const dst = new Uint8Array(this.hostMem_.buffer, clang_dst, size);
    this.mem.check();
    const src = new Uint8Array(this.mem.buffer, memfs_src, size);
    // console.log(`copy_out(${clang_dst.toString(16)}, ${memfs_src.toString(16)}, ${size})`);
    dst.set(src);
  }

  copy_in(memfs_dst, clang_src, size) {
    this.mem.check();
    const dst = new Uint8Array(this.mem.buffer, memfs_dst, size);
    this.hostMem_.check();
    const src = new Uint8Array(this.hostMem_.buffer, clang_src, size);
    // console.log(`copy_in(${memfs_dst.toString(16)}, ${clang_src.toString(16)}, ${size})`);
    dst.set(src);
  }
}

class App {
  constructor(module, memfs, name, ...args) {
    this.argv = [name, ...args];
    this.environ = {USER : 'alice'};
    this.memfs = memfs;
    this.allowRequestAnimationFrame = true;
    this.handles = new Map();
    this.nextHandle = 0;

    const env = getImportObject(this, [
    ]);

    const wasi_unstable = getImportObject(this, [
      'proc_exit', 'environ_sizes_get', 'environ_get', 'args_sizes_get',
      'args_get', 'random_get', 'clock_time_get', 'poll_oneoff'
    ]);

    // Fill in some WASI implementations from memfs.
    Object.assign(wasi_unstable, this.memfs.exports);

    this.ready = getInstance(module, {wasi_unstable, env}).then(instance => {
      this.instance = instance;
      this.exports = this.instance.exports;
      this.mem = new Memory(this.exports.memory);
      this.memfs.hostMem = this.mem;
    });
  }

  async run() {
    await this.ready;
    try {
      this.exports._start();
    } catch (exn) {
      let writeStack = true;
      if (exn instanceof ProcExit) {
        // Don't allow rAF in any case; we're building an online judge.
        this.allowRequestAnimationFrame = false;
        if (exn.code == 0) {
          return false;
        }
        writeStack = false;
      }

      // Write error message.
      let msg = `\x1b[91mError: ${exn.message}`;
      if (writeStack) {
        msg = msg + `\n${exn.stack}`;
      }
      msg += '\x1b[0m\n';
      this.memfs.hostWrite(msg);

      // Propagate error.
      throw exn;
    }
  }

  proc_exit(code) {
    throw new ProcExit(code);
  }

  environ_sizes_get(environ_count_out, environ_buf_size_out) {
    this.mem.check();
    let size = 0;
    const names = Object.getOwnPropertyNames(this.environ);
    for (const name of names) {
      const value = this.environ[name];
      // +2 to account for = and \0 in "name=value\0".
      size += name.length + value.length + 2;
    }
    this.mem.write64(environ_count_out, names.length);
    this.mem.write64(environ_buf_size_out, size);
    return ESUCCESS;
  }

  environ_get(environ_ptrs, environ_buf) {
    this.mem.check();
    const names = Object.getOwnPropertyNames(this.environ);
    for (const name of names) {
      this.mem.write32(environ_ptrs, environ_buf);
      environ_ptrs += 4;
      environ_buf +=
          this.mem.writeStr(environ_buf, `${name}=${this.environ[name]}`);
    }
    this.mem.write32(environ_ptrs, 0);
    return ESUCCESS;
  }

  args_sizes_get(argc_out, argv_buf_size_out) {
    this.mem.check();
    let size = 0;
    for (let arg of this.argv) {
      size += arg.length + 1;  // "arg\0".
    }
    this.mem.write64(argc_out, this.argv.length);
    this.mem.write64(argv_buf_size_out, size);
    return ESUCCESS;
  }

  args_get(argv_ptrs, argv_buf) {
    this.mem.check();
    for (let arg of this.argv) {
      this.mem.write32(argv_ptrs, argv_buf);
      argv_ptrs += 4;
      argv_buf += this.mem.writeStr(argv_buf, arg);
    }
    this.mem.write32(argv_ptrs, 0);
    return ESUCCESS;
  }

  random_get(buf, buf_len) {
    const data = new Uint8Array(this.mem.buffer, buf, buf_len);
    for (let i = 0; i < buf_len; ++i) {
      data[i] = (Math.random() * 256) | 0;
    }
  }

  clock_time_get(clock_id, precision, time_out) {
    throw new NotImplemented('wasi_unstable', 'clock_time_get');
  }

  poll_oneoff(in_ptr, out_ptr, nsubscriptions, nevents_out) {
    throw new NotImplemented('wasi_unstable', 'poll_oneoff');
  }
}

class Tar {
  constructor(buffer) {
    this.u8 = new Uint8Array(buffer);
    this.offset = 0;
  }

  readStr(len) {
    const result = readStr(this.u8, this.offset, len);
    this.offset += len;
    return result;
  }

  readOctal(len) {
    return parseInt(this.readStr(len), 8);
  }

  alignUp() {
    this.offset = (this.offset + 511) & ~511;
  }

  readEntry() {
    if (this.offset + 512 > this.u8.length) {
      return null;
    }

    const entry = {
      filename : this.readStr(100),
      mode : this.readOctal(8),
      owner : this.readOctal(8),
      group : this.readOctal(8),
      size : this.readOctal(12),
      mtim : this.readOctal(12),
      checksum : this.readOctal(8),
      type : this.readStr(1),
      linkname : this.readStr(100),
    };

    if (this.readStr(8) !== 'ustar  ') {
      return null;
    }

    entry.ownerName = this.readStr(32);
    entry.groupName = this.readStr(32);
    entry.devMajor = this.readStr(8);
    entry.devMinor = this.readStr(8);
    entry.filenamePrefix = this.readStr(155);
    this.alignUp();

    if (entry.type === '0') {        // Regular file.
      entry.contents = this.u8.subarray(this.offset, this.offset + entry.size);
      this.offset += entry.size;
      this.alignUp();
    } else if (entry.type !== '5') { // Directory.
      console.log('type', entry.type);
      assert(false);
    }
    return entry;
  }

  untar(memfs) {
    let entry;
    while (entry = this.readEntry()) {
      switch (entry.type) {
      case '0': // Regular file.
        memfs.addFile(entry.filename, entry.contents);
        break;
      case '5':
        memfs.addDirectory(entry.filename);
        break;
      }
    }
  }
}

class API {
  constructor(options) {
    this.moduleCache = {};
    this.readBuffer = options.readBuffer;
    this.compileStreaming = options.compileStreaming;
    this.hostWrite = options.hostWrite;
    this.clangFilename = options.clang || 'clang';
    this.lldFilename = options.lld || 'lld';
    this.sysrootFilename = options.sysroot || 'sysroot.tar';
    this.showTiming = options.showTiming || false;
    this.optimization = options.optimization || 'O0';

    this.clangCommonArgs = [
      '-disable-free',
      '-isysroot', '/',
      '-internal-isystem', '/include/c++/v1',
      '-internal-isystem', '/include',
      '-internal-isystem', '/lib/clang/8.0.1/include',
      '-ferror-limit', '19',
      '-fmessage-length', '80',
      '-fcolor-diagnostics',
    ];

    this.memfs = new MemFS({
      compileStreaming : this.compileStreaming,
      hostWrite : this.hostWrite,
      memfsFilename : options.memfs || 'memfs',
      stdinStr : options.stdinStr || ""
    });
    this.ready = this.memfs.ready.then(
        () => { return this.untar(this.memfs, this.sysrootFilename); });
  }

  hostLog(message) {
    const yellowArrow = '\x1b[1;93m>\x1b[0m ';
    this.hostWrite(`${yellowArrow}${message}`);
  }

  async hostLogAsync(message, promise) {
    const start = +new Date();
    this.hostLog(`${message}...`);
    const result = await promise;
    const end = +new Date();
    this.hostLog(' done.');
    if (this.showTiming) {
      const green = '\x1b[92m';
      const normal = '\x1b[0m';
      this.hostLog(` ${green}(${msToSec(start, end)}s)${normal}\n`);
    }
    this.hostLog('\n');
    return result;
  }

  async getModule(name) {
    if (this.moduleCache[name]) return this.moduleCache[name];
    const module = await this.hostLogAsync(`Fetching and compiling ${name}`,
                                           this.compileStreaming(name));
    this.moduleCache[name] = module;
    return module;
  }

  async untar(memfs, filename) {
    await this.memfs.ready;
    const promise = (async () => {
      const tar = new Tar(await this.readBuffer(filename));
      tar.untar(this.memfs);
    })();
    await this.hostLogAsync(`Untarring ${filename}`, promise);
  }

  async compile(options) {
    const input = options.input;
    const contents = options.contents;
    const obj = options.obj;
    options.opt || '2';

    await this.ready;
    this.memfs.addFile(input, contents);
    const clang = await this.getModule(this.clangFilename);
    
    // 최적화 레벨 설정 (options에서 가져오거나 기본값 O0 사용)
    const optimizationFlag = this.optimization ? `-${this.optimization}` : '-O0';
    
    return await this.run(clang, 'clang', '-cc1', '-emit-obj',
                          ...this.clangCommonArgs, optimizationFlag, '-o', obj, '-x',
                          'c++', '-std=gnu++17', '-Wno-c++17-extensions', '-Werror=uninitialized', input);
  }

  async link(obj, wasm) {
    const stackSize = 1024 * 1024;

    const libdir = 'lib/wasm32-wasi';
    const crt1 = `${libdir}/crt1.o`;
    await this.ready;
    const lld = await this.getModule(this.lldFilename);
    return await this.run(
        lld, 'wasm-ld', '--no-threads',
        '--export-dynamic',  // TODO required?
        '-lc-printscan-long-double',
        '-z', `stack-size=${stackSize}`, `-L${libdir}`, crt1, obj, '-lc',
        '-lc++', '-lc++abi', '-Llib/clang/8.0.1/lib/wasi', '-lclang_rt.builtins-wasm32', '-o', wasm)
  }

  async run(module, ...args) {
    this.hostLog(`${args.join(' ')}\n`);
    const start = +new Date();
    const app = new App(module, this.memfs, ...args);
    const instantiate = +new Date();
    const stillRunning = await app.run();
    const end = +new Date();
    this.hostLog('\n');
    if (this.showTiming) {
      const green = '\x1b[92m';
      const normal = '\x1b[0m';
      let msg = `${green}(${msToSec(start, instantiate)}s`;
      msg += `/${msToSec(instantiate, end)}s)${normal}\n`;
      this.hostLog(msg);
    }
    return stillRunning ? app : null;
  }

  async compileLinkGetRunner(contents, wasm_name) {
    const input = `test.cc`;
    const obj = `test.o`;
    const wasm = wasm_name || `test.wasm`;
    await this.compile({input, contents, obj});
    await this.link(obj, wasm);

    const buffer = this.memfs.getFileContents(wasm);
    const testMod = await this.hostLogAsync(`Compiling ${wasm}`,
                                            WebAssembly.compile(buffer));
    return (stdin) => {
      console.log("compileLinkGetRunner stdin:", stdin);
      console.log("compileLinkGetRunner stdin type:", typeof stdin);
      this.memfs.setStdinStr(stdin);
      return this.run(testMod, wasm);
    }
  }
}

return API;

})();

let wasm_id = 0;

// 지능적으로 WASM 파일 경로 감지
const detectPublicPath$1 = () => {
  // 1. 사용자가 설정한 경로 사용
  if (typeof window !== 'undefined' && window.ReactCodeRunners && window.ReactCodeRunners.publicPath) {
    return window.ReactCodeRunners.publicPath;
  }
  
  // 2. Next.js 패턴: 기본적으로 /wasm-files 경로 사용 (public 디렉토리 아래)
  return '/wasm-files';
};

// compileOptions 인자 추가 - 교육 목적으로 O0 최적화를 기본값으로 설정
async function getCppRunner(src, argv, compileOptions = { optimization: 'O0' }) {
  let stdout = [];
  let logmsg = [];
  const publicPath = detectPublicPath$1();
  
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

function Button(_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    var buttonStyle = {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        borderRadius: '0.375rem',
        backgroundColor: '#2563eb', // blue-600
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 150ms',
        outline: 'none',
    };
    var disabledStyle = {
        opacity: 0.5,
        cursor: 'not-allowed',
    };
    !props.disabled ? {
        ':hover': {
            backgroundColor: '#1d4ed8', // blue-700
        }
    } : {};
    return (React__default["default"].createElement("button", __assign({ style: __assign(__assign({}, buttonStyle), (props.disabled ? disabledStyle : {})), className: className }, props), children));
}

function Textarea(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var textareaStyle = {
        width: '100%',
        padding: '0.5rem 0.75rem',
        color: '#374151', // gray-700
        border: '1px solid #d1d5db', // gray-300
        borderRadius: '0.375rem',
        resize: 'none',
        outline: 'none',
    };
    return (React__default["default"].createElement("textarea", __assign({ style: textareaStyle, className: className }, props)));
}

function Card(_a) {
    var className = _a.className, children = _a.children;
    var cardStyle = {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb', // gray-200
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    };
    return (React__default["default"].createElement("div", { style: cardStyle, className: className }, children));
}
function CardHeader(_a) {
    var className = _a.className, children = _a.children;
    var headerStyle = {
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb', // gray-200
    };
    return (React__default["default"].createElement("div", { style: headerStyle, className: className }, children));
}
function CardTitle(_a) {
    var className = _a.className, children = _a.children;
    var titleStyle = {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.5,
        color: '#111827', // gray-900
    };
    return (React__default["default"].createElement("h3", { style: titleStyle, className: className }, children));
}
function CardContent(_a) {
    var className = _a.className, children = _a.children;
    var contentStyle = {
        padding: '1rem',
    };
    return (React__default["default"].createElement("div", { style: contentStyle, className: className }, children));
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dynamic$2 = {exports: {}};

var dynamic$1 = {exports: {}};

var _interop_require_default$1 = {};

_interop_require_default$1._ = _interop_require_default$1._interop_require_default = _interop_require_default;
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=React__default["default"],k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	var React = React__default["default"];

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;
	var didWarnAboutStringRefs;

	{
	  didWarnAboutStringRefs = {};
	}

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
	      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

	      if (!didWarnAboutStringRefs[componentName]) {
	        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

	        didWarnAboutStringRefs[componentName] = true;
	      }
	    }
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {
	    if (source !== undefined) {
	      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
	      var lineNumber = source.lineNumber;
	      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
	    }

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum(source);

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}
	return reactJsxRuntime_development;
}

(function (module) {

	if (process.env.NODE_ENV === 'production') {
	  module.exports = requireReactJsxRuntime_production_min();
	} else {
	  module.exports = requireReactJsxRuntime_development();
	}
} (jsxRuntime));

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var loadable_sharedRuntime = {};

var loadableContext_sharedRuntime = {};

var hasRequiredLoadableContext_sharedRuntime;

function requireLoadableContext_sharedRuntime () {
	if (hasRequiredLoadableContext_sharedRuntime) return loadableContext_sharedRuntime;
	hasRequiredLoadableContext_sharedRuntime = 1;
	(function (exports) {
		"use client";
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "LoadableContext", {
		    enumerable: true,
		    get: function() {
		        return LoadableContext;
		    }
		});
		const _interop_require_default = _interop_require_default$1;
		const _react = /*#__PURE__*/ _interop_require_default._(React__default["default"]);
		const LoadableContext = _react.default.createContext(null);
		if (process.env.NODE_ENV !== "production") {
		    LoadableContext.displayName = "LoadableContext";
		}

		
} (loadableContext_sharedRuntime));
	return loadableContext_sharedRuntime;
}

var hasRequiredLoadable_sharedRuntime;

function requireLoadable_sharedRuntime () {
	if (hasRequiredLoadable_sharedRuntime) return loadable_sharedRuntime;
	hasRequiredLoadable_sharedRuntime = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return _default;
		    }
		});
		const _interop_require_default = _interop_require_default$1;
		const _react = /*#__PURE__*/ _interop_require_default._(React__default["default"]);
		const _loadablecontextsharedruntime = requireLoadableContext_sharedRuntime();
		function resolve(obj) {
		    return obj && obj.default ? obj.default : obj;
		}
		const ALL_INITIALIZERS = [];
		const READY_INITIALIZERS = [];
		let initialized = false;
		function load(loader) {
		    let promise = loader();
		    let state = {
		        loading: true,
		        loaded: null,
		        error: null
		    };
		    state.promise = promise.then((loaded)=>{
		        state.loading = false;
		        state.loaded = loaded;
		        return loaded;
		    }).catch((err)=>{
		        state.loading = false;
		        state.error = err;
		        throw err;
		    });
		    return state;
		}
		function createLoadableComponent(loadFn, options) {
		    let opts = Object.assign({
		        loader: null,
		        loading: null,
		        delay: 200,
		        timeout: null,
		        webpack: null,
		        modules: null
		    }, options);
		    /** @type LoadableSubscription */ let subscription = null;
		    function init() {
		        if (!subscription) {
		            // eslint-disable-next-line @typescript-eslint/no-use-before-define
		            const sub = new LoadableSubscription(loadFn, opts);
		            subscription = {
		                getCurrentValue: sub.getCurrentValue.bind(sub),
		                subscribe: sub.subscribe.bind(sub),
		                retry: sub.retry.bind(sub),
		                promise: sub.promise.bind(sub)
		            };
		        }
		        return subscription.promise();
		    }
		    // Server only
		    if (typeof window === "undefined") {
		        ALL_INITIALIZERS.push(init);
		    }
		    // Client only
		    if (!initialized && typeof window !== "undefined") {
		        // require.resolveWeak check is needed for environments that don't have it available like Jest
		        const moduleIds = opts.webpack && typeof commonjsRequire.resolveWeak === "function" ? opts.webpack() : opts.modules;
		        if (moduleIds) {
		            READY_INITIALIZERS.push((ids)=>{
		                for (const moduleId of moduleIds){
		                    if (ids.includes(moduleId)) {
		                        return init();
		                    }
		                }
		            });
		        }
		    }
		    function useLoadableModule() {
		        init();
		        const context = _react.default.useContext(_loadablecontextsharedruntime.LoadableContext);
		        if (context && Array.isArray(opts.modules)) {
		            opts.modules.forEach((moduleName)=>{
		                context(moduleName);
		            });
		        }
		    }
		    function LoadableComponent(props, ref) {
		        useLoadableModule();
		        const state = _react.default.useSyncExternalStore(subscription.subscribe, subscription.getCurrentValue, subscription.getCurrentValue);
		        _react.default.useImperativeHandle(ref, ()=>({
		                retry: subscription.retry
		            }), []);
		        return _react.default.useMemo(()=>{
		            if (state.loading || state.error) {
		                return /*#__PURE__*/ _react.default.createElement(opts.loading, {
		                    isLoading: state.loading,
		                    pastDelay: state.pastDelay,
		                    timedOut: state.timedOut,
		                    error: state.error,
		                    retry: subscription.retry
		                });
		            } else if (state.loaded) {
		                return /*#__PURE__*/ _react.default.createElement(resolve(state.loaded), props);
		            } else {
		                return null;
		            }
		        }, [
		            props,
		            state
		        ]);
		    }
		    LoadableComponent.preload = ()=>init();
		    LoadableComponent.displayName = "LoadableComponent";
		    return /*#__PURE__*/ _react.default.forwardRef(LoadableComponent);
		}
		class LoadableSubscription {
		    promise() {
		        return this._res.promise;
		    }
		    retry() {
		        this._clearTimeouts();
		        this._res = this._loadFn(this._opts.loader);
		        this._state = {
		            pastDelay: false,
		            timedOut: false
		        };
		        const { _res: res, _opts: opts } = this;
		        if (res.loading) {
		            if (typeof opts.delay === "number") {
		                if (opts.delay === 0) {
		                    this._state.pastDelay = true;
		                } else {
		                    this._delay = setTimeout(()=>{
		                        this._update({
		                            pastDelay: true
		                        });
		                    }, opts.delay);
		                }
		            }
		            if (typeof opts.timeout === "number") {
		                this._timeout = setTimeout(()=>{
		                    this._update({
		                        timedOut: true
		                    });
		                }, opts.timeout);
		            }
		        }
		        this._res.promise.then(()=>{
		            this._update({});
		            this._clearTimeouts();
		        }).catch((_err)=>{
		            this._update({});
		            this._clearTimeouts();
		        });
		        this._update({});
		    }
		    _update(partial) {
		        this._state = {
		            ...this._state,
		            error: this._res.error,
		            loaded: this._res.loaded,
		            loading: this._res.loading,
		            ...partial
		        };
		        this._callbacks.forEach((callback)=>callback());
		    }
		    _clearTimeouts() {
		        clearTimeout(this._delay);
		        clearTimeout(this._timeout);
		    }
		    getCurrentValue() {
		        return this._state;
		    }
		    subscribe(callback) {
		        this._callbacks.add(callback);
		        return ()=>{
		            this._callbacks.delete(callback);
		        };
		    }
		    constructor(loadFn, opts){
		        this._loadFn = loadFn;
		        this._opts = opts;
		        this._callbacks = new Set();
		        this._delay = null;
		        this._timeout = null;
		        this.retry();
		    }
		}
		function Loadable(opts) {
		    return createLoadableComponent(load, opts);
		}
		function flushInitializers(initializers, ids) {
		    let promises = [];
		    while(initializers.length){
		        let init = initializers.pop();
		        promises.push(init(ids));
		    }
		    return Promise.all(promises).then(()=>{
		        if (initializers.length) {
		            return flushInitializers(initializers, ids);
		        }
		    });
		}
		Loadable.preloadAll = ()=>{
		    return new Promise((resolveInitializers, reject)=>{
		        flushInitializers(ALL_INITIALIZERS).then(resolveInitializers, reject);
		    });
		};
		Loadable.preloadReady = (ids)=>{
		    if (ids === void 0) ids = [];
		    return new Promise((resolvePreload)=>{
		        const res = ()=>{
		            initialized = true;
		            return resolvePreload();
		        };
		        // We always will resolve, errors should be handled within loading UIs.
		        flushInitializers(READY_INITIALIZERS, ids).then(res, res);
		    });
		};
		if (typeof window !== "undefined") {
		    window.__NEXT_PRELOADREADY = Loadable.preloadReady;
		}
		const _default = Loadable;

		
} (loadable_sharedRuntime));
	return loadable_sharedRuntime;
}

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    /**
	 * This function lets you dynamically import a component.
	 * It uses [React.lazy()](https://react.dev/reference/react/lazy) with [Suspense](https://react.dev/reference/react/Suspense) under the hood.
	 *
	 * Read more: [Next.js Docs: `next/dynamic`](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)
	 */ default: function() {
	        return dynamic;
	    },
	    noSSR: function() {
	        return noSSR;
	    }
	});
	const _interop_require_default = _interop_require_default$1;
	const _jsxruntime = jsxRuntime.exports;
	const _loadablesharedruntime = /*#__PURE__*/ _interop_require_default._(requireLoadable_sharedRuntime());
	const isServerSide = typeof window === "undefined";
	// Normalize loader to return the module as form { default: Component } for `React.lazy`.
	// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
	// Client component reference proxy need to be converted to a module.
	function convertModule(mod) {
	    return {
	        default: (mod == null ? void 0 : mod.default) || mod
	    };
	}
	function noSSR(LoadableInitializer, loadableOptions) {
	    // Removing webpack and modules means react-loadable won't try preloading
	    delete loadableOptions.webpack;
	    delete loadableOptions.modules;
	    // This check is necessary to prevent react-loadable from initializing on the server
	    if (!isServerSide) {
	        return LoadableInitializer(loadableOptions);
	    }
	    const Loading = loadableOptions.loading;
	    // This will only be rendered on the server side
	    return ()=>/*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
	            error: null,
	            isLoading: true,
	            pastDelay: false,
	            timedOut: false
	        });
	}
	function dynamic(dynamicOptions, options) {
	    let loadableFn = _loadablesharedruntime.default;
	    let loadableOptions = {
	        // A loading component is not required, so we default it
	        loading: (param)=>{
	            let { error, isLoading, pastDelay } = param;
	            if (!pastDelay) return null;
	            if (process.env.NODE_ENV !== "production") {
	                if (isLoading) {
	                    return null;
	                }
	                if (error) {
	                    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("p", {
	                        children: [
	                            error.message,
	                            /*#__PURE__*/ (0, _jsxruntime.jsx)("br", {}),
	                            error.stack
	                        ]
	                    });
	                }
	            }
	            return null;
	        }
	    };
	    // Support for direct import(), eg: dynamic(import('../hello-world'))
	    // Note that this is only kept for the edge case where someone is passing in a promise as first argument
	    // The react-loadable babel plugin will turn dynamic(import('../hello-world')) into dynamic(() => import('../hello-world'))
	    // To make sure we don't execute the import without rendering first
	    if (dynamicOptions instanceof Promise) {
	        loadableOptions.loader = ()=>dynamicOptions;
	    // Support for having import as a function, eg: dynamic(() => import('../hello-world'))
	    } else if (typeof dynamicOptions === "function") {
	        loadableOptions.loader = dynamicOptions;
	    // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})
	    } else if (typeof dynamicOptions === "object") {
	        loadableOptions = {
	            ...loadableOptions,
	            ...dynamicOptions
	        };
	    }
	    // Support for passing options, eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})
	    loadableOptions = {
	        ...loadableOptions,
	        ...options
	    };
	    const loaderFn = loadableOptions.loader;
	    const loader = ()=>loaderFn != null ? loaderFn().then(convertModule) : Promise.resolve(convertModule(()=>null));
	    // coming from build/babel/plugins/react-loadable-plugin.js
	    if (loadableOptions.loadableGenerated) {
	        loadableOptions = {
	            ...loadableOptions,
	            ...loadableOptions.loadableGenerated
	        };
	        delete loadableOptions.loadableGenerated;
	    }
	    // support for disabling server side rendering, eg: dynamic(() => import('../hello-world'), {ssr: false}).
	    if (typeof loadableOptions.ssr === "boolean" && !loadableOptions.ssr) {
	        delete loadableOptions.webpack;
	        delete loadableOptions.modules;
	        return noSSR(loadableFn, loadableOptions);
	    }
	    return loadableFn({
	        ...loadableOptions,
	        loader: loader
	    });
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (dynamic$1, dynamic$1.exports));

(function (module) {
	module.exports = dynamic$1.exports;
} (dynamic$2));

var dynamic = /*@__PURE__*/getDefaultExportFromCjs(dynamic$2.exports);

// Monaco 에디터를 동적으로 불러오기 (SSR 방지)
var MonacoEditor$1 = dynamic(function () { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@monaco-editor/react')); }); }, { ssr: false });
function CppRunner(_a) {
    var _this = this;
    var _b = _a.initialCode, initialCode = _b === void 0 ? "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}" : _b, _c = _a.initialStdin, initialStdin = _c === void 0 ? '' : _c, _d = _a.title, title = _d === void 0 ? 'C++ 코드 실행기' : _d, _e = _a.showTitle, showTitle = _e === void 0 ? true : _e, onResult = _a.onResult;
    var _f = React.useState(initialCode), code = _f[0], setCode = _f[1];
    var _g = React.useState(initialStdin), stdin = _g[0], setStdin = _g[1];
    var _h = React.useState(''), output = _h[0], setOutput = _h[1];
    var _j = React.useState(false), isLoading = _j[0], setIsLoading = _j[1];
    var _k = React.useState(false), isCompiling = _k[0], setIsCompiling = _k[1];
    var _l = React.useState(null), executionTime = _l[0], setExecutionTime = _l[1];
    var handleRun = function () { return __awaiter(_this, void 0, void 0, function () {
        var runner, encoder, stdinArray, startTime, result, endTime, timeElapsed, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    setIsCompiling(true);
                    setOutput('컴파일 중...');
                    setExecutionTime(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    // 코드 컴파일 및 러너 생성
                    console.log("코드 컴파일 시작");
                    return [4 /*yield*/, getCppRunner(code, [], { optimization: 'O0' })];
                case 2:
                    runner = _a.sent();
                    console.log("코드 컴파일 완료");
                    setIsCompiling(false);
                    setOutput('실행 중...');
                    encoder = new TextEncoder();
                    stdinArray = encoder.encode(stdin);
                    startTime = performance.now();
                    return [4 /*yield*/, runner(stdinArray)];
                case 3:
                    result = _a.sent();
                    endTime = performance.now();
                    timeElapsed = endTime - startTime;
                    setExecutionTime(timeElapsed);
                    console.log("실행 결과:", result);
                    console.log("\uC2E4\uD589 \uC2DC\uAC04: ".concat(timeElapsed.toFixed(2), "ms"));
                    setOutput(result || '실행 완료');
                    if (onResult) {
                        onResult(result);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error("컴파일 또는 실행 오류:", err_1);
                    error = err_1;
                    setOutput("\uC624\uB958 \uBC1C\uC0DD: ".concat(error.message));
                    setExecutionTime(null);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    setIsCompiling(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React__default["default"].createElement(Card, { className: "rounded-md shadow-sm border" },
        showTitle && (React__default["default"].createElement(CardHeader, { className: "px-3 pb-2" },
            React__default["default"].createElement(CardTitle, null, title))),
        React__default["default"].createElement(CardContent, { className: "px-3 ".concat(showTitle ? 'pt-0' : 'pt-3') },
            React__default["default"].createElement("div", { className: "space-y-4" },
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("label", { htmlFor: "code", className: "block text-sm font-medium mb-1" }, "C++ \uCF54\uB4DC"),
                    React__default["default"].createElement("div", { className: "border rounded-md overflow-hidden" },
                        React__default["default"].createElement(MonacoEditor$1, { height: "400px", language: "cpp", value: code, theme: "vs-dark", onChange: function (value) { return setCode(value || ''); }, options: {
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 14,
                                automaticLayout: true,
                                wordWrap: 'on',
                            } }))),
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("label", { htmlFor: "stdin", className: "block text-sm font-medium mb-1" }, "\uD45C\uC900 \uC785\uB825"),
                    React__default["default"].createElement(Textarea, { id: "stdin", value: stdin, onChange: function (e) { return setStdin(e.target.value); }, placeholder: "\uD45C\uC900 \uC785\uB825\uC744 \uC785\uB825\uD558\uC138\uC694", className: "min-h-[80px] font-mono" })),
                React__default["default"].createElement(Button, { onClick: handleRun, disabled: isLoading }, isLoading ? (isCompiling ? '컴파일 중...' : '실행 중...') : '실행'),
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("label", { htmlFor: "output", className: "block text-sm font-medium mb-1" }, "\uD45C\uC900 \uCD9C\uB825"),
                    React__default["default"].createElement("div", { id: "output", className: "bg-gray-100 p-4 rounded-md min-h-[80px]" },
                        React__default["default"].createElement("pre", { className: "whitespace-pre-wrap" }, output),
                        executionTime !== null && (React__default["default"].createElement("div", { className: "mt-2 text-sm text-gray-500 border-t border-gray-200 pt-2" },
                            "\uC2E4\uD589 \uC2DC\uAC04: ",
                            executionTime.toFixed(2),
                            "ms"))))))));
}

// 지능적으로 WASM 파일 경로 감지
const detectPublicPath = () => {
  // 1. 사용자가 설정한 경로 사용
  if (typeof window !== 'undefined' && window.ReactCodeRunners && window.ReactCodeRunners.publicPath) {
    return window.ReactCodeRunners.publicPath;
  }
  
  // 2. Next.js 패턴: 기본적으로 /wasm-files 경로 사용 (public 디렉토리 아래)
  return '/wasm-files';
};

async function runPython3(src, stdin, args) {
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

// Monaco 에디터를 동적으로 불러오기 (SSR 방지)
var MonacoEditor = dynamic(function () { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@monaco-editor/react')); }); }, { ssr: false });
function PythonRunner(_a) {
    var _this = this;
    var _b = _a.initialCode, initialCode = _b === void 0 ? "print(\"Hello, Python World!\")" : _b, _c = _a.initialStdin, initialStdin = _c === void 0 ? '' : _c, _d = _a.title, title = _d === void 0 ? 'Python 코드 실행기' : _d, _e = _a.showTitle, showTitle = _e === void 0 ? true : _e, onResult = _a.onResult;
    var _f = React.useState(initialCode), code = _f[0], setCode = _f[1];
    var _g = React.useState(initialStdin), stdin = _g[0], setStdin = _g[1];
    var _h = React.useState(''), output = _h[0], setOutput = _h[1];
    var _j = React.useState(false), isLoading = _j[0], setIsLoading = _j[1];
    var _k = React.useState(null), executionTime = _k[0], setExecutionTime = _k[1];
    var handleRun = function () { return __awaiter(_this, void 0, void 0, function () {
        var encoder, stdinArray, startTime, result, endTime, timeElapsed, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    setOutput('실행 중...');
                    setExecutionTime(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    encoder = new TextEncoder();
                    stdinArray = encoder.encode(stdin);
                    console.log("Python 코드 실행 시작");
                    startTime = performance.now();
                    return [4 /*yield*/, runPython3(code, stdinArray)];
                case 2:
                    result = _a.sent();
                    endTime = performance.now();
                    timeElapsed = endTime - startTime;
                    setExecutionTime(timeElapsed);
                    console.log("Python 코드 실행 완료:", result);
                    console.log("\uC2E4\uD589 \uC2DC\uAC04: ".concat(timeElapsed.toFixed(2), "ms"));
                    setOutput(result || '실행 완료');
                    if (onResult) {
                        onResult(result);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error("Python 실행 오류:", err_1);
                    error = err_1;
                    setOutput("\uC624\uB958 \uBC1C\uC0DD: ".concat(error.message));
                    setExecutionTime(null);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React__default["default"].createElement(Card, { className: "rounded-md shadow-sm border" },
        showTitle && (React__default["default"].createElement(CardHeader, { className: "px-3 pb-2" },
            React__default["default"].createElement(CardTitle, null, title))),
        React__default["default"].createElement(CardContent, { className: "px-3 ".concat(showTitle ? 'pt-0' : 'pt-3') },
            React__default["default"].createElement("div", { className: "space-y-4" },
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("label", { htmlFor: "code", className: "block text-sm font-medium mb-1" }, "Python \uCF54\uB4DC"),
                    React__default["default"].createElement("div", { className: "border rounded-md overflow-hidden" },
                        React__default["default"].createElement(MonacoEditor, { height: "400px", language: "python", value: code, theme: "vs-dark", onChange: function (value) { return setCode(value || ''); }, options: {
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 14,
                                automaticLayout: true,
                                wordWrap: 'on',
                            } }))),
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("label", { htmlFor: "stdin", className: "block text-sm font-medium mb-1" }, "\uD45C\uC900 \uC785\uB825"),
                    React__default["default"].createElement(Textarea, { id: "stdin", value: stdin, onChange: function (e) { return setStdin(e.target.value); }, placeholder: "\uD45C\uC900 \uC785\uB825\uC744 \uC785\uB825\uD558\uC138\uC694", className: "min-h-[80px] font-mono" })),
                React__default["default"].createElement(Button, { onClick: handleRun, disabled: isLoading }, isLoading ? '실행 중...' : '실행'),
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("label", { htmlFor: "output", className: "block text-sm font-medium mb-1" }, "\uD45C\uC900 \uCD9C\uB825"),
                    React__default["default"].createElement("div", { id: "output", className: "bg-gray-100 p-4 rounded-md min-h-[80px]" },
                        React__default["default"].createElement("pre", { className: "whitespace-pre-wrap" }, output),
                        executionTime !== null && (React__default["default"].createElement("div", { className: "mt-2 text-sm text-gray-500 border-t border-gray-200 pt-2" },
                            "\uC2E4\uD589 \uC2DC\uAC04: ",
                            executionTime.toFixed(2),
                            "ms"))))))));
}

exports.CppRunner = CppRunner;
exports.PythonRunner = PythonRunner;
//# sourceMappingURL=index.js.map
