import { ArticleShortInfo } from '../../../articles/articleData';

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