import React from "react";
import { View, Text, StyleSheet} from "react-native";

const AboutUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.accountHeader}>About Us</Text>
      <Text>We are a group of undergraduate students students studying Computer Science and Engineering at the University of
          Nevada, Reno. With our combined interests in fitness, we decided to create an app that can make anyone's workout journey fun and easy
          to track. Although centered towards Weight Lifting and Rock Climbing, RockFIIT allows users to fully customize their workout experience. {"\n"}</Text>
      <Text>Developers:
          - Junior Macatlang{"\n"}
          - Aitor Navarte{"\n"}
          - Louis Doherty{"\n"}
          - Juan Gabriel Caridad{"\n"}
          - Cyrille Bernabe{"\n"}
      </Text>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },

  accountHeader: {
      fontSize: '14px',
      fontWeight: 'bold',
  }
});