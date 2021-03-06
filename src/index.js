import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Poke_list from './components/Pages/Poke_list'
import Pokemon from './components/Pokemon/Pokemon'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { Route, HashRouter} from 'react-router-dom'
import { createStore } from 'redux'
import { rootReducer } from './components/redux/reducers/rootReducer'


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Route exact path="/" component={App} />
        <Route exact path="/PokeList" component={Poke_list} />
        <Route exact path="/PokeList/pokemon/:pokemonIndex" component={Pokemon} />
      </HashRouter>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
