"use client"

import React from 'react'
import styled from 'styled-components'
import Github from '../assets/github'
import Link from 'next/link'

export default function Footer() {

    const data = new Date
  return (
    <FooterDiv>
        <DIV>
            <Paragraph>Made with love by Julmenk</Paragraph>
            <Paragraph>{data.getFullYear()}	&copy;</Paragraph>
            <Link href={"https://github.com/Jullmenk/How-cold-is-today-at..."}><Github/></Link>
        </DIV>
    </FooterDiv>
  )
}


const FooterDiv = styled.footer`
    padding: 20px 1%;
    display:flex;
    justify-content:center;
    align-items:center;

    @media (min-width: 900px) {
    padding:20px 6%;
    }  

    @media (min-width: 1100px) {
    padding:20px 13%;
    }

    @media (min-width: 1350px) {
    padding:20px 17%;
    }

    @media (min-width: 1600px) {
    padding:20px 25%;
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