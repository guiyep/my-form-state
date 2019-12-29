## Functions

<dl>
<dt><a>updateField(Arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that updates one field value inside the <code>my-form-state</code> redux state. Will update any form/field property
that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc).
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
<dt><a>updateForm(Arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that updates one/more field/s value/s inside the <code>my-form-state</code> redux state. Will update any form/field property
that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc).
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
<dt><a>submitForm(Arguments)</a> ⇒ <code><a">Thunk</a></code></dt>
<dd><p>Dispatchable operation that will submit and lock the form state. Will set the isSubmitted form property to true.
You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
<dt><a>initializeForm(Arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that will initialize the form state. Normally use it after the component that uses this operation is mounted.
You can await for this operation and will resolve the promise once the form is initialized.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
<dt><a>clearForm(Arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that will clear the form state from the store. Normally use it after the component that uses this operation is unmounted.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
<dt><a>resetForm(Arguments)</a> ⇒ <code><a>Thunk</a></code></dt>
<dd><p>Dispatchable operation that will reset the form state to the initial state. You can also change the initialState using the operation.
The <code>formId</code> is not required when used using <code>registerForm</code> from <code>my-form-state/core</code> or <code>useMyFormState</code> from <code>my-form-state/react</code> or <code>my-form-state/react-redux</code>.</p>
</dd>
</dl>

<a name="updateField"></a>

## updateField

Dispatchable operation that updates one field value inside the `my-form-state` redux state. Will update any form/field property
that is being affected by this field (<a href="/#/state/README#form-state">See the form state</a>).
The `formId` is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: global function  
**Returns**: When dispatched returns a <code>Promise</code>  
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

## updateForm

Dispatchable operation that updates one/more field/s value/s inside the `my-form-state` redux state. Will update any form/field property
that is being affected by this field (<a href="/#/state/README#form-state">See the form state</a>).
The `formId` is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: global function  
**Returns**: When dispatched returns a <code>Promise</code>  
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

## submitForm

Dispatchable operation that will submit and lock the form state. Will set the isSubmitted form property to true (<a href="/#/state/README#form-state">See the form state</a>).
You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
The `formId` is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: global function  
**Returns**: When dispatched returns a <code>Promise</code>  
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

## initializeForm

Dispatchable operation that will initialize the form state. Normally use it after the component that uses this operation is mounted.
You can await for this operation and will resolve the promise once the form is initialized.
The `formId` is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: global function  
**Returns**: When dispatched returns a <code>Promise</code>  
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

## clearForm

Dispatchable operation that will clear the form state from the store. Normally use it after the component that uses this operation is unmounted.
The `formId` is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: global function  
**Returns**: When dispatched returns a <code>Promise</code>  
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

## resetForm

Dispatchable operation that will reset the form state to the initial state. You can also change the initialState using the operation.
The `formId` is not required when used using `registerForm` from `my-form-state/core` or `useMyFormState` from `my-form-state/react` or `my-form-state/react-redux`.

**Kind**: global function  
**Returns**: When dispatched returns a <code>Promise</code>  
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

A Redux Thunk. A function that returns a Promise

**Kind**: global typedef
