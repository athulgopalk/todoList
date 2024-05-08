import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

const Task = ({ text, onToggle, onDelete, isChecked }) => {
  const spinValue = new Animated.Value(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const startSpin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onToggle}>
        <View style={[styles.checkBox, isChecked ? styles.checkedBox : null]}>
          {isChecked && <Text style={styles.checkMark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <Text style={styles.itemText}>{text}</Text>
      <TouchableOpacity onPress={() => { startSpin(); setTimeout(() => onDelete(), 1000); }}>
        <Animated.Text style={[styles.deleteText, { transform: [{ rotate: spin }] }]}>🗑️</Animated.Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#2C3E50',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#2980b9',
  },
  checkMark: {
    color: '#FFF',
    fontSize: 16,
  },
  itemText: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
  },
  deleteText: {
    color: '#FFF',
    fontSize: 20,
  },
});

export default Task;
