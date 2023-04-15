/**
 * デプロイ後、ちゃんと動いていそうか確認する
 */

import crypto from "crypto";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fetch from "node-fetch";

function generateUuid() {
  return crypto.randomUUID();
}

const dummyWordProperties = {
  word_uuid: generateUuid(),
  surface: "ほげ",
  pronunciation: "ほげ",
  accent_type: 1,
  word_type: "PROPER_NOUN",
  priority: 5,
};

(async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("url", {
      demandOption: true,
      type: "string",
    })
    .help()
    .parse();

  const url = argv.url;

  // バージョン確認
  console.log("バージョン確認");
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.api_version == undefined)
        throw new Error("バージョン情報が取得できませんでした");
    });
  console.log("成功");

  // 新規単語を登録
  console.log("新規単語を登録");
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "upsert_word",
      properties: dummyWordProperties,
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      if (text != "ok") throw new Error("新規単語の登録に失敗しました");
    });
  console.log("成功");

  // 既存単語を更新
  console.log("既存単語を更新");
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "upsert_word",
      properties: {
        ...dummyWordProperties,
        pronunciation: "ふが",
      },
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      if (text != "ok") throw new Error("既存単語の更新に失敗しました");
    });
  console.log("成功");

  // 既存単語を削除
  console.log("既存単語を削除");
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "delete_word",
      properties: { word_uuid: dummyWordProperties.word_uuid },
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      if (text != "ok") throw new Error("既存単語の削除に失敗しました");
    });
  console.log("成功");

  // 存在しない単語を削除
  console.log("存在しない単語を削除");
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "delete_word",
      properties: { word_uuid: generateUuid() },
    }),
  })
    .then((res) => res.text())
    .then((text) => {
      // 既存かどうかに関係なくokが返ってくる
      if (text != "ok") throw new Error("存在しない単語の削除に失敗しました");
    });
  console.log("成功");
})();
