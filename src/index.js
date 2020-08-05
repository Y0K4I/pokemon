import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Poke_list from './components/Pages/Poke_list'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route} from 'react-router-dom';
import { createStore } from 'redux'
const store = createStore(rootReducer)


ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Route path="/" component={App} />
        <Route path="/PokeList" component={Poke_list} />
      </HashRouter>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
