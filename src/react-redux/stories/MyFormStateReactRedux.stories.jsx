import React from 'react';
import { combineReducers } from 'redux';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as YUP from 'yup';
import { action as actionAddon } from '@storybook/addon-actions';
import { withReduxProvider } from '../../stories/shared/withReduxProvider';
import Form from './MyForm.container';
import FormNested from './MyFormNested.container';
import { initializeReducer } from '../../redux';

const initialState = {};

const onSubmit = (data) => {
  actionAddon(`FORM-SUBMITTED`)(data);
};

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
  .add('Basic - YUP Schema', () => {
    const schema = YUP.object().shape({
      name: YUP.string().required(),
      familyName: YUP.string().required(),
      favoriteColor: YUP.string().required(),
      alias: YUP.string().required(),
    });

    const initialState2 = { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' };
    const emptyState = { name: '', familyName: '', alias: '', favoriteColor: '' };

    return <Form schema={schema} onSubmit={onSubmit} initialState={initialState2} emptyState={emptyState} />;
  })
  .add('Nested state - YUP Schema', () => {
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

    return <FormNested onSubmit={onSubmit} schema={schema} initialState={initialState3} emptyState={emptyState} />;
  })
  .add('Nested state - YUP schema - only one profile', () => {
    const schema = YUP.object().shape({
      profileOne: YUP.object().shape({
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

    return <FormNested onSubmit={onSubmit} schema={schema} initialState={initialState3} emptyState={emptyState} />;
  });
