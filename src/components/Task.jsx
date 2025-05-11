import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, FlatList, Modal, TextInput, TouchableOpacity, Platform, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export function TasksScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await AsyncStorage.getItem('tasks');
            if (data !== null) {
                setTasks(JSON.parse(data));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const saveTasks = async (newTasks) => {
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const addTask = () => {
        if (newTask.trim().length === 0) {
            Alert.alert('error', 'Please enter text for the task');
            return;
        }
        const newTasks = [...tasks, { id: Date.now().toString(), text: newTask }];
        setTasks(newTasks);
        saveTasks(newTasks);
        setNewTask('');
        setModalVisible(false);
    };

    const deleteTask = (id) => {
        Alert.alert(
            "Deleting a task",
            "Are you sure you want to delete?",
            [
                { text: "cancel", style: "cancel" },
                {
                    text: "delete", onPress: () => {
                        const newTasks = tasks.filter(task => task.id !== id);
                        setTasks(newTasks);
                        saveTasks(newTasks);
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Tasks</Text>
                <Button title="add task" onPress={() => setModalVisible(true)} />
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.task}
                        onPress={() => deleteTask(item.id)}
                    >
                        <Ionicons name="checkmark-circle-outline" size={24} color="green" />
                        <Text style={styles.taskText}>{item.text}</Text> {/* טקסט זה בסדר */}
                    </TouchableOpacity>
                )}
            />

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>add new task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="write your task..."
                            value={newTask}
                            onChangeText={setNewTask}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="add" onPress={addTask} />
                            <Button title="cancel" onPress={() => setModalVisible(false)} />

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );


}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 10,
    },
    taskText: {
        marginLeft: 10,
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 18,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
