# Validators

Validators provide the ability to validate the form state within redux/react. This is what the library uses to determine if a change in the form fields need to be marked as with an error or not.

There are 3 different ways you can create these functions:

- [x] Using the pre-defined function for YUP Schema.
- [x] Using pre-defined function for JOI Schema.
- [x] Using Custom validators.

IMPORTANT:

Validation functions will validate the entire form data model and treat every single property as a field. If you initialize

# YUP



## JOI

UNDER DEVELOPMENT

## Json Schema

UNDER DEVELOPMENT

## Custom

You can build your own validations using your framework of choice.
You need to create a function that can be async or not, that will return `undefined` when is valid, or a flat object with the errors when it is not.

More precise the newFormState is the `state.data` field from the form state.

```js
const yourCustomFormValidator = (newFormState) => {
  // is valid
  if (yourCustomValidation(newFormState)) {
    return undefined;
  }
  // is invalid
  return {
    yourField1: 'has an error',
    yourField2: 'has an error',
    'yourField3.anotherField': 'has an error',
    'yourField4.anotherField.another': 'has an error',
  };
};
```

or

```js
const yourCustomFormValidator = async (newFormState) => {
  try {
    // is valid
    if (await yourCustomValidation(newFormState)) {
      return undefined;
    }
  } catch (ex) {
    // is invalid
    return {
      yourField1: 'has an error',
      yourField2: 'has an error',
      'yourField3.anotherField': 'has an error',
      'yourField4.anotherField.another': 'has an error',
    };
  }
};
```
