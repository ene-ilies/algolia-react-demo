import { ArticleShortInfo } from './articleData';
import * as React from 'react';
import { Grid, TextField, GridList, GridListTile, makeStyles, Paper } from '@material-ui/core';
import ArticleBriefCard from './articleBriefCard';

interface Props {
    onSearch: (word: string) => void,
    items: ArticleShortInfo[]
}

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    }
  }
);

const ArticleSerchableList = (props: Props) => {
    const { items } = props;
    const classes = useStyles();
    const searchChangeCallback = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearch(event.target.value);
    }
    return (
        <Grid className={classes.root} container spacing={3} justify="center">
            <Grid item lg={9}>
                <TextField placeholder="Search..." onChange={searchChangeCallback} fullWidth />
            </Grid>
            <Grid item lg={9}>
                <Grid container spacing={3}>
                    {items && items.map((articleData) => (
                        <Grid item key={articleData.id} xs={12}>
                            <ArticleBriefCard key={articleData.id} shortInfo={articleData} />
                        </Grid>
                        )
                    )}                    
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ArticleSerchableList;
