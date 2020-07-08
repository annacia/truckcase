import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import ListDriverItem from './index';

test('render de item de lista de motoristas', () => {
    const content = {
        name: "Teste",
        telephone: "(11) 3669-5687",
        born_date: "1996-05-21",
        cnh: "11111111111",
        cnh_type: "A",
        cpf: "456.876.125-45",
        active: 1
    }
    
    const component = render(
        <Router>
            <table>
                <tbody>
                    <ListDriverItem content={content}/>
                </tbody>
            </table>
        </Router>
    );

    expect(component.getByText("Nome:")).toBeInTheDocument();
    expect(component.getByText("456.876.125-45")).toBeInTheDocument();
});

