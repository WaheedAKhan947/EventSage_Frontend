import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import ProfileDropdown from '../ProfileDpdown/ProfileDropdown';
import { useIsFocused } from '@react-navigation/native';
import StorageManager from '../../storage/StorageManager';
import { ENDPOINTS } from '../../api/apiRoutes';
import API from '../../api/apiService';

const Reservations = ({ navigation }: any) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const [reservations, setReservations] = useState([]);


  
  const fetchData = async () => {
    const userId =await StorageManager.get('userId');
    try {
      const response = await API.get(
        `${ENDPOINTS.USER.GETRESERVATION}/${userId}`
      );
      console.log("response in get api :", response);
      if (response.success) {
        setReservations(response?.reservations);
      } else {
        const errorMessage = response.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  useEffect(() => {
    if (isFocused && scrollViewRef.current) {
      (scrollViewRef.current as ScrollView).scrollTo({ y: 0, animated: false });
    }
  }, [isFocused]);

  function handleLogout(): void {
    setIsDropdownVisible(false);
  }

  function handleAccountSettings(): void {
    setIsDropdownVisible(false);
  }

  function handleClose(): void {
    setIsDropdownVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headercon}>
        <View>
        <TouchableOpacity
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          <Image
            source={require('../../assets/menutwo.png')}
            style={styles.headerprof}
          />
          <ProfileDropdown

            isVisible={isDropdownVisible}
            onLogout={handleLogout}
            onAccountSettings={handleAccountSettings}
            onClose={handleClose}
          />
        </TouchableOpacity>
        </View>
     
      <View style={styles.headerContainer}>

          <Image
            source={require('../../assets/confirmed_logo.png')}
            style={styles.logo}
          />
      </View>
      </View>


      <View style={{paddingVertical:20}}>
        <Text style={styles.title}>RESERVATION HISTORY</Text>
        </View>

       
        <ScrollView contentContainerStyle={styles.reservationsContainer}>
  {Array.isArray(reservations) && reservations.length > 0 && (
    reservations?.map((item, index) => (
      <View style={styles.mainbox} key={index}>
        <View style={styles.box1}>
          <Text style={{ fontSize: 13, fontFamily: "Poppins-Light", color: "#E6E6E9" }}>Restaurant</Text>
          <Text style={{ fontSize: 18, fontFamily: "Poppins-Light", color: "#fff" }}>{item.restaurant}</Text>
        </View>
        <View style={styles.box2}>
          <View style={styles.b1}>
            <Text style={{ fontSize: 13, fontFamily: "Poppins-Light", color: "#E6E6E9" }}>Date</Text>
            <Text style={{ fontSize: 14, fontFamily: "Poppins-Medium", color: "#fff" }}>{item.date}</Text>
          </View>
          <View style={styles.b2}>
            <Text style={{ fontSize: 13, color: "#E6E6E9" }}>Total</Text>
            <Text style={{ fontSize: 14, color: "#fff" }}>{item.totalPayments}</Text>
          </View>
          <View style={styles.b3}>
            <Text style={{ fontSize: 13, color: "#E6E6E9" }}>Guests</Text>
            <Text style={{ fontSize: 14, color: "#fff" }}>{item.guests}</Text>
          </View>
        </View>
      </View>
    ))
  )}
</ScrollView>
 

    </View>

 

);
};

const styles = StyleSheet.create({
  reservationsContainer: {
    
  },

  mainbox:{
  
    backgroundColor:"#1B1B1B",
    color:"#fff",
    height:160,
    padding:15,
    borderRadius:5,
    marginTop:10
    
  },
  box1:{
    flex:1,
    flexDirection:"column",
    height:"50%",

  },
  box2:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    borderTopWidth:1,
    borderTopColor:"#E6E6E9",
    alignItems:"center"
    
  },
  b1:{},
  b2:{},
  b3:{},

container: {
  flexGrow: 1,
  paddingHorizontal: 10,
  backgroundColor: '#000000',
  fontSize: 16,
  fontFamily: 'IbarraRealNova-Regular',
  paddingTop:20
},

logo: {
  width: 155,
  height: 50,
  alignSelf: 'center',
  
  
},

icon: {
  marginRight: 10,
  width: 26,
  height: 24,
},

text: {
  color: '#fff',
  fontSize: 14,
  fontFamily: 'Poppins',
},
textp: {
  color: '#fff',
  fontSize: 24,
  fontWeight: '500',
  fontFamily: 'Poppins',
},

title: {
  fontSize: 30,
  color: '#fff',
  fontFamily: 'PlayfairDisplay-SemiBold',
  textAlign: 'center',
  marginBottom:30,
 
},
headerContainer: {
  marginLeft: "auto",
  marginRight: 'auto'

},
headercon: {
  justifyContent:"center",
  paddingVertical:30
},
headerButton: {
  marginTop: 10,
},
headerIcon: {
  width: 24,
  height: 24,
},
headerprof: {
  width: 30,
  height: 30,
  position:"relative",
  top:30

},


});

export default Reservations;