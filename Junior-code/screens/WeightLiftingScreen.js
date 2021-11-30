import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WeightLiftingScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Weightlifting Screen</Text>
            <Button 
                title="Click"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default WeightLiftingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});