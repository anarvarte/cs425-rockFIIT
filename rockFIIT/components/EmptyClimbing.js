import React from "react";
import styled from "styled-components";

export default function Empty() {
  return (
    <ComponentContainer>
      <EmptyImage source={require("../assets/rockclimbing.png")} />
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;

  height: 650px;
`;

const EmptyImage = styled.Image`
  align-items: center;
  width: 350px;
  height: 400px;
`;

const EmptyText = styled.Text`
  color: white;
  fontFamily: Georgia;
  margin-top: 30px;
  font-size: 30px;
`;
//font-family: poppins-bold;
