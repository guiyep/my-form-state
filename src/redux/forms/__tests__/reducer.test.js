import reducer, { formReducer } from '../reducer';

const formId = 'form-id';

describe('reducer', () => {
  it('no form id return state', () => {
    const state = { [formId]: 1 };
    const nextState = reducer(state, { type: 'UNKNOWN', options: {} });
    expect(state).toEqual(nextState);
  });

  it('to remove formId state on undefined next state from formState', () => {
    const state = { [formId]: {} };
    const nextState = reducer(state, { type: 'MY-FORM-STATE/CLEAR_FORM', options: { formId } });
    expect(nextState[formId]).toEqual(undefined);
  });

  it('on update updates form inside form id', () => {
    const state = { [formId]: { a: 123 } };
    const nextState = reducer(state, { type: 'MY-FORM-STATE/INITIALIZE_FORM', options: { formId }, payload: {} });
    expect(nextState[formId].isInitialized).toEqual(true);
  });
});

describe('formReducer', () => {
  it('not known action to not break switch', () => {
    const state = { test: 1 };
    const nextState = formReducer(state, { type: 'UNKNOWN' });
    expect(state).toEqual(nextState);
  });

  it('clear return undefined', () => {
    const state = { test: 1 };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/CLEAR_FORM' });
    expect(nextState).toEqual(undefined);
  });

  it('submit form set submitted', () => {
    const state = {
      isSubmitted: false,
    };
    const state2 = {};
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/SUBMIT_FORM' });
    const nextState2 = formReducer(state2, { type: 'MY-FORM-STATE/SUBMIT_FORM' });
    delete nextState.fields;
    delete nextState2.fields;
    expect(nextState.isSubmitted).toEqual(true);
    expect(nextState2.isSubmitted).toEqual(true);
  });

  it('initialize form with empty payload', () => {
    const state = {};
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/INITIALIZE_FORM', payload: {} });
    expect(nextState.isPristine).toEqual(true);
    expect(nextState.isInitialized).toEqual(true);
    expect(nextState.isSubmitted).toEqual(false);
    expect(nextState.isSubmittable).toEqual(false);
    expect(nextState.isTouched).toEqual(false);
    expect(nextState.errors).toEqual({});
    expect(nextState.dirtyFields).toEqual({});
    expect(nextState.isInvalid).toEqual(undefined);
    expect(nextState.isValid).toEqual(undefined);
  });

  it('initialize form with payload', () => {
    const state = {};
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/INITIALIZE_FORM', payload: { test: 1 } });
    const nextState2 = formReducer(state, { type: 'MY-FORM-STATE/INITIALIZE_FORM', payload: { test: { test2: 3 } } });
    const nextState3 = formReducer(state, { type: 'MY-FORM-STATE/INITIALIZE_FORM' });
    expect(nextState.data).toEqual({ test: 1 });
    expect(nextState2.data).toEqual({ 'test.test2': 3 });
    expect(nextState3.data).toEqual({});
  });

  it('reset form with empty payload', () => {
    const state = {};
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/RESET_FORM' });
    expect(nextState.isPristine).toEqual(true);
    expect(nextState.isInitialized).toEqual(true);
    expect(nextState.isSubmitted).toEqual(false);
    expect(nextState.isSubmittable).toEqual(false);
    expect(nextState.isTouched).toEqual(false);
    expect(nextState.errors).toEqual({});
    expect(nextState.dirtyFields).toEqual({});
    expect(nextState.isInvalid).toEqual(undefined);
    expect(nextState.isValid).toEqual(undefined);
  });

  it('reset form with payload', () => {
    const state = {};
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/RESET_FORM', payload: { test: 1 } });
    const nextState2 = formReducer(state, { type: 'MY-FORM-STATE/RESET_FORM', payload: { test: { test2: 3 } } });
    const nextState3 = formReducer(state, { type: 'MY-FORM-STATE/RESET_FORM' });
    expect(nextState.data).toEqual({ test: 1 });
    expect(nextState2.data).toEqual({ 'test.test2': 3 });
    expect(nextState3.data).toEqual({});
    expect(nextState.isPristine).toEqual(true);
    expect(nextState.isInitialized).toEqual(true);
    expect(nextState.isSubmitted).toEqual(false);
    expect(nextState.isSubmittable).toEqual(false);
    expect(nextState.isTouched).toEqual(false);
    expect(nextState.errors).toEqual({});
    expect(nextState.dirtyFields).toEqual({});
    expect(nextState.isInvalid).toEqual(undefined);
    expect(nextState.isValid).toEqual(undefined);
  });

  it('update form with empty payload', () => {
    const state = { data: {} };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: {} });
    expect(nextState.isPristine).toEqual(false);
    expect(nextState.isTouched).toEqual(true);
    expect(nextState.isSubmitted).toEqual(false);
    expect(nextState.dirtyFields).toEqual({});
  });

  it('update form - setting isSubmittable', () => {
    const state = { data: {}, isTouched: true, isValid: true };
    const state2 = { data: {}, isTouched: false, isValid: true };
    const state3 = { data: {}, isTouched: true, isValid: false };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: {} });
    const nextState2 = formReducer(state2, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: {} });
    const nextState3 = formReducer(state3, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: {} });
    expect(nextState.isSubmittable).toEqual(true);
    expect(nextState2.isSubmittable).toEqual(false);
    expect(nextState3.isSubmittable).toEqual(false);
  });

  it('update form - errors not set when no validator function', () => {
    const state = { data: { test: 123 } };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: {} });
    expect(nextState.errors).toEqual(undefined);
  });

  it('update form - keep dirty fields', () => {
    const state = { data: {}, dirtyFields: { me: '123' } };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: {} });
    expect(nextState.dirtyFields).toEqual({ me: '123' });
  });

  it('update form - flatten data', () => {
    const state = { data: {} };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: { me: { is: 123 } } });
    expect(nextState.data).toEqual({ 'me.is': 123 });
  });

  it('update form - set dirty fields', () => {
    const state = { data: {} };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/UPDATE_FORM', payload: { me: { is: 123 } } });
    expect(nextState.dirtyFields).toEqual({ 'me.is': true });
  });

  it('validate form - with valid state', () => {
    const state = { data: {} };
    const nextState = formReducer(state, { type: 'MY-FORM-STATE/VALIDATED_FORM', payload: {} });
    expect(nextState.errors).toEqual({});
  });

  it('validate form - with errors in payload', () => {
    const state = { data: { a: 123 } };
    const nextState = formReducer(state, {
      type: 'MY-FORM-STATE/VALIDATED_FORM',
      payload: { a: 'need to be an string' },
    });
    expect(nextState.errors.a).toEqual('need to be an string');
    expect(nextState.isInvalid).toEqual(true);
    expect(nextState.isValid).toEqual(false);
  });

  it('validate form - with errors in payload . set isSubmittable', () => {
    const state = { data: { a: 123 }, isTouched: true };
    const state2 = { data: { a: 123 }, isTouched: false };
    const nextState = formReducer(state, {
      type: 'MY-FORM-STATE/VALIDATED_FORM',
      payload: {},
    });
    const nextState2 = formReducer(state2, {
      type: 'MY-FORM-STATE/VALIDATED_FORM',
      payload: {},
    });
    const nextState3 = formReducer(state, {
      type: 'MY-FORM-STATE/VALIDATED_FORM',
      payload: { a: 'need to be an string' },
    });
    expect(nextState.isSubmittable).toEqual(true);
    expect(nextState2.isSubmittable).toEqual(false);
    expect(nextState3.isSubmittable).toEqual(false);
  });
});
