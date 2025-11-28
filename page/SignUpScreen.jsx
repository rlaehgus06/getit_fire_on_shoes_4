import React, { useState } from 'react';
import styled from 'styled-components/native';

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
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // 여기서 백엔드 연결하면 됨
    console.log("회원가입 데이터: ", { userId, password });
    
    // 가입 완료 후 이동 (홈으로 이동 또는 로그인 화면으로 이동)
    alert("가입 완료!");
    navigation.goBack();
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Subtitle>아이디와 비밀번호를 입력해주세요</Subtitle>

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
