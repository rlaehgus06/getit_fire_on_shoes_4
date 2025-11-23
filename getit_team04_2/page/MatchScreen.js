import React, { useState } from 'react';
import { ScrollView, Modal } from 'react-native';
import styled from 'styled-components/native';
import { KakaoMapModal } from '../assets/KakaoMapModal';
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

/* ---------- 상단 헤더 ---------- */

const Header = styled.View`
  padding: 24px 20px 16px 20px;
  background-color: #ffb347;
`;

const BackRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const BackText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8px;
`;

const HeaderDesc = styled.Text`
  font-size: 14px;
  color: #fff7e6;
`;

/* ---------- 내용 영역 ---------- */

const Content = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const Section = styled.View`
  margin-bottom: 22px;
`;

const SectionLabel = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  font-weight: 600;
`;

/* 입력창 (출발지/도착지) */

const Input = styled.TextInput`
  background-color: #f5f5f7;
  border-radius: 20px;
  height: 52px;
  padding: 0 16px;
  font-size: 16px;
  color: #333;
`;

/* 출발 시간 박스 */

const TimeBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f7;
  border-radius: 20px;
  padding: 14px 16px;
`;

const TimeText = styled.Text`
  color: #555;
  font-size: 14px;
`;

/* 인원 선택 */

const QuestionRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const QuestionIcon = styled.Text`
  font-size: 16px;
  margin-right: 6px;
`;

const QuestionText = styled.Text`
  font-size: 14px;
  color: #333;
`;

const CountRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const CountBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CountButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddd;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const CountButtonText = styled.Text`
  color: #555;
  font-size: 18px;
  font-weight: 600;
`;

const CountValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ff6a00;
  margin: 0 22px;
`;

const HintText = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  color: #7a8699;
`;

/* 매칭 설정 토글 */

const ToggleRow = styled.View`
  flex-direction: row;
  background-color: #f5f5f7;
  border-radius: 999px;
  padding: 4px;
`;

const ToggleButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0;
  border-radius: 999px;
  align-items: center;
  background-color: ${props => (props.active ? '#ff9900' : 'transparent')};
`;

const ToggleText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.active ? '#ffffff' : '#555555')};
`;

const InfoText = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  color: #777;
`;

/* 하단 버튼 */

