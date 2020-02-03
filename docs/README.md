## The Library

> react/redux form state management library.

[![NPM](https://img.shields.io/npm/v/my-form-state.svg)](https://www.npmjs.com/package/my-form-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

The library will initialize a `my-form-state` entry in your redux state where all the forms data will live. You can check the state at any given time using the redux tools. Any change in the redux state form will trigger an update in the `useMyFormState` hook.

Check <a href="/#/redux/get-started/README?id=my-form-library-redux-configuration">Getting Started Redux</a> for the Redux configuration

```js
import React from 'react';
import { useMyFormState } from 'my-form-state/react-redux';
import { formSchema } from 'my-form-state/core/validators/yup';
import * as YUP from 'yup';

import Form from '@Your-form-component';

const YUPSchema = YUP.object().shape({
  alias: YUP.string().required(),
});

const MyFormContainer = ({ onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState: { alias: 'guiyep' },
    formSchema: formSchema(YUPSchema),
  });

  const onFieldChangeHandler = (field, value) => updateField({ field, value });

  const onEmptyHandler = () => resetForm({ initialState: {} );

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormContainer;
```

## Example with only react

The library will keep the state internal to your component. No extra configuration needed.

```js
import React from 'react';
import { formSchema } from 'my-form-state/core/validators/yup';
import * as YUP from 'yup';
import { useMyFormState } from 'my-form-state/react'; <-- THIS IS THE ONLY DIFFERENCE ;) -->

import Form from '@Your-form-component';

const YUPSchema = YUP.object().shape({
  alias: YUP.string().required(),
});

const MyFormContainer = ({ onSubmit }) => {
  const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
    initialState: { alias: 'guiyep' },
    formSchema: formSchema(YUPSchema),
  });

  const onFieldChangeHandler = (field, value) => updateField({ field, value });

  const onEmptyHandler = () => resetForm({ initialState: {} });

  const onSubmitHandler = async () => {
    const result = await submitForm();
    onSubmit(result);
  };

  return (
    <Form
      formState={formState}
      onFieldChange={onFieldChangeHandler}
      onSubmit={onSubmitHandler}
      onClear={onEmptyHandler}
      onReset={resetForm}
    />
  );
};

export default MyFormContainer;
```
