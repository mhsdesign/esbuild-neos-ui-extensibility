# deprecated ~@mhsdesign/esbuild-neos-ui-extensibility~


> **Warning**
>
> This package is deprecated, because the functionality was moved into the Neos Ui Core with https://github.com/neos/neos-ui/pull/3382
> You should migrate to use the new (now cleaned up without webpack and babel bloat) `@neos-project/neos-ui-extensibility` in version 8.3 or higher:

### Migration back to `@neos-project/neos-ui-extensibility@8.3.0`

you can already use the beta `8.3.0-beta1`!

package.json
```diff
{
  "name": "foo/bar",
  "version": "1.0.0",
  "scripts": {
    "build": "node build.js",
    "watch": "node build.js --watch"
  },
  "devDependencies": {
-    "@mhsdesign/esbuild-neos-ui-extensibility": "^0.2.1",
+    "@neos-project/neos-ui-extensibility": "^8.3.0",
    "esbuild": "^0.17.0"
  }
}

```

build.js
```diff
const esbuild = require('esbuild');
const isWatch = process.argv.includes('--watch');

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    target: "es2020",
    entryPoints: {"Plugin": "src/index.js"},
    loader: {
        ".js": "tsx",
    },
    outdir: "../../Public/NeosUserInterface",
+    alias: require("@neos-project/neos-ui-extensibility/extensibilityMap.json"),
-    plugins: [require("@mhsdesign/esbuild-neos-ui-extensibility").neosUiExtensibility()]
}


if (isWatch) {
    esbuild.context(options).then((ctx) => ctx.watch())
} else {
    esbuild.build(options)
}
```

-------------

# Original Readme:

## Neos User Interface Extensibility API

For the React UI
https://docs.neos.io/cms/manual/extending-the-user-interface/react-extensibility-api

This Package provides a way to build NeosUi Plugins with Esbuild instead of Webpack.
Use it inplace of `@neos-project/neos-ui-extensibility`.

In technical terms: It provides the same alias resolution of @neos-project/neos-ui-extensibility as Esbuild plugin.

## Usage in your build
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

### Simple migration

package.json
```diff
{
  "name": "foo/bar",
  "version": "1.0.0",
  "scripts": {
-    "build": "NODE_ENV=production neos-react-scripts build",
-    "watch": "neos-react-scripts watch"-
+    "build": "node build.js",
+    "watch": "node build.js --watch"
  },
+  "devDependencies": {
+    "@mhsdesign/esbuild-neos-ui-extensibility": "^0.2.1",
+    "esbuild": "^0.15"
+  }
-  "devDependencies": {
-    "@neos-project/neos-ui-extensibility": "^8.0.1"
-  },
-  "neos": {
-    "buildTargetDirectory": "../../Public/NeosUserInterface"
-  }
}

```

build.js
```js
const esbuild = require('esbuild');
const isWatch = process.argv.includes('--watch');

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    target: "es2020",
    entryPoints: {"Plugin": "src/index.js"},
    loader: {
        ".js": "tsx",
    },
    outdir: "../../Public/NeosUserInterface",
    plugins: [require("@mhsdesign/esbuild-neos-ui-extensibility").neosUiExtensibility()]
}


if (isWatch) {
    esbuild.context(options).then((ctx) => ctx.watch())
} else {
    esbuild.build(options)
}
```

## How to consume from the Neos Api?

as youre used to from the Webpack implementation:

```js
import React from "react";
import manifest from "@neos-project/neos-ui-extensibility";
import I18n from "@neos-project/neos-ui-i18n";
import { Button, Icon } from "@neos-project/react-ui-components";
// ...

manifest("MhsDesign.Plugin", {}, (globalRegistry) => {
})
```

### Advantages and disadvantages vs Neos Webpack Plugin System
```diff
+ Use Esbuild
- Cannot use Webpack
+ No need for Babel
+ Use latest ES Syntax
+ Fully controll the build process
- Code Splitting is harder see: [NeosUi and ESM?]
+ Speeeeed
+ Way less dev dependencies. And faster install. Just this + positional-array-sorter
```

### NeosUi and ESM?

Esbuild supports ESM better that any other format.
For example if you want to use code splitting, you need to stick to ESM for [now](https://github.com/evanw/esbuild/issues/16) as its not available for CJS.
But loading of ESM modules via `<src type=module` is currently not natively supported by the Neos Ui. For that you can make use of [ProposalNeosUiEsmPluginLoader](https://github.com/mhsdesign/MhsDesign.ProposalNeosUiEsmPluginLoader)

### Supported imports are:

* @neos-project/neos-ui-extensibility
* react
* react-dom
* react-dnd
* react-dnd-html5-backend
* prop-types
* plow-js
* classnames
* react-redux
* redux-actions
* redux-saga/effects
* redux-saga
* reselect
* @friendsofreactjs/react-css-themr
* ckeditor5-exports
* @neos-project/react-ui-components
* @neos-project/neos-ui-backend-connector
* @neos-project/neos-ui-ckeditor5-bindings
* @neos-project/neos-ui-decorators
* @neos-project/neos-ui-editors
* @neos-project/neos-ui-i18n
* @neos-project/neos-ui-redux-store
* @neos-project/neos-ui-views
* @neos-project/neos-ui-guest-frame
* @neos-project/utils-redux

## Typescript types from `@neos-project/neos-ui-extensibility`

you can use the src folder for better typescript support, so you can define this in your `types.d.ts`

```ts
declare module "@neos-project/neos-ui-extensibility" {
    export {
        SynchronousMetaRegistry,
        SynchronousRegistry,
    } from "@mhsdesign/esbuild-neos-ui-extensibility/@neos-project/neos-ui-extensibility/src/registry";
}
```

## Implementation

<details>
<summary>We copy the src folder of `@neos-project/neos-ui-extensibility`</summary>

The idea was to prepack each file of the neosUiConsumerApiMap and distribute it with this package.
You might be asking why dont we require `@neos-project/neos-ui-extensibility` as dependency?
Why do we want to prepack at all? Because we will get a ton! of Babel and Webpack stuff we dont need - and i found no way to tell npm or yarn, install `@neos-project/neos-ui-extensibility` but without its dependencies.

So the first approach would be use a bundler and bundle each file.
Well turns out its not that easy, as we need code splitting too (as the files share mostly the same dependency... and we dont want it to be included more than once)
Also a second requirement is, that we need to bundle to cjs since the consumer api cant know all the named static esm exports - `@neos-project/neos-ui-extensibility` does it like this: `module.exports = getModuleFromConsumerApi()`

I have tried bundling the entry points (files) and applying some nice code splitting. But neither Esbuild, nor Webpack or Rollup could help me out. Rollup simply doesnt like the included dist neos-ui-extensibility files `[name] is not exported by [module]` and i dindt get code splitting for readFromConsumerApi with Webpack for cjs to work.

pre-building will be super easy once Esbuild supports `commonjs` with `splitting` (now only esm works for splitting, and i dindt wanted to create a bunch of cjs files which contain 80% the same content, that should be split)

for now i just copied the `@neos-project/neos-ui-extensibility` src folder as "build" command, and required the known dependencies from `@neos-project/neos-ui-extensibility` myself.
</details>
