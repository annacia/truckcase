import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';

import Footer from './';

test('footer renderizando', () => {
    const component = render(<Footer />);

    expect(component.getByText("made by @annacia for @truckpad")).toBeInTheDocument();

});