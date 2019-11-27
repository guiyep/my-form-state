import { configure } from '@storybook/react';

function loadStories() {
  require('../src/react/stories/MyFormStateReact.stories');
  require('../src/react-redux/stories/MyFormStateReactRedux.stories');
}

configure(loadStories, module);
