import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BodyParameters from './src/screens/BodyParameters'


export default function App() {
  return (
    <View style={styles.container}>
      <BodyParameters />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
