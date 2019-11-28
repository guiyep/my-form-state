import { formReducer } from '../../redux/forms/reducer';

export const reducer = (state = {}, action) => {
  const formId = action && action.options && action.options.formId;

  if (!formId) {
    return state;
  }

  const formState = state.forms[formId];
  const nextFormState = formReducer(formState, action);

  if (nextFormState === undefined) {
    delete state[formId];
    return state;
  }

  return nextFormState !== formState ? { forms: { [formId]: nextFormState } } : state;
};

export default reducer;