const Bottom = styled.View`
  padding: 16px 20px 24px 20px;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const StartButton = styled.TouchableOpacity`
  background-color: ${props => (props.disabled ? '#d3d3d3' : '#ff9900')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  padding: 16px;
  border-radius: 24px;
  align-items: center;
`;

const StartButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

/* ---------- 시간 선택 모달 ---------- */

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const TimeCard = styled.View`
  width: 270px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px 14px 10px 14px;
`;

const TimeCardTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const TimePickerRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const TimeColumn = styled.View`
  width: 70px;
  align-items: center;
`;

const TimeColumnScroll = styled.ScrollView`
  max-height: 180px;
`;

const TimeOption = styled.TouchableOpacity`
  padding: 6px 10px;
  margin: 2px 0;
  border-radius: 6px;
  background-color: ${props => (props.active ? '#e5e5e5' : 'transparent')};
`;

const TimeOptionText = styled.Text`
  font-size: 15px;
  color: #333;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
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
  color: #ff9900;
  font-weight: 600;
`;
const SelectButton = styled.TouchableOpacity`
  margin-top: 8px;
  background-color: #ff9900;
  padding: 10px 15px;
  border-radius: 20px;
  align-items: center;
`;

const SelectButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

/* ---------- 컴포넌트 본문 ---------- */

const BASE_FARE = 20000; // 기본 택시 요금 예시
const SHARE_RATE = 1.2; // 120%

export default function MatchScreen({ navigation }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const [people, setPeople] = useState(2); // 최소 2명
  const [onlySameGender, setOnlySameGender] = useState(true);

  // 시간 상태
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [ampm, setAmpm] = useState('오후');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const ampmOptions = ['오전', '오후'];
  const hourOptions = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0'),
  );
  const minuteOptions = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0'),
  );

  const minus = () => setPeople(p => (p > 2 ? p - 1 : 2)); // 2,3,4만
  const plus = () => setPeople(p => (p < 4 ? p + 1 : 4));
  const [startMapModal, setStartMapModal] = useState(false);
  const [endMapModal, setEndMapModal] = useState(false);
  // 요금 계산
  
  const sharedFare = Math.round(BASE_FARE * SHARE_RATE);
  const perPerson = Math.round(sharedFare / people);
  const perPersonText = perPerson.toLocaleString('ko-KR');

  const timeDisplay =
    hour && minute ? `${ampm} ${hour}:${minute}` : '--  --:--';

  const isFormValid =
    start.trim().length > 0 &&
    end.trim().length > 0 &&
    hour !== '' &&
    minute !== '' &&
    people >= 2 &&
    people <= 4;

  const closeModal = () => setTimeModalVisible(false);
  const confirmTime = () => closeModal();

  const handleStartMatching = () => {
    if (!isFormValid) return;

    navigation.navigate('Matching', {
      start,
      end,
      time: timeDisplay,
      people,
      baseFare: BASE_FARE,
      sharedFare,
      perPerson,
      onlySameGender,
    });
  };

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
      {/* 시간 선택 모달 */}
      <Modal
        visible={timeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <ModalBackground>
          <TimeCard>
            <TimeCardTitle>출발 시간 선택</TimeCardTitle>
            <TimePickerRow>
              {/* 오전/오후 */}
              <TimeColumn>
                <TimeColumnScroll>
                  {ampmOptions.map(op => (
                    <TimeOption
                      key={op}
                      active={ampm === op}
                      onPress={() => setAmpm(op)}
                    >
                      <TimeOptionText active={ampm === op}>
                        {op}
                      </TimeOptionText>
                    </TimeOption>
                  ))}
                </TimeColumnScroll>
              </TimeColumn>

              {/* 시 */}
              <TimeColumn>
                <TimeColumnScroll>
                  {hourOptions.map(h => (
                    <TimeOption
                      key={h}
                      active={hour === h}
                      onPress={() => setHour(h)}
                    >
                      <TimeOptionText active={hour === h}>
                        {h}
                      </TimeOptionText>
                    </TimeOption>
                  ))}
                </TimeColumnScroll>
              </TimeColumn>

              {/* 분 */}
              <TimeColumn>
                <TimeColumnScroll>
                  {minuteOptions.map(m => (
                    <TimeOption
                      key={m}
                      active={minute === m}
                      onPress={() => setMinute(m)}
                    >
                      <TimeOptionText active={minute === m}>
                        {m}
                      </TimeOptionText>
                    </TimeOption>
                  ))}
                </TimeColumnScroll>
              </TimeColumn>
            </TimePickerRow>

            <ModalButtonRow>
              <ModalButton onPress={closeModal}>
                <ModalButtonText>취소</ModalButtonText>
              </ModalButton>
              <ModalButton onPress={confirmTime}>
                <ModalButtonText>확인</ModalButtonText>
              </ModalButton>
            </ModalButtonRow>
          </TimeCard>
        </ModalBackground>
      </Modal>

      {/* 상단 헤더 */}
      <Header>
        <BackRow onPress={() => navigation.goBack()}>
          <BackText>{'← 뒤로'}</BackText>
        </BackRow>
        <HeaderTitle>실시간 자동 매칭</HeaderTitle>
        <HeaderDesc>
          경로와 시간을 입력하면 AI가 자동으로 최적의 합승 파트너를 찾아드립니다!
        </HeaderDesc>
      </Header>

      {/* 스크롤 내용 */}
      <Content>
        {/* 출발지 */}
        <Section>
          <SectionLabel>출발지</SectionLabel>
          <Input
            placeholder="예: 강남역 3번 출구"
            placeholderTextColor="#b3b3b3"
            value={start}
            onChangeText={setStart}
          />
           <SelectButton onPress={() => setStartMapModal(true)}>
            <SelectButtonText>지도에서 선택</SelectButtonText>
          </SelectButton>
        </Section>

        {/* 도착지 */}
        <Section>
          <SectionLabel>도착지</SectionLabel>
          <Input
            placeholder="예: 서울대학교 정문"
            placeholderTextColor="#b3b3b3"
            value={end}
            onChangeText={setEnd}
          />
            <SelectButton onPress={() => setEndMapModal(true)}>
            <SelectButtonText>지도에서 선택</SelectButtonText>
          </SelectButton>
        </Section>

        {/* 출발 시간 */}
        <Section>
          <SectionLabel>출발 시간</SectionLabel>
          <QuestionRow style={{ marginBottom: 8 }}>
            <QuestionIcon>🕒</QuestionIcon>
            <QuestionText>언제 출발하시나요?</QuestionText>
          </QuestionRow>
          <TimeBox onPress={() => setTimeModalVisible(true)}>
            <TimeText>{timeDisplay}</TimeText>
            <TimeText>🕒</TimeText>
          </TimeBox>
        </Section>

        {/* 인원 선택 */}
        <Section>
          <SectionLabel>희망 인원</SectionLabel>
          <QuestionRow>
            <QuestionIcon>👥</QuestionIcon>
            <QuestionText>
              총 몇 명이 탑승하고 싶으세요? (본인 포함)
            </QuestionText>
          </QuestionRow>

          <CountRow>
            <CountBox>
              <CountButton onPress={minus}>
                <CountButtonText>-</CountButtonText>
              </CountButton>
              <CountValue>{people}명</CountValue>
              <CountButton onPress={plus}>
                <CountButtonText>+</CountButtonText>
              </CountButton>
            </CountBox>
          </CountRow>

          <HintText>
            {people}명이 탑승하면 1인당 약 ₩{perPersonText}
          </HintText>
        </Section>

        {/* 매칭 설정 */}
        <Section>
          <SectionLabel>매칭 설정</SectionLabel>
          <ToggleRow>
            <ToggleButton
              active={onlySameGender}
              onPress={() => setOnlySameGender(true)}
            >
              <ToggleText active={onlySameGender}>동성만</ToggleText>
            </ToggleButton>
            <ToggleButton
              active={!onlySameGender}
              onPress={() => setOnlySameGender(false)}
            >
              <ToggleText active={!onlySameGender}>상관없음</ToggleText>
            </ToggleButton>
          </ToggleRow>
          <InfoText>안전한 합승을 위해 동성끼리만 매칭됩니다.</InfoText>
        </Section>
      </Content>

      {/* 하단 버튼 */}
      <Bottom>
        <StartButton disabled={!isFormValid} onPress={handleStartMatching}>
          <StartButtonText>자동 매칭 시작하기</StartButtonText>
        </StartButton>
      </Bottom>
    </Container>
  );
}
