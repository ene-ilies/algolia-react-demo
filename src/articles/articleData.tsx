import { Action } from "redux";

export interface ArticleShortInfo {
    id: string,
    title: string,
    author: string,
    noOfComments: number
};

export interface ArticleDetailedInfo {
    id: string,
    createdAt: Date
    title: string,
    author: string,
    url: string,
    text: string
};

export interface ArticlesAction<T> extends Action<string> {
    payload?: T
}
