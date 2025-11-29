import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList, Alert } from 'react-native';
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

const RoomCard = styled.TouchableOpacity`
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

const RoomName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  flex: 1;
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

export default function RoomListScreen({ navigation }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // 백엔드에서 방 목록 가져오기
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch('YOUR_BACKEND_URL/api/rooms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // 백엔드 데이터 → UI 데이터 변환
        const formattedRooms = data.map(room => ({
          id: room.id.toString(),
          emoji: '😊', // 기본 이모지 (백엔드에서 추가 가능)
          name: room.hostName,
          // 백엔드에서 온도 같이 내려줄 경우 사용
          temperature: room.temperature,
          trust: room.temperature != null
            ? `신뢰온도 ${room.temperature.toFixed(1)}°`
            : '신뢰온도 36.0°',
          from: room.start,
          to: room.end,
          gender: room.sameGenderOnly ? '동성만' : '상관없음',
          time: new Date(room.departureTime).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
          members: `${room.members}/${room.maxPeople}명`,
          price: `₩${Math.round(15000 / room.maxPeople).toLocaleString()}`,
          userId: room.user_id || room.hostUserId,  // ✅ 평가 대상 유저 아이디
          rawData: room,
        }));
        setRooms(formattedRooms);
      } else {
        console.error('방 목록 가져오기 실패');
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      Alert.alert('오류', '방 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 방 목록 가져오기
  useEffect(() => {
    fetchRooms();
  }, []);

  // 방 추가
  const addRoom = () => navigation.navigate('addRoom');

  // 필터링된 방 목록
  const filteredRooms = rooms.filter(
    room =>
      room.gender === '동성만' &&                      // 동성만 방만 남김
      (room.from.includes(search) ||
       room.to.includes(search) ||
       room.name.includes(search))
  );

  const renderRoom = ({ item }) => (
    <RoomCard
      onPress={() =>
        navigation.navigate('TripFlow', {
          userId: item.userId,                 // 평가 받을 사람 아이디
          currentTemperature: item.temperature // 선택사항
        })
      }
    >
      <RoomHeader>
        <RoomEmoji>{item.emoji}</RoomEmoji>
        <RoomName>{item.name}</RoomName>
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
  );

  return (
    <Container>
      <HeaderRow>
        <BackBtn onPress={() => navigation.goBack()}>
          <BackIcon>←</BackIcon>
        </BackBtn>
        <Title>합승 방 찾기</Title>
      </HeaderRow>

      <SearchBar
        placeholder="출발지 또는 목적지 검색"
        value={search}
        onChangeText={setSearch}
      />

      <RouteButton onPress={() => navigation.navigate('FindMyWay')}>
        <RouteButtonText>내 경로로 맞는 방 찾기</RouteButtonText>
      </RouteButton>

      <CreateButton onPress={addRoom}>
        <CreateButtonText>+ 새로운 방 만들기</CreateButtonText>
      </CreateButton>

      <FlatList
        data={filteredRooms}
        keyExtractor={item => item.id}
        renderItem={renderRoom}
        refreshing={loading}
        onRefresh={fetchRooms}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}