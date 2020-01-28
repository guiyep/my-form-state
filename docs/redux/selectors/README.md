# Selectors

<a name="getForm"></a>

## getForm(Arguments) ⇒ <code>function</code>

Memoize selector that return a function that will get the current state of the form from the Redux/React store. This state can come from React or Redux.
Passing formId is not required when used using `registerForm` from `my-form-state/core`.

**Kind**: function  
**Returns**: <code>function</code> - A function to be executed with the state.  
**Throws**:

- Arguments.formId is falsy

**Params**:

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| Arguments        | <code>Object</code> | Arguments as object.          |
| Arguments.formId | <code>string</code> | The unique form id indicator. |

**Example**

```js
getForm({ formId: 'unique-form-id' })(state);
```
