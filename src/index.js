import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Poke_list from './components/Pages/Poke_list'
import Pokemon from './components/Pokemon/Pokemon'
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
        <Route exact path="/PokeList/pokemon/:PokemonIndex" component={Pokemon} />
      </HashRouter>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
