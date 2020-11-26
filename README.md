# team_dev
Ver 1 (Version 2以降のリポジトリは 現在 private)

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

### vue cli not found と出た場合
```
rm -rf node_modules package-lock.json && npm install
```

### Wiki
- コーディング規約
- ブランチについて
