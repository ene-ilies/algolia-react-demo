import * as React from 'react';
import { ArticleDetailedInfo } from './articleData';
import { Grid, makeStyles, Paper, Link } from '@material-ui/core';

interface Props {
    article: ArticleDetailedInfo
}

const useStyles = makeStyles({
    root: {
        paddingTop: 12,
        minWidth: 300,
        flexGrow: 1
    },
    title: {
        fontSize: 24
    },
    content: {
        minHeight: 100
    }
});

const ArticleDetails = (props: Props) => {
    const classes = useStyles();
    const { article } = props;
    return (
        <Grid container key={article.id} justify="center" className={classes.root} >
            <Grid item xs={9}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.title}>
                        <span>{article.title}</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span>Created by: {article.author}</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span>On: {article.createdAt.toLocaleDateString()}</span>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <span>Source: </span>
                            <Link href={article.url} target="_blank" rel="noreferrer">
                                {article.url}
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper variant="outlined" className={classes.content}>{article.text || "Content missing."}</Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ArticleDetails;
