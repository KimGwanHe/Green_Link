import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './app';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      {/* Expo StatusBar를 사용하여 설정 */}
      <StatusBar style="light" backgroundColor="#000" />

      {/* SafeAreaView 배경을 검은색으로 설정 */}
      <SafeAreaView style={styles.safeArea}>
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // SafeAreaView 배경색을 검은색으로 설정
  },
});

export default App;
