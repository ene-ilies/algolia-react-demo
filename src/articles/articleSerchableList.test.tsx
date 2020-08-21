import * as React from 'react';
import { shallow } from 'enzyme';
import ArticleSerchableList from './articlesSearchableList';
import { TextField } from '@material-ui/core';
import ArticleBriefCard from './articleBriefCard';
import { ArticleShortInfo } from './articleData';

describe('articleSearchableList', () => {

    const searchFn = jest.fn().mockImplementation(word => {});

    it('that articleSearchableList contains expected components', () => {
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
        ]

        const articleSearchableList = shallow(<ArticleSerchableList onSearch={searchFn} items={items} />);

        const searchInput = articleSearchableList.find(TextField);
        expect(searchInput).toHaveLength(1);

        const articleBriefs = articleSearchableList.find(ArticleBriefCard);
        expect(articleBriefs).toHaveLength(2);
        const articleBriefsKeys = articleBriefs.map(child => child.prop('shortInfo'));
        expect(articleBriefsKeys).toEqual(items);
    });

    it('that articleSearchableList contains no article when provided items array is empty', () => {
        const articleSearchableList = shallow(<ArticleSerchableList onSearch={searchFn} items={[]} />);

        const articleBriefs = articleSearchableList.find(ArticleBriefCard);
        expect(articleBriefs).toHaveLength(0);
    });

    it('that search method is called on input', () => {
        const dashboard = shallow(<ArticleSerchableList onSearch={searchFn} items={[]} />);

        const searchInput = dashboard.find(TextField);
        searchInput.simulate('change', { target: { value: 'test' } });
        expect(searchFn).toHaveBeenCalledWith('test');
    });
});