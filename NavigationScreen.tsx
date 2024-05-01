import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useState } from 'react'
import { enableScreens } from 'react-native-screens';
import SignUp from './component/SignUp/SignUp';
import Reservation from './component/ReservationReq/Reservation';
import Privacy from './component/privacyPage/Privacy';
import Forget from './component/Forgetpassword/Forget';
import Verify from './component/Verification/Verify';
import Login from './component/Loginpage/Login'
import Confirmpass from './component/Confirmpassword/passwrodConfirm';
import Profile from './component/Profile/Profile';
import Reservations from './component/ReservationsHistory/ReservationsHistory';
import PaymentMehtod from './component/paymentMethod/PaymentMehtod';
import ManagePayment from './component/ManagePayment/ManagePayment';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';

export const GlobalContext = createContext({});
const NavigationScreen = () => {

    const [user, setUser] = useState<Object | null>({});

    enableScreens();

    const Tab=createBottomTabNavigator();
    
    const Stack = createNativeStackNavigator();
    
    function ReservationStack() {
      return (
        <Tab.Navigator
          initialRouteName="reservation"
          screenOptions={{
            headerShown: false ,
            tabBarShowLabel: false, 
            tabBarStyle: {
              position: 'absolute',
              elevation: 0,
              backgroundColor: '#353535',
              height: 75, 
            },
          }}
        >
          <Tab.Screen name="reservation" component={Reservation} options={{
            tabBarIcon: ({focused}) =>(
              <View style={{alignItems:"center",justifyContent:"center"}}>
                <Image
                source={require("../front-end/assets/restaurant-fill.png")}
                resizeMode='contain'
                style={{
                  width:25,
                  height:25,
                  tintColor: focused ? "#fff" : "#E6E6E9"
                }}
                />
              </View>
            )
          }} />
          <Tab.Screen name="reservationhistory" component={Reservations} 
           options={{
            tabBarIcon: ({focused}) =>(
              <View style={{alignItems:"center",justifyContent:"center"}}>
                <Image
                source={require("../front-end/assets/chathistory.png")}
                resizeMode='contain'
                style={{
                  width:25,
                  height:25,
                  tintColor: focused ? "#fff" : "#E6E6E9"
                }}
                />
              </View>
            )
          }}/>
          <Tab.Screen name="managepayment" component={ManagePayment} 
           options={{
            tabBarIcon: ({focused}) =>(
              <View style={{alignItems:"center",justifyContent:"center"}}>
                <Image
                source={require("../front-end/assets/creditcard.png")}
                resizeMode='contain'
                style={{
                  width:25,
                  height:25,
                  tintColor: focused ? "#fff" : "#E6E6E9"
                }}
                />
              </View>
            )
          }} /> 
          <Tab.Screen name="profile" component={Profile}  options={{
            tabBarIcon: ({focused}) =>(
              <View style={{alignItems:"center",justifyContent:"center"}}>
                <Image
                source={require("../front-end/assets/userprofile.png")}
                resizeMode='contain'
                style={{
                  width:25,
                  height:25,
                  tintColor: focused ? "#fff" : "#E6E6E9"
                }}
                />
              </View>
            )
          }}/>
        </Tab.Navigator>
      );
    }

  return (
    <GlobalContext.Provider value={{ user: user, setUser: setUser }}>
    <NavigationContainer>

<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Login" component={Login} /> 
  <Stack.Screen name="Signup" component={SignUp} />
  <Stack.Screen name="reservation" component={Reservation} />
  <Stack.Screen name="privacy" component={Privacy} />
  <Stack.Screen name="forget" component={Forget} />
  <Stack.Screen name="verification" component={Verify} />
  <Stack.Screen name="confirmation" component={Confirmpass} />
  <Stack.Screen name="profile" component={Profile} />
  <Stack.Screen name="reservationhistory" component={Reservations} />
  <Stack.Screen name="reservationrequests" component={ReservationStack} />
  <Stack.Screen name="paymentmethod" component={PaymentMehtod} />    
  <Stack.Screen name="managepayment" component={ManagePayment} />    
   

</Stack.Navigator>
</NavigationContainer>
      </GlobalContext.Provider>
  )
}

export default NavigationScreen