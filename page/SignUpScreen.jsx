import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { post } from '../api';
import { saveCurrentUser, getCurrentUser } from '../utils/userStorage';

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 40px 24px 0 24px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
`;

const Input = styled.TextInput`
  height: 48px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #ddd;
  padding: 0 14px;
  margin-bottom: 16px;
`;

const Btn = styled.TouchableOpacity`
  margin-top: 8px;
  padding: 16px;
  border-radius: 24px;
  background-color: #ff9900;
  align-items: center;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('1'); // 0: 여성, 1: 남성
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !userId.trim() || !password.trim()) {
      Alert.alert('오류', '모든 필수 정보를 입력해주세요.');
      return;
    }

    if (gender !== '0' && gender !== '1') {
      Alert.alert('오류', '성별을 선택해주세요.');
      return;
    }

    try {
      const signUpData = {
        name: name.trim(),
        gender: parseInt(gender), // 0 또는 1로 전송
        userId: userId.trim(),
        password: password.trim(),
      };

      console.log('회원가입 데이터:', signUpData);
      
      const response = await post('/api/auth/signup', signUpData);
      console.log('회원가입 응답:', response);
      
      // 회원가입 성공 시 사용자 정보 저장 (자동 로그인)
      // gender는 숫자로 저장하되, 프론트엔드에서는 문자열로 변환하여 사용
      const userData = {
        userId: response.userId,
        name: response.name,
        gender: response.gender.toString(), // 문자열로 변환하여 저장
        temperature: response.temperature || 36.0,
      };
      
      console.log('저장할 사용자 정보:', userData);
      await saveCurrentUser(userData);
      
      // 저장 확인
      const savedUser = await getCurrentUser();
      console.log('저장 확인:', savedUser);
      
      Alert.alert('성공', '회원가입이 완료되었습니다!');
    navigation.goBack();
    } catch (error) {
      console.error('회원가입 오류:', error);
      Alert.alert('오류', error.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Subtitle>정보를 입력해주세요</Subtitle>

      <Input
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />

      <Input
        placeholder="성별 (0: 여성, 1: 남성)"
        value={gender}
        onChangeText={(text) => {
          // 0 또는 1만 입력 가능
          if (text === '' || text === '0' || text === '1') {
            setGender(text);
          }
        }}
        keyboardType="numeric"
      />

      <Input
        placeholder="아이디"
        value={userId}
        onChangeText={setUserId}
      />

      <Input
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Btn onPress={handleSignUp}>
        <BtnText>가입하기</BtnText>
      </Btn>
    </Container>
  );
}
