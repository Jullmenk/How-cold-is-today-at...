"use client"

import React from 'react'
import styled from 'styled-components'

export default function Footer() {
  return (
    <FooterDiv>
        <DIV>
            <Paragraph>Made with love by Julmenk</Paragraph>
        </DIV>
    </FooterDiv>
  )
}


const FooterDiv = styled.footer`
    padding: 0px 1%;
    display:flex;
    justify-content:center;
    align-items:center;

    @media (min-width: 900px) {
    padding:0px 6%;
    }  

    @media (min-width: 1100px) {
    padding:0px 13%;
    }

    @media (min-width: 1350px) {
    padding:0px 17%;
    }

    @media (min-width: 1600px) {
    padding:0px 25%;
    }
`

const DIV = styled.div({
    paddingTop:"20px",
    borderTop:"2px solid var(--gray)",
    width:"100%",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
})

const Paragraph = styled.p({
    fontSize:"12px"
})