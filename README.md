# WIND WORKS : 필수적인 기능, 언제 어디서든, 쉽고 효율적으로 사용 할 수 있는 그룹웨어 서비스
![1 메인화면(전체)](https://github.com/Sangwonsdsd/WindWorks_Project/assets/91966029/51ec4fc1-85aa-4898-9764-7deaad617d73)
>

## Contents
  1. 프로젝트 개요 
  2. 기술 스택
  3. 사용 라이브러리 및 API
  4. 실행 방법
  5. 주요기능
  6. 문서

## 프로젝트 개요
![로고](<img width="300" alt="logoImage" src="https://github.com/Sangwonsdsd/WindWorks_Project/assets/91966029/7415d9bb-dfdc-47ec-a1a6-bae374ae9376"/>)

- 개발 기간: 2023-11-20 ~ 2023-01-02
- 본 프로젝트의 구조를 더 자세히 알고 싶다면?
  - [백엔드 README](./BACK.md)
  - [프론트엔드 README](./FRONT.md)

## 기술 스택
`Front-End` 

<img src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=ReactQuery&logoColor=white"/>
<img src="https://img.shields.io/badge/css3-1572B6?style=flat-square&logo=Recoil&logoColor=white"/>
<img src="https://img.shields.io/badge/jquery-0769AD?style=flat-square&logo=styled-components&logoColor=white"/>

`Back-end`

<img src="https://img.shields.io/badge/spring-6DB33F?style=flat-square&logo=Nestjs&logoColor=white">

`Communication`
<img src="https://img.shields.io/badge/notion-000000?style=flat-square&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white">

## 사용 라이브러리및 API
- 
-
-
-
-

## 실행 방법

1. 프로젝트 레포지토리를 클론합니다.

```sh
$ git clone https://github.com/Sangwonsdsd/WindWorks_Project.git
```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.

```sh
$ cd front
$ npm i

$ cd back
$ npm i
```

3. development server을 실행합니다.
```sh
$ npm run dev
# or
$ yarn dev
```

## 주요 기능

### ✏ 소중한 사람과 **공용 일기장**을 만들어 서로의 일상을 공유할 수 있어요.  
  <img src="" height="300">
  <img src="" height="300">
  <img src="" height="300">
  <img src="" height="300">

+ 마이페이지
  + 유저 코드를 입력하여 친구 요청
  + 알림을 통해 친구 요청을 수락하거나 거절
  + 수락 시 공용 일기장 생성
  + 일기장 이름 수정 가능

+ 교환일기
  + 월 별 일기 기록 제공
  + 정확한 감정 분석을 위해 일기 작성은 당일 한 번만 가능 (수정 및 삭제 불가능)
  + 일기 작성 시 자동으로 감정을 분석
  + 일기 작성 당일 자정이 지나는 시점에 기분 전환할 수 있는 활동을 추천
+ 홈
  + 분석된 감정 기록을 캘린더 형태로 제공 (나 & 상대방)

### 📌 추천받은 활동을 포함한 사용자의 일정을 **투두 리스트**로 관리할 수 있어요.   
  <img src="" height="300">
  <img src="" height="300">

+ 일정 관리
  + 추천받은 활동은 자동으로 투두 리스트에 추가
  + 사용자가 직접 투두 리스트 생성, 수정, 삭제 가능
  + 월 별로 일정을 보여 줌
  + 완료 표시 가능

### ⚙ 내 정보를 간편하게 관리할 수 있어요.
  <img src="/" height="300">
  <img src="/" height="300">
  
+ 마이페이지
  + 닉네임, 비밀번호, 일기장 이름 수정 가능
  + 최적화된 활동 추천을 위한 관심 분야 설정 가능
  + 연결 끊기, 회원 탈퇴 가능

## 부가 기능

* 소셜 로그인 (카카오)
* 반응형 웹 디자인
* react-error-boundary 사용하여 폴백 UI로 에러 화면 구성
* 전역 style 정의하여 라이트/다크 모드 구현

## 팀원 소개

| 이름 | 포지션 | Contact |
| --- | --- | --- |
| 권두원 | 형상관리 | github.com/KwonDooWon |
| 김효주 | 일정관리 | github.com/HJ5990 |
| 박준 | DB관리 | github.com/junybuny |
| 최상원 | 이슈관리 | github.com/Sangwonsdsd |
