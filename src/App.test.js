import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

global.MutationObserver = class {
  disconnect() {}
  observe(element, initObject) {}
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<div></div>, div);
  ReactDOM.unmountComponentAtNode(div);
});
