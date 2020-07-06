import React from 'react';
import { useParams } from 'react-router';
import FormRegister from '../../components/FormRegister';
import './index.styl'

const Register = () => {
    const {driverId} = useParams();

    return(
        <div id="register">
            {driverId === undefined && <h1>Cadastro de Motorista</h1>}
            {driverId !== undefined && <h1>Edição de Cadastro de Motorista</h1>}
            <FormRegister/>
        </div>
    )
};

export default Register;