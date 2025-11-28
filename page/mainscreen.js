import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 40px 24px 0 24px;
`;

const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
`;

const TempBox = styled.View`
  background-color: #ffe580;
  border-radius: 16px;
  padding: 8px;
`;

const TempText = styled.Text`
  font-weight: bold;
  color: #ff9900;
  font-size: 18px;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #555;
  margin-bottom: 18px;
`;

const Cards = styled.View`
  margin-bottom: 16px;
`;

const Card = styled.View`
  background-color: black;
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 12px;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;
`;

const CardDesc = styled.Text`
  color: #ccc;
  font-size: 14px;
`;

const MainBtn = styled.TouchableOpacity`
  background-color: #ff9900;
  padding: 16px;
  border-radius: 24px;
  align-items: center;
  margin-bottom: 12px;
`;

const MainBtnText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const SubBtn = styled.TouchableOpacity`
  background-color: white;
  padding: 14px;
  border-radius: 24px;
  align-items: center;
  border-width: 1px;
  border-color: #ff9900;
  margin-bottom: 12px;
`;

const SubBtnText = styled.Text`
  color: #ff9900;
  font-weight: bold;
  font-size: 16px;
`;

export default function MainScreen({ navigation }) {
  return (
    <Container>
      <TopBar>
        <Icon source={require('../assets/taxi_icon.png')} />
        <TempBox>
          <TempText>36°</TempText>
        </TempBox>
      </TopBar>

      <Title>택시 합승</Title>
      <Subtitle>안전하고 경제적인 택시 합승 서비스</Subtitle>

      <Cards>
        <Card>
          <CardTitle>안전성 보장</CardTitle>
          <CardDesc>동성 매칭과 신뢰도 시스템으로 안전하게</CardDesc>
        </Card>
        <Card>
          <CardTitle>비용 절감</CardTitle>
          <CardDesc>같은 방향 승객과 합승으로 택시비 부담 감소</CardDesc>
        </Card>
        <Card>
          <CardTitle>실시간 매칭</CardTitle>
          <CardDesc>빠르고 편리한 매칭 시스템</CardDesc>
        </Card>
      </Cards>

      <MainBtn onPress={() => navigation.navigate('Match')}>
        <MainBtnText>실시간 자동 매칭</MainBtnText>
      </MainBtn>

      <SubBtn onPress={() => navigation.navigate('RoomList')}>
        <SubBtnText>합승 방 찾기</SubBtnText>
      </SubBtn>

      <SubBtn onPress={() => navigation.navigate('SignUp')}>
        <SubBtnText>회원가입</SubBtnText>
      </SubBtn>
    </Container>
  );
}
