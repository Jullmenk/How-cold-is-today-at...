import React from 'react'
import styled from 'styled-components'
import Temperature from '../../assets/temperature'
import DownIcon from '../../assets/down'



export default function TempManagement() {
  return (
    <DIV>
        <Temperature/>
        <Select title='temperature' name='temp' id='temperature'>
            <Option value="celcius">Celcius</Option>
            <Option value="fahrenheit">Fahrenheit</Option>
        </Select>
        <DownDiv>
            <DownIcon/>
        </DownDiv>
    </DIV>
)
}

const DIV = styled.div({
    display:"flex",
    gap:"10px",
    alignItems:"center",
})

const DownDiv = styled.div({
    display:"flex",
    justifyItems:"center",
    alignItems:"center",
    marginLeft:"-40px"
})

const Select = styled.select({
    padding:"10px 30px",
    border: "2px solid var(--gray)",
    fontWeight:"700",
    appearance:"none",

    ":active":{
        border:"2px solid var(--gray)"
    }
})

const Option = styled.option({
    padding:"10px 30px",
    border: "2px solid var(--gray)",
    fontWeight:"700",
    background:"#D3D3D3",
    ":hover":{
        background:"var(--gray)",
    }
})