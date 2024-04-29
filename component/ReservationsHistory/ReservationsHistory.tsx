import React, { useState } from 'react';
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

const Reservations = ({navigation}: any) => {

  const data = [
  {
    restaurant: "Tony's Pizza Napoletana",
    date: "12 Feb, 2024 6:30 PM",
    total: "50.00",
    guests: 2,
  },
  {
    restaurant: "Tony's Pizza Napoletana",
    date: "12 Feb, 2024 6:30 PM",
    total: "50.00",
    guests: 2,
  },
  {
    restaurant: "Tony's Pizza Napoletana",
    date: "12 Feb, 2024 6:30 PM",
    total: "50.00",
    guests: 2,
  },
  {
    restaurant: "Tony's Pizza Napoletana",
    date: "12 Feb, 2024 6:30 PM",
    total: "50.00",
    guests: 2,
  },
  
  
];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  

  
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
  <View style={styles.mainContainer}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headercon}>
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


        <TouchableOpacity>
          <Image
            source={require('../../assets/confirmed_logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>RESERVATION HISTORY</Text>
        </View>

       
      {data.map((item, index) => (
        <View style={styles.mainbox} key={index}>
          <View style={styles.box1}>
            <Text style={{ fontSize: 13, color: "#E6E6E9" }}>Restaurent</Text>
            <Text style={{ fontSize: 18, color: "#fff" }}>{item.restaurant}</Text>
          </View>
          <View style={styles.box2}>
            <View style={styles.b1}>
              <Text style={{ fontSize: 13, color: "#E6E6E9" }}>Date</Text>
              <Text style={{ fontSize: 14, color: "#fff" }}>{item.date}</Text>
            </View>
            <View style={styles.b2}>
              <Text style={{ fontSize: 13, color: "#E6E6E9" }}>Total</Text>
              <Text style={{ fontSize: 14, color: "#fff" }}>{item.total}</Text>
            </View>
            <View style={styles.b3}>
              <Text style={{ fontSize: 13, color: "#E6E6E9" }}>Guests</Text>
              <Text style={{ fontSize: 14, color: "#fff" }}>{item.guests}</Text>
            </View>
          </View>
        </View>
      ))}
    

    </ScrollView>

  </View>

);
};

const styles = StyleSheet.create({

  mainbox:{
  
    backgroundColor:"#1B1B1B",
    color:"#fff",
    height:160,
    padding:15,
    borderRadius:5,
    
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

mainContainer: {
  flex: 1,
  position: 'relative',



},
container: {
  flexGrow: 1,
  paddingHorizontal: 15,
  paddingVertical: 30,
  backgroundColor: '#000000',
  fontSize: 16,
  fontFamily: 'IbarraRealNova-Regular',
  gap:10,
},

logo: {
  width: 155,
  height: 50,
  alignSelf: 'center',
  marginVertical: -40
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
  fontSize: 28,
  color: '#fff',
  fontWeight: "600",
  fontFamily: 'IbarraRealNova-Regular',
  textAlign: 'center',
  marginBottom: 20,
  marginTop: 45
},
headerContainer: {
  marginLeft: "auto",
  marginRight: 'auto'

},
headercon: {
  marginRight: "auto",

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

},





});

export default Reservations;