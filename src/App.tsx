
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './infrastructure/redux/store';
import HomePage from './home/HomePage';
import ArticleDetails from './articles/articleDetails';

const App = () => (
  <Provider store={configureStore()} >
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/article/:id" component={ArticleDetails} />
      </Switch>
    </Router>
  </Provider>
);

export default hot(App);
