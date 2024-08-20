# 노드 베이스 버전
FROM node:18

# 작업 디렉토리 설정
WORKDIR /var/app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 애플리케이션이 사용하는 포트 노출
EXPOSE 4000

# 애플리케이션 시작
CMD ["node", "dist/src/main.js"]
