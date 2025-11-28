import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { KakaoMapModal } from '../assets/KakaoMapModal';
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f6fa;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px 18px 12px 18px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const BackBtn = styled.TouchableOpacity`
  padding: 7px 10px 7px 0;
`;

const BackIcon = styled.Text`
  font-size: 19px;
  color: #725ef2;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
  flex: 1;
`;

const SearchBar = styled.TextInput`
  background-color: #f0f1f6;
  border-radius: 12px;
  font-size: 15px;
  padding: 10px 16px;
  margin: 18px 18px 8px 18px;
`;

const FilterRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 18px;
  margin-bottom: 10px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 6px 20px;
  border-radius: 16px;
  border-width: ${props => (props.active ? "0px" : "1px")};
  border-color: #dadada;
  background-color: ${props => (props.active ? "#725ef2" : "#fff")};
  margin-right: 8px;
`;

const FilterText = styled.Text`
  color: ${props => (props.active ? "#fff" : "#715ef2")};
  font-weight: bold;
  font-size: 15px;
`;

const RouteButton = styled.TouchableOpacity`
  margin: 18px 18px 0 18px;
  background: #e667e7;
  background-color: #725ef2;
  padding: 16px;
  border-radius: 16px;
  align-items: center;
`;

const RouteButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const CreateButton = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 1px;
  border-color: #725ef2;
  padding: 16px;
  border-radius: 16px;
  align-items: center;
  margin: 12px 18px 10px 18px;
`;

const CreateButtonText = styled.Text`
  color: #725ef2;
  font-weight: bold;
  font-size: 16px;
`;

const RoomCard = styled.View`
  background-color: #fff;
  margin: 10px 18px;
  padding: 18px 16px 12px 16px;
  border-radius: 16px;
  elevation: 2;
`;

const RoomHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const RoomEmoji = styled.Text`
  font-size: 24px;
  margin-right: 6px;
`;

const MemberDesc = styled.Text`
  font-size: 13px;
  color: #888;
  margin-left: auto;
`;

const RoomRoute = styled.View`
  margin-bottom: 8px;
`;

const RouteText = styled.Text`
  font-size: 15px;
  color: #333;
  margin-bottom: 3px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: #666;
`;

const PriceText = styled.Text`
  color: #725ef2;
  font-weight: bold;
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
export default function RoomListScreen({ navigation }) {
  const [rooms, setRooms] = useState([
    {
      id: '1',
      emoji: '😊',
      name: '용감한',
      trust: '신뢰온도 42°',
      from: '강남역 3번 출구',
      to: '서울대학교 정문',
      gender: '여성',
      time: '14:30',
      members: '2/4명',
      price: '₩3,750',
    },
    {
      id: '2',
      emoji: '😊',
      name: '용감한',
      trust: '신뢰온도 38°',
      from: '강남역 3번 출구',
      to: '서울대학교 정문',
      gender: '남성',
      time: '15:00',
      members: '1/4명',
      price: '₩2,900',
    },
  ]);

  // 필터링 상태
  const [filter, setFilter] = useState('전체');
  // 방 추가 예시
  const addRoom = () => navigation.navigate('addRoom');

  // 검색 바 연동
  
  const [search, setSearch] = useState('');
  const filteredRooms = rooms.filter(
    room =>
      (filter === '전체' || room.gender === filter) &&
      (room.from.includes(search) ||
        room.to.includes(search) ||
        room.name.includes(search))
  );

  return (
    <Container>
      {/* 헤더 + 뒤로가기 */}
      <HeaderRow>
        <BackBtn onPress={() => navigation.goBack()}>
          <BackIcon>←</BackIcon>
        </BackBtn>
        <Title>합승 방 찾기</Title>
      </HeaderRow>

      {/* 검색바 */}
      <SearchBar
        placeholder="출발지 또는 목적지 검색"
        value={search}
        onChangeText={setSearch}
      />

      {/* 필터 버튼들 */}
      <FilterRow>
        <FilterButton active={filter === '전체'} onPress={() => setFilter('전체')}>
          <FilterText active={filter === '전체'}>전체</FilterText>
        </FilterButton>
        <FilterButton active={filter === '여성'} onPress={() => setFilter('여성')}>
          <FilterText active={filter === '여성'}>여성</FilterText>
        </FilterButton>
        <FilterButton active={filter === '남성'} onPress={() => setFilter('남성')}>
          <FilterText active={filter === '남성'}>남성</FilterText>
        </FilterButton>
      </FilterRow>

      {/* 내 경로로 맞는 방 찾기 */}
      <RouteButton onPress={() => navigation.navigate('FindMyWay')}>
        <RouteButtonText>내 경로로 맞는 방 찾기</RouteButtonText>
      </RouteButton>

      {/* 새로운 방 만들기 */}
      <CreateButton onPress={addRoom}>
        <CreateButtonText>+ 새로운 방 만들기</CreateButtonText>
      </CreateButton>

      <FlatList
        data={filteredRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RoomCard>
            <RoomHeader>
              <RoomEmoji>{item.emoji}</RoomEmoji>
              <Title style={{ fontSize: 16 }}>{item.name}</Title>
              <MemberDesc>{item.gender}</MemberDesc>
            </RoomHeader>
            <InfoRow>
              <InfoText>{item.trust}</InfoText>
            </InfoRow>
            <RoomRoute>
              <RouteText>🟢 출발: {item.from}</RouteText>
              <RouteText>🔴 도착: {item.to}</RouteText>
            </RoomRoute>
            <InfoRow>
              <InfoText>{item.time} · {item.members}</InfoText>
              <PriceText>{item.price}</PriceText>
            </InfoRow>
          </RoomCard>
        )}
      />
    </Container>
  );
}
