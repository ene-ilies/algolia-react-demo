import { HomePageReducer } from '../../home/homePage.reducer';
import { combineReducers } from 'redux';
import { ArticleDetailsPageReducer } from '../../articles/actionDetailsPage.reducer';

export const rootReducer = combineReducers({
    homePage: HomePageReducer,
    articlePage: ArticleDetailsPageReducer
});