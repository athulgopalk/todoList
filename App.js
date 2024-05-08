import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, Animated } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTaskItems([...taskItems, { text: task, isChecked: false }]);
      setTask('');
      // Add animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    }
  }

  const handleToggleTask = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setTaskItems(updatedTasks);
  }

  const handleDeleteTask = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks.splice(index, 1);
    setTaskItems(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <Task
              key={index}
              text={item.text}
              isChecked={item.isChecked}
              onToggle={() => handleToggleTask(index)}
              onDelete={() => handleDeleteTask(index)}
            />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Add a Task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>                   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e272e',
    
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
    paddingBottom: 5,
    marginBottom: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#2980b9',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    color: 'white',
  },
});
