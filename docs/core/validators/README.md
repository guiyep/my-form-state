# Validators

Validators provide the ability to validate the form state within redux/react. This is what the library uses to determine if a change in the form fields need to be marked as with an error or not.

There are 3 different ways you can create these functions:

- [x] Using the pre-defined function for YUP Schema.
- [x] Using pre-defined function for JOI Schema.
- [x] Using Custom validators.

## IMPORTANT:

The validator will validate only what is defined in the schema and the library will create only the fields that are coming from there.

# YUP

<a name="formSchema"></a>

## formSchema(schema, [options]) ⇒ <code>function</code>

Builds a function that `my-form-library` will use to validate the YUP schema.

**Kind**: global function  
**Returns**: <code>function</code> - a function that will be used inside for validating the form.  
**Throws**:

- schema is falsey

**Params**

| Param           | Type                 | Default            | Description                                     |
| --------------- | -------------------- | ------------------ | ----------------------------------------------- |
| schema          | <code>Object</code>  |                    | a YUP schema object.                            |
| [options]       | <code>Object</code>  |                    | options as object.                              |
| [options.async] | <code>boolean</code> | <code>false</code> | if the validation need to happen sync or async. |

**Example**

```js
import { formSchema } from 'my-form-state/core/validators/yup';
import { useMyFormState } from 'my-form-state/react-redux';

const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
  initialState,
  formSchema: formSchema(schema, { async: true }),
});
```

**Example**

````js
import { formSchema } from 'my-form-state/core/validators/yup';
import { useMyFormState } from 'my-form-state/react';

 const [formState, { updateField, submitForm, resetForm }] = useMyFormState({
   initialState,
   formSchema: formSchema(YUPSchema),
 });
 ````

## JOI

UNDER DEVELOPMENT

## Json Schema

UNDER DEVELOPMENT

## Custom

You can build your own validations using your framework of choice.
You need to create a function that can be async or not, that will return `undefined` when is valid, or a flat object with the errors when it is not.

More precise the newFormState is the `state.data` field from the form state.

```js
import { useMyFormState } from 'my-form-state/react';

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

const [formState, { updateField, updateForm, submitForm, resetForm, clearForm }] = useMyFormState({
  initialState: { varA: 123 },
  formValidator: yourCustomFormValidator,
});

````

or

````js
import { useMyFormState } from 'my-form-state/react';

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

const [formState, { updateField, updateForm, submitForm, resetForm, clearForm }] = useMyFormState({
  initialState: { varA: 123 },
  formValidator: yourCustomFormValidator,
});
````
