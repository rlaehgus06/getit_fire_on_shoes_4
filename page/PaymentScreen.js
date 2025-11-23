import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f7fb;
`;

/* 상단 타이틀 */

const Header = styled.View`
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
`;

/* 내용 */

const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Card = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 18px 16px;
  margin-bottom: 18px;
  border-width: 1px;
  border-color: #e5e8ff;
`;

const SectionTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const IconText = styled.Text`
  font-size: 18px;
  margin-right: 8px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #4b5563;
  margin-right: 6px;
`;

const Value = styled.Text`
  font-size: 14px;
  color: #111827;
`;

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

/* 결제 금액 */

const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const FeeLabel = styled.Text`
  font-size: 14px;
  color: #4b5563;
`;

const FeeValue = styled.Text`
  font-size: 14px;
  color: #111827;
`;

const StrongFeeValue = styled(FeeValue)`
  color: #4f46e5;
  font-weight: bold;
`;

/* 카드 정보 */

const CardBox = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 12px 14px;
  border-width: 1px;
  border-color: #e5e7eb;
  flex-direction: row;
  align-items: center;
`;

const CardIcon = styled.Text`
  font-size: 18px;
  margin-right: 8px;
`;

const CardText = styled.Text`
  font-size: 14px;
  color: #111827;
`;

/* 안내 박스 */

const InfoBox = styled.View`
  background-color: #e5f1ff;
  border-radius: 14px;
  padding: 10px 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

const InfoIcon = styled.Text`
  font-size: 16px;
  margin-right: 8px;
`;

const InfoText = styled.Text`
  font-size: 13px;
  color: #1e40af;
`;

/* 하단 버튼 */

const Bottom = styled.View`
  padding: 12px 20px 20px 20px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #4f46e5;
  padding: 15px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 10px;
`;

const ConfirmText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const BottomNotice = styled.Text`
  text-align: center;
  font-size: 12px;
  color: #6b7280;
`;

export default function PaymentScreen({ route, navigation }) {
  const {
    start = '',
    end = '',
    time = '-- : --',
    people = 2,
    sharedFare = 24000,
    perPerson = 12000,
  } = route?.params || {};

  const sharedFareText = sharedFare.toLocaleString('ko-KR');
  const perPersonText = perPerson.toLocaleString('ko-KR');

  return (
    <Container>
      <Header>
        <HeaderTitle>결제 확인</HeaderTitle>
      </Header>

      <Content>
        <Card>
          <SectionTitle>예약 정보</SectionTitle>

          <Row>
            <IconText>📍</IconText>
            <Label>출발</Label>
            <Value>{start}</Value>
          </Row>

          <Row>
            <IconText>📍</IconText>
            <Label>도착</Label>
            <Value>{end}</Value>
          </Row>

          <Row>
            <IconText>🕒</IconText>
            <Label>출발 시간</Label>
            <Value>{time}</Value>
          </Row>
        </Card>

        <Card>
          <SectionTitle>👥 동승자 ({people}명)</SectionTitle>

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

        <Card style={{ backgroundColor: '#f3f0ff' }}>
          <SectionTitle>결제 금액</SectionTitle>

          <RowBetween>
            <FeeLabel>총 합승 요금</FeeLabel>
            <FeeValue>{sharedFareText}원</FeeValue>
          </RowBetween>

          <RowBetween>
            <FeeLabel>총 탑승 인원</FeeLabel>
            <FeeValue>{people}명</FeeValue>
          </RowBetween>

          <RowBetween style={{ marginTop: 8 }}>
            <FeeLabel>내 결제 금액 (1인)</FeeLabel>
            <StrongFeeValue>{perPersonText}원</StrongFeeValue>
          </RowBetween>

          <CardBox style={{ marginTop: 12 }}>
            <CardIcon>💳</CardIcon>
            <CardText>신한카드 *****-1234</CardText>
          </CardBox>
        </Card>

        <InfoBox>
          <InfoIcon>💳</InfoIcon>
          <InfoText>출발 시간에 자동으로 결제됩니다</InfoText>
        </InfoBox>
        <InfoBox>
          <InfoIcon>🔁</InfoIcon>
          <InfoText>출발 2–3분 전까지 취소 및 환불 가능</InfoText>
        </InfoBox>
      </Content>

      <Bottom>
        <ConfirmButton
        onPress={() => {
            navigation.navigate('PaymentProcessing');
        }}
        >
        <ConfirmText>결제 확정하기</ConfirmText>
        </ConfirmButton>


        <BottomNotice>
          결제 확정 시 이용약관에 동의한 것으로 간주됩니다
        </BottomNotice>
      </Bottom>
    </Container>
  );
}
