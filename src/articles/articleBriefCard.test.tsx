import * as React from 'react';
import { shallow } from 'enzyme';
import ArticleBriefCard from './articleBriefCard';
import { Link, CardHeader, CardContent } from '@material-ui/core';
import { ArticleShortInfo } from './articleData';

describe('ArticleBriefCard', () => {
    test('that the card is displaying properties as expected', () => {
        const shortInfo: ArticleShortInfo = {
            id: "1",
            title: "test title",
            author: "test author",
            noOfComments: 5
        }
        const card = shallow(<ArticleBriefCard shortInfo={shortInfo} />);

        const cardHeader = card.find(CardHeader);
        expect(cardHeader.prop('title')).toEqual(shortInfo.title);
        expect(cardHeader.prop('subheader')).toEqual(shortInfo.author);

        const moreLink = card.find(Link);
        expect(moreLink.prop('to')).toEqual(`/article/${shortInfo.id}`);
    });
});
