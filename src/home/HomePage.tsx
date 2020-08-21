import { useEffect } from 'react';
import { useDispatch, connect} from 'react-redux';
import { fetchArticlesPage } from './homepage.actions';
import { ArticleShortInfo } from '../articles/articleData';
import * as React from 'react';
import ArticleSerchableList from '../articles/articlesSearchableList';
import { Grid } from '@material-ui/core';

interface Props {
    items: ArticleShortInfo[]
};

const HomePage = (props: Props) => {
    const dispatch = useDispatch();
    const executeSearch = (keyword: string) => {
        dispatch(fetchArticlesPage(keyword, 0));
    };
    useEffect(() => {
        dispatch(fetchArticlesPage('', 0));
    }, []);
    return (
        <Grid>
            <ArticleSerchableList onSearch={executeSearch} items={props.items} />
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    items: state.home.articles
});

export default connect(mapStateToProps)(HomePage);
