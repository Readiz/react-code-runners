# React Code Runners

이 프로젝트는 `serverless-judge`를 개발하신 @byeongkeunahn 님의 `wasm` 코드 기반으로 만들어졌습니다.
  - serverless-judge: https://github.com/byeongkeunahn/serverless-judge/

브라우저에서 C++와 Python 코드를 실행할 수 있는 React 컴포넌트입니다.

## 설치

```bash
npm install react-code-runners @monaco-editor/react
# 또는
yarn add react-code-runners @monaco-editor/react
```

## 사용법

```jsx
import { CppRunner, PythonRunner } from 'react-code-runners';

function MyCodeEditor() {
  return (
    <div>
      <h2>C++ 코드 실행기</h2>
      <CppRunner
        initialCode="#include <iostream>\n\nint main() {\n  std::cout << \"Hello World!\" << std::endl;\n  return 0;\n}"
        initialStdin=""
      />
      
      <h2>Python 코드 실행기</h2>
      <PythonRunner
        initialCode="print('Hello Python World!')"
        initialStdin=""
      />
    </div>
  );
}
```

## 옵션

### CppRunner

- `initialCode`: 초기 C++ 코드
- `initialStdin`: 초기 표준 입력
- `title`: 컴포넌트 제목
- `showTitle`: 제목 표시 여부
- `onResult`: 결과 콜백 함수

### PythonRunner

- `initialCode`: 초기 Python 코드
- `initialStdin`: 초기 표준 입력
- `title`: 컴포넌트 제목
- `showTitle`: 제목 표시 여부
- `onResult`: 결과 콜백 함수

## 특징

1. **Monaco 에디터 내장**: VS Code와 같은 코드 에디터 경험 제공
2. **다크 테마 지원**: 에디터에 다크 테마가 기본 적용됨
3. **실행 시간 측정**: 코드 실행 시간을 밀리초 단위로 표시
4. **최적화 옵션**: C++의 경우 교육 목적으로 O0 최적화 레벨 사용
5. **완전 독립 패키지**: WebAssembly 파일들이 모두 포함되어 있어 별도 설정 불필요

## 정적 파일 경로 설정

기본적으로 WASM 파일들은 `/node_modules/react-code-runners/public` 경로에서 로드됩니다. 다른 경로를 사용하려면:

```js
// 애플리케이션 진입점(예: index.js)에서 설정
window.ReactCodeRunners = {
  publicPath: '/custom/path/to/wasm/files'
};
```

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 패키지 빌드
npm run build
```

## 라이선스

MIT

## 기여

이슈와 풀 리퀘스트는 환영합니다. 큰 변경사항의 경우, 먼저 이슈를 열어 논의해주세요. 
