import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

export default function AddInput({ submitHandler }) {
  const [value, setValue] = useState("");

  const [programArray, setprogramArray] = useState([]);

  const [programName, setProgramName] = useState('');
  const addEntryClick = () => {
    setprogramArray([...programArray, `Entry ${programArray.length}`]);
  };

  const onChangeText = (text) => {
    setValue(text);
  };

  const customProgramArray = [];
  
  function saveArray(){
    customProgramArray.push(programName);
  }

  console.log(customProgramArray)

  return (
    <ComponentContainer>
      <InputContainer>
        <Input placeholder="Create Program..." onChangeText={onChangeText} onChange ={event => setProgramName(event.target.value)} id="input"/>
      </InputContainer>
      <SubmitButton
        onPress={() => {
          setValue(submitHandler(value)), addEntryClick, saveArray;
        }}
      >
        <Text> + </Text>
      </SubmitButton>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
  
`;

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 180px;
  border-radius: 10px;
  fontFamily: Georgia;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  margin-bottom: 180px;
  border-radius: 50px;
`;
