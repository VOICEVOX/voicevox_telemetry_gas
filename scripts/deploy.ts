import * as child_process from "node:child_process";

const rawDeployments = child_process.execSync("clasp deployments", {
  encoding: "utf-8",
});

const latestDeployment = rawDeployments.split("\n").at(-2)?.split(" ")[1];

const rawNewDeployment = child_process.execSync(
  `clasp deploy${latestDeployment ? ` -i ${latestDeployment}` : ""}`,
  { encoding: "utf-8" }
);

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
