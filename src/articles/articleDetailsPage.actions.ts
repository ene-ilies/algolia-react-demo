import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ArticlesAction, ArticleDetailedInfo } from './articleData';
import { ArticleDetailsPageReducer } from './actionDetailsPage.reducer';
import { getArticle } from '../infrastructure/api/articlesApi';

export const ArticleDetailsPageActionTypes = {
    SET_ARTICLE_DATA: 'SET_ARTICLE_DATA'
};

const setArticleData = (articleData?: ArticleDetailedInfo): ArticlesAction<ArticleDetailedInfo> => ({
    type: ArticleDetailsPageActionTypes.SET_ARTICLE_DATA,
    payload: articleData
});

const clearArticleData = (): ArticlesAction<ArticleDetailedInfo> => ({
    type: ArticleDetailsPageActionTypes.SET_ARTICLE_DATA
});

export const fetchArticle = (id: string): ThunkAction<void, ArticleDetailsPageReducer, {}, ArticlesAction<ArticleDetailedInfo>> => {
    return async (dispatch: ThunkDispatch<void, ArticleDetailsPageReducer, ArticlesAction<ArticleDetailedInfo>>) => {
        try {
            dispatch(clearArticleData());
            const articleData: ArticleDetailedInfo = await getArticle(id);
            dispatch(setArticleData(articleData));
        } catch (e) {
            // no changes needed on error
        }
    };
};