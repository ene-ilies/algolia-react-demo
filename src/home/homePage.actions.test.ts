import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { HomePageActionTypes, newSearchForArticles, loadMoreArticles } from './homePage.actions';
import { ArticleShortInfo, ArticlesAction } from '../articles/articleData';
import { searchArticles } from '../infrastructure/api/articlesApi';
import { SearchData, HomePageReducer } from './homePage.reducer';

jest.mock('../infrastructure/api/articlesApi');

describe('homepage.actions', () => {
    const dispatch: ThunkDispatch<{}, {}, ArticlesAction<SearchData>> = jest.fn().mockImplementation(() => {});

    const keyword: string = 'test';    
    const itemsPage1: ArticleShortInfo[] = [
        {
            id: "1",
            title: "title1",
            author: "author1",
            noOfComments: 5
        },
        {
            id: "2",
            title: "title2",
            author: "author2",
            noOfComments: 10
        }
    ];
    const itemsPage2: ArticleShortInfo[] = [
        {
            id: "3",
            title: "title3",
            author: "author3",
            noOfComments: 5
        }
    ];

    const homePageReducer: HomePageReducer = {
        homePage: {
            searchData: {
                keyword: keyword,
                articles: itemsPage1,
                lastLoadedPage: 1,
                hasLoadMore: true
            }
        }
    };

    it('that newSearchForArticles dispatches correct action on fetch success', async () => {
        const expectedAction: ArticlesAction<SearchData> = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: itemsPage1,
                lastLoadedPage: 0,
                hasLoadMore: true
            }
        };
        const thunkAction: ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> = newSearchForArticles(keyword);
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that newSearchForArticles dispatches correct action with hasMore false when results is empty array', async () => {
        (searchArticles as jest.Mock).mockResolvedValue([]);
        const expectedAction: ArticlesAction<SearchData> = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: [],
                lastLoadedPage: 0,
                hasLoadMore: false
            }
        };
        const thunkAction: ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> = newSearchForArticles(keyword);
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that newSearchForArticles dispatches correct action on fetch failure', async () => {
        const expectedAction: ArticlesAction<SearchData> = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: '',
                articles: [],
                lastLoadedPage: 0,
                hasLoadMore: false
            }
        };
        (searchArticles as jest.Mock).mockImplementation(() => {throw new Error();});
        const thunkAction: ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> = newSearchForArticles(keyword);
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that loadMoreArticles dispatches correct action on fetch success', async () => {
        (searchArticles as jest.Mock).mockResolvedValue(itemsPage2);
        (dispatch as jest.Mock).mockReset();
        const expectedAction: ArticlesAction<SearchData> = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: [...itemsPage1, ...itemsPage2],
                lastLoadedPage: homePageReducer.homePage.searchData.lastLoadedPage + 1,
                hasLoadMore: true
            }
        };
        const thunkAction: ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> = loadMoreArticles();
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(searchArticles).toBeCalledWith(homePageReducer.homePage.searchData.keyword, homePageReducer.homePage.searchData.lastLoadedPage + 1);
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that loadMoreArticles dispatches correct action with hasMore false when results is empty array', async () => {
        (searchArticles as jest.Mock).mockResolvedValue([]);
        (dispatch as jest.Mock).mockReset();
        const expectedAction: ArticlesAction<SearchData> = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: itemsPage1,
                lastLoadedPage: homePageReducer.homePage.searchData.lastLoadedPage + 1,
                hasLoadMore: false
            }
        };
        const thunkAction: ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> = loadMoreArticles();
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(searchArticles).toBeCalledWith(homePageReducer.homePage.searchData.keyword, homePageReducer.homePage.searchData.lastLoadedPage + 1);
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that loadMoreArticles dispatches correct action on fetch failure', async () => {
        (searchArticles as jest.Mock).mockImplementation(() => {throw new Error();});
        (dispatch as jest.Mock).mockReset();
        const thunkAction: ThunkAction<void, HomePageReducer, {}, ArticlesAction<SearchData>> = loadMoreArticles();
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).not.toBeCalled();
    });
});
