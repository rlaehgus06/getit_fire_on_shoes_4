import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { KakaoMapModal } from '../assets/KakaoMapModal';
import { get } from '../api';
import { getCurrentUser } from '../utils/userStorage';

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
      console.log('방 목록 가져오기 시작...');
      
      // 모든 방 조회 (성별 필터링 제거)
      const endpoint = '/api/rooms';
      
      const data = await get(endpoint);
      console.log('받은 데이터:', data);
      console.log('데이터 개수:', data?.length || 0);
      
      if (!Array.isArray(data)) {
        console.error('데이터 형식 오류: 배열이 아닙니다.', data);
        Alert.alert('오류', '서버 응답 형식이 올바르지 않습니다.');
        setRooms([]);
        return;
      }
      
      // 백엔드 데이터 → UI 데이터 변환
      const formattedRooms = data.map(room => {
        // 방의 온도 사용 (roomTemperature), 숫자로 변환하고 없으면 기본값 36.0
        const roomTemp = room.roomTemperature != null 
          ? Number(room.roomTemperature) 
          : 36.0;
        
        // 숫자가 아니면 기본값 사용
        const safeTemp = isNaN(roomTemp) ? 36.0 : roomTemp;
        
        console.log('방 데이터 변환:', { 
          roomId: room.id, 
          hostName: room.hostName, 
          roomTemperature: room.roomTemperature,
          convertedTemp: safeTemp
        });
        
        return {
          id: room.id.toString(),
          emoji: '😊', // 기본 이모지 (백엔드에서 추가 가능)
          name: room.hostName || '익명',
          // 방의 온도 정보 사용 (숫자로 변환)
          temperature: safeTemp,
          trust: `신뢰온도 ${safeTemp.toFixed(1)}°`,
          from: room.start || '출발지 미정',
          to: room.end || '도착지 미정',
          // gender 필드 제거 (더 이상 사용하지 않음)
          time: room.departureTime 
            ? new Date(room.departureTime).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            : '--:--',
          members: `${room.members || 1}/${room.maxPeople || 4}명`,
          price: `₩${Math.round(15000 / (room.maxPeople || 4)).toLocaleString()}`,
          roomId: room.id,  // ✅ 평가 대상 방 ID
          rawData: room,
        };
      });
      console.log('변환된 방 목록:', formattedRooms);
      setRooms(formattedRooms);
    } catch (error) {
      console.error('네트워크 오류 상세:', error);
      console.error('에러 메시지:', error.message);
      Alert.alert('오류', `방 목록을 불러오지 못했습니다.\n${error.message || '네트워크 연결을 확인해주세요.'}`);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 방 목록 가져오기
  useEffect(() => {
    fetchRooms();
  }, []);

  // 화면이 포커스될 때마다 방 목록 새로고침 (평가 후 돌아왔을 때 온도 업데이트 반영)
  useFocusEffect(
    React.useCallback(() => {
      console.log('RoomListScreen 포커스됨 - 방 목록 새로고침');
      fetchRooms();
    }, [])
  );

  // 방 추가
  const addRoom = () => navigation.navigate('addRoom');

  // 필터링된 방 목록
  // 검색어가 있으면 검색 필터 적용, 없으면 모든 방 표시
  const filteredRooms = rooms.filter(
    room =>
      !search.trim() ||  // 검색어가 없으면 모든 방 표시
      (room.from.includes(search) ||
       room.to.includes(search) ||
       room.name.includes(search))
  );

  const renderRoom = ({ item }) => {
    const handleRoomPress = () => {
      console.log('방 클릭:', { 
        roomId: item.id, 
        roomIdForRating: item.roomId,
        temperature: item.temperature 
      });
      
      // 방 ID를 전달하여 평가 시 해당 방의 온도를 업데이트
      navigation.navigate('TripFlow', {
        roomId: item.roomId,                 // ✅ 평가 대상 방 ID (필수)
        currentTemperature: item.temperature // 현재 방의 온도
      });
    };
    
    return (
    <RoomCard onPress={handleRoomPress}>
      <RoomHeader>
        <RoomEmoji>{item.emoji}</RoomEmoji>
        <RoomName>{item.name}</RoomName>
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
  };

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