import React, { useState } from 'react';
import styled from 'styled-components/native';
import { KakaoMapModal } from '../assets/KakaoMapModal';

export default function FindMyWayScreen({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startMapModal, setStartMapModal] = useState(false);
  const [endMapModal, setEndMapModal] = useState(false);

  return (
    <Container>
      {/* 상단 화살표와 타이틀 Row */}
      <HeaderRow>
        <ArrowButton onPress={() => navigation?.goBack?.()}>
          <ArrowText>←</ArrowText>
        </ArrowButton>
        <Title>내 경로로 방 찾기</Title>
      </HeaderRow>
      <KakaoMapModal
        visible={startMapModal}
        onSelect={({ address }) => setOrigin(address)}
        onClose={() => setStartMapModal(false)}
      />
      <KakaoMapModal
        visible={endMapModal}
        onSelect={({ address }) => setDestination(address)}
        onClose={() => setEndMapModal(false)}
      />
      <TipBox>
        <TipText>
          📍 출발지와 도착지를 입력하면 경로가 맞는 방을 찾아드려요
        </TipText>
      </TipBox>

      <FormBox>
        <Label>
          <GreenDot>●</GreenDot> 내 출발지
        </Label>
        <StyledInput
          placeholder="예: 강남역 1번 출구"
          placeholderTextColor="#888"
          value={origin}
          onChangeText={setOrigin}
        />
        <SelectButton onPress={() => setStartMapModal(true)}>
          <SelectButtonText>지도에서 선택</SelectButtonText>
        </SelectButton>
        <Label style={{ marginTop: 12 }}>
          <RedDot>●</RedDot> 내 도착지
        </Label>
        <StyledInput
          placeholder="예: 서울대학교"
          placeholderTextColor="#888"
          value={destination}
          onChangeText={setDestination}
        />
        <SelectButton onPress={() => setEndMapModal(true)}>
          <SelectButtonText>지도에서 선택</SelectButtonText>
        </SelectButton>
        <StyledButton>
          <ButtonText>🔍 맞는 방 찾기</ButtonText>
        </StyledButton>
      </FormBox>
    </Container>
  );
}

// styled-components
const Container = styled.View`
  flex: 1;
  background: #e4eaff;
  padding: 20px 18px;
`;

// 상단 헤더 Row(화살표 + 타이틀)
const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ArrowButton = styled.TouchableOpacity`
  padding: 10px 8px 10px 0;
`;

const ArrowText = styled.Text`
  font-size: 22px;
  color: #333;
  font-weight: bold;
`;

const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: 500;
  font-size: 17px;
`;

const TipBox = styled.View`
  background-color: #f3eeff;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 18px;
`;

const TipText = styled.Text`
  color: #757575;
  font-size: 14px;
  text-align: left;
`;

const FormBox = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 18px;
  elevation: 1;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const GreenDot = styled.Text`
  color: #36ba5f;
  font-size: 13px;
`;

const RedDot = styled.Text`
  color: #e95a5d;
  font-size: 13px;
`;

const StyledInput = styled.TextInput`
  height: 38px;
  background-color: #f7f7f7;
  border-width: 1px;
  border-color: #e7e7e7;
  border-radius: 7px;
  padding-horizontal: 10px;
  margin-bottom: 4px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #eea6aa;
  height: 40px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.5px;
`;

const ModalButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 4px;
`;
const ModalButton = styled.TouchableOpacity`
  padding: 6px 10px;
  margin-left: 8px;
`;
const ModalButtonText = styled.Text`
  font-size: 14px;
  color: #eea6aa;
  font-weight: 600;
`;
const SelectButton = styled.TouchableOpacity`
  margin-top: 8px;
  background-color: #fb9dedff;
  padding: 10px 15px;
  border-radius: 20px;
  align-items: center;
`;
const SelectButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
