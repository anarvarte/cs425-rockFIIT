import React from "react";
import { Modal, StyleSheet, Button, View } from "react-native";

const Climbing = (props) => {
  return (
    <Modal visible={props.vis} animationType="slide">
      <View style={styles.climbScreen}>
        <View style={styles.backButton}>
          <Button color="grey" title="Back" onPress={props.onBack} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  climbScreen: {
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
});

export default Climbing;
