# VOICEVOX TELEMETRY with GAS

VOICEVOX の辞書を収集する Google Apps Script コード

## ビルド

ビルドする前に、 `src/config.example.ts` を `src/config.ts` にコピーし、スプレッドシートのIDをダミーから置き換えてください。

```
npm run build
```

## デプロイ

```
npm run push
npm run deploy
```

デプロイするには、[clasp](https://www.npmjs.com/package/@google/clasp) にログインし、`.clasp.example.json` を `.clasp.json` にコピーし、スクリプトのIDをダミーから置き換えてください。

また、
```
npm start
# または npm run start
```
で、ビルド→デプロイをすることができます。

# ライセンス

ライセンスは [MIT LICENSE](./LICENSE) です。
