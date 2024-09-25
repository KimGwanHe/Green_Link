import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import HeaderLogo from '../components/headlogo';
import UrlInput from '../components/urlinput';
import ResultDisplay from '../components/resultdisplay';
import HalfDonutChart from '../components/chart';
import { checkUrlSafety } from '../services/api';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    const response = await checkUrlSafety(url);
    setResult(response);
    setLoading(false);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // 버튼 배경색을 result에 따라 설정하는 함수
  const getButtonBackgroundColor = () => {
    if (result.includes('안전')) {
      return '#0DC18E';
    } else if (result.includes('위험')) {
      return '#EB3D4F';
    } else {
      return '#000000';
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* 상태바 색상을 검은색으로 설정 */}
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

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

          {/* 그래프 컴포넌트 추가 */}
          <View>
            <HalfDonutChart />
          </View>

          {/* 모달 창 */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>URL 결과</Text>
                <Text style={styles.modalResult}>{result}</Text>
                <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { backgroundColor: getButtonBackgroundColor() }]}
                >
                  <Text style={styles.closeButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 10,
    marginLeft: 5,
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
    marginTop: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 바깥 영역을 어둡게 처리
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalResult: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;