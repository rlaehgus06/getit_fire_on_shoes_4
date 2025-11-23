import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
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
  align-items: center;
  justify-content: space-between;
`;

const DateBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateInput = styled.TextInput`
  background-color: #f4f6fa;
  border-radius: 10px;
  padding: 5px 12px;
  font-size: 15px;
  width: 80px;
  margin-right: 5px;
`;

const TimeInput = styled.TextInput`
  background-color: #f4f6fa;
  border-radius: 10px;
  padding: 5px 12px;
  font-size: 15px;
  width: 60px;
  margin-left: 5px;
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
  background-color: ${props => (props.active ? '#725ef2' : 'transparent')};
`;

const ToggleText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.active ? '#fff' : '#715ef2')};
`;

const HintText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  color: #7a8699;
`;

const CreateBtn = styled.TouchableOpacity`
  margin: 20px 18px 30px 18px;
  background: #e667e7;
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
  color: #725ef2;
  font-weight: 600;
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
  // 상태 관리
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(4);
  const [onlySameGender, setOnlySameGender] = useState(true);
  const [startMapModal, setStartMapModal] = useState(false);
  const [endMapModal, setEndMapModal] = useState(false);    
  // 예시 요금 계산
  const BASE_FARE = 15000;
  const farePerPerson = Math.round(BASE_FARE / people);

  return (
    <Container>
        <KakaoMapModal
                visible={startMapModal}
                onSelect={({ address }) => setStart(address)}
                onClose={() => setStartMapModal(false)}
              />
              {/* 도착지 지도선택 모달 */}
              <KakaoMapModal
                visible={endMapModal}
                onSelect={({ address }) => setEnd(address)}
                onClose={() => setEndMapModal(false)}
              />
      {/* 헤더 + 뒤로가기 */}
      <HeaderRow>
        <BackBtn onPress={() => navigation.goBack()}>
          <BackIcon>←</BackIcon>
        </BackBtn>
        <Title>합승 방 만들기</Title>
      </HeaderRow>
      
      <ScrollView>
        {/* 안내 문구 */}
        <TipBox>
          <TipText>💡 방을 만들면 같은 경로로 가는 사람들이 참여할 수 있어요</TipText>
        </TipBox>

        {/* 출발/도착지 */}
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
          <CardTitle style={{marginTop:14}}>도착지</CardTitle>
          <Input
            placeholder="예: 서울대학교 정문"
            value={end}
            onChangeText={setEnd}
          />
          <SelectButton onPress={() => setStartMapModal(true)}>
            <SelectButtonText>지도에서 선택</SelectButtonText>
          </SelectButton>
        </CardBox>

        {/* 출발시간 */}
        <CardBox>
          <CardTitle>출발 시간</CardTitle>
          <Row>
            <DateBox>
              <FieldLabel>날짜</FieldLabel>
              <DateInput
                placeholder="연도-월-일"
                value={date}
                onChangeText={setDate}
              />
            </DateBox>
            <DateBox>
              <FieldLabel>시간</FieldLabel>
              <TimeInput
                placeholder="--:--"
                value={time}
                onChangeText={setTime}
              />
            </DateBox>
          </Row>
        </CardBox>

        {/* 인원수 선택 */}
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
            현재 {people}명이 탑승하면 1인당 약 ₩{farePerPerson.toLocaleString()}
          </FareHint>
        </CardBox>

        {/* 매칭 설정 */}
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

        {/* 방 만들기 버튼 */}
        <CreateBtn onPress={() => alert('방 만들기 동작')}>
          <CreateBtnText>방 만들기</CreateBtnText>
        </CreateBtn>
        
      </ScrollView>
    </Container>
  );
}
