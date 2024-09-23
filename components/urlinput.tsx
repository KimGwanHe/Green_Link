import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface UrlInputProps {
  onSubmit: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState<string>('');

  const handlePress = () => {
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="URL을 입력해주세요."
        placeholderTextColor="#888"
        value={url}
        onChangeText={setUrl}
        keyboardType="url" // URL 입력 시 편리한 키보드 설정
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>URL 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10, // 텍스트와 입력창 경계의 여백
    color: '#fff',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UrlInput;