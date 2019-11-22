import { configure } from '@storybook/react';

function loadStories() {
  // require('../src/redux/stories/MyFormStateRedux.stories');
  require('../src/react-redux/stories/MyFormStateReactRedux.stories');
}

configure(loadStories, module);
