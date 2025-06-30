# 2. 개발 환경 설정

## 2.1 Nodejs 설치

## 2.2 Npm

```
mkdir npm-command
code npm-command
npm init
npm install react@18.2
npm install --save-dev eslint
npm run test
```

```
{
  "name": "npm-command",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {  # npm run test
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": { # 프로덕션 환경에 필요한 패키지
    "react": "18.2"
  },
  "devDependencies": { # 개발 환경에 필요한 패키지
    "eslint": "^9.30.0"
  }
}
```

## 2.3 Vite

```
npm create vite@latest # react → javascript
npm install
npm run dev
```
