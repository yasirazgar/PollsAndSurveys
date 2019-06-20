// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Home from './Home.jsx'
import reducers from '../reducers'
import loadTranslations from '../i18n'
import { buildTranslations } from '../actions'


const translations = loadTranslations()
// const createStoreWithMiddleware = applyMiddleware()(createStore(reducers));
const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(buildTranslations(translations))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('.app'))
})

export default App