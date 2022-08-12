# 우아한테크캠프 5,6주차 키오스크 지석호

<div>
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/60173534/184349215-34f362d4-c49f-4f8f-a088-0bcca15271cf.png">
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/60173534/184349310-8ae3145a-2c5d-479c-80c1-0dbc8babb096.png">
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/60173534/184349577-d0c4da36-d508-4628-96af-06bccd702e26.png">
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/60173534/184349625-b122e240-df32-4062-bc61-4e9c52846901.png">


<div>

[데모 보러가기](http://ec2-15-164-181-228.ap-northeast-2.compute.amazonaws.com/)

<br />

## 사용기술

#### CLIENT
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logoColor=white">
</div>

#### SERVER
<div>
  <img src="https://img.shields.io/badge/Nest-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/typeorm-262627?style=for-the-badge&logoColor=white">
</div>

<br />

## 배포

#### yarn install

```
npm install -g yarn
```

<br />

#### 1. Clone Repositiory
```
git clone https://github.com/woowa-techcamp-2022/web-kiosk-seokho.git

cd web-kiosk-seokho
```

<br />

#### 2. Install Package
```
yarn install
```

> 모노레포로 관리되고 있기 때문에 프로젝트 최상단에 install을 실행해도 정상적으로 작동합니다.

<br />

<br />

#### 3. Set Environment

#### Client
```
cd package/frontend
vim .env
```
```
REACT_APP_HOST=
```

#### Server
```
cd package/backend
vim .env
```
```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

<br />

#### 4. Start Project (Development)
```
yarn dev:client
yarn dev:server
```

<br />

### About

[Wiki](https://github.com/woowa-techcamp-2022/web-kiosk-seokho/wiki)   

[3조 아카이브](https://olive-iguanadon-df1.notion.site/3-6757a9f1147240b099f19aa89cdf4b58)
