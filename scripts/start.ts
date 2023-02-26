import * as child_process from "node:child_process";

const rawDeployments = child_process.execSync("clasp deployments", {
  encoding: "utf-8",
});

const latestDeployment = rawDeployments.split("\n").at(-2)!.split(" ")[1];

child_process.execSync(`clasp deploy -i ${latestDeployment}`);
