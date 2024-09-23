import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import HeaderLogo from '../components/headlogo';
import UrlInput from '../components/urlinput';
import ResultDisplay from '../components/resultdisplay';
import { checkUrlSafety } from '../services/api';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (url: string) => {
    setLoading(true);
    const response = await checkUrlSafety(url);
    setResult(response);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 상태바의 색상을 검은색으로 변경 */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        {/* 상단 로고 추가 */}
        <HeaderLogo />
        
        {/* 상단에 고정된 환영 인사 부분 */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcome}>Green Link</Text>
          <Text style={styles.description}>
            안전한 URL을 판별하고{"\n"}개인정보를 보호해드리는 Green Link입니다.{"\n"}피싱이 의심된다면 바로 확인해보세요!
          </Text>
        </View>

        {/* 세로 중앙 정렬된 URL 입력 및 결과 부분 */}
        <View style={styles.contentContainer}>
          <UrlInput onSubmit={handleSubmit} />
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <ResultDisplay result={result} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    marginTop: 70,
    marginBottom: 20,
    marginLeft: 25,
    paddingHorizontal: 25,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#5B61FF',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
    marginTop: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginTop: 100,
  },
});

export default HomeScreen;