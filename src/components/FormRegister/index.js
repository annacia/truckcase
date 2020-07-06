import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from "yup";
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Row, 
  Col, 
  CustomInput,
  Alert,
  Spinner 
} from 'reactstrap';

import GenerateAlert from '../GenerateAlert';
import FirebaseService from '../../services/FirebaseService';
import './index.styl'

var majorDate = new Date();
majorDate.setFullYear( majorDate.getFullYear() - 18 );

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .min(5, 'Por favor digite o nome completo')
  .max(250, 'máximo 250 caracteres')
  .required('Obrigatório'),
  telephone: Yup.string()
  .min(10, 'mínimo 10 caracteres')
  .required('Obrigatório'),
  born_date: Yup.date()
  .max(majorDate, 'O motorista deve ser maior de 18 anos')
  .required('Obrigatório'),
  cnh: Yup.string()
  .min(11, 'mínimo 11 caracteres')
  .required('Obrigatório'),
  cnh_type: Yup.string()
  .min(1, 'mínimo 1 caracter')
  .required('Obrigatório'),
  cpf: Yup.string()
  .min(11, 'mínimo 11 caracteres')
  .required('Obrigatório')
});

const FormRegister = (props) => {

  const [ submit, setSubmit ] = useState(false)
  const [ isValid, setIsValid ] = useState(false)
  const [ validDriver, setValidDriver ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  
  const {driverId} = useParams();

  const formik = useFormik({
    initialValues: {
      name: '',
      telephone: '',
      born_date: '',
      cnh: '',
      cnh_type: '',
      cpf: ''
    },
    validationSchema
  });

  useEffect(() => {
    if (driverId !== undefined && validDriver === false) {
      setLoading(true)
      FirebaseService.getUniqueDataBy('drivers', driverId, driver => {
        if (driver !== null) {
          if (Object.values(driver).length > 0) {
            formik.values.name = driver.name
            formik.values.telephone = driver.telephone
            formik.values.born_date = driver.born_date
            formik.values.cnh = driver.cnh
            formik.values.cnh_type = driver.cnh_type
            formik.values.cpf = driver.cpf
            setValidDriver(true)
          }
        }
        setLoading(false)
      });
    }
  }, [driverId, validDriver, formik]);


  const DisplayErrors = (props) => {
    const { msgError } = props
    return(
      <>
      {msgError && <span className="validate-error">
        {msgError}
      </span>}
      </>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmit(true)
    
    if (formik.values.cnh_type !== "") {
      delete formik.errors.cnh_type 
    }

    let errors = formik.errors
    let values = formik.values

    if (Object.keys(errors).length > 0 || values.name === "" ) {
      setIsValid(false)
      setLoading(false)
      return;
    }

    const name = values.name
    const cpf = values.cpf
    const born_date = values.born_date
    const telephone = values.telephone
    const cnh = values.cnh
    const cnh_type = values.cnh_type
    const active = 1

    let object = {
      name,
      cpf,
      born_date,
      telephone,
      cnh,
      cnh_type,
      active
    }


    if (driverId !== undefined) {
      FirebaseService.editData('drivers', driverId, object)
      .then(() => {
        setIsValid(true)
        setLoading(false)
      })
      return;
    } 

    let id = FirebaseService.pushData('drivers', object)

    if (id !== undefined) {
      setIsValid(true)
      setLoading(false)
    }
  }

  if (!validDriver && driverId !== undefined) {
    return (
      <Alert className="not-found" color="secondary">
        Não foi encontrado nenhum motorista.
      </Alert>
    );
  }

  return (
    <>
    {loading &&
      <div className="loading">
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div> 
    }
    <Form onSubmit={onSubmit} id="form-register">
      <GenerateAlert submitResult={submit} isValid={isValid}/>
      <FormGroup>
        <Label for="name">Nome*:</Label>
        <Input
          maxLength="250"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name} 
          type="text"
          placeholder="Digite o nome do motorista..." 
        />
        {formik.errors && <DisplayErrors msgError={formik.errors.name}/>}
      </FormGroup>
      <FormGroup>
        <Label for="cpf">CPF*:</Label>
        <Input
          mask="999.999.999-99"
          maskChar=" "
          tag={InputMask}
          id="cpf"
          name="cpf"
          onChange={formik.handleChange}
          value={formik.values.cpf} 
          type="text"
          placeholder="Digite o CPF do motorista..." 
        />
        {formik.errors && <DisplayErrors msgError={formik.errors.cpf}/>}
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="born_date">Data de Nascimento*:</Label>
            <Input
              id="born_date"
              name="born_date"
              onChange={formik.handleChange}
              value={formik.values.born_date}
              type="date"
            />
            {formik.errors && <DisplayErrors msgError={formik.errors.born_date}/>}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="telephone">Telefone*:</Label>
            <Input
              mask="(99) 9999-99999"
              maskChar=" "
              tag={InputMask}
              id="telephone"
              name="telephone"
              onChange={formik.handleChange}
              value={formik.values.telephone} 
              type="text"
              placeholder="Digite o telefone do motorista..." 
            />
            {formik.errors && <DisplayErrors msgError={formik.errors.telephone}/>}
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="cnh">CNH*:</Label>
            <Input
              mask="99999999999"
              maskChar=" "
              tag={InputMask}
              id="cnh"
              name="cnh"
              onChange={formik.handleChange}
              value={formik.values.cnh} 
              type="text"
              placeholder="Digite a CNH do motorista..." 
            />
            {formik.errors && <DisplayErrors msgError={formik.errors.cnh}/>}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
          <Label for="cnh_type">Tipo de CNH*:</Label>
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
          {formik.values.cnh_type === "" && formik.errors && <DisplayErrors msgError={formik.errors.cnh_type}/>}
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit">Salvar</Button>
    </Form>
    </>
  );
}

export default FormRegister;