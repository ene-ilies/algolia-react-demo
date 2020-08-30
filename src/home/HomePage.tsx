import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, connect} from 'react-redux';
import { newSearchForArticles, loadMoreArticles } from './homepage.actions';
import ArticleSerchableList from '../articles/articlesSearchableList';
import { Grid } from '@material-ui/core';
import { SearchData, HomePageReducer } from './homepage.reducer';

interface Props {
    searchData: SearchData
};

const HomePage = (props: Props) => {
    const dispatch = useDispatch();
    const executeSearch = (keyword: string) => {
        dispatch(newSearchForArticles(keyword));
    };
    const loadMore = () => {
        dispatch(loadMoreArticles());
    };
    useEffect(() => {
        dispatch(newSearchForArticles(''));
    }, []);
    return (
        <Grid>
            <ArticleSerchableList onSearch={executeSearch} onLoadMore={loadMore} items={props.searchData.articles} hasLoadMore={props.searchData.hasLoadMore} />
        </Grid>
    );
};

const mapStateToProps = (state: HomePageReducer) => ({
    searchData: state.home.searchData
});

export default connect(mapStateToProps)(HomePage);
