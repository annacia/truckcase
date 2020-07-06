import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Label,
    Input,
    CustomInput  
} from 'reactstrap';
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FirebaseService from '../../services/FirebaseService'
import ListDrivers from '../../components/ListDrivers';

import './index.styl'


const List = () => {
    const [ result, setResult ] = useState([])
    const [ driversList, setDriversList] = useState([]) 
    const [ isSubmit, setIsSubmit ] = useState(false)

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const formik = useFormik({
        initialValues: {
          name: '',
          cnh: '',
          cnh_type: '',
          cpf: ''
        }   
    });

    useEffect(() => {
        if (!isSubmit) {
            FirebaseService.getDataListWhere('drivers', 'active', 1, snp => {
                setDriversList(snp)
                setResult(snp)
            }, 1000)
        }
    }, [isSubmit])

    const onSubmit = (e) => {
        e.preventDefault()
        toggle()
        setIsSubmit(true)
        setResult(driversList)
        let resultfilter = driversList
        let length = resultfilter.length
        let name = formik.values.name
        let cnh = formik.values.cnh
        let cnhType = formik.values.cnh_type
        let cpf = formik.values.cpf

        if (length > 0) {
            if (name !== "") {
                resultfilter = resultfilter.filter((data) => {
                    return data.name === name;
                })
            }
        }
        
        
        if (length > 0) {
            if (cnh !== "") {
                resultfilter = resultfilter.filter((data) => {
                    return data.cnh === cnh;
                })
            }
        }
        
        setResult(resultfilter)
        
        if (length > 0) {
            if (cnhType !== "") {
                resultfilter = resultfilter.filter((data) => {
                    return data.cnh_type === cnhType;
                })
            }
        }
        
        setResult(resultfilter)
        
        if (length > 0) {
            if (cpf !== "") {
                resultfilter = resultfilter.filter((data) => {
                    return data.cpf === cpf;
                })
            }
        }
        setResult(resultfilter)
    }

    const onClear = (e) => {
        e.preventDefault()
        toggle()
        formik.values.name = '' 
        formik.values.cnh = '' 
        formik.values.cnh_type = '' 
        formik.values.cpf = '' 

        setIsSubmit(false)
        setResult(driversList)
    }
    
    return(
        <div id="list">
            <Modal isOpen={modal} toggle={toggle} className="modal-filter">
                <ModalHeader toggle={toggle}>Filtrar</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Nome:</Label>
                        <Input
                            maxLength="250"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name} 
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cpf">CPF:</Label>
                        <Input
                            id="cpf"
                            name="cpf"
                            mask="999.999.999-99"
                            maskChar=" "
                            tag={InputMask}
                            onChange={formik.handleChange}
                            value={formik.values.cpf} 
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cnh">CNH:</Label>
                        <Input
                            id="cnh"
                            name="cnh"
                            mask="99999999999"
                            maskChar=" "
                            tag={InputMask}
                            onChange={formik.handleChange}
                            value={formik.values.cnh} 
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cnh">Tipo de CNH:</Label>
                        <CustomInput 
                            type="select" 
                            id="cnh_type" 
                            name="chn_type" 
                            defaultValue={formik.values.cnh_type}
                            onChange={event => {
                                formik.values.cnh_type = event.target.value
                            }}
                        >
                            <option value="">Selecione</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                        </CustomInput>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-filter" onClick={onSubmit}>Filtrar</Button>{' '}
                    <Button className="btn-clear" onClick={onClear}>Limpar</Button>
                </ModalFooter>
            </Modal>
            <h1>Listagem de Motoristas</h1>
            <div id="filter">
                <Button onClick={toggle}><FontAwesomeIcon icon={faFilter} title="Filtrar"/></Button>
                <span>Filtrar</span>
            </div>
            {result && <ListDrivers drivers={result}/>}
        </div>
    )
};

export default List;