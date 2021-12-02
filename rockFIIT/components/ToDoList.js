import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";

export default function TodoList({ item, deleteItem }) {
  return (
    <ComponentContainer>
      <ListContainer>
        <CircleContainer>
          <Entypo name="circle" size={20} color="midnightblue" />
        </CircleContainer>
        <View>
          <TextItem>{item.value}</TextItem>
          <TextDate>Task</TextDate>
        </View>
        <View style={styles.button}>
          <Button title="Delete" onPress={() => deleteItem(item.key)} />
        </View>
      </ListContainer>
    </ComponentContainer>
  );
}

/*
<TouchableOpacity style={styles.button} onPress={() => deleteItem(item.key)}>
  <Text>Delete</Text>
</TouchableOpacity>;
*/

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
`;
//  font-family: poppins-regular;

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;

  border-radius: 10px;
  width: 40px;
`;
//  font-family: poppins-regular;

const IconContainer = styled.TouchableOpacity`
  border-radius: 30px;
  padding: 3px;
  margin-top: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  height: auto;
`;

const CircleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    paddingRight: 150,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
});
