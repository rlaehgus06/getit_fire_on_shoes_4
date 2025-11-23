// page/PaymentProcessingScreen.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #00c853; /* 초록 배경 */
  align-items: center;
  justify-content: center;
`;

const Circle = styled.View`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const InnerCircle = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border-width: 6px;
  border-color: #00c853;
  align-items: center;
  justify-content: center;
`;

const CheckText = styled.Text`
  font-size: 46px;
  color: #00c853;
`;

const MainText = styled.Text`
  font-size: 22px;
  color: #ffffff;
  margin-top: 8px;
  font-weight: 600;
`;

const SubText = styled.Text`
  font-size: 16px;
  color: #e0f2f1;
  margin-top: 8px;
`;

export default function PaymentProcessingScreen({ navigation }) {
  const [processing, setProcessing] = useState(true);

  // 2초 동안 "결제 처리중..." 보여주고, 그 다음에 완료 화면으로 전환
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 2000); // 2000ms = 2초

    return () => clearTimeout(timer);
  }, []);

  // 🔹 처리중 화면
  if (processing) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#ffffff" />
        <MainText style={{ marginTop: 24 }}>결제 처리 중...</MainText>
      </Container>
    );
  }

  // 🔹 처리 완료 화면 (네가 보낸 초록색 스샷 느낌)
  return (
    <Container>
      <Circle>
        <InnerCircle>
          <CheckText>✓</CheckText>
        </InnerCircle>
      </Circle>
      <MainText>결제 완료!</MainText>
      <SubText>안전한 합승 되세요</SubText>
    </Container>
  );
}
