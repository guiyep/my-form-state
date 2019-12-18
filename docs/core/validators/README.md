# YUP

<dl>
<dt><a>addYUPSyncSchemaValidator(schema)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a SYNC Yup schema validator to be used inside the operations.
This is used in <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code> .</p>
</dd>
<dt><a>addYUPAsyncSchemaValidator(schema)</a> ⇒ <code>function</code></dt>
<dd><p>Creates an ASYNC Yup schema validator to be used inside the operations.
This is used in  <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
</dl>

<a name="addYUPSyncSchemaValidator"></a>

## addYUPSyncSchemaValidator(schema) ⇒ <code>function</code>

Creates a SYNC Yup schema validator to be used inside the operations.
This is used in `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux` .

**Kind**: function  
**Returns**: <code>function</code> - function to be use inside operations for validating the schema against the form state  
**Throws**: 

- if schema is falsy and not a YUP schema.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| schema | <code>object</code> | a YUP schema |

**Example**

```js
addYUPSyncSchemaValidator(schema);
```

<a name="addYUPAsyncSchemaValidator"></a>

## addYUPAsyncSchemaValidator(schema) ⇒ <code>function</code>

Creates an ASYNC Yup schema validator to be used inside the operations.
This is used in `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: function  
**Returns**: <code>function</code> - function to be use inside operations for validating the schema against the form state  
**Throws**:

- if schema is falsy and not a YUP schema.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| schema | <code>object</code> | a YUP schema |

**Example**

```js
addYUPAsyncSchemaValidator(schema);
```

# JOI

# Custom
