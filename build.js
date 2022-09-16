const { build } = require("esbuild")
const { neosUiConsumerApi } = require("./map")

build({
    entryPoints: neosUiConsumerApi,
    bundle: true,
    splitting: true,
    format: "esm",
    external: ["@neos-project/positional-array-sorter"],
    outdir: "dist",
    plugins: [
        {
            name: "fwef",
            setup: ({onResolve, resolve}) => {




                
                // // rewrite odd `import readFromConsumerApi from '../../../../dist/readFromConsumerApi';` imports that are located in the `src` package.
                onResolve({ filter: /\.\.\/dist\/readFromConsumerApi$/, namespace: 'file' }, async ({ path, ...options }) => {
                    const result = await resolve(path.replace("\/dist\/", "\/src\/"), options)
                    return { ...result, sideEffects: false }
                });
            }
        }
    ]
})