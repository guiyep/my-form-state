# React-Redux Hooks

## Typedefs

<dl>
<dt><a href="#formState">formState</a> : <code>object</code></dt>
<dd></dd>
</dl>

<dl>
<dt><a>MyFormStateHook</a> : <code>{[formState, { resetForm: function, updateForm: function, submitForm:function, updateField: function}]}</code></dt>
<dd></dd>
</dl>

## useMyFormState ⇒ <code>MyFormStateHook</code>

React-redux hook that will execute an update each time the redux form state changes. you will be able to
perform any of the next actions:

- resetForm
- updateForm
- submitForm : Promise. (will be resolve when the form is locked)
- updateField
- clearForm

**Kind**: React-Redux Hook.  
**Returns**: <code>MyFormStateHook</code> - hook to be use in a react component.

| Param                      | Type                  | Default            | Description                                                                            |
| -------------------------- | --------------------- | ------------------ | -------------------------------------------------------------------------------------- |
| Arguments                  | <code>Object</code>   |                    | Arguments as object.                                                                   |
| [Arguments.formId]         | <code>string</code>   |                    | the unique form id indicator, will generate a unique id if not.                        |
| [Arguments.formValidator]  | <code>function</code> |                    | the form validator.<a href="/#/core/validators/predefined/README">Check Validators</a> |
| [Arguments.initialState]   | <code>Object</code>   |                    | the initial state you want to use.                                                     |
| [Arguments.clearOnUnmount] | <code>boolean</code>  | <code>true</code>  | the unique form id indicator.                                                          |
| [Arguments.isGlobalForm]   | <code>boolean</code>  | <code>false</code> | tells if the form is defined global or not. If that is the case we will just reuse it. |

**Example**

```js
const [formState, { updateField, updateForm, submitForm, resetForm, clearForm }] = useMyFormState({
  initialState: {},
  formValidator: addYUPSyncSchemaValidator(schema),
});
```
