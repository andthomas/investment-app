import React from 'react';
import { shallow, configure } from 'enzyme';
import News from './News';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('First React component test with Enzyme', () => {
    it('renders without crashing', () => {
        const newsItems =
            [
                {
                    "author": "Test Author", 
                    "content": "Test", 
                    "description": "Test",
                    "source": "Test",
                    "title": "Test"
                } 
            ];
        const wrapper = shallow(
            <News currentNews={ newsItems }/>
        );
    });
});