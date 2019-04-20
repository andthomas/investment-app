import React from 'react';
import { shallow, configure } from 'enzyme';
import Invest from '../components/Invest';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Invest component test', () => {
    it('Renders a company button without crashing', () => {
        const compItem =
            [
                {
                    "icon": "image",
                    "id": "AAPL",
                    "name": "Apple Inc."
                }
            ];
        const wrapper = shallow(
            <Invest shareList={compItem} />
        );
        expect(wrapper.find('.share-id').text('AAPL'));
        expect(wrapper.find('.share-name').text('Apple Inc.'));
    });
});