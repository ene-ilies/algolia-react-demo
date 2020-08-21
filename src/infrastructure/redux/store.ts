import { Store, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root.reducer';
import thunk from 'redux-thunk';

export const configureStore: () => Store = () => createStore(rootReducer, applyMiddleware(thunk));