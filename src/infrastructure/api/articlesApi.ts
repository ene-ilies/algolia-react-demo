import { ArticleShortInfo, ArticleDetailedInfo } from '../../articles/articleData';

interface Hit {
    objectID: string,
    title: string,
    author: string,
    num_comments: number
}

interface AlgoliaSearchData {
    hits: Hit[]
}

interface AlgoliaItemData {
    id: number,
    created_at_i: number
    title: string,
    author: string,
    url: string,
    text: string
}

export const searchArticles = async (keyword: string, page: number): Promise<ArticleShortInfo[]> => {
    try {
        const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${keyword}&page=${page}`);
        const data: AlgoliaSearchData = await response.json();
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

export const getArticle = async (id: string): Promise<ArticleDetailedInfo> => {
    try {
        const response = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
        const data: AlgoliaItemData = await response.json();
        return {
            id: String(data.id),
            createdAt: new Date(data.created_at_i * 1000),
            title: data.title,
            author: data.author,
            url: data.url,
            text: data.text
        };
    } catch (e) {
        throw new Error('Unabe to search for articles');
    }    
};
