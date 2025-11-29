import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
import { KakaoMapModal } from '../assets/KakaoMapModal';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f6fa;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 18px 18px 8px 18px;
  background-color: #fff;
`;

const BackBtn = styled.TouchableOpacity`
  padding: 7px 10px 7px 0;
`;

const BackIcon = styled.Text`
  font-size: 19px;
  color: #725ef2;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
  flex: 1;
`;

const TipBox = styled.View`
  background-color: #e8e5fa;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 12px 18px 12px 18px;
`;

const TipText = styled.Text`
  color: #715ef2;
  font-size: 14px;
`;

const CardBox = styled.View`
  background-color: #fff;
  border-radius: 16px;
  margin: 0 18px 14px 18px;
  padding: 18px 16px;
  shadow-opacity: 0.15;
  shadow-radius: 3px;
  elevation: 1;
`;

const CardTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #615af0;
`;

const FieldLabel = styled.Text`
  color: #888;
  font-size: 13px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  background-color: #f4f6fa;
  height: 44px;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 15px;
  margin-bottom: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
`;

const DateBox = styled.View`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
`;

const DateInput = styled.TextInput`
  background-color: #f4f6fa;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 15px;
  height: 40px;
  flex: 1;
`;

const TimeInput = styled.TextInput`
  background-color: #f4f6fa;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 15px;
  height: 40px;
  flex: 1;
`;

const PeopleBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PBtn = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #d0d0d0;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const PBtnText = styled.Text`
  font-size: 22px;
  color: #615af0;
`;

const PPText = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: #615af0;
  min-width: 35px;
  text-align: center;
`;

const FareHint = styled.Text`
  font-size: 12px;
  color: #7a8699;
  margin-top: 4px;
`;

const ToggleRow = styled.View`
  flex-direction: row;
  background-color: #f4f6fa;
  border-radius: 12px;
  padding: 5px;
  margin-top: 4px;
`;

const ToggleBtn = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0;
  border-radius: 12px;
  align-items: center;
  background-color: ${(props) => (props.active ? '#725ef2' : 'transparent')};
`;

const ToggleText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.active ? '#fff' : '#715ef2')};
`;

const HintText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  color: #7a8699;
`;

const CreateBtn = styled.TouchableOpacity`
  margin: 20px 18px 30px 18px;
  background-color: #725ef2;
  padding: 14px;
  border-radius: 16px;
  align-items: center;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 2;
`;

const CreateBtnText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const SelectButton = styled.TouchableOpacity`
  margin-top: 8px;
  background-color: #725ef2;
  padding: 10px 15px;
  border-radius: 20px;
  align-items: center;
