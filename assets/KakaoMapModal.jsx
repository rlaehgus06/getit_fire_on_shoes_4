import React, { useRef } from 'react';
import { Modal, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export function KakaoMapModal({ visible, onSelect, onClose }) {
  const KAKAO_MAP_HTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>지도 선택</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      body, html { height: 100%; margin: 0; padding: 0; }
      #map { width: 100vw; height: 100vh; }
    </style>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6ec38da9b93fa64844c18947281f6875&libraries=services"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5
      });
      var geocoder = new kakao.maps.services.Geocoder();
      var marker = new kakao.maps.Marker();
      marker.setMap(map);

      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        var latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var address = result[0].address.address_name;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
              address: address
            }));
          }
        });
      });
    </script>
  </body>
  </html>
  `;

  return (
    <Modal visible={visible} animationType="slide">
      <WebView
        originWhitelist={['*']}
        source={{ html: KAKAO_MAP_HTML.replace('여기에_자바스크립트키_입력', '6ec38da9b93fa64844c18947281f6875') }}
        onMessage={event => {
          const data = JSON.parse(event.nativeEvent.data);
          onSelect && onSelect(data);
          onClose && onClose();
        }}
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        style={{ position:'absolute', top:40, right:20, backgroundColor:'#fff', padding:10, borderRadius:8, elevation:4 }}
        onPress={onClose}
      >
        <Text style={{ color: '#333', fontWeight:'bold' }}>닫기</Text>
      </TouchableOpacity>
    </Modal>
  );
}
