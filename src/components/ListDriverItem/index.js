import React, {useState} from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import FirebaseService from '../../services/FirebaseService'

import { faEye, faEyeSlash, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './index.styl'

const ListDriverItem = (props) => {
    const { content } = props
    const [ collapse, setCollapse ] = useState(false)

    const toggleView = () => {
        setCollapse(!collapse)
    }

    const inactiveItem = () => {
        content.active = false
        FirebaseService.editData('drivers', content.key, content)
        .then(() => {
            console.log("deu tudo certo")
        })
        .catch(() => {
            console.log("deu tudo errado")
        })
    }


    return (
        <>
        <tr>
            <th scope="row" colSpan="1">{content.key}</th>
            <td>{content.name}</td>
            <td>
                <button className="icon" onClick={toggleView}>
                    {collapse === false && <FontAwesomeIcon title="Visualizar" icon={faEye} />}
                    {collapse === true && <FontAwesomeIcon title="Fechar Visualização" icon={faEyeSlash} />}

                </button>
                <Link className="icon" to={"/register/"+content.key}><FontAwesomeIcon title="Editar" icon={faEdit} /></Link>
                <button className="icon" onClick={inactiveItem}><FontAwesomeIcon title="Desativar" icon={faTrashAlt} /></button>
            </td>
        </tr>
        <tr>
            <td colSpan="3">
                <Collapse isOpen={collapse} className="driver-view">
                    <p className="title-driver"><span className="title">Nome:</span>{content.name}</p>
                    <p className="att-driver"><span className="title">CPF:</span> {content.cpf}</p>
                    <p className="att-driver"><span className="title">CNH:</span> {content.cnh}</p>
                    <p className="att-driver"><span className="title">Tipo de CNH:</span> {content.cnh_type}</p>
                    <p className="att-driver"><span className="title">Data de Nascimento:</span> {content.born_date}</p>
                    <p className="att-driver"><span className="title">Telefone:</span> {content.telephone}</p>

                </Collapse>
            </td>
        </tr>
        </>
    );
}

export default ListDriverItem