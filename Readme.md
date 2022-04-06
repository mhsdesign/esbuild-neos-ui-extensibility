# @mhsdesign/esbuild-neos-ui-extensibility

> Experimental. And so is the implementation idea.

> note this package uses super internal top secret parts of the neos ui consumer api - use it on your own risk - as there was already a discussion to change the implementation to `Webpack 5 Federation` https://neos-project.slack.com/archives/C0U0KEGDQ/p1618805938027900

basically the alias resolution of @neos-project/neos-ui-extensibility as esbuild plugin.

## Usage
https://www.npmjs.com/package/@mhsdesign/esbuild-neos-ui-extensibility
```sh
npm i @mhsdesign/esbuild-neos-ui-extensibility
```

```js

const {neosUiExtensibility} = require('@mhsdesign/esbuild-neos-ui-extensibility')

esbuild.build({
  ...,
  plugins: [neosUiExtensibility()]
})
```
