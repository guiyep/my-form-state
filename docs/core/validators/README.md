# Validator Function

Validators functions provide the ability to validate the form state within redux/react. This is what the library uses to determine if a change in the form fields need to be marked as with an error or not.

There are 3 different ways you can create these functions:

- [x] Using the pre-defined function for YUP Schema.
- [x] Using pre-defined function for JOI Schema.
- [x] Using Custom validators.

# YUP

### Validators

<dl>
<dt><a>formValidator(schema)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a SYNC Yup schema validator to be used inside the operations.
This is used in <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code> .</p>
</dd>
<dt><a>formValidator(schema)</a> ⇒ <code>function</code></dt>
<dd><p>Creates an ASYNC Yup schema validator to be used inside the operations.
This is used in  <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
</dl>

### Description

<a name="formValidator"></a>

## formValidator(schema) ⇒ <code>function</code>

Creates a SYNC Yup schema validator to be used inside the operations.
This is used in `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .

**Kind**: function  
**Returns**: <code>function</code> - Function to be use inside operations for validating the schema against the form state  
**Throws**:

- if schema is falsy and not a YUP schema.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| schema | <code>object</code> | YUP schema |

**Example**

```js
formValidator(schema);
```

<a name="formValidator"></a>

## formValidator(schema) ⇒ <code>function</code>

Creates an ASYNC Yup schema validator to be used inside the operations.
This is used in `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: function  
**Returns**: <code>function</code> - Function to be use inside operations for validating the schema against the form state  
**Throws**:

- if schema is falsy and not a YUP schema.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| schema | <code>object</code> | YUP schema |

**Example**

```js
formValidator(schema);
```

## JOI

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
