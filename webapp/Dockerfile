FROM node:22.5.1-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일을 복사하고 설치
COPY package.json ./
RUN npm install -g pnpm
RUN pnpm install

# 소스 코드 복사
COPY . .

# Vite를 사용해 빌드
RUN pnpm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]