# LAMP

for Frontend
```bash
cd Frontend
npm install react-router-dom axios daisyui
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons npm i --save @fortawesome/free-regular-svg-icons npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/react-fontawesome@latest

docker build -t web-react-flask:1 .
```

For Backend
```bash
cd python
docker build -t web-flask:V3 .
```

```bash
cd 
docker compose up -d
```