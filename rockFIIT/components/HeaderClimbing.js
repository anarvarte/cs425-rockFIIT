import React from "react";
import styled from "styled-components";

let today = new Date().toISOString().slice(0, 10);

export default function HeaderClimbing() {
  return (
    <ComponentContainer>
      <HeaderText>Climbing workout:</HeaderText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
