import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as YUP from 'yup';
import { addYUPSyncSchemaValidator, registerForm } from '../../core';

const formId = 'my-form-state-form-id';

const schema = YUP.object().shape({
  testData1: YUP.string().required(),
  testData2: YUP.string().required(),
});

const {
  operations: { initializeForm, clearForm, updateForm, submitForm },
  selectors: { getForm },
} = registerForm({
  formId,
  formValidator: addYUPSyncSchemaValidator(schema),
});

const MyFormStateStory = () => {
  const formState = useSelector(getForm());
  const dispatch = useDispatch();

  const initialize = () => {
    dispatch(initializeForm({ initialState: { testData1: 'type', testData2: 'type' } }));
  };

  const clear = () => {
    dispatch(clearForm());
  };

  const onInputChange = (field, value) => {
    dispatch(
      updateForm({
        data: {
          [field]: value,
        },
      }),
    );
  };

  const onSubmitForm = () => {
    dispatch(submitForm());
  };

  return (
    <ul>
      <li>
        <button onClick={initialize}>INITIALIZE FORM</button>
      </li>
      <li>
        UPDATE FORM:
        <input
          value={formState.data.testData1 || ''}
          onChange={(e) => onInputChange('testData1', e.target.value)}
        ></input>
        <input
          value={formState.data.testData2 || ''}
          onChange={(e) => onInputChange('testData2', e.target.value)}
        ></input>
      </li>
      <li>
        <button onClick={onSubmitForm}>SUBMIT FORM</button>
      </li>
      <li>
        <button onClick={clear}>CLEAR FORM</button>
      </li>
    </ul>
  );
};

export default MyFormStateStory;
