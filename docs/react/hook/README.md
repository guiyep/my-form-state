# React Hooks

## Typedefs

<dl>
<dt><a>formState</a> : <code>object</code></dt>
<dd></dd>
</dl>

<dl>
<dt><a>MyFormStateHook</a> : <code>{[formState, { resetForm: function, updateForm: function, submitForm:function, updateField: function}]}</code></dt>
<dd></dd>
</dl>

## useMyFormState ⇒ <code>MyFormStateHook</code>

React-redux hook that will execute an update each time the redux form state changes. You will be able to
perform any of the next actions:

- <a href="/#/redux/operations/README#resetform">resetForm</a>
- <a href="/#/redux/operations/README#updateform">updateForm</a>
- <a href="/#/redux/operations/README#submitform">submitForm</a>
- <a href="/#/redux/operations/README#updatefield">updateField</a>
- <a href="/#/redux/operations/README#clearform">clearForm</a>

**Kind**: React Hook

**Returns**: <code>MyFormStateHook</code> - Hook to be use in a React component.

| Param                     | Type                  | Description                                                                  |
| ------------------------- | --------------------- | ---------------------------------------------------------------------------- |
| Arguments                 | <code>Object</code>   | Arguments as object.                                                         |
| [Arguments.formId]        | <code>string</code>   | The unique form id indicator, will generate a unique id if not.              |
| [Arguments.formValidator] | <code>function</code> | The form validator. <a href="/#/core/validators/README">Check Validators</a> |
| [Arguments.initialState]  | <code>Object</code>   | The initial state you want to use.                                           |

**Example**

```js
const [formState, { updateField, updateForm, submitForm, resetForm, clearForm }] = useMyFormState({
  initialState: {},
  formValidator: yupSyncSchemaValidator(schema),
});
```
