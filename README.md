@blackwych/typedoc-plugin-display-inner-doc-comments-theme
==========================================================

TypeDoc plugin to display doc comments specified in type arguments with the default theme


## Features

* Displays doc comments specified in type arguments
* Supports [@blackwych/typedoc-plugin-customized-default-theme](https://www.npmjs.com/package/@blackwych/typedoc-plugin-customized-default-theme)

In TypeDoc's default theme, a documentation of types like
```TypeScript
type MyData = Partial<{
  /** data's name */
  name: string,
}>;
```
doesn't contain the doc comment for `name` ("data's name") used in the type arguments.  
This plugin enables the default theme to display these inner doc comments traversing definitions of the type arguments.


## Installation

```sh
npm install -D @blackwych/typedoc-plugin-display-inner-doc-comments-theme
```


## Usage

TypeDoc will automatically detect and enable this plugin.

To use this theme, configure `theme` option as a command-line option
```sh
typedoc [any options and arguments] --theme display-inner-doc-comments
```
or in your `typedoc.js[on]`
```JSON
{
  "theme": "display-inner-doc-comments"
}
```
