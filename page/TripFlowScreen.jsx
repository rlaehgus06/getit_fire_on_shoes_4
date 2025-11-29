import React, { useEffect, useState } from 'react';
import { Modal, Alert } from 'react-native';
import styled from 'styled-components/native';
import { post } from '../api';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f6fa;
  align-items: center;
  justify-content: center;
`;

const StatusText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const SubText = styled.Text`
  font-size: 16px;
  color: #555;
`;

const RatingModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

const RatingCard = styled.View`
  width: 280px;
  background-color: #ffffff;
  border-radius: 18px;
  padding: 20px 18px 16px 18px;
`;

const RatingTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const RatingDesc = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 18px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RatingButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
  margin: 0 4px;
  background-color: ${props => (props.type === 'good' ? '#4ade80' : '#f97373')};
`;

const RatingButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
`;

export default function TripFlowScreen({ route, navigation }) {
  // 방 ID를 RoomList에서 넘겨받습니다.
  const { roomId, currentTemperature } = route?.params || {};

  const [status, setStatus] = useState('DRIVING'); // 'DRIVING' | 'DONE'
  const [showRating, setShowRating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log('TripFlowScreen 마운트됨, roomId:', roomId);
    
    // 1.5초 뒤에 "운행 완료"로 변경
    const drivingTimer = setTimeout(() => {
      console.log('운행 완료 상태로 변경');
      setStatus('DONE');
    }, 1500);

    // 3초 뒤에 평가 모달 띄우기
    const ratingTimer = setTimeout(() => {
      console.log('평가 모달 표시');
      setShowRating(true);
    }, 3000);

    return () => {
      clearTimeout(drivingTimer);
      clearTimeout(ratingTimer);
    };
  }, [roomId]);

  const sendRating = async isGood => {
    console.log('평가 전송 시작:', { roomId, isGood, currentTemperature });
    
    if (!roomId) {
      console.warn('roomId가 없어 평가를 건너뜁니다:', roomId);
      Alert.alert('알림', '방 정보가 없어 평가할 수 없습니다.');
      setShowRating(false);
      navigation.goBack();
      return;
    }

    try {
      setSubmitting(true);

      // 좋았어요: 온도 +0.1, 나빴어요: 온도 변화 없음
      const ratingData = {
        roomId: Number(roomId), // 숫자로 변환
        rating: isGood ? 'good' : 'bad',
        delta: isGood ? 0.1 : 0,
      };

      if (currentTemperature) {
        ratingData.currentTemperature = currentTemperature;
      }

      console.log('평가 데이터 전송:', ratingData);
      const response = await post('/api/users/rate', ratingData);
      console.log('평가 응답:', response);

      setShowRating(false);
      Alert.alert('완료', `평가가 완료되었습니다.\n방 온도: ${response.previousTemperature}° → ${response.newTemperature}°`);
      navigation.goBack(); // 방 목록 등으로 복귀
    } catch (error) {
      console.error('평가 전송 오류:', error);
      console.error('에러 상세:', error.message);
      Alert.alert('오류', error.message || '평가 전송 중 오류가 발생했습니다.');
      setShowRating(false);
    } finally {
      setSubmitting(false);
    }
  };

  // 디버깅: showRating 상태 로그
  useEffect(() => {
    console.log('showRating 상태:', showRating);
  }, [showRating]);

  return (
    <Container>
      {status === 'DRIVING' ? (
        <>
          <StatusText>운행 중…</StatusText>
          <SubText>잠시만 기다려주세요.</SubText>
        </>
      ) : (
        <>
          <StatusText>운행 완료!</StatusText>
          <SubText>잠시 후 평가 화면이 표시됩니다.</SubText>
        </>
      )}

      {/* 평가 모달 */}
      <Modal
        transparent
        animationType="fade"
        visible={showRating}
        onRequestClose={() => {
          console.log('모달 닫기 요청');
        }}
      >
        <RatingModalBackground>
          <RatingCard>
            <RatingTitle>이번 합승은 어떠셨나요?</RatingTitle>
            <RatingDesc>
              좋았어요를 누르면 해당 이용자의 신뢰온도가 0.1° 올라갑니다.
            </RatingDesc>

            <ButtonRow>
              <RatingButton
                type="bad"
                disabled={submitting}
                onPress={() => sendRating(false)}
              >
                <RatingButtonText>나빴어요</RatingButtonText>
              </RatingButton>

              <RatingButton
                type="good"
                disabled={submitting}
                onPress={() => sendRating(true)}
              >
                <RatingButtonText>좋았어요</RatingButtonText>
              </RatingButton>
            </ButtonRow>
          </RatingCard>
        </RatingModalBackground>
      </Modal>
    </Container>
  );
}
