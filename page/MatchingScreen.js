import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f7fb;
`;

/* 상단 영역 */

const Header = styled.View`
  padding: 36px 20px 32px 20px;
  background-color: #7b5cff;
  align-items: center;
`;

const LoadingCircle = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.18);
  align-items: center;
  justify-content: center;
`;

const CheckCircle = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border-width: 3px;
  border-color: #fff;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.Text`
  color: #fff;
  font-size: 26px;
`;

const HeaderTitle = styled.Text`
  margin-top: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const HeaderSub = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  color: #e3e5ff;
`;

const TimerBar = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.18);
  align-items: center;
  justify-content: center;
`;

const TimerText = styled.Text`
  font-size: 14px;
  color: #ffffff;
`;

/* 내용 카드들 */

const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Card = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 18px 16px;
  margin-bottom: 14px;
  border-width: 1px;
  border-color: #e3ecff;
`;

const Label = styled.Text`
  font-size: 13px;
  color: #7a8699;
  margin-bottom: 2px;
`;

const Value = styled.Text`
  font-size: 15px;
  color: #1f2933;
`;

const CardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.color || '#4a90e2'};
  margin-right: 8px;
`;

const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const FeeLabel = styled.Text`
  font-size: 14px;
  color: #4a4a4a;
`;

const FeeValue = styled.Text`
  font-size: 14px;
  color: #111827;
`;

const StrongValue = styled(FeeValue)`
  font-weight: bold;
  color: #059669;
`;

const TipBadge = styled.View`
  margin-top: 10px;
  padding: 10px 12px;
  background-color: #f3fff1;
  border-radius: 12px;
`;

const TipText = styled.Text`
  font-size: 13px;
  color: #047857;
`;

/* 매칭 완료 시 승객 카드 */

const PassengerCard = styled.View`
  background-color: #f8faff;
  padding: 14px 12px;
  border-radius: 14px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: #ffd4f1;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
`;

const AvatarText = styled.Text`
  font-size: 22px;
`;

const PassengerInfo = styled.View``;

const PassengerName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 3px;
`;

const Badge = styled.View`
  background-color: #ffe0b6;
  padding: 3px 8px;
  border-radius: 10px;
`;

const BadgeText = styled.Text`
  color: #cc7a00;
  font-size: 12px;
`;

/* 하단 안내 & 버튼 */

const NoticeBox = styled.View`
  background-color: #fff4d6;
  padding: 12px 14px;
  border-radius: 12px;
  margin: 4px 20px 14px 20px;
  flex-direction: row;
`;

const NoticeIcon = styled.Text`
  margin-right: 6px;
  font-size: 16px;
`;

const NoticeText = styled.Text`
  font-size: 13px;
  color: #a16207;
  flex: 1;
`;

const BottomButtons = styled.View`
  padding: 0 20px 20px 20px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #4f46e5;
  padding: 15px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

const ConfirmText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 14px;
  border-radius: 12px;
  align-items: center;
  border-width: 1px;
  border-color: #d1d5db;
`;

const CancelText = styled.Text`
  font-size: 15px;
  color: #4b5563;
