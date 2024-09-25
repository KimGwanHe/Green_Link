import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        {result ? `Result: ${result}` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  result: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultDisplay;
