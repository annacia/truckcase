import React from 'react';
import {Alert} from 'reactstrap';

const GenerateAlert = (props) => {
    const { submitResult, isValid } = props

    if (submitResult === false) {
        return (<></>)
    }

    if (isValid === false) {
        return (
        <>
        {submitResult === true &&
            <Alert color="danger">
            Dados inválidos.
            </Alert>
        }
        </>
        )
    }

    return (
        <>
        {submitResult === true &&
        <Alert color="success">
            Dados salvos com sucesso.
        </Alert>
        }
        </>
    )
}

export default GenerateAlert;