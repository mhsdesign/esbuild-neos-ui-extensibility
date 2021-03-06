const neosUiConsumerApi = {
    '@neos-project/neos-ui-extensibility': '@neos-project/neos-ui-extensibility/dist/index.js',

    'react': '@neos-project/neos-ui-extensibility/src/shims/vendor/react/index',
    'react-dom': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-dom/index',
    'react-dnd': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-dnd/index',
    'react-dnd-html5-backend': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-dnd-html5-backend/index',
    'prop-types': '@neos-project/neos-ui-extensibility/src/shims/vendor/prop-types/index',
    'plow-js': '@neos-project/neos-ui-extensibility/src/shims/vendor/plow-js/index',
    'classnames': '@neos-project/neos-ui-extensibility/src/shims/vendor/classnames/index',
    'react-redux': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-redux/index',
    'redux-actions': '@neos-project/neos-ui-extensibility/src/shims/vendor/redux-actions/index',
    'redux-saga/effects': '@neos-project/neos-ui-extensibility/src/shims/vendor/redux-saga-effects/index',
    'redux-saga': '@neos-project/neos-ui-extensibility/src/shims/vendor/redux-saga/index',
    'reselect': '@neos-project/neos-ui-extensibility/src/shims/vendor/reselect/index',
    '@friendsofreactjs/react-css-themr': '@neos-project/neos-ui-extensibility/src/shims/vendor/react-css-themr/index',
    'ckeditor5-exports': '@neos-project/neos-ui-extensibility/src/shims/vendor/ckeditor5-exports/index',

    '@neos-project/react-ui-components': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/react-ui-components/index',
    '@neos-project/neos-ui-backend-connector': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-backend-connector/index',
    '@neos-project/neos-ui-ckeditor5-bindings': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-ckeditor5-bindings/index',
    '@neos-project/neos-ui-decorators': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-decorators/index',
    '@neos-project/neos-ui-editors': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-editors/index',
    '@neos-project/neos-ui-i18n': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-i18n/index',
    '@neos-project/neos-ui-redux-store': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-redux-store/index',
    '@neos-project/neos-ui-views': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-views/index',
    '@neos-project/neos-ui-guest-frame': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/neos-ui-guest-frame/index',
    '@neos-project/utils-redux': '@neos-project/neos-ui-extensibility/src/shims/neosProjectPackages/utils-redux/index'
}

const neosUiExtensibility = () => ({
    name: 'neosUiExtensibility',
    setup({ onResolve, resolve }) {
        // neos ui consumer api:
        // trailing slash / will be tolerated -> as did the webpack impl.
        const filterRegex = `^(${Object.keys(neosUiConsumerApi).join('|')})/?$`
        onResolve({ filter: RegExp(filterRegex) }, ({ path, ...options }) =>
            resolve('@mhsdesign/esbuild-neos-ui-extensibility/' + neosUiConsumerApi[path.replace(/\/$/, '')], options)
        );
    },
})

module.exports = {
    neosUiExtensibility
}