`;

const SelectButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export default function addRoom({ navigation }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(4);
  const [onlySameGender, setOnlySameGender] = useState(true);
  const [startMapModal, setStartMapModal] = useState(false);
  const [endMapModal, setEndMapModal] = useState(false);

  // 날짜 형식 자동 변환 (20251129 -> 2025-11-29)
  const formatDateInput = (input) => {
    const clean = input.replace(/[^0-9]/g, '');
    if (clean.length >= 8) {
      const year = clean.slice(0, 4);
      const month = clean.slice(4, 6);
      const day = clean.slice(6, 8);
      return `${year}-${month}-${day}`;
    }
    return clean;
  };

  // 시간 형식 자동 변환 (1430 -> 14:30)
  const formatTimeInput = (input) => {
    const clean = input.replace(/[^0-9]/g, '');
    if (clean.length >= 4) {
      const hour = clean.slice(0, 2);
      const minute = clean.slice(2, 4);
      return `${hour}:${minute}`;
    }
    return clean;
  };

  const handleCreateRoom = async () => {
    if (!start.trim() || !end.trim() || !date.trim() || !time.trim()) {
      Alert.alert('오류', '모든 필수 정보를 입력해주세요.');
      return;
    }
    
    const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const timeMatch = time.match(/^(\d{2}):(\d{2})$/);
    if (!dateMatch || !timeMatch) {
      Alert.alert('오류', '날짜(YYYY-MM-DD)와 시간(HH:MM) 형식을 확인해주세요.');
      return;
    }
    
    const [, year, month, day] = dateMatch;
    const [, hour, minute] = timeMatch;
    const dateObj = new Date(`${year}-${month}-${day}T${hour}:${minute}:00+09:00`);
    
    if (isNaN(dateObj.getTime()) || dateObj < new Date()) {
      Alert.alert('오류', '유효한 미래 날짜와 시간을 입력해주세요.');
      return;
    }
    
    const departureTime = dateObj.toISOString();
    const roomData = {
      start: start.trim(),
      end: end.trim(),
      departureTime,
      hostName: "모아타1",
      maxPeople: people,
      sameGenderOnly: onlySameGender,
    };
    
    console.log('생성할 방 데이터:', roomData);
    
    try {
      const response = await fetch('YOUR_BACKEND_URL/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData),
      });
      console.log('생성할 방 데이터:', roomData);
      
      if (response.ok) {
        Alert.alert('성공', '방이 성공적으로 생성되었습니다!');
        navigation.goBack();
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert('오류', errorData.message || '방 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('방 생성 오류:', error);
      Alert.alert('오류', '네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <KakaoMapModal
        visible={startMapModal}
        onSelect={({ address }) => setStart(address)}
        onClose={() => setStartMapModal(false)}
      />
      <KakaoMapModal
        visible={endMapModal}
        onSelect={({ address }) => setEnd(address)}
        onClose={() => setEndMapModal(false)}
      />
      
      <HeaderRow>
        <BackBtn onPress={() => navigation.goBack()}>
          <BackIcon>←</BackIcon>
        </BackBtn>
        <Title>합승 방 만들기</Title>
      </HeaderRow>
      
      <ScrollView>
        <TipBox>
          <TipText>💡 방을 만들면 같은 경로로 가는 사람들이 참여할 수 있어요</TipText>
        </TipBox>
        
        <CardBox>
          <CardTitle>출발지</CardTitle>
          <Input
            placeholder="예: 강남역 3번 출구"
            value={start}
            onChangeText={setStart}
          />
          <SelectButton onPress={() => setStartMapModal(true)}>
            <SelectButtonText>지도에서 선택</SelectButtonText>
          </SelectButton>
          
          <CardTitle style={{ marginTop: 14 }}>도착지</CardTitle>
          <Input
            placeholder="예: 서울대학교 정문"
            value={end}
            onChangeText={setEnd}
          />
          <SelectButton onPress={() => setEndMapModal(true)}>
            <SelectButtonText>지도에서 선택</SelectButtonText>
          </SelectButton>
        </CardBox>
        
        <CardBox>
          <CardTitle>출발 시간</CardTitle>
          <Row>
            <DateBox>
              <FieldLabel>날짜 (20251129 → 2025-11-29)</FieldLabel>
              <DateInput
                placeholder="연도-월-일"
                value={date}
                onChangeText={(text) => setDate(formatDateInput(text))}
                keyboardType="numeric"
              />
            </DateBox>
            <DateBox>
              <FieldLabel>시간 (1430 → 14:30)</FieldLabel>
              <TimeInput
                placeholder="--:--"
                value={time}
                onChangeText={(text) => setTime(formatTimeInput(text))}
                keyboardType="numeric"
              />
            </DateBox>
          </Row>
        </CardBox>
        
        <CardBox>
          <CardTitle>탑승 인원</CardTitle>
          <PeopleBox>
            <FieldLabel>최대 인원 (본인 포함)</FieldLabel>
            <PBtn onPress={() => setPeople(Math.max(2, people - 1))}>
              <PBtnText>-</PBtnText>
            </PBtn>
            <PPText>{people}명</PPText>
            <PBtn onPress={() => setPeople(Math.min(4, people + 1))}>
              <PBtnText>+</PBtnText>
            </PBtn>
          </PeopleBox>
          <FareHint>
            현재 {people}명이 탑승하면 1인당 약 ₩{Math.round(15000 / people).toLocaleString()}
          </FareHint>
        </CardBox>
        
        <CardBox>
          <CardTitle>매칭 설정</CardTitle>
          <ToggleRow>
            <ToggleBtn active={onlySameGender} onPress={() => setOnlySameGender(true)}>
              <ToggleText active={onlySameGender}>동성만</ToggleText>
            </ToggleBtn>
            <ToggleBtn active={!onlySameGender} onPress={() => setOnlySameGender(false)}>
              <ToggleText active={!onlySameGender}>상관없음</ToggleText>
            </ToggleBtn>
          </ToggleRow>
          <HintText>안전한 합승을 위해 동성끼리만 매칭됩니다</HintText>
        </CardBox>
        
        <CreateBtn onPress={handleCreateRoom}>
          <CreateBtnText>방 만들기</CreateBtnText>
        </CreateBtn>
      </ScrollView>
    </Container>
  );
}