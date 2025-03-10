import React, { useContext } from 'react';
import styled from 'styled-components';
import DownIcon from '../../assets/down';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GlobalContext } from '@/utils/hooks/useContext';

const validationSchema = Yup.object({
  temp: Yup.string()
});

export default function TempManagement() {
  const context = useContext(GlobalContext);

  const formik = useFormik({
    initialValues: {
      temp: 'Celsius',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Submitted temperature unit:', values.temp);
    },
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    formik.handleChange(e); 
    if(context){
      context.setTemp(newValue);
    }else{
      console.error("Error while getting Global Variables");
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Select
        title="temperature"
        name="temp"
        id="temperature"
        value={formik.values.temp}
        onChange={handleSelectChange} 
        onBlur={formik.handleBlur}
      >
        <Option value="Celsius">Celsius</Option>
        <Option value="Fahrenheit">Fahrenheit</Option>
      </Select>
      {formik.touched.temp && formik.errors.temp && (
        <Error>{formik.errors.temp}</Error> 
      )}
      <DownDiv>
        <DownIcon />
      </DownDiv>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  gap: 10px;
  width:100%;
  align-items:center;
  @media (min-width: 640px) {
  width:27%;  
  }

  `

const DownDiv = styled.div({
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  marginLeft: '-40px',
});

const Select = styled.select({
  width:"100%",
  padding: '10px 30px',
  border: '2px solid var(--gray)',
  fontWeight: '700',
  appearance: 'none',
  color:"black",
  ':active': {
    border: '2px solid var(--gray)',
  },
});

const Option = styled.option({
  padding: '10px 30px',
  border: '2px solid var(--gray)',
  fontWeight: '700',
  background: '#D3D3D3',
  ':hover': {
    background: 'var(--gray)',
  },
});

const Error = styled.div({
  color: 'red',
  fontSize: '12px',
  marginTop: '5px',
});