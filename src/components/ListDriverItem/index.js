import React, {useState} from 'react';
import { Collapse, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import FirebaseService from '../../services/FirebaseService'

import { faEye, faEyeSlash, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './index.styl'

const ListDriverItem = (props) => {
    const { content } = props
    const [ collapse, setCollapse ] = useState(false)

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const toggleView = () => {
        setCollapse(!collapse)
    }

    const inactiveItem = () => {
        content.active = 0
        FirebaseService.editData('drivers', content.key, content)
        .then(() => {
            toggleModal()
        })
    }


    return (
        <>
        <tr>
            <td>{content.name}</td>
            <td>
                <button className="icon" onClick={toggleView}>
                    {collapse === false && <FontAwesomeIcon title="Visualizar" icon={faEye} />}
                    {collapse === true && <FontAwesomeIcon title="Fechar Visualização" icon={faEyeSlash} />}

                </button>
                <Link className="icon" to={"/register/"+content.key}><FontAwesomeIcon title="Editar" icon={faEdit} /></Link>
                <button className="icon" onClick={toggleModal}><FontAwesomeIcon title="Desativar" icon={faTrashAlt} /></button>
            </td>
        </tr>
        <tr>
            <td colSpan="2">
                <Modal isOpen={modal} toggle={toggleModal} className="modal-inactive">
                    <ModalHeader toggle={toggleModal}>Inativar Registro</ModalHeader>
                    <ModalBody>
                        Tem certeza que deseja inativar o registro?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={inactiveItem} className="btn-inactive">Sim</Button>{' '}
                        <Button onClick={toggleModal} className="btn-cancel">Cancelar</Button>
                    </ModalFooter>
                </Modal>
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