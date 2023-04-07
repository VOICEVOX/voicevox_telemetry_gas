/**
 * デプロイ後、ちゃんと動いていそうか確認する
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = await yargs(hideBin(process.argv))
  .option("url", {
    demandOption: true,
    type: "string",
  })
  .help()
  .parse();

console.log(argv.url);
