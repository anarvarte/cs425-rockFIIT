import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <ComponentContainer>
      <HeaderText>Goals</HeaderText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;


const HeaderText = styled.Text`
  color: white;
  fontFamily: Georgia;
  font-size: 30px;
`;

const HeaderList = styled.Text`
  color: black;
  fontFamily: Georgia;
  font-size: 30px;
  margin-right: 20px;
`;