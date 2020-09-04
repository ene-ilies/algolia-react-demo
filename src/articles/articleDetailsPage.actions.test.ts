import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ArticleDetailsPageActionTypes, fetchArticle } from './articleDetailsPage.actions';
import { ArticleDetailedInfo, ArticlesAction } from './articleData';
import { ArticleDetailsPageReducer } from './actionDetailsPage.reducer';
import { getArticle } from '../infrastructure/api/articlesApi';

jest.mock('../infrastructure/api/articlesApi');

describe('articleDetailsPage.actions', () => {
    const dispatch: ThunkDispatch<{}, {}, ArticlesAction<ArticleDetailedInfo>> = jest.fn().mockImplementation(() => {});

    const id = '1';
    const articleDetailsPageReducer: ArticleDetailsPageReducer = {
        articlePage: {}
    };

    it('that fetchArticle dispatches correct action on fetch success', async () => {
        const expectedAction: ArticlesAction<ArticleDetailedInfo> = {
            type: ArticleDetailsPageActionTypes.SET_ARTICLE_DATA,
            payload: {
                id: id,
                createdAt: new Date(1520999430 * 1000),
                title: 'title',
                author: 'author',
                url: 'https://www.bbc.com/news/uk-43396008',
                text: 'content'
            }
        };
        const thunkAction: ThunkAction<void, ArticleDetailsPageReducer, {}, ArticlesAction<ArticleDetailedInfo>> = fetchArticle(id);
        await thunkAction(dispatch, () => articleDetailsPageReducer, {});
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('that fetchArticle dispatches no action on fetch failure', async () => {
        (dispatch as jest.Mock).mockReset();
        (getArticle as jest.Mock).mockRejectedValue('API is down.');
        const thunkAction: ThunkAction<void, ArticleDetailsPageReducer, {}, ArticlesAction<ArticleDetailedInfo>> = fetchArticle(id);
        await thunkAction(dispatch, () => articleDetailsPageReducer, {});
        expect(dispatch).not.toBeCalled();
    });
});
