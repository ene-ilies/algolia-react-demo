import { ArticleDetailedInfo, ArticlesAction } from './articleData';
import { ArticleDetailsPageActionTypes } from './articleDetailsPage.actions';

export interface ArticleDetailsPageReducer {
    articlePage: ArticleDetailsPageState
}

export interface ArticleDetailsPageState {
    article?: ArticleDetailedInfo
}

const INITIAL_STATE: ArticleDetailsPageState = {
};

export const ArticleDetailsPageReducer = (state: ArticleDetailsPageState = INITIAL_STATE, action: ArticlesAction<ArticleDetailedInfo>) => {
    switch (action.type) {
        case ArticleDetailsPageActionTypes.SET_ARTICLE_DATA:
            return {
                ...state,
                article: action.payload
            }
        default:   
            return state;
    }
};