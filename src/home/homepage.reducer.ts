import { ArticleShortInfo } from '../articles/articleData';
import { HomePageActionTypes, ArticlesAction } from './homepage.actions';

export interface HomePageState {
    articles: ArticleShortInfo[]
}

const INITIAL_STATE: HomePageState = {
    articles: []
};

export const HomePageReducer = (state: HomePageState = INITIAL_STATE, action: ArticlesAction) => {
    switch (action.type) {
        case HomePageActionTypes.SET_ARTICLES_PAGE:
            return {
                ...state,
                articles: action.payload
            }
        default:   
            return state;
    }
};
