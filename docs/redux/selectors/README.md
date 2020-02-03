# Selectors

<dl>
<dt><a href="#getForm">getForm(Arguments)</a> ⇒ <code>object</code></dt>
<dd><p>Selector that returns the current state of the form.
Passing formId is not required when used using <code>registerForm</code> from <code>my-form-state/core</code>.</p>
</dd>
<dt><a href="#getFormResult">getFormResult(Arguments)</a> ⇒ <code>object</code></dt>
<dd><p>Gets the forms result data. This result data is the merge between the form changes and the initial state.
Passing formId is not required when used using <code>registerForm</code> from <code>my-form-state/core</code>.</p>
</dd>
</dl>

<a name="getForm"></a>

## getForm(Arguments) ⇒ <code>object</code>

Selector that returns the current state of the form.
Passing formId is not required when used using `registerForm` from `my-form-state/core`.

**Kind**: global function  
**Returns**: <code>object</code> - form state.  
**Throws**:

- Arguments.formId is falsey

**Params**

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| Arguments        | <code>\*</code>     | Arguments as object.          |
| Arguments.formId | <code>string</code> | The unique form id indicator. |

**Example**

```js
import { getForm } from 'my-form-state/redux/selectors';

getForm(state, { formId: 'unique-form-id' });
```

<a name="getFormResult"></a>

## getFormResult(Arguments) ⇒ <code>object</code>

Gets the forms result data. This result data is the merge between the form changes and the initial state.
Passing formId is not required when used using `registerForm` from `my-form-state/core`.

**Kind**: global function  
**Returns**: <code>object</code> - form state.  
**Throws**:

- Arguments.formId is falsey

**Params**

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| Arguments        | <code>\*</code>     | Arguments as object.          |
| Arguments.formId | <code>string</code> | The unique form id indicator. |

**Example**

```js
import { getFormResult } from 'my-form-state/redux/selectors';

getFormResult(state, { formId: 'unique-form-id' });
```
