# 👫 랜덤 채팅 서비스 웹

- 서비스 URL : http://3.39.134.56:3000
  
<p align='center'>
    <img width="200" alt="스크린샷 2024-06-05 오후 4 41 27" src="https://github.com/Project-Ohneul/.github/assets/133184988/940a3cab-e904-4149-ad68-22c103e71dba">
</p>

# 프로젝트 소개
여기 몇명의 사람이 있습니다.

😀 "하 요즘 학교에서 너무 힘들고 주변 친구들에게는 말하기 힘든 고민을 나누고싶은데..."

😢 "직장에서 너무 힘든데 친구가 없어서 어디가서 이야기 할데가 없어... 그렇다고 랜덤 채팅을 사용하자니 이상한 사람이 너무 많아..."

🥸 "내가 관심있는 주제로 다양한 사람과 이야기를 하고싶은데 다른 앱들은 이상한 사람이 너무 많아서 싫어..."

🤪 "음 영화 보고싶은데 블로그 추천글들은 다 똑같은거같아 누가 추천해줬으면 좋겠다."

이 모든 것을 해결해줄 서비스 Ohneul을 소개합니다.

## 프로젝트 개요

Ohneul은 일상 생활에서 지치고 힘들지만 누군가에게 속마음을 이야기할 수 없을 때, 나를 전혀 모르는 누군가와 편하게 대화를 나누며 조금이나마 위안을 얻을 수 있으면 좋겠다는 취지에서 만들어진 랜덤채팅 서비스입니다. 

이 서비스는 사용자가 익명으로 대화할 수 있는 환경을 제공하여, 일상 속에서 느끼는 스트레스와 고민을 털어놓을 수 있는 안전한 공간을 마련하고자 합니다. 

뿐만 아니라, Ohneul은 같은 관심사를 가진 사람들과도 쉽게 연결될 수 있는 기능을 제공합니다. 이를 통해 사용자들은 공통된 주제나 취미를 가진 사람들과 자연스럽게 대화를 시작할 수 있으며, 새로운 친구를 사귀고 정보를 교환하며 더 나은 커뮤니티를 형성할 수 있습니다.

- 기존의 랜덤 채팅 서비스와는 달리, 유저 관리를 위해 소셜 로그인과 신고 기능을 도입하였습니다.
- 지속적인 모니터링을 통해 유저를 관리합니다.

## 프로젝트의 주요 기능 및 목적
- 일상에서의 다양한 일들을 부담 없이, 다른 사람과 오랜 친구처럼 공유할 수 있는 서비스입니다.
- 서비스 사용시마다 본인의 기분을 고르고 원하는 주제로 모르는 사람과 주어진 시간동안 부담 없이 편하게 나눌 수 있습니다.
- 기본 시간 만료시 상호 동의하에 코인을 사용하여 시간을 연장할 수 있습니다.
- 상대방의 프로필을 확인하여 상대방의 취미와 오늘 기분을 확인할 수 있습니다.
- 상대방의 부적절한 언행에 대해 신고를 할 수 있습니다.
- 코인샵을 이용해 코인을 충전할 수 있습니다.

## 역할 분담

### 🍊박건우
- **UI**
    - 페이지 : 닉네임 설정 페이지, 취미 설정 페이지, 기분 설정 페이지, 주제 선택 페이지, 채팅, 코인(상점, 결제 내역), 헤더
- **기능**
    - 유저 정보 등록(닉네임, 취미, 기분), 소켓, 결제
### 👻강한얼
- **UI**
    - 페이지 : 초기 로딩 페이지, 로그인 페이지, 마이 페이지, 관리자 페이지
- **기능**
    - 소셜로그인, 유저 정보 확인, 관리자
### 😎강수진
- **기능**
    - 유저 정보 & 취미, 기분, 대화 주제, 주문 내역, 결제, 소켓(메시지 수신 및 발신, 주제에 따른 매칭)
    - 데이터베이스 연결(mariaDB)
    - ec2연결(nginx, pm2, github actions 사용)
### 🐬김정운
- **기능**
    - 유저 정보, 로그인, 접속 보상 지급, 공지, 코인 사옹 내역, 유저 신고
    - 데이터베이스 연결(mariaDB)
    - ec2연결(nginx, pm2, github actions 사용)

## 개발 환경
- Front-end : React, TypeScript, Styled-Components, React-Query, Redux Toolkit
- Back-end : MySQL, NodeJS, TypeScript, NestJS, AWS, socket.io, Nginx, Naver login api, Kakao login api
- 협업 툴 : Discord, Notion, Github
- 서비스 배포 환경 : Ec2

## 📺 화면 소개 (gif)

### 로그인
<p align='center'>
    <img width="700" alt="스크린샷 2024-06-05 오후 4 41 27" src="https://github.com/pigpgw/OHNEUL-front/assets/133184988/58735d93-3b44-44b6-9933-f017bea0a28f">
</p>


### 기분 선택 , 매칭 주제 선택
<p align='center'>
    <img width="700" alt="스크린샷 2024-06-05 오후 4 41 27" src="https://github.com/pigpgw/OHNEUL-front/assets/133184988/599e69dc-f2f3-4d23-b727-b034e7171234">
</p>

### 채팅및 연장
<p align='center'>
    <img width="700" alt="스크린샷 2024-06-05 오후 4 41 27" src="https://github.com/pigpgw/OHNEUL-front/assets/133184988/8a932ddc-f2ea-45de-90e1-65de9da04ba5">
</p>

### 신고
<p align='center'>
    <img width="700" alt="스크린샷 2024-06-05 오후 4 41 27" src="https://github.com/pigpgw/OHNEUL-front/assets/133184988/7bb29515-2627-49ff-9bfb-c1b815406243">
</p>

### 마이페이지
<p align='center'>
    <img width="700" alt="스크린샷 2024-06-05 오후 4 41 27" src="https://github.com/pigpgw/OHNEUL-front/assets/133184988/32dcc855-9dd2-4b64-aa40-3c3ca625a537">
</p>

### 코인샵


## 팀원 구성
<div align="center">

| **박건우** | **강한얼** | **강수진** | **김정운** |
| :------: |  :------: | :------: | :------: |
|[<img src="https://avatars.githubusercontent.com/u/133184988?v=4" height=150 width=150> <br/> @pigpgw](https://github.com/pigpgw) |  [<img src="https://avatars.githubusercontent.com/u/62492735?v=4" height=150 width=150> <br/> @hanur92](https://github.com/hanur92)  | [<img src="https://avatars.githubusercontent.com/u/138956130?v=4" height=150 width=150> <br/> @Knagsoojin](https://github.com/Knagsoojin) | [<img src="https://avatars.githubusercontent.com/u/146833294?v=4" height=150 width=150> <br/> @zkflal](https://github.com/zkflal) |

</div>
