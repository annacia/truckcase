import React from 'react';
import { render } from '@testing-library/react';

import App from '../../App'
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './index';

test('header renderizando', () => {
    const component = render(
        <Router>
            <App>
                <Header/>
            </App>
        </Router>
    );

    expect(component.getByText("Motoristas Brasileiros")).toBeInTheDocument();
    expect(component.getByText("Cadastrar Motorista")).toBeInTheDocument();
    expect(component.getByText("Listagem de Motoristas")).toBeInTheDocument();

});