import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import GpsIcon from "../../assets/gps";
import { GlobalContext } from '@/utils/hooks/useContext';

const validationSchema = Yup.object({
    city: Yup.string()
        .min(3, 'Minimum 3 characters')
        .required('This field is required'),
});

export default function SearchForm() {

      const context = useContext(GlobalContext);
    
      if (!context) {
        console.error("Error while getting Global Variables");
        return null;
    }
    
      const { setWeather } = context;
      

    const formik = useFormik({
        initialValues: { city: '' },
        validationSchema,
        onSubmit: values => {
            console.log('Form submitted with:', values.city);
            setWeather(values.city)
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Svg>
                <GpsIcon />
            </Svg>
            <Input
                title='city'
                name='city'
                placeholder='How cold is today at...?'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
            />
            <Btn type="submit">Search</Btn>
            {formik.touched.city && formik.errors.city && (
                <Error>{formik.errors.city}</Error>
            )}
        </Form>
    );
}

const Form = styled.form`
    width: 55%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    position: relative;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 30px 10px 50px;
    border-radius: 10px;
    border: 2px solid var(--gray);
`;

const Svg = styled.div`
    position: relative;
    z-index: 30;
    margin-right: -40px;
`;

const Btn = styled.button`
    background: var(--darkBlue);
    border: 2px solid var(--darkBlue);
    padding: 10px 20px;
    border-radius: 0px 10px 10px 0px;
    margin-left: -10px;
    font-weight: 700;
    color: white;
    cursor: pointer;
`;

const Error = styled.div`
    color: red;
    font-size: 12px;
    position: absolute;
    bottom: -20px;
    left: 15px;
`;
