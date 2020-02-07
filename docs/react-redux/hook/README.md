# React-Redux Hooks

We provide an unified API to use this library, and this API is using <a href="https://react-redux.js.org/next/api/hooks">HOOKS</a>. The hooks state will be updated with any form change and the underlying operations can be used at any given time.

## Typedefs

<dl>
<dt><a href="#formState">formState</a> : <code>object</code></dt>
<dd></dd>
</dl>

<dl>
<dt><a>MyFormStateHook</a> : <code>{[formState, { resetForm: function, updateForm: function, submitForm:function, updateField: function }]}</code></dt>
<dd></dd>
</dl>

## useMyFormState ⇒ <code>MyFormStateHook</code>

React-redux hook that will execute an update each time the redux form state changes. you will be able to
perform any of the next actions:

- <a href="/#/redux/operations/README#resetform">resetForm</a>
- <a href="/#/redux/operations/README#updateform">updateForm</a>
- <a href="/#/redux/operations/README#submitform">submitForm</a>
- <a href="/#/redux/operations/README#updatefield">updateField</a>
- <a href="/#/redux/operations/README#removeForm">removeForm</a>

**Kind**: React-Redux Hook.  
**Returns**: <code>MyFormStateHook</code> - hook to be use in a react component.

**Params**

| Param                     | Type                  | Default | Description                                                                                               |
| ------------------------- | --------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| arguments                 | <code>Object</code>   |         | arguments as object.                                                                                      |
| [arguments.formId]        | <code>string</code>   |         | The unique form id indicator, will generate a unique id if not.                                           |
| [arguments.formSchema]    | <code>function</code> |         | The form schema. This can be YUP/JOI/JSON-SCHEMA <a href="/#/core/validators/README#yup">Check Schema</a> |
| [arguments.formValidator] | <code>function</code> |         | The form validator.<a href="/#/core/validators/README#custom">Check Validators</a>                        |
| [arguments.initialState]  | <code>Object</code>   |         | The initial state you want to use.                                                                        |

**Example**

```js
import { formSchema } from 'my-form-state/core/validators/yup';
import { useMyFormState } from 'my-form-state/react-redux';
import * as YUP from 'yup';

const YUPSchema = YUP.object().shape({
  name: YUP.string().required(),
  familyName: YUP.string().required(),
  favoriteColor: YUP.string().required(),
  alias: YUP.string().required(),
});

const [formState, { updateField, updateForm, submitForm, resetForm }] = useMyFormState({
  initialState: { alias: 'guiyep' },
  formSchema: formSchema(YUPSchema),
});
```
