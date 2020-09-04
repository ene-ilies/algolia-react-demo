import { searchArticles, getArticle } from './articlesApi';
import { ArticleShortInfo, ArticleDetailedInfo } from '../../articles/articleData';
import fetchMock from 'jest-fetch-mock';

describe('articlesApi', () => {

    const algoliaSearchResponse = {
        hits: [{
            objectID: '1',
            title: 'title1',
            author: 'author1',
            num_comments: 5
        },
        {
            objectID: '2',
            title: 'title2',
            author: 'author2',
            num_comments: 10
        }]
    };

    const algoliaItemResponse = {
        id: 1,
        created_at_i: 1520999430,
        title: 'title',
        author: 'author',
        url: 'https://www.bbc.com/news/uk-43396008',
        text: 'content'
    };

    beforeEach(() => {
        fetchMock.mockClear();
    });

    it('that searchArticles calls expected url and response is correctly returned', async () => {
        const expectedItems: ArticleShortInfo[] = [
            {
                id: '1',
                title: 'title1',
                author: 'author1',
                noOfComments: 5
            },
            {
                id: '2',
                title: 'title2',
                author: 'author2',
                noOfComments: 10
            }
        ];
        const keyword: string = 'test';
        const page: number = 0;
        fetchMock.mockResponse(JSON.stringify(algoliaSearchResponse));
        const items: ArticleShortInfo[] = await searchArticles(keyword, page);
        expect(items).toEqual(expectedItems);
        expect(fetchMock).toHaveBeenCalledWith(`https://hn.algolia.com/api/v1/search?query=${keyword}&page=${page}`);
    });

    it('that searchArticles throws error when unable to call api', async () => {
        fetchMock.mockRejectOnce(() => Promise.reject('API is down'));

        await expect(searchArticles('test', 0)).rejects.toThrow();
    });

    it('that getArticle calls expected url and response is correctly returned', async () => {
        const expectedItem: ArticleDetailedInfo = {
            id: '1',
            createdAt: new Date(1520999430 * 1000),
            title: 'title',
            author: 'author',
            url: 'https://www.bbc.com/news/uk-43396008',
            text: 'content'
        };
        fetchMock.mockResponse(JSON.stringify(algoliaItemResponse));
        const item: ArticleDetailedInfo = await getArticle(expectedItem.id);
        expect(item).toEqual(expectedItem);
        expect(fetchMock).toHaveBeenCalledWith(`https://hn.algolia.com/api/v1/items/${expectedItem.id}`);
    });

    it('that getArticle throws error when unable to call api', async () => {
        fetchMock.mockRejectOnce(() => Promise.reject('API is down'));

        await expect(getArticle('1')).rejects.toThrow();
    });
});
