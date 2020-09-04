import { ArticleShortInfo, ArticleDetailedInfo } from '../../../articles/articleData';

const items: ArticleShortInfo[] = [
    {
        id: "1",
        title: "title1",
        author: "author1",
        noOfComments: 5
    },
    {
        id: "2",
        title: "title2",
        author: "author2",
        noOfComments: 10
    }
];

export const searchArticles = jest.fn().mockReturnValue(items);

export const getArticle = jest.fn().mockImplementation(id => ({
    id: id,
    createdAt: new Date(1520999430 * 1000),
    title: 'title',
    author: 'author',
    url: 'https://www.bbc.com/news/uk-43396008',
    text: 'content'
}));