import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Poke_list from './components/Pages/Poke_list'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { Route, HashRouter} from 'react-router-dom';
import { createStore } from 'redux'
import { rootReducer } from './components/redux/rootReducer'
const store = createStore(rootReducer)


ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Route exact path="/" component={App} />
        <Route exact path="/PokeList" component={Poke_list} />
      </HashRouter>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
