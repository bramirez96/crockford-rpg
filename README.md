# Overview

A quick overview of all of the different `babel` and `webpack` extensions this project uses.

- webpack: bundles our code
- babel: allows us to use modern javascript
- babel/preset-env: tells us which browsers to target when compiling
- babel/polyfill: polyfills features to support browsers that don't support them
- babel-loader: lets us use babel and webpack
- core-js@3: polyfill of the standard js library that provides the latest ecmascript support
- @babel/plugin-syntax-dynamic-import: dynamic importing/lazy loading

NOTE: the polyfills are dependencies, NOT dev dependencies, as they are required in the bundle!

## Styling

- style-loader: adds CSS to the dom by injecting a style tag that's cool
- css-loader: resolves imports in css
- node-sass: technical garbage
- sass-loader: loads sass and compiles into css
- postcss-loader: adds PostCSS to webpack
- postcss-preset-env: polyfills modern css for older browsers
- css-nano: minifies css in bundle

## More

- clean-webpack-plugin: removes build folder before building again
- file-loader: resolves imports/requires into urls in outdir and emits file (COOL)
- html-loader: resolves src paths as module requires? fixes images maybe?
- mini-css-extract-plugin: splits css into separate files
- terser-webpack-plugin: minify js
- optimize-css-assets-webpack-plugin: optimize/minify css when building
- purgecss-webpack-plugin: removes unused css
- compression-webpack-plugin: compresses assets with Content=Encoding: gz
- brotli-webpack-plugin: compresses assets to serve with Content-Encodign: br
