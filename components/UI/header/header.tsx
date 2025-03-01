"use client";  

import React from "react";
import styled from "styled-components";
import Moon from "../assets/moon";

const Header = styled.header`
  width: 100%;
  display: flex;
  padding: 20px 25%;
  `;

const HeaderComp = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction:row;
  align-items:center;
  padding-top:10px;
  `;


const LogoDiv = styled.div({
    fontFamily:"sans-serif",
    fontWeight:"bold",
    marginLeft:"15px",
    fontSize:"7px",
    position:"relative",
    ":nth-child(1)":{
        margin:"0",
        position:"absolute",
        right:"-30px",
        top:"13px"
    },
    ":nth-child(2)":{
        margin:"0",
        position:"relative",
        zIndex:"10",
        color:"#1f2937",
        fontSize:"28px"
    },
    ":nth-child(3)":{
        margin:"-7px 0 -10px 0",
    },
    ":nth-child(4)":{
        margin:"0",
        position:"absolute",
        fontSize:"50px",
        fontWeight:"90",
        top:"-5px",
        left:"-20px",
    }
})

const MoonDiv = styled.div({
  marginLeft:"45px",
  marginTop:"15px",
})

export default function HeaderPage() {
  return (
    <Header>
        <HeaderComp>
            <LogoDiv>
                  <h1>How</h1>
                  <h1>Cold</h1>
                  <h1>Is Today</h1>
                  <h1>?</h1>
            </LogoDiv>
            <MoonDiv>
              <Moon/>
            </MoonDiv>
        </HeaderComp>
    </Header>
  );
}
