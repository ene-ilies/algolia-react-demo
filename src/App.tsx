
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './infrastructure/redux/store';
import HomePage from './home/homePage';
import ArticleDetailsPage from './articles/articleDetailsPage';

const App = () => (
  <Provider store={configureStore()} >
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/article/:id" render={({match}) => (<ArticleDetailsPage id={match.params.id} />)} />
      </Switch>
    </Router>
  </Provider>
);

export default hot(App);
