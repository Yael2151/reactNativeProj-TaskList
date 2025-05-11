
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, FlatList, Modal, TextInput, TouchableOpacity, Platform, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
export function HomeScreen({ navigation }) {
    return (
        <ImageBackground 
            source={require('../../assets/task.png')} 
            style={styles.background}
        >
            <View style={styles.content}>
                <Text style={styles.text}>Welcome to the Task App!</Text>
                <Button
                    title="My Tasks"
                    onPress={() => navigation.navigate('Tasks')}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
},
content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
text: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
},
});
