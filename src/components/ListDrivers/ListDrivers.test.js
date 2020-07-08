import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { fireEvent, waitFor } from "@testing-library/react";
import * as Media from 'react-media';

import App from '../../App'
import { BrowserRouter as Router } from 'react-router-dom';

import ListDrivers from './index';

test('exibicao de alerta de dados vazios quando nenhum motorista é encontrado e os dados ja foram carregados completamente(loading = true)', () => {
    
    const component = render(
        <ListDrivers drivers={[]} loading={false}/>
    );

    expect(component.getByText("Não foi encontrado nenhum motorista.")).toBeInTheDocument();
});

test('exibicao vazia quando nenhum motorista é encontrado e os dados nao foram carregados(loading = false) completamente', () => {
    
    const component = render(
        <ListDrivers drivers={[]} loading={true}/>
    );

    expect(component.debug()).toBeUndefined()

});

test('exibicao vazia quando os motoristas são encontrados e os dados nao foram carregados(loading = true) completamente', () => {
    
    const component = render(
        <ListDrivers drivers={[
            {
                name: "Teste",
                telephone: "(11) 3669-5687",
                born_date: "1996-05-21",
                cnh: "45687612545",
                cnh_type: "A",
                cpf: "11111111111",
                active: "true"
            },
            {
                name: "Teste",
                telephone: "(11) 3669-5687",
                born_date: "1996-05-21",
                cnh: "45687612545",
                cnh_type: "A",
                cpf: "11111111111",
                active: "true"
            }
        ]} loading={true}/>
    );

    expect(component.debug()).toBeUndefined()
});

test('exibicao de lista quando os motoristas são encontrados e os dados foram carregados(loading = false) completamente', () => {
    
    const component = render(
        <Router>
            <ListDrivers drivers={[
                {
                    name: "Teste1",
                    telephone: "(11) 3669-5687",
                    born_date: "1996-05-21",
                    cnh: "45687612545",
                    cnh_type: "A",
                    cpf: "11111111111",
                    active: "true"
                },
                {
                    name: "Teste2",
                    telephone: "(11) 3669-5687",
                    born_date: "1996-05-22",
                    cnh: "45687612545",
                    cnh_type: "A",
                    cpf: "11111111111",
                    active: "true"
                }
            ]} loading={false}/>
        </Router>
    );

    expect(component.getByText("1996-05-22")).toBeInTheDocument();
});
