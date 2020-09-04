import { ArticleShortInfo, ArticlesAction } from '../articles/articleData';
import { HomePageActionTypes } from './homePage.actions';

export interface HomePageReducer {
    homePage: HomePageState
};

export interface SearchData {
    keyword: string,
    articles: ArticleShortInfo[],
    lastLoadedPage: number,
    hasLoadMore: boolean
}

export interface HomePageState {
    searchData: SearchData
}

const INITIAL_STATE: HomePageState = {
    searchData: {
        keyword: '',
        articles: [],
        lastLoadedPage: 0,
        hasLoadMore: false
    }
};

export const HomePageReducer = (state: HomePageState = INITIAL_STATE, action: ArticlesAction<SearchData>) => {
    switch (action.type) {
        case HomePageActionTypes.SET_SEARCH_DATA:
            return {
                ...state,
                searchData: action.payload
            }
        default:   
            return state;
    }
};