`;


const BASE_FARE_DEFAULT = 20000;
const SHARE_RATE = 1.2;

export default function MatchingScreen({ route, navigation }) {
  const {
    start = '',
    end = '',
    time = '--  --:--',
    people = 2,
    baseFare = BASE_FARE_DEFAULT,
  } = route?.params || {};

  const sharedFare = Math.round(baseFare * SHARE_RATE);
  const perPerson = Math.round(sharedFare / people);

  const [remaining, setRemaining] = useState(30);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(prev => {
        if (prev === 25) {
          setMatched(true);
        }
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const baseFareText = baseFare.toLocaleString('ko-KR');
  const sharedFareText = sharedFare.toLocaleString('ko-KR');
  const perPersonText = perPerson.toLocaleString('ko-KR');

  const handleConfirm = () => {
    navigation.navigate('Payment', {
      start,
      end,
      time,
      people,
      sharedFare,
      perPerson,
    });
  };

  return (
    <Container>
      {/* 상단: 매칭 중 vs 매칭 완료 */}
      <Header>
        {matched ? (
          <>
            <CheckCircle>
              <CheckIcon>✔</CheckIcon>
            </CheckCircle>
            <HeaderTitle>매칭 완료!</HeaderTitle>
            <HeaderSub>{people}명의 승객과 매칭되었습니다</HeaderSub>
          </>
        ) : (
          <>
            <LoadingCircle>
              <ActivityIndicator size="small" color="#ffffff" />
            </LoadingCircle>
            <HeaderTitle>매칭 중…</HeaderTitle>
            <HeaderSub>근처의 승객을 찾고 있습니다</HeaderSub>
            <TimerBar>
              <TimerText>남은 시간: {remaining}초</TimerText>
            </TimerBar>
          </>
        )}
      </Header>

      {/* 내용 */}
      <Content>
        {/* 경로 카드 */}
        <Card>
          <Label>출발지</Label>
          <CardRow>
            <Dot color="#4f46e5" />
            <Value>{start}</Value>
          </CardRow>

          <Label style={{ marginTop: 8 }}>도착지</Label>
          <CardRow>
            <Dot color="#f97373" />
            <Value>{end}</Value>
          </CardRow>

          <Label style={{ marginTop: 8 }}>출발 시간</Label>
          <CardRow>
            <Dot color="#9ca3af" />
            <Value>{time}</Value>
          </CardRow>
        </Card>

        {/* 매칭된 승객 - 매칭 완료 후에만 */}
        {matched && (
          <Card>
            <Label>👥  매칭된 승객</Label>

            <PassengerCard>
              <Avatar>
                <AvatarText>🐶</AvatarText>
              </Avatar>
              <PassengerInfo>
                <PassengerName>즐거운 🐶</PassengerName>
                <Badge>
                  <BadgeText>신뢰온도 42°</BadgeText>
                </Badge>
              </PassengerInfo>
            </PassengerCard>

            <PassengerCard>
              <Avatar>
                <AvatarText>🐭</AvatarText>
              </Avatar>
              <PassengerInfo>
                <PassengerName>즐거운 🐭</PassengerName>
                <Badge>
                  <BadgeText>신뢰온도 38°</BadgeText>
                </Badge>
              </PassengerInfo>
            </PassengerCard>
          </Card>
        )}

        {/* 요금 카드 */}
        <Card style={{ backgroundColor: '#e8fff3' }}>
          <Label>예상 요금</Label>

          <RowBetween style={{ marginTop: 8 }}>
            <FeeLabel>기본 택시 요금</FeeLabel>
            <FeeValue>{baseFareText}원</FeeValue>
          </RowBetween>

          <RowBetween>
            <FeeLabel>합승 요금 (120%)</FeeLabel>
            <FeeValue>{sharedFareText}원</FeeValue>
          </RowBetween>

          <RowBetween>
            <FeeLabel>총 탑승 인원</FeeLabel>
            <FeeValue>{people}명</FeeValue>
          </RowBetween>

          <RowBetween style={{ marginTop: 8 }}>
            <FeeLabel>1인당 요금</FeeLabel>
            <StrongValue>{perPersonText}원</StrongValue>
          </RowBetween>

          <TipBadge>
            <TipText>
              💰 일반 택시 대비 {matched ? '40' : '60'}% 절감(예시)!
            </TipText>
          </TipBadge>
        </Card>
      </Content>

      {/* 하단 안내 & 버튼 */}
      {matched && (
        <NoticeBox>
          <NoticeIcon>⚠️</NoticeIcon>
          <NoticeText>
            출발 2–3분 전까지 취소 가능합니다. 이후 취소 시 환불이 불가합니다.
          </NoticeText>
        </NoticeBox>
      )}

      <BottomButtons>
        {matched && (
          <ConfirmButton onPress={handleConfirm}>
            <ConfirmText>매칭 확정하기</ConfirmText>
          </ConfirmButton>
        )}

        <CancelButton onPress={() => navigation.goBack()}>
          <CancelText>{matched ? '취소하기' : '매칭 취소하기'}</CancelText>
        </CancelButton>
      </BottomButtons>
    </Container>
  );
}
