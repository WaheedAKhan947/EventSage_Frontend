import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservation from '../ReservationReq/Reservation';
import Reservations from '../ReservationsHistory/ReservationsHistory';
import ReservationRequest from '../ReservationRequest/ReservationRequest';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab=createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="reservationrequests" component={ReservationRequest} />
      <Tab.Screen name="reservationhistory" component={Reservations} />
      
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
