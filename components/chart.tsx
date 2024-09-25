import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, G, Path } from 'react-native-svg';

// 차트 데이터를 설정합니다.
const data = [
  { count: 7, color: '#0DC18E', label: '안전' },
  { count: 2, color: '#EB3D4F', label: '위험' },
  { count: 1, color: '#DADADA', label: '알수없음' },
];

// 총 검색 횟수를 기반으로 퍼센트를 계산
const totalSearchCount = data.reduce((acc, slice) => acc + slice.count, 0);

// 퍼센트 계산 함수
const calculatePercentage = (count: number) => (count / totalSearchCount) * 50;

// 반원 차트의 시작 각도 및 크기 등을 설정하는 함수
// const getCoordinatesForPercent = (percent: number) => {
//   const x = Math.cos(Math.PI * percent);
//   const y = Math.sin(Math.PI * percent);
//   return { x, y };
// };
const getCoordinatesForPercent = (percent: number, radius: number) => {
  const x = radius * Math.cos(Math.PI * percent);
  const y = radius * Math.sin(Math.PI * percent);
  return { x, y };
};

// 반원형 차트 컴포넌트
const HalfDonutChart = () => {
  let cumulativePercentage = 0;
  const innerRadius = 0.45; // 도넛의 중심을 비우는 반경 값

  return (
    <View style={styles.container}>
      <Text style={styles.title}>일일 검색 건 수</Text>
      <Svg height="120" width="200" viewBox="-1 -1 2 1">
        <G rotation="180">
          {data.map((slice, index) => {
            const percentage = calculatePercentage(slice.count);
            const startOuter = getCoordinatesForPercent(cumulativePercentage, 1);
            const startInner = getCoordinatesForPercent(cumulativePercentage, innerRadius);

            cumulativePercentage += percentage / 50; // 퍼센트 반영

            const endOuter = getCoordinatesForPercent(cumulativePercentage, 1);
            const endInner = getCoordinatesForPercent(cumulativePercentage, innerRadius);
            const largeArcFlag = percentage > 100 ? 1 : 0;

            const pathData = [
              `M ${startOuter.x} ${startOuter.y}`, // 외부 시작점
              `A 1 1 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`, // 외부 호
              `L ${endInner.x} ${endInner.y}`, // 내부 끝점으로 선
              `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`, // 내부 호
              `Z`, // 경로 닫기
            ].join(' ');

            return <Path key={index} d={pathData} fill={slice.color} />;
          })}
        </G>
      </Svg>
      <View style={styles.legendContainer}>
        {data.map((slice, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: slice.color }]}
            />
            <Text style={styles.legendText}>
              {slice.label}: {slice.count}건
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  legendText: {
    color: 'white',
  },
});

export default HalfDonutChart;
