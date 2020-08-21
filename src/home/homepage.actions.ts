import { Dispatch } from "react";
import { Action, AnyAction } from "redux";
import { ArticleShortInfo } from "../articles/articleData";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { searchArticles } from "../infrastructure/api/articlesApi";

export const HomePageActionTypes = {
    SET_ARTICLES_PAGE: 'SET_ARTICLES_PAGE'
}

export interface ArticlesAction extends Action<string> {
    payload: ArticleShortInfo | ArticleShortInfo[]
}

const setArticlesPage = (items: ArticleShortInfo[]): ArticlesAction => ({
    type: HomePageActionTypes.SET_ARTICLES_PAGE,
    payload: items
});

export const fetchArticlesPage = (word: string, page: number): ThunkAction<void, {}, {}, ArticlesAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, ArticlesAction>) => {
        try {
            const items = await searchArticles(word, page);
            dispatch(setArticlesPage(items));
        } catch (e) {
            dispatch(setArticlesPage([]));
        }
    };
}; 