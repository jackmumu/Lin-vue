import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
export default {
    input: './packages/vue/src/index.ts',
    plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify("development"),
          "process.env.VUE_ENV": JSON.stringify("browser"),
          "process.env.LANGUAGE": JSON.stringify(process.env.LANGUAGE),
        }),
        resolve(),
        commonjs(),
        typescript(),
        sourceMaps(),
    ],
    output: {
        format: 'cjs',
        file: './packages/vue/dist/index.js',
        sourcemap: true,
    },
}