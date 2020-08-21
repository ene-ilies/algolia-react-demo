import { ThunkDispatch } from 'redux-thunk';
import { ArticlesAction, HomePageActionTypes, fetchArticlesPage } from './homepage.actions';
import { ArticleShortInfo } from '../articles/articleData';
import { searchArticles } from '../infrastructure/api/articlesApi';

jest.mock('../infrastructure/api/articlesApi');

describe('homepage.actions', () => {
    const dispatch: ThunkDispatch<{}, {}, ArticlesAction> = jest.fn().mockImplementation(() => {});
    const items: ArticleShortInfo[] = [
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

    it('that fetchArticlesPage dispatches correct action on fetch success', async () => {
        const expectedAction = {
            type: HomePageActionTypes.SET_ARTICLES_PAGE,
            payload: items
        };
        const thunkAction = fetchArticlesPage('test', 0);
        await thunkAction(dispatch, () => ({}), {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that fetchArticlesPage dispatches correct action on fetch failure', async () => {
        const expectedAction = {
            type: HomePageActionTypes.SET_ARTICLES_PAGE,
            payload: []
        };
        (searchArticles as jest.Mock).mockImplementation(() => {throw new Error();});
        const thunkAction = fetchArticlesPage('test', 0);
        await thunkAction(dispatch, () => ({}), {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });
});