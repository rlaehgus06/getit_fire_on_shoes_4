import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaymentProcessingScreen from './page/PaymentProcessingScreen';
import RoomListScreen from './page/RoomListScreen.jsx';
import addRoom from './page/addRoom.jsx';
import MainScreen from './page/mainscreen';
import MatchScreen from './page/MatchScreen';
import MatchingScreen from './page/MatchingScreen';
import PaymentScreen from './page/PaymentScreen';
import FindMyWayScreen from './page/FindMyWayScreen.jsx';
const Stack = createNativeStackNavigator();

const MOBILE_WIDTH = 390;
const MOBILE_HEIGHT = 844;

function AppInner() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Main"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Match" component={MatchScreen} />
          <Stack.Screen name="Matching" component={MatchingScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="PaymentProcessing" component={PaymentProcessingScreen} />
          <Stack.Screen name="RoomList" component={RoomListScreen} />
           <Stack.Screen name="addRoom" component={addRoom} />
           <Stack.Screen name="FindMyWay" component={FindMyWayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  if (Platform.OS !== 'web') {
    return (
      <SafeAreaView style={styles.fullscreen}>
        <AppInner />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.webWrapper}>
      <View style={styles.mobileFrame}>
        <SafeAreaView style={styles.fullscreen}>
          <AppInner />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webWrapper: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileFrame: {
    width: MOBILE_WIDTH,
    height: MOBILE_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
  },
});
