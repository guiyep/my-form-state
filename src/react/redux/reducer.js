import { formReducer } from '../../redux/forms/reducer';

export const reducer = (state = {}, action) => {
  const formId = action && action.options && action.options.formId;

  if (!formId) {
    return state;
  }

  const formState = state.forms[formId];
  const nextFormState = formReducer(formState, action);

  if (nextFormState === undefined) {
    // eslint-disable-next-line
    delete state[formId];
    return state;
  }

  const nextState = nextFormState !== formState ? { forms: { [formId]: nextFormState } } : state;

  // THIS WILL ONLY BE PRESENT IN DEV MODE ON STORYBOOK, IN PRODUCTION BUILD WILL BE REMOVED BY ROLLUP
  // eslint-disable-next-line
  window.__DON_T_USE_PUSH_REDUX_CHANGE_TO_STORYBOOK(action.type, {
    originalState: formState,
    payload: action.payload,
    resultState: nextFormState,
  });

  return nextState;
};

export default reducer;
