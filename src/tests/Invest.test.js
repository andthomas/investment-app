import React from 'react';
import { shallow, configure } from 'enzyme';
import { Invest } from '../components/Invest';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Invest /> component test', () => {
    let wrapper;
    beforeEach(() => {
        const shares =
            [
                {
                    "id": "AAPL",
                    "name": "Apple Inc.",
                    "icon": "apple-logo_amrzzo.png"
                },
                {
                    "id": "BIDU",
                    "name": "Baidu Inc",
                    "icon": "baidu.png"
                },
            ];
        const selectedShare =
            [
                {
                    "id": "AAPL",
                    "name": "Apple Inc.",
                    "icon": "apple-logo_amrzzo.png"
                },
            ];
        wrapper = shallow(
            <Invest shareList={shares} selectedShares={selectedShare} />
        );
    })

    describe('<Invest /> rendering', () => {
        it('renders correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('Renders a company button with text and logo without crashing', () => {
            const aapl = wrapper.findWhere(node => node.key() === 'AAPL')
            expect(aapl.find('.share-name').text('Apple Inc.'));
            expect(aapl.find('.share-id').text('AAPL'));
            expect(aapl.find('.company-logo').prop('src')).toEqual('https://res.cloudinary.com/djq5ic5br/image/upload/c_scale,h_120/apple-logo_amrzzo.png');
        });
    });
    
    describe('<Invest /> interactions', () => {
        it('Filters the company list correctly', () => {
            const query = 'Baidu';
            wrapper.find('#searchbar').simulate('change', {target: {value: query}});
            expect(wrapper.state('visibleShares')).toHaveLength(1);
            expect(wrapper.state('visibleShares')[0].id).toEqual('BIDU');
        })
    })
});