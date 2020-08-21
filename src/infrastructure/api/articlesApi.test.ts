import { searchArticles } from './articlesApi';
import { ArticleShortInfo } from '../../articles/articleData';
import fetchMock from 'jest-fetch-mock';

describe('articlesApi', () => {

    const algoliaResponse = {
        hits: [{
            objectID: "1",
            title: "title1",
            author: "author1",
            num_comments: 5
        }, 
        {
            objectID: "2",
            title: "title2",
            author: "author2",
            num_comments: 10
        }]
    };

    beforeEach(() => {
        fetchMock.mockClear();
    });

    it('that expected url is called and response is correctly returned', async () => {
        const expectedItems: ArticleShortInfo[] = [
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
        const keyword: string = 'test';
        const page: number = 0;
        fetchMock.mockResponse(JSON.stringify(algoliaResponse));
        const items: ArticleShortInfo[] = await searchArticles(keyword, page);
        expect(items).toEqual(expectedItems);
        expect(fetchMock).toHaveBeenCalledWith(`https://hn.algolia.com/api/v1/search?query=${keyword}&page=${page}`);
    });

    it('that error is thrown when unable to call api', async () => {
        fetchMock.mockRejectOnce(() => Promise.reject("API is down"));
        
        expect(() => {throw new Error('error')}).toThrow();

        await expect(searchArticles('test', 0)).rejects.toThrow();
    });
});
