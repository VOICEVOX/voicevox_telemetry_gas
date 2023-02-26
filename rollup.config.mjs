import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    minifyInternalExports: true,
    compact: true,
  },
  plugins: [typescript(), nodeResolve(), commonjs()],
};
