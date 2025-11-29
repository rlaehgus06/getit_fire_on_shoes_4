import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

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

// 👉 실제 서버 주소로 바꿔주세요.
const API_BASE_URL = 'http://YOUR_BACKEND_HOST:PORT';

export default function TripFlowScreen({ route, navigation }) {
  // 방 주인(평가 받을 사람)의 아이디를 RoomList에서 넘겨줍니다.
  const { userId, currentTemperature } = route?.params || {};

  const [status, setStatus] = useState('DRIVING'); // 'DRIVING' | 'DONE'
  const [showRating, setShowRating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // 1.5초 뒤에 "운행 완료"로 변경
    const drivingTimer = setTimeout(() => {
      setStatus('DONE');
    }, 1500);

    // 3초 뒤에 평가 모달 띄우기
    const ratingTimer = setTimeout(() => {
      setShowRating(true);
    }, 3000);

    return () => {
      clearTimeout(drivingTimer);
      clearTimeout(ratingTimer);
    };
  }, []);

  const sendRating = async isGood => {
    try {
      setSubmitting(true);

      // 나빴어요를 눌렀을 때는 온도 변화 없이 서버에만 "bad" 전송하거나
      // 아예 호출하지 않도록 팀 규칙에 맞게 사용하세요.
      if (isGood && userId) {
        await fetch(`${API_BASE_URL}/api/users/rate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,          // 예: "qwe123"
            delta: 0.1,      // 백엔드에서 temperature = temperature + 0.1 처리
            rating: 'good',
            currentTemperature, // 필요하면 같이 전송
          }),
        });
      } else if (!isGood && userId) {
        await fetch(`${API_BASE_URL}/api/users/rate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            delta: 0,
            rating: 'bad',
          }),
        });
      }

      setShowRating(false);
      navigation.goBack(); // 방 목록 등으로 복귀
    } catch (e) {
      console.error(e);
      alert('평가 전송 중 오류가 발생했습니다.');
      setShowRating(false);
    } finally {
      setSubmitting(false);
    }
  };

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
        onRequestClose={() => {}}
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
