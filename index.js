const { join } = require("path")

const neosUiConsumerApi = {
    '@neos-project/neos-ui-extensibility': '@neos-project/neos-ui-extensibility/src/index.ts',

    'react': '@neos-project/neos-ui-extensibility/src/shims/vendor/react/index.js',
    'react-dom': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-dom/index.js',
    'react-dnd': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-dnd/index.js',
    'react-dnd-html5-backend': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-dnd-html5-backend/index.js',
    'prop-types': '@neos-project/neos-ui-extensibility/src/shims/vendor/prop-types/index.js',
    'plow-js': '@neos-project/neos-ui-extensibility/src/shims/vendor/plow-js/index.js',
    'classnames': '@neos-project/neos-ui-extensibility/src/shims/vendor/classnames/index.js',
    'react-redux': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-redux/index.js',
    'redux-actions': '@neos-project/neos-ui-extensibility/src/shims/vendor/redux-actions/index.js',
    'redux-saga/effects': '@neos-project/neos-ui-extensibility/src/shims/vendor/redux-saga-effects/index.js',
    'redux-saga': '@neos-project/neos-ui-extensibility/src/shims/vendor/redux-saga/index.js',
    'reselect': '@neos-project/neos-ui-extensibility/src/shims/vendor/reselect/index.js',
    '@friendsofreactjs/react-css-themr': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-css-themr/index.js',
    'ckeditor5-exports': '@neos-project/neos-ui-extensibility/src/shims/vendor/ckeditor5-exports/index.js',

    '@neos-project/react-ui-components': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/react-ui-components/index.js',
    '@neos-project/neos-ui-backend-connector': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-backend-connector/index.js',
    '@neos-project/neos-ui-ckeditor5-bindings': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-ckeditor5-bindings/index.js',
    '@neos-project/neos-ui-decorators': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-decorators/index.js',
    '@neos-project/neos-ui-editors': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-editors/index.js',
    '@neos-project/neos-ui-i18n': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-i18n/index.js',
    '@neos-project/neos-ui-redux-store': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-redux-store/index.js',
    '@neos-project/neos-ui-views': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-views/index.js',
    '@neos-project/neos-ui-guest-frame': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-guest-frame/index.js',
    '@neos-project/utils-redux': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/utils-redux/index.js'
}

/**
 * @returns {import("esbuild").Plugin}
 */
const neosUiExtensibility = () => ({
    name: 'neosUiExtensibility',
    setup({ onResolve, resolve }) {
        // neos ui consumer api:
        // trailing slash / will be tolerated -> as did the webpack impl.
        const filterRegex = `^(${Object.keys(neosUiConsumerApi).join('|')})/?$`
        onResolve({ filter: RegExp(filterRegex) }, async ({ path }) => ({
            path: join(__dirname, neosUiConsumerApi[path.replace(/\/$/, '')]),
            sideEffects: false
        }));

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
