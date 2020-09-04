import { ArticleDetailedInfo, ArticlesAction } from './articleData';
import { useDispatch, connect } from 'react-redux';
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { ArticleDetailsPageReducer } from './actionDetailsPage.reducer';
import { fetchArticle } from './articleDetailsPage.actions';
import * as React from 'react';

interface Props {
    id: string,
    article?: ArticleDetailedInfo
}

const ArticleDetailsPage = (props: Props) => {
    const dispatch: ThunkDispatch<ArticleDetailsPageReducer, {}, ArticlesAction<ArticleDetailedInfo>> = useDispatch();
    useEffect(() => {
        dispatch(fetchArticle(props.id));
    });
    return (<div>Details page for id: {props.id}</div>);
};

const mapStateToProps = (state: ArticleDetailsPageReducer) => ({
    article: state.articlePage.article
});

export default connect(mapStateToProps)(ArticleDetailsPage);
