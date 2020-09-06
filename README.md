# team_dev

## Docker setup
```
 docker-compose up -d --build
```

### bash in
```
docker-compose exec app sh
```

### runserver
```
npm run serve
```

### errorが起きるはずです。
その際に必要なパッケージをInstallしてくださいと指示があるはずです。
それらを指示通りbash内でinstallしてください。
そちらで完了です。

### vue cli not found
```
rm -rf node_modules package-lock.json && npm install
```

