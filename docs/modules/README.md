# Modules

Each module can be used independently from each other.

## Core

This module includes everything needed for setting up the library. Including validating, registering, initializing.

#### Includes

- `import { formSchema } from 'my-form-state/core/validators/yup'`<a href="/#/core/validators/README#yup">Check YUP schema validation</a>
- `import { registerForm } from 'my-form-state/core'` this is internal unless you are defining a global form schema. <a href="/#/core/global/README.md">Check global form Schema</a>

## Redux

This module includes all the Operations/Selectors/Actions/Reducers for the library.

#### Includes

- `import { initializeReducer } from 'my-form-state/redux';` this is for initializing the forms reducer if using with redux. <a href="/#/redux/get-started/README#my-form-library-redux-configuration">Check redux configuration</a>
- `import { operations, selectors, reducer } from 'my-form-state/redux'`
- `import reducer from 'my-form-state/redux/reducer'`
- `import operations from 'my-form-state/redux/operations'` <a href="/#/redux/operations/README#operations">Check redux operations</a>
- `import selectors from 'my-form-state/redux/selectors'` <a href="/#/redux/selectors/README#selectors">Check state selectors</a>

## React

This module includes the react hook. When using this hook you are not using the Redux implementation of the library but just local state.
<a href="/#/react/hook/README#react-hooks">Check react hook</a>

#### Includes

- `import { useMyFormState } from 'my-form-state/react'`

## React-Redux

This module includes the react-redux hook. When using this hook you are binding this library to the redux state.
<a href="/#/react-redux/hook/README#react-redux-hooks">Check react redux hook</a>

#### Includes

- `import { useMyFormState } from 'my-form-state/react-redux'`
