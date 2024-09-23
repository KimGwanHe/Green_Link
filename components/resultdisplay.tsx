import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        {result ? `Result: ${result}` : 'URL을 확인해주세요.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  result: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultDisplay;