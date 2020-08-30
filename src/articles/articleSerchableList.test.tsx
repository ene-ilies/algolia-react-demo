import * as React from 'react';
import { shallow } from 'enzyme';
import ArticleSerchableList from './articlesSearchableList';
import { TextField, Button } from '@material-ui/core';
import ArticleBriefCard from './articleBriefCard';
import { ArticleShortInfo } from './articleData';

describe('articleSearchableList', () => {

    const searchFn = jest.fn().mockImplementation(word => {});
    const moreFn = jest.fn().mockImplementation(() => {});

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

        const articleSearchableList = shallow(<ArticleSerchableList onSearch={searchFn} onLoadMore={moreFn} items={items} hasLoadMore={true} />);

        const searchInput = articleSearchableList.find(TextField);
        expect(searchInput).toHaveLength(1);

        const articleBriefs = articleSearchableList.find(ArticleBriefCard);
        expect(articleBriefs).toHaveLength(2);
        const articleBriefsKeys = articleBriefs.map(child => child.prop('shortInfo'));
        expect(articleBriefsKeys).toEqual(items);

        const moreButton = articleSearchableList.find(Button);
        expect(moreButton).toHaveLength(1);
    });

    it('that articleSearchableList contains no article when provided items array is empty', () => {
        const articleSearchableList = shallow(<ArticleSerchableList onSearch={searchFn} onLoadMore={moreFn} items={[]} hasLoadMore={true} />);

        const articleBriefs = articleSearchableList.find(ArticleBriefCard);
        expect(articleBriefs).toHaveLength(0);
    });

    it('that search method is called on input', () => {
        const dashboard = shallow(<ArticleSerchableList onSearch={searchFn} onLoadMore={moreFn} items={[]} hasLoadMore={true} />);

        const searchInput = dashboard.find(TextField);
        searchInput.simulate('change', { target: { value: 'test' } });
        expect(searchFn).toHaveBeenCalledWith('test');
    });

    it('that more method is called on more button click', () => {
        const dashboard = shallow(<ArticleSerchableList onSearch={searchFn} onLoadMore={moreFn} items={[]} hasLoadMore={true}/>);

        const moreButton = dashboard.find(Button);
        moreButton.simulate('click');
        expect(moreFn).toHaveBeenCalled();
    });

    it('that more button is not displayed when showMore is false', () => {
        const dashboard = shallow(<ArticleSerchableList onSearch={searchFn} onLoadMore={moreFn} items={[]} hasLoadMore={false}/>);

        const moreButton = dashboard.find(Button);
        expect(moreButton).toHaveLength(0);
    });
});