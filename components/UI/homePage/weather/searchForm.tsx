import React from 'react'
import styled from 'styled-components'
import GpsIcon from "../../assets/gps"
const Form = styled.form({
    width:"55%",
    display:"flex",
    alignItems:"center",
    paddingLeft:"15px"
})

const Input = styled.input({
    width:"100%",
    padding:"10px 30px 10px 50px",
    borderRadius:"10px",
    border:"2px solid var(--gray)"
})

const Svg = styled.div`
    positon:relative;
    z-index:30;
    margin-right:-40px;
` 
const Btn = styled.button({
    background:"var(--darkBlue)",
    border:"2px solid var(--darkBlue)",
    padding:"10px 20px",
    borderRadius:"0px 10px 10px 0px",
    marginLeft:"-10px",
    fontWeight:"700",
    color:"white",
    cursor:"pointer",
})

export default function SearchForm() {
  return (
    <Form action="">
        <Svg>
            <GpsIcon/>
        </Svg>
        <Input title='search' name='search' placeholder='How cold is today at...?'></Input>
        <Btn>Search</Btn>
    </Form>
)
}
