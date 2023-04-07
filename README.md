# VOICEVOX TELEMETRY with GAS

VOICEVOX の辞書を収集する Google Apps Script コード

## 環境構築

```sh
npm ci
```

## clasp の準備

https://script.google.com/home/usersettings から Google Apps Script API をオンにする。

```sh
# Googleアカウントにログイン
npx clasp login

# 初期化
npx clasp create --title voicevox_telemetry_gas --type sheets
```

## ビルド

ビルドする前に `src/config.example.ts` を `src/config.ts` にコピーし、スプレッドシートの ID をダミーから置き換えてください。
`.clasp.json`の`parentId`の値がスプレッドシート ID です。

```sh
npm run build
```

## デプロイ

`.clasp.json`の`rootDir`を`./dist`に変更してください。

```sh
npm run push
npm run deploy
```

または

```sh
npm start
# または npm run start
```

で、ビルド → デプロイをすることができます。

## 動作確認

```sh
url=https://script.google.com/macros/s/xxxxxx-xxxxxx/exec # deploy後に表示されるURL
npm run deploy:check -- --url $url
```

## タイプチェック・lint

```sh
npm run typecheck
npm run lint
```

## コードフォーマット

```sh
npm run fmt
```

# ライセンス

ライセンスは [MIT LICENSE](./LICENSE) です。
