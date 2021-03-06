import React from 'react';
import { shallow, configure } from 'enzyme';
import News from '../components/News';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('News component test', () => {
    it('Renders a news item without crashing', () => {
        const newsItem =
            [
                {
                    "author": "Test author", 
                    "content": "Test content", 
                    "description": "Test description",
                    "source": "Test source",
                    "title": "Test title"
                } 
            ];
        const wrapper = shallow(
            <News currentNews={ newsItem }/>
        );
        expect(wrapper.find('.news-title').text('Test title'));
        expect(wrapper.find('.news-subtitle').text('Test subtitle'));
        expect(wrapper.find('.news-description').text('Test description'));
    });
});