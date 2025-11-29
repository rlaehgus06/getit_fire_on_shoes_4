// API 기본 설정 및 헬퍼 함수

// 개발 환경: 로컬 서버
// 모바일 기기나 에뮬레이터에서는 localhost 대신 실제 IP 주소 사용 필요
// 예: 'http://192.168.0.1:3000' (컴퓨터의 로컬 IP 주소)
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000'  // 개발 환경 (로컬)
  : 'http://YOUR_PRODUCTION_URL:3000';  // 프로덕션 환경

// 디버깅을 위한 로그
console.log('API_BASE_URL:', API_BASE_URL);
console.log('__DEV__:', __DEV__);

/**
 * API 요청 헬퍼 함수
 * @param {string} endpoint - API 엔드포인트 (예: '/api/rooms')
 * @param {object} options - fetch 옵션 (method, body, headers 등)
 * @returns {Promise} - 응답 데이터
 */
export const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // body가 객체인 경우 JSON 문자열로 변환
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    console.log('API 요청:', url, config.method || 'GET');
    const response = await fetch(url, config);
    console.log('API 응답 상태:', response.status, response.statusText);
    
    // 응답이 JSON인지 확인
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    let data;
    if (isJson) {
      data = await response.json();
      console.log('API 응답 데이터:', data);
    } else {
      data = await response.text();
      console.log('API 응답 텍스트:', data);
    }

    if (!response.ok) {
      // 에러 메시지 추출 (객체인 경우 JSON.stringify, 문자열인 경우 그대로)
      let errorMessage;
      if (typeof data === 'object' && data !== null) {
        errorMessage = data.message || data.error || JSON.stringify(data);
      } else {
        errorMessage = data || `HTTP error! status: ${response.status}`;
      }
      console.error('API 오류 응답:', errorMessage);
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API 요청 오류 상세:', error);
    console.error('요청 URL:', url);
    if (error.message.includes('Network request failed') || error.message.includes('Failed to fetch')) {
      throw new Error('서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};

// 편의 함수들
export const get = (endpoint) => request(endpoint, { method: 'GET' });
export const post = (endpoint, body) => request(endpoint, { method: 'POST', body });
export const put = (endpoint, body) => request(endpoint, { method: 'PUT', body });
export const del = (endpoint) => request(endpoint, { method: 'DELETE' });

export default {
  request,
  get,
  post,
  put,
  delete: del,
  API_BASE_URL,
};

