# my-form-state

![Alt text](./logo.png?raw=true 'my-form-state')

> react/redux form state management library.

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/my-form-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Forms libraries are complex, they don't make a separation between state and UI, You always ends up building custom component on top of the library components (that at the same time are on top of the HTML elements) for building real cases scenarios. This makes it complex, hard to maintain and hard to change. Too many abstractions ;)

This library was built for the sole purpose of unifying and simplifying the way we manage the state with React and/or Redux.

If you use Redux or just React, this library is for you! Yes, you can use this library with one or the other, or both! It doesn't matter since it is implemented with DUCKS under the hood.

It provides a simple hook API that you can initialize in a container component and pass down the form state to your form.

## Install

```bash
npm install --save my-form-state
```

### Peer Dependencies

They depend on how you want to use the library:

#### Just React:

```bash
{
    "react",
    "react-dom",
}
```

#### Just Redux

```bash
{
    "redux",
    "react-redux",
}
```

## Try It!!!

[![Edit react-select-virtualized](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vigilant-mclean-wpbk7)

Check [Storybook](https://serene-hawking-021d7a.netlify.com/) for more examples