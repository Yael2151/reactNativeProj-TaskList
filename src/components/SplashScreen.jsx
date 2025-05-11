import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';


export function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 2000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.splash}>
            <Text style={styles.splashText}>ברוכים הבאים לאפליקציית המשימות!</Text>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashText: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
})