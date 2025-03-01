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


const FooterDiv = styled.footer({
    padding: "0px 25%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
})

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