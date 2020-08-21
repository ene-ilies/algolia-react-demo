import { HomePageReducer } from '../../home/homepage.reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({home: HomePageReducer});