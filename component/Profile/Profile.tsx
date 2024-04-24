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

const Profile = ({ navigation }: any) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleUpdateProfile = () => {
    Alert.alert(
      'Profile Updated',
      'Your profile details have been successfully updated.',
    );
  };

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

        <Text style={styles.title}>MY PROFILE</Text>
        <Text style={styles.subtitle}>Track your personal information here</Text>
        <View style={styles.mainbox}>
          <View style={styles.box1}>
            <View style={styles.maincontent}>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>Eric Survillan</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>sample@gmail.com</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>824-8585-628</Text>
              </View>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={{ flex: 1, alignSelf: "center", justifyContent: "flex-end" }}>
              <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>

                <Text style={styles.buttonText}>Request Reservation</Text>

              </TouchableOpacity>
            </View>
          </View>
        </View>


      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({

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
  subtitle: {
    fontSize: 16,
    color: '#E6E6E9',
    textAlign: 'center',
    fontFamily: 'poppins',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: "600",
    fontFamily: 'IbarraRealNova-Regular',
    textAlign: 'center',
    marginBottom: 10,
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

  input: {
    height: 25,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
    marginTop: 2
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
    marginBottom: 30,
    paddingBottom: 20
  },
  maincontent: {
    marginTop: 40,
  },
  button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 230
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  mainbox: {
    flexGrow: 1,
    justifyContent: "space-between",
    marginBottom: 40

  },
  box1: {},
  box2: {},


});

export default Profile;
