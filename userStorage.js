// 사용자 정보 저장/불러오기 유틸리티
// AsyncStorage를 사용하여 로그인 상태 관리

import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@moata:currentUser';

/**
 * 현재 로그인한 사용자 정보 저장
 * @param {object} user - { userId, name, gender, temperature }
 */
export const saveCurrentUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('사용자 정보 저장됨:', user);
  } catch (error) {
    console.error('사용자 정보 저장 오류:', error);
  }
};

/**
 * 현재 로그인한 사용자 정보 불러오기
 * @returns {object|null} 사용자 정보 또는 null
 */
export const getCurrentUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    console.log('AsyncStorage에서 불러온 데이터:', userJson);
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log('파싱된 사용자 정보:', user);
      return user;
    }
    console.log('AsyncStorage에 사용자 정보가 없습니다.');
    return null;
  } catch (error) {
    console.error('사용자 정보 불러오기 오류:', error);
    return null;
  }
};

/**
 * 로그아웃 (사용자 정보 삭제)
 */
export const clearCurrentUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    console.log('사용자 정보 삭제됨');
  } catch (error) {
    console.error('사용자 정보 삭제 오류:', error);
  }
};

export default {
  saveCurrentUser,
  getCurrentUser,
  clearCurrentUser,
};

