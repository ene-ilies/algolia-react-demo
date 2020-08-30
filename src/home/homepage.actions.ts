import { Action } from 'redux';
import { ArticleShortInfo } from '../articles/articleData';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { searchArticles } from '../infrastructure/api/articlesApi';
import { SearchData, HomePageState, HomePageReducer } from './homepage.reducer';

export const HomePageActionTypes = {
    SET_SEARCH_DATA: 'SET_SEARCH_DATA'
}

export interface ArticlesAction extends Action<string> {
    payload: SearchData
}

const setSearchData = (searchData: SearchData): ArticlesAction => ({
    type: HomePageActionTypes.SET_SEARCH_DATA,
    payload: searchData
});

const hasMorePages = (articles: ArticleShortInfo[]): boolean => {
    return articles.length > 0;
}

export const newSearchForArticles = (word: string): ThunkAction<void, HomePageReducer, {}, ArticlesAction> => {
    return async (dispatch: ThunkDispatch<HomePageReducer, {}, ArticlesAction>) => {
        try {
            const page: number = 0;
            const articles: ArticleShortInfo[] = await searchArticles(word, page);
            const searchData: SearchData = {
                keyword: word,
                articles: articles,
                lastLoadedPage: page,
                hasLoadMore: hasMorePages(articles)
            };
            dispatch(setSearchData(searchData));
        } catch (e) {
            const emptySearchData: SearchData = {
                keyword: '',
                articles: [],
                lastLoadedPage: 0,
                hasLoadMore: false
            };
            dispatch(setSearchData(emptySearchData));
        }
    };
};

export const loadMoreArticles = (): ThunkAction<void, HomePageReducer, {}, ArticlesAction> => {
    return async (dispatch: ThunkDispatch<HomePageReducer, {}, ArticlesAction>, getState: () => HomePageReducer) => {
        try {
            const currentState: HomePageState = getState().home;
            const page: number = currentState.searchData.lastLoadedPage + 1;
            const word: string = currentState.searchData.keyword;
            const existingArticles: ArticleShortInfo[] = currentState.searchData.articles;
            const articles: ArticleShortInfo[] = await searchArticles(word, page);
            const searchData: SearchData = {
                keyword: word,
                articles: [...existingArticles, ...articles],
                lastLoadedPage: page,
                hasLoadMore: hasMorePages(articles)
            };
            dispatch(setSearchData(searchData));
        } catch (e) {
            // no changes needed on error
        }
    };
};
