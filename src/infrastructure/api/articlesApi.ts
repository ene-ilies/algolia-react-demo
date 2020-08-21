import { ArticleShortInfo } from '../../articles/articleData';

interface Hit {
    objectID: string,
    title: string,
    author: string,
    num_comments: number
}

interface AlgoliaData {
    hits: Hit[]
}

export const searchArticles = async (keyword: string, page: number): Promise<ArticleShortInfo[]> => {
    try {
        const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${keyword}&page=${page}`);
        const data: AlgoliaData = await response.json();
        return data.hits.map(h => ({
            id: h.objectID,
            title: h.title,
            author: h.author,
            noOfComments: h.num_comments
        }));
    } catch (e) {
        throw new Error('Unabe to search for articles');
    }    
};
