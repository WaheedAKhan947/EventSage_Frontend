import React, {useState} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import ProfileDropdown from '../ProfileDpdown/ProfileDropdown';

const Profile = ({navigation}: any) => {
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrow.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.headtxt}>Profile</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          <Image
            source={require('../../assets/Subtract.png')}
            style={styles.headerprof}
          />
          <ProfileDropdown
            isVisible={isDropdownVisible}
            onLogout={handleLogout}
            onAccountSettings={handleAccountSettings}
            onClose={handleClose}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.maincontent}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/Vector2.png')}
            style={styles.icon}
          />
          <Text style={styles.input}>Eric Survillan</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/g267.png')} style={styles.icon} />
          <Text style={styles.input}>sample@gmail.com</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/phonee.png')} style={styles.icon} />
          <Text style={styles.input}>824-8585-628</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <LinearGradient
              colors={['#E6548D', '#F1C365']}
              style={styles.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.buttonText}>Update Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingTop: 80,
    backgroundColor: '#470D25',
    fontSize: 16,
    fontFamily: 'IbarraRealNova-Regular',
  },

  input: {
    height: 25,
    backgroundColor: 'transparent',
    color: '#F6BED6',
    fontSize: 16,
    fontFamily: 'IbarraRealNova-Regular',
    marginTop:2
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 30,
    paddingBottom:20
  },
  icon: {
    marginRight: 10,
    width: 26,
    height: 24,
  },
  button: {
    width: '80%',
    marginTop: 20,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'IbarraRealNova-Regular',
    color: '#270614',
    fontSize: 16,
    fontWeight: '600',
  },

  headerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap:100,
    marginBottom:20
  },

  headerIcon: {
    width: 20,
    height: 20,
  },
  headerprof: {
    width: 35,
    height: 35,
  },
  headtxt: {
    fontFamily: 'IbarraRealNova-Regular',
    color: '#E581AB',
    fontSize: 20,
    alignSelf: 'center',
  },
  maincontent: {
    marginTop: 20,
  },
});

export default Profile;
