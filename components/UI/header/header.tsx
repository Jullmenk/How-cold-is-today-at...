"use client";  

import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo";


export default function HeaderPage() {
  return (
    <Header>
        <HeaderComp>
          <LogoDiv>
              <Logo/> 
          </LogoDiv>
        </HeaderComp>
    </Header>
  );
}



const Header = styled.header`
  width: 100%;
  display: flex;
  padding: 10px 2%;
  @media (min-width: 900px) {
  padding:10px 6%;
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
  `;

const HeaderComp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction:row;
  align-items:center;
  padding-top:10px;
  `;


const LogoDiv = styled.div({
  position:"relative",
  height:"100px",
  width:"100px",
})
