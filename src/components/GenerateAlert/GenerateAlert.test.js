import React from 'react';
import { render } from '@testing-library/react';

import GenerateAlert from './index';

test('alerta de sucesso quando houve submit e os dados sao validos', () => {
    const component = render(
                <GenerateAlert submitResult={true} isValid={true}/>
    );

    expect(component.getByText("Dados salvos com sucesso.")).toBeInTheDocument();
});

test('alerta de fracasso quando houve submit e os dados sao invalidos', () => {
    const component = render(
                <GenerateAlert submitResult={true} isValid={false}/>
    );

    expect(component.getByText("Dados inválidos.")).toBeInTheDocument();
    
});

test('alerta vazio quando nao houve submit e os dados sao validos', () => {
    const component = render(
                <GenerateAlert submitResult={false} isValid={true}/>
    );

    expect(component.debug()).toBeUndefined()
});

test('alerta vazio quando nao houve submit e os dados nao sao validos', () => {
    const component = render(
                <GenerateAlert submitResult={false} isValid={false}/>
    );

    expect(component.debug()).toBeUndefined()
});

