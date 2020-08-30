import { ThunkDispatch } from 'redux-thunk';
import { ArticlesAction, HomePageActionTypes, newSearchForArticles, loadMoreArticles } from './homepage.actions';
import { ArticleShortInfo } from '../articles/articleData';
import { searchArticles } from '../infrastructure/api/articlesApi';
import { SearchData, HomePageState, HomePageReducer } from './homepage.reducer';

jest.mock('../infrastructure/api/articlesApi');

describe('homepage.actions', () => {
    const dispatch: ThunkDispatch<{}, {}, ArticlesAction> = jest.fn().mockImplementation(() => {});

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
        home: {
            searchData: {
                keyword: keyword,
                articles: itemsPage1,
                lastLoadedPage: 1,
                hasLoadMore: true
            }
        }
    };

    it('that newSearchForArticles dispatches correct action on fetch success', async () => {
        const expectedAction: ArticlesAction = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: itemsPage1,
                lastLoadedPage: 0,
                hasLoadMore: true
            }
        };
        const thunkAction = newSearchForArticles(keyword);
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that newSearchForArticles dispatches correct action with hasMore false when results is empty array', async () => {
        (searchArticles as jest.Mock).mockResolvedValue([]);
        const expectedAction: ArticlesAction = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: [],
                lastLoadedPage: 0,
                hasLoadMore: false
            }
        };
        const thunkAction = newSearchForArticles(keyword);
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that newSearchForArticles dispatches correct action on fetch failure', async () => {
        const expectedAction: ArticlesAction = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: '',
                articles: [],
                lastLoadedPage: 0,
                hasLoadMore: false
            }
        };
        (searchArticles as jest.Mock).mockImplementation(() => {throw new Error();});
        const thunkAction = newSearchForArticles(keyword);
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that loadMoreArticles dispatches correct action on fetch success', async () => {
        (searchArticles as jest.Mock).mockResolvedValue(itemsPage2);
        (dispatch as jest.Mock).mockReset();
        const expectedAction: ArticlesAction = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: [...itemsPage1, ...itemsPage2],
                lastLoadedPage: homePageReducer.home.searchData.lastLoadedPage + 1,
                hasLoadMore: true
            }
        };
        const thunkAction = loadMoreArticles();
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(searchArticles).toBeCalledWith(homePageReducer.home.searchData.keyword, homePageReducer.home.searchData.lastLoadedPage + 1);
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that loadMoreArticles dispatches correct action with hasMore false when results is empty array', async () => {
        (searchArticles as jest.Mock).mockResolvedValue([]);
        (dispatch as jest.Mock).mockReset();
        const expectedAction: ArticlesAction = {
            type: HomePageActionTypes.SET_SEARCH_DATA,
            payload: {
                keyword: keyword,
                articles: itemsPage1,
                lastLoadedPage: homePageReducer.home.searchData.lastLoadedPage + 1,
                hasLoadMore: false
            }
        };
        const thunkAction = loadMoreArticles();
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(searchArticles).toBeCalledWith(homePageReducer.home.searchData.keyword, homePageReducer.home.searchData.lastLoadedPage + 1);
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that loadMoreArticles dispatches correct action on fetch failure', async () => {
        (searchArticles as jest.Mock).mockImplementation(() => {throw new Error();});
        (dispatch as jest.Mock).mockReset();
        const thunkAction = loadMoreArticles();
        await thunkAction(dispatch, () => homePageReducer, {});
        expect(dispatch).not.toBeCalled();
    });
});
