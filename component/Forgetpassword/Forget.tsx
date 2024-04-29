import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Forget = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/sendOtp',
        JSON.stringify({
          email,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const responseData = response.data;
        console.log(response);
        await AsyncStorage.setItem('userEmail', email);
        Alert.alert(
          'Success',
          responseData.message || 'send email succesfull!',
        );
        navigation.navigate('verification');
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.message
        : 'Something went wrong.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSigningUp(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/wback.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />

        <View style={styles.maincontent}>
          <Text style={styles.title}>Forget Password</Text>
          <Text style={styles.subtitle}>Enter your registered email below</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.submitBtn}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handlePasswordReset();
            }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toLogin}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.legalTexted}>Remember the password? </Text>
            <Text style={styles.legalLinked}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    width: 340,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'IbarraRealNova-Regular',
  
  },
  inputContainer: {
    flexDirection: 'row',
    width:370,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 30,
    width:360
    
  },
  icon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    margin: 30,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily:"Poppins"
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
    marginTop: 40,
  },
  ascontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },

  legalTexted: {
    color: '#F4F4F6',
    fontSize: 11,
    fontFamily: 'IbarraRealNova-Regular',
  },
  legalLinked: {
    fontSize: 11,
    color: '#F4F4F6',
    fontWeight: '400',
    textDecorationLine: 'underline',
    fontFamily: 'IbarraRealNova-Regular',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    marginTop: 10,
    marginHorizontal: -20,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#F4F4F6',
    fontFamily: 'IbarraRealNova-Regular',
  },
  title: {
    fontSize: 32,
    width: 340,
    fontWeight: '600',
    color: '#F4F4F6',
    fontFamily: 'IbarraRealNova-Regular',
    marginTop: 60,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  maincontent: {
    marginBottom: 40,
    alignItems: 'center',
  },
  submitBtn: {
    marginTop: 130,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toLogin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Forget;