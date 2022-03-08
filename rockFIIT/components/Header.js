import React from "react";
import styled from "styled-components";

let today = new Date().toISOString().slice(0, 10);

export default function Header() {
  return (
    <ComponentContainer>
      <HeaderText>Goals:</HeaderText>
      <HeaderList>{today}</HeaderList>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;


const HeaderText = styled.Text`
  color: white;
  
  font-size: 30px;
`;
//font-family: poppins-bold;
const HeaderList = styled.Text`
  color: white;

  font-size: 20px;
  margin-right: 20px;
`;
//  font-family: poppins-bold;