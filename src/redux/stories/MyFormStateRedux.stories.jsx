import React from 'react';
import { combineReducers } from 'redux';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withReduxProvider } from '../../stories/shared/withReduxProvider';
import MyFormStateStory from './MyFormStateStory';
import forms from '../forms/reducer';

const initialState = {};

storiesOf(`Redux/MyFormState`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addDecorator(
    withReduxProvider({
      reducer: combineReducers({ forms }),
      initialState,
    }),
  )
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Basic', () => <MyFormStateStory />);
