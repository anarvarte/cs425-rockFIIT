import React from "react";
import { Modal, StyleSheet, Button, View } from "react-native";

const Goals = (props) => {
  return (
    <Modal visible={props.vis} animationType="slide">
      <View style={styles.goalScreen}>
        <View style={styles.backButton}>
          <Button color="grey" title="Back" onPress={props.onBack} />
        </View>
        <View style={styles.buttonSpot}>
          <View style={styles.button}>
            <Button title="Climbing goals" />
          </View>
          <View style={styles.button}>
            <Button title="Lifting goals" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  goalScreen: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 15,
    //justifyContent: "center",
  },

  backButton: {
    borderColor: "black",
    borderWidth: 3,
    width: "20%",
  },

  buttonSpot: {
    marginLeft: 82,
    marginTop: 150,
  },

  button: {
    margin: 15,
    borderColor: "black",
    borderWidth: 2,
    width: "60%",
  },
});

export default Goals;