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

## Implementation
i know its really odd to just copy the `@neos-project/neos-ui-extensibility` src and dist folder -> believe me i have tried bundling the entry points and applying some nice code splitting. But neither esbuild, nor webpack or rollup could help me out. rollup simply doesnt like the included dist neos-ui-extensibility files `[name] is not exported by [module]` and i dindt get codesplitting for readFromConsumerApi with webpack for cjs to work.

pre-building will be super easy once esbuild supports `commonjs` with `splitting` (now only esm works for splitting, and i dindt wanted to create a bunch of cjs files which contain 80% the same content, that should be split)

we need cjs since the consumer api cant know all the named static esm exports - so we need `module.exports = getModuleFromConsumerApi()`

you might be asking why dont we require `@neos-project/neos-ui-extensibility` as dependency? Because we will get a ton! of babel and webpack stuff we dont need.
