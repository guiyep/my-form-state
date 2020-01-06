import React from 'react';
import { combineReducers } from 'redux';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as YUP from 'yup';
import { withReduxProvider } from '../../stories/shared/withReduxProvider';
import Form from './MyForm.container';
import FormNested from './MyFormNested.container';
import { initializeReducer } from '../../redux';

const initialState = {};

storiesOf(`React-Redux/MyFormState`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addDecorator(
    withReduxProvider({
      reducer: combineReducers({ ...initializeReducer() }),
      initialState,
    }),
  )
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Basic - YUP Async Validation', () => {
    const schema = YUP.object().shape({
      name: YUP.string().required(),
      familyName: YUP.string().required(),
      favoriteColor: YUP.string().required(),
      alias: YUP.string().required(),
    });

    const initialState2 = { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' };
    const emptyState = { name: '', familyName: '', alias: '', favoriteColor: '' };

    return <Form schema={schema} initialState={initialState2} emptyState={emptyState} />;
  })
  .add('Nested state- YUP Sync validation', () => {
    const schema = YUP.object().shape({
      profileOne: YUP.object().shape({
        name: YUP.string().required(),
        familyName: YUP.string().required(),
        favoriteColor: YUP.string().required(),
        alias: YUP.string().required(),
      }),
      profileTwo: YUP.object().shape({
        name: YUP.string().required(),
        familyName: YUP.string().required(),
        favoriteColor: YUP.string().required(),
        alias: YUP.string().required(),
      }),
    });

    const initialState3 = {
      profileOne: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
      profileTwo: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
    };
    const emptyState = {
      profileOne: { name: '', familyName: '', alias: '', favoriteColor: '' },
      profileTwo: { name: '', familyName: '', alias: '', favoriteColor: '' },
    };

    return <FormNested schema={schema} initialState={initialState3} emptyState={emptyState} />;
  });
