const { neosUiConsumerApi } = require("./map")

const neosUiExtensibility = () => ({
    name: 'neosUiExtensibility',
    setup({ onResolve, resolve }) {
        // neos ui consumer api:
        // trailing slash / will be tolerated -> as did the webpack impl.
        const filterRegex = `^(${Object.keys(neosUiConsumerApi).join('|')})/?$`
        onResolve({ filter: RegExp(filterRegex) }, async ({ path, ...options }) => {
            const result = await resolve('@mhsdesign/esbuild-neos-ui-extensibility/dist/' + path.replace(/\/$/, ''), options)
            return { ...result, sideEffects: false }
        });

        // use the pure esm src for better tree-shaking. Eg this dependency should mostly not be required.
        onResolve({ filter: /^@neos-project\/positional-array-sorter$/, namespace: "file" }, async ({ path, ...options }) => {
            const result = await resolve("@neos-project/positional-array-sorter/src/positionalArraySorter.ts", options)
            return { ...result, sideEffects: false }
        })
    },
})

module.exports = {
    neosUiExtensibility
}
