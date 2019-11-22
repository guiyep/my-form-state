import React from 'react';
import Provider from './Provider';
import configureStore from './configureStore';
import { withState } from '@dump247/storybook-state';

export const withReduxProvider = ({ reducer, initialState }) => {
  const reduxStore = configureStore({ reducer, initialState });
  // this is so we use the dump addon to show the state
  let addonStateUpdater;
  reduxStore.subscribe(() => {
    if (addonStateUpdater) {
      addonStateUpdater();
    }
  });
  return (story) =>
    withState(initialState)(({ store }) => {
      addonStateUpdater = () => {
        const newState = reduxStore.getState();
        store.set(newState);
      };
      return <Provider store={reduxStore}>{story()}</Provider>;
    })();
};
