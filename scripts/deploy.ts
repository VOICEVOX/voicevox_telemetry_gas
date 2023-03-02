/**
 * `@HEAD`となっているデプロイメントは上書きできない。
 * `@HEAD`以外のデプロイメントがなければ作成し、あれば上書きする。
 */

import * as child_process from "node:child_process";

const rawDeployments = child_process.execSync("clasp deployments", {
  encoding: "utf-8",
});

// 既存のデプロイメントを取得
const deploymentIds = rawDeployments
  .trim()
  .split("\n")
  // - <デプロイメントID> @<バージョン>
  .filter((line) => line.match(/^- ([^\s]+) @[^\s]+$/))
  // HEADは除外
  .filter((line) => !line.includes("@HEAD"))
  // デプロイメントID取得
  .map((line) => line.split(" ")[1]);

const latestDeploymentId = deploymentIds[deploymentIds.length - 1];

// デプロイ
let command = "clasp deploy";
if (latestDeploymentId) {
  command += ` --deploymentId ${latestDeploymentId}`;
}
console.log(`Deploying... ${command}`);
const rawNewDeployment = child_process.execSync(command, {
  encoding: "utf-8",
});

// ログ出力
const [, newDeployment, rawDeploymentNumber] = rawNewDeployment
  .split("\n")[1]
  .split(" ");
const deploymentNumber = rawDeploymentNumber.match(/\d+/)?.[0];
if (!deploymentNumber) {
  throw new Error("Could not find deployment number, deployment failed?");
}
console.log("Successfully deployed!");
console.log(`New deployment: ${newDeployment}`);
console.log(`Deployment number: ${deploymentNumber}`);
console.log(
  `Deployment URL: https://script.google.com/macros/s/${newDeployment}/exec`
);
