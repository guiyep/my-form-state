# my-form-state

![logo](logo.png)

> react/redux form state management library.

[![NPM](https://img.shields.io/npm/v/react-select-virtualized.svg)](https://www.npmjs.com/package/my-form-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Form libraries are complex, they don't make a separation between state and UI. You always end up building custom components on top of the library components that at the same time are on top of the HTML elements!!!. This makes it complex, hard to maintain and hard to change. Too many abstractions :(

This library was built for the sole purpose of unifying and simplifying the way we manage the state with React and/or Redux.

If you use Redux or just React, this library is for you! Yes, it is not a typo. You can use this library with one or the other, or both! It doesn't matter since it is implemented with DUCKS under the hood.

It provides a simple hook API that you can initialize in a container component and pass down the form-state to your form.

## Note

The library is fully tested using Jest and fully documented using JsDoc.

## Getting Started

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

#### With React-Redux

```bash
{
    "react",
    "react-dom",
    "redux",
    "react-redux",
}
```

## Example with React-Redux

The library will initialize a `my-form-state` property in your store where all the forms will live. You can check the state at any given time using the redux tools. Any change in the redux state form will trigger update in the `useMyFormState` hook.

```js
import React from 'react';

import { useMyFormState } from 'my-form-state/react-redux';

import Form from '@Your-form-component';

const MyFormContainer = () => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState();

  const onFieldChangeHandler = (field, value) => updateField({ field, value });

  const onEmptyHandler = () => resetForm({ initialState: {} });

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={submitForm}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormContainer;
```

## Example with JUST React

The library will keep the state internal to your component.

```js
import React from 'react';

import { useMyFormState } from 'my-form-state/react'; <-- THIS IS THE ONLY DIFFERENCE ;) -->

import Form from '@Your-form-component';

const MyFormContainer = () => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState();

  const onFieldChangeHandler = (field, value) => updateField({ field, value });

  const onEmptyHandler = () => resetForm({ initialState: {} });

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={submitForm}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormContainer;
```

## Storybook

Check [Storybook](https://serene-hawking-021d7a.netlify.com/) for more examples.
