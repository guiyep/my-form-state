import React from 'react';
import { combineReducers } from 'redux';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withReduxProvider } from '../../stories/shared/withReduxProvider';
import Form from './MyFormContainer';
import FormNested from './MyFormContainerNested';
import forms from '../../redux/forms/reducer';
import * as YUP from 'yup';

const initialState = {};

storiesOf(`React-Redux/MyFormState`, module)
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
  .add('Basic', () => {
    const schema = YUP.object().shape({
      name: YUP.string().required(),
      familyName: YUP.string().required(),
      favoriteColor: YUP.string().required(),
      alias: YUP.string().required(),
    });

    const initialState = { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' };
    const emptyState = { name: '', familyName: '', alias: '', favoriteColor: '' };

    return <Form schema={schema} initialState={initialState} emptyState={emptyState} />;
  })
  .add('Nested state', () => {
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

    const initialState = {
      profileOne: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
      profileTwo: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
    };
    const emptyState = {
      profileOne: { name: '', familyName: '', alias: '', favoriteColor: '' },
      profileTwo: { name: '', familyName: '', alias: '', favoriteColor: '' },
    };

    return <FormNested schema={schema} initialState={initialState} emptyState={emptyState} />;
  });
