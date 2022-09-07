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
The idea was to prepack each file of the neosUiConsumerApiMap and distribute it with this package.
You might be asking why dont we require `@neos-project/neos-ui-extensibility` as dependency?
Why do we want to prepack at all? Because we will get a ton! of babel and webpack stuff we dont need - and i found no way to tell npm or yarn, install `@neos-project/neos-ui-extensibility` but without its dependencies.

So the first approach would be use a bundler and bundle each file.
Well turns out its not that easy, as we need code splitting too (as the files share mostly the same dependency... and we dont want it to be included more than once)
Also a second requirement is, that we need to bundle to cjs since the consumer api cant know all the named static esm exports - `@neos-project/neos-ui-extensibility` does it like this: `module.exports = getModuleFromConsumerApi()`

I have tried bundling the entry points (files) and applying some nice code splitting. But neither esbuild, nor webpack or rollup could help me out. Rollup simply doesnt like the included dist neos-ui-extensibility files `[name] is not exported by [module]` and i dindt get code splitting for readFromConsumerApi with webpack for cjs to work.

pre-building will be super easy once esbuild supports `commonjs` with `splitting` (now only esm works for splitting, and i dindt wanted to create a bunch of cjs files which contain 80% the same content, that should be split)

for now i just copied the `@neos-project/neos-ui-extensibility` src and dist folder as "build" command, and required the known dependencies from `@neos-project/neos-ui-extensibility` myself.

i included the src folder for better typescript support, so you can define this in your `types.d.ts`

```ts
declare module "@neos-project/neos-ui-extensibility" {
    export {
        SynchronousMetaRegistry,
        SynchronousRegistry,
    } from "@mhsdesign/esbuild-neos-ui-extensibility/@neos-project/neos-ui-extensibility/src/registry";
}
```
