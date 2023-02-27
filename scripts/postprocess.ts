import * as fs from "node:fs";
import * as uglify from "uglify-js";

const bundleFile = fs.readFileSync("./dist/bundle.js");

let bundle = bundleFile.toString().replace(/export\{.*\}/g, "");

const license = fs.readFileSync("./LICENSE");

const code =
  uglify.minify(bundle, {
    mangle: { reserved: ["onGet", "onPost"] },
  }).code +
  `\n/*\nhttps://github.com/VOICEVOX/voicevox_telemetry_gas\n\n${license}\n*/`;

fs.writeFileSync("./dist/bundle.js", code);
