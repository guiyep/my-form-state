# my-form-library Redux configuration

## Functions

<dl>
<dt><a href="#initializeReducer">initializeReducer(Arguments)</a> ⇒ <code>object</code></dt>
<dd><p>Initialize the my-form-state reducer into the redux store. All the forms created will be under the provided name. Uses the <code>my-form-state</code> property
as default name if name is not provided.</p>
</dd>
</dl>

<a name="initializeReducer"></a>

## initializeReducer(Arguments) ⇒ <code>object</code>

Initialize the my-form-state reducer into the redux store. All the forms created will be under the provided name. Uses the `my-form-state` property
as default name if name is not provided.

**Kind**: function  
**Returns**: <code>object</code> - the reducer object to combine with all of your reducers.  
**Throws**:

- If you already initialized the library reducer. This can only be run once!

**Params**

| Param          | Type                | Default                                | Description                                                                                    |
| -------------- | ------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Arguments      | <code>Object</code> |                                        | Arguments as object.                                                                           |
| Arguments.name | <code>string</code> | <code>&quot;my-form-state&quot;</code> | The redux state property from which all the forms will be stored. Defaults to `my-form-state`. |

**Example**

```js
import { combineReducers, createStore } from 'redux';

const formsReducer = initializeReducer();
const reducer = combineReducers({ ..yourAppReducer, ...formsReducer })

const store = createStore(reducer, initialState)

```

**Example 2**

```js
import { combineReducers, createStore } from 'redux';

const formsReducer = initializeReducer({ name: 'custom-path' });
const reducer = combineReducers({ ..yourAppReducer, ...formsReducer })

const store = createStore(reducer, initialState)

```
