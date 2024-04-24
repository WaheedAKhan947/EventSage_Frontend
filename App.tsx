
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reservation from './component/ReservationReq/Reservation'
import SignUp from './component/SignUp/SignUp';
import Login from './component/Loginpage/Login'
import { enableScreens } from 'react-native-screens';
import Privacy from './component/privacyPage/Privacy';
import Forget from './component/Forgetpassword/Forget';
import Confirmpass from './component/Confirmpassword/Confirmpass';
import Verify from './component/Verification/Verify';
import Profile from './component/Profile/Profile';
import Reservations from './component/ReservationsHistory/ReservationsHistory';
import PaymentMehtod from './component/paymentMethod/PaymentMehtod';
import ManagePayment from './component/ManagePayment/ManagePayment';
import ReservationRequest from './component/ReservationRequest/ReservationRequest';
// import ReservationFooter from './component/Footer/ReservationFooter';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';


enableScreens();

const Tab=createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>    
    <NavigationContainer>
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} /> 
    <Stack.Screen name="Signup" component={SignUp} />
    <Stack.Screen name="reservation" component={Reservation} />
    <Stack.Screen name="privacy" component={Privacy} />
    <Stack.Screen name="forget" component={Forget} />
    <Stack.Screen name="verification" component={Verify} />
    <Stack.Screen name="confirmpass" component={Confirmpass} />
    <Stack.Screen name="profile" component={Profile} />
    <Stack.Screen name="reservationhistory" component={Reservations} />
    <Stack.Screen name="reservationrequests" component={ReservationRequest} />
    <Stack.Screen name="paymentmethod" component={PaymentMehtod} />    
    <Stack.Screen name="managepayment" component={ManagePayment} />    
    {/* <Stack.Screen name="footer" component={ReservationFooter} />    */}
 
  </Stack.Navigator>
</NavigationContainer>
    </>

  );
};

export default App;


