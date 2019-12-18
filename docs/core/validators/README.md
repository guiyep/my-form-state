# Validator Function

Validators functions provide the ability to validate the form state within redux/react. This is what the library uses to determine if a change in the form fields need to mark it as with an error or not.

There are 3 different ways you can create these functions:

- [x] Using YUP Schema. Pre-defined functions.
- [x] Using JOI Schema. Pre-defined functions.
- [x] Using Custom validations.

# YUP

### Validators

<dl>
<dt><a>yupSyncSchemaValidator(schema)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a SYNC Yup schema validator to be used inside the operations.
This is used in <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code> .</p>
</dd>
<dt><a>yupAsyncSchemaValidator(schema)</a> ⇒ <code>function</code></dt>
<dd><p>Creates an ASYNC Yup schema validator to be used inside the operations.
This is used in  <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
</dl>

### Description

<a name="yupSyncSchemaValidator"></a>

## yupSyncSchemaValidator(schema) ⇒ <code>function</code>

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
yupSyncSchemaValidator(schema);
```

<a name="yupAsyncSchemaValidator"></a>

## yupAsyncSchemaValidator(schema) ⇒ <code>function</code>

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
yupAsyncSchemaValidator(schema);
```

# JOI

# Custom


