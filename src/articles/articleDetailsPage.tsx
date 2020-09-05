import { ArticleDetailedInfo, ArticlesAction } from './articleData';
import { useDispatch, connect } from 'react-redux';
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { ArticleDetailsPageReducer } from './actionDetailsPage.reducer';
import { fetchArticle } from './articleDetailsPage.actions';
import * as React from 'react';
import ArticleDetails from './articleDetails';
import { Grid } from '@material-ui/core';

interface Props {
    id: string,
    article?: ArticleDetailedInfo
}

const ArticleDetailsPage = (props: Props) => {
    const dispatch: ThunkDispatch<ArticleDetailsPageReducer, {}, ArticlesAction<ArticleDetailedInfo>> = useDispatch();
    useEffect(() => {
        dispatch(fetchArticle(props.id));
    }, []);
    let content = <div>Loading article...</div>;
    if (props.article) {
        content = <Grid>
                <ArticleDetails article={props.article}/>
            </Grid>;
    }
    return content;
};

const mapStateToProps = (state: ArticleDetailsPageReducer) => ({
    article: state.articlePage.article
});

export default connect(mapStateToProps)(ArticleDetailsPage);
