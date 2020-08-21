import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, TextField, Link, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ArticleShortInfo } from './articleData';

interface Props {
    shortInfo: ArticleShortInfo
};

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        flexGrow: 1
    },
    title: {
        fontSize: 14
    },
    content: {
        paddingLeft: 12
    }
});

const ArticleBriefCard = (props: Props) => {
    const { shortInfo } = props;
    const classes = useStyles();
    const noOfComments = () => (<Grid container className={classes.content} ><Grid item xs={2} >#of comments</Grid><Grid item xs={2}>{shortInfo.noOfComments}</Grid></Grid>);
    return (
        <Card className={classes.root} >
            <CardHeader title={shortInfo.title} subheader={shortInfo.author} />
            <CardContent component={noOfComments} />
            <CardActions>
                <Link component={RouterLink} to={`/article/${shortInfo.id}`}>More</Link>
            </CardActions>
        </Card>
    )
};

export default ArticleBriefCard;