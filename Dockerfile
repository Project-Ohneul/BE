# 노드 베이스 버전
FROM node:18 

# 리눅스에 폴더를 생성하고 실행해주는 명령어
RUN mkdir -p /var/app

# 실행 위치
WORKDIR /var/app

# 현재 위치에 있는 파일을 WORKDIR로 카피, 첫번째 점은 코드가 있는 파일, 두번째 점은 WORKDIR을 뜻한다
COPY . .

# 
RUN npm install

RUN npm run build

# 우리가 열 포트번호
EXPOSE 4000

# dist/main.js를 node로 실행시킨다.
CMD ["node", "dist/src/main.js"]

# docker build . -t be ->이 폴더를 빌드해서 이미지를 만든다
# docker images ->이미지가 잘 생성되었는지 확인
# docker container run -d -p 4000:4000 be -> 이미지 실행