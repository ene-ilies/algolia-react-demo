import { ArticleShortInfo, ArticlesAction } from '../articles/articleData';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { searchArticles } from '../infrastructure/api/articlesApi';
import { SearchData, HomePageState, HomePageReducer } from './homePage.reducer';

export const HomePageActionTypes = {
    SET_SEARCH_DATA: 'SET_SEARCH_DATA'
}

const setSearchData = (searchData: SearchData): ArticlesAction<SearchData> => ({
    type: HomePageActionTypes.SET_SEARCH_DATA,
    payload: searchData
});

const hasMorePages = (articles: ArticleShortInfo[]): boolean => {
    return articles.length > 0;
}

export const newSearchForArticles = (word: string): ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> => {
    return async (dispatch: ThunkDispatch<HomePageReducer, {}, ArticlesAction<SearchData>>) => {
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

export const loadMoreArticles = (): ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> => {
    return async (dispatch: ThunkDispatch<HomePageReducer, {}, ArticlesAction<SearchData>>, getState: () => HomePageReducer) => {
        try {
            const currentState: HomePageState = getState().homePage;
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
