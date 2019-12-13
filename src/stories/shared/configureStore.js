import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunkMiddleware from 'redux-thunk';
import { action as actionAddon } from '@storybook/addon-actions';

function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      const originalState = store.getState();
      const result = next(action);
      actionAddon(`REDUX-ACTION/${action.type}`)({
        originalState,
        payload: action.payload,
        resultState: store.getState(),
      });
      return result;
    };
  };
}

const configureStore = ({ reducer, initialState = {} }) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(reduxThunkMiddleware, logger)));
};

export default configureStore;
