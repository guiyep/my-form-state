const myFormRegistry = {};

export const addFormToRegistry = (formId, data) => {
  if (myFormRegistry[formId]) {
    throw new Error(`the form ${formId} is already registered, please choose a different name`);
  }
  myFormRegistry[formId] = data;
};

export const removeFormFromRegistry = (formId) => {
  delete myFormRegistry[formId];
};

export const getFormFromRegistry = (formId) => {
  return myFormRegistry[formId];
};
