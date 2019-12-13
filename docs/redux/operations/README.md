# Operations

## Members

<dl>
<dt><a href="?id=updateField">updateField</a> ⇒ <code><a href="#Thunk">Thunk</a></code></dt>
<dd><p>This operation update one field and inside the my-form-state redux state. Will also update all the
form related props like isValid, isInvalid, etc. Normally it is triggered once an input value in the form changes.</p>
</dd>
<dt><a href="#updateForm">updateForm</a> ⇒ <code><a href="#Thunk">Thunk</a></code></dt>
<dd><p>This operation update one/more fields inside the my-form-state redux state. Will also update all the
form related props like isValid, isInvalid, isSubmittable, etc. Normally it is triggered once an input value in the form changes.</p>
</dd>
<dt><a href="#submitForm">submitForm</a> ⇒ <code><a href="#Thunk">Thunk</a></code></dt>
<dd><p>This operation wil submit and lock the form. Will set the isSubmitted form prop to true.
You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.</p>
</dd>
<dt><a href="#initializeForm">initializeForm</a> ⇒ <code><a href="#Thunk">Thunk</a></code></dt>
<dd><p>This operation wil initialize the form. Normally use after the component that uses this operation is mounted.
You can await for this operation and will resolve the promise once the validation is completed after the form is initialized.</p>
</dd>
<dt><a href="#clearForm">clearForm</a> ⇒ <code><a href="#Thunk">Thunk</a></code></dt>
<dd><p>This operation will clear the form state from the store. Normally use after the component that uses this operation is unmounted.</p>
</dd>
<dt><a href="#resetForm">resetForm</a> ⇒ <code><a href="#Thunk">Thunk</a></code></dt>
<dd><p>This operation will reset the form state to the initial state. You can also change the initialState using the operation.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Thunk">Thunk</a> ⇒ <code>Promise</code></dt>
<dd><p>A Redux Thunk. Function that returns a Promise</p>
</dd>
</dl>

<a name="updateField"></a>

## updateField ⇒ [<code>Thunk</code>](#Thunk)

This operation update one field and inside the my-form-state redux state. Will also update all the
form related props like isValid, isInvalid, etc. Normally it is triggered once an input value in the form changes.

**Kind**: function
**Returns**: [<code>Thunk</code>](#Thunk) - a function to be executed passing dispatch and getState that returns a Promise.  
**Throws**:

- Arguments.formId is falsy
- Arguments.field is falsy

| Param            | Type                | Description                     |
| ---------------- | ------------------- | ------------------------------- |
| Arguments        | <code>Object</code> | Arguments as object.            |
| Arguments.formId | <code>string</code> | the unique form id indicator.   |
| Arguments.field  | <code>string</code> | the field name inside the form. |
| Arguments.value  | <code>any</code>    | any value.                      |

**Example**

```js
dispatch(
  updateField({
    field: 'color',
    value: 'red',
    formId: 'unique-form-id',
  }),
);
```

<a name="updateForm"></a>

## updateForm ⇒ [<code>Thunk</code>](#Thunk)

This operation update one/more fields inside the my-form-state redux state. Will also update all the
form related props like isValid, isInvalid, isSubmittable, etc. Normally it is triggered once an input value in the form changes.

**Kind**: function
**Returns**: [<code>Thunk</code>](#Thunk) - a function to be executed passing dispatch and getState that returns a Promise.  
**Throws**:

- Arguments.formId is falsy
- Arguments.data is falsy

| Param            | Type                | Description                                                           |
| ---------------- | ------------------- | --------------------------------------------------------------------- |
| Arguments        | <code>Object</code> | Arguments as object.                                                  |
| Arguments.data   | <code>Object</code> | a key value pair with the form data. { [key] : value, [key] : value } |
| Arguments.formId | <code>string</code> | the unique form id indicator.                                         |

**Example**

```js
dispatch(
  updateForm({
    data: {
      color: 'red',
    },
    formId: 'unique-form-id',
  }),
);
```

<a name="submitForm"></a>

## submitForm ⇒ [<code>Thunk</code>](#Thunk)

This operation wil submit and lock the form. Will set the isSubmitted form prop to true.
You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.

**Kind**: function
**Returns**: [<code>Thunk</code>](#Thunk) - a function to be executed passing dispatch and getState that returns a Promise.  
**Throws**:

- Arguments.formId is falsy

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| Arguments        | <code>Object</code> | Arguments as object.          |
| Arguments.formId | <code>string</code> | the unique form id indicator. |

**Example**

```js
dispatch(
  submitForm({
    formId: 'unique-form-id',
  }),
);
```

<a name="initializeForm"></a>

## initializeForm ⇒ [<code>Thunk</code>](#Thunk)

This operation wil initialize the form. Normally use after the component that uses this operation is mounted.
You can await for this operation and will resolve the promise once the validation is completed after the form is initialized.

**Kind**: function
**Returns**: [<code>Thunk</code>](#Thunk) - a function to be executed passing dispatch and getState that returns a Promise.  
**Throws**:

- Arguments.formId is falsy

| Param                    | Type                | Description                   |
| ------------------------ | ------------------- | ----------------------------- |
| Arguments                | <code>Object</code> | Arguments as object.          |
| Arguments.formId         | <code>string</code> | the unique form id indicator. |
| [Arguments.initialState] | <code>Object</code> | the form initial state        |

**Example**

```js
dispatch(
  initializeForm({
    formId: 'unique-form-id',
  }),
);
```

<a name="clearForm"></a>

## clearForm ⇒ [<code>Thunk</code>](#Thunk)

This operation will clear the form state from the store. Normally use after the component that uses this operation is unmounted.

**Kind**: function
**Returns**: [<code>Thunk</code>](#Thunk) - a function to be executed passing dispatch and getState that returns a Promise.  
**Throws**:

- Arguments.formId is falsy

| Param            | Type                | Description                   |
| ---------------- | ------------------- | ----------------------------- |
| Arguments        | <code>Object</code> | Arguments as object.          |
| Arguments.formId | <code>string</code> | the unique form id indicator. |

**Example**

```js
dispatch(
  clearForm({
    formId: 'unique-form-id',
  }),
);
```

<a name="resetForm"></a>

## resetForm ⇒ [<code>Thunk</code>](#Thunk)

This operation will reset the form state to the initial state. You can also change the initialState using the operation.

**Kind**: global variable  
**Returns**: [<code>Thunk</code>](#Thunk) - a function to be executed passing dispatch and getState that returns a Promise.  
**Throws**:

- Arguments.formId is falsy

| Param                    | Type                | Description                   |
| ------------------------ | ------------------- | ----------------------------- |
| Arguments                | <code>Object</code> | Arguments as object.          |
| Arguments.formId         | <code>string</code> | the unique form id indicator. |
| [Arguments.initialState] | <code>Object</code> | the form initial state        |

**Example**

```js
dispatch(
  clearForm({
    formId: 'unique-form-id',
  }),
);
```

<a name="Thunk"></a>

## Thunk ⇒ <code>Promise</code>

A Redux Thunk. Function that returns a Promise
