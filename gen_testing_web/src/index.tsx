import 'antd/dist/antd.css';
import './index.scss';
import 'moment/locale/vi';
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { PageLayout } from './shared/components/layout/admin';
import { rootReducer } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from './modules/login';

const devToolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancer = process.env.NODE_ENV !== 'production' && devToolsCompose ? devToolsCompose : compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
        <Switch>
          <Route path='/auth/login' render={props => <LoginPage {...props} />} />
          <Route path='/' render={props => <PageLayout {...props} />} />
        </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
