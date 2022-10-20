import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Localizacao from './src/localizacao';
import Local from './src/local';

export default function App() {
  return (
    <View style={styles.container}>
      <Local />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
