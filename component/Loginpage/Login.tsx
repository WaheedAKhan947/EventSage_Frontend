import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import API, {ENDPOINTS} from '../../api/apiService';
import StorageManager from '../../storage/StorageManager';

const SignIn = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const emailFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const passwordFloatingLabelAnimation = useRef(new Animated.Value(0)).current;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      setIsSigningIn(false);
      return;
    }
    try {
      const payload = {email, password};
      const response = await API.post(ENDPOINTS.USER.LOGIN, payload);
      const userId = response?.user?._id;
      // const userIdString = userId.toString();
      console.log("response login:",response)
      await StorageManager.put('userId', userId);
      await StorageManager.put('token', response?.token);
      await StorageManager.put('userData', response.user);
      Alert.alert('Success', response.message || 'Sign-in successful!');
      // if(response){
      navigation.navigate('reservation');
      // }
      // navigation.navigate('paymentmethod');
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.message
        : 'Something went wrong.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailFocus = () => {
    Animated.timing(emailFloatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePasswordFocus = () => {
    Animated.timing(passwordFloatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!email) {
      Animated.timing(emailFloatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    if (!password) {
      Animated.timing(passwordFloatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const emailFloatingLabelStyle = {
    top: emailFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: emailFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  const passwordFloatingLabelStyle = {
    top: passwordFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: passwordFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.maincontainer}>
        <Text
          style={{
            fontSize: 32,
            color: 'white',
            fontFamily: 'PlayfairDisplay-SemiBold',
          }}>
          LOGIN
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.legalTexted}>Don't have an account? </Text>
          <Text
            style={styles.legalLinked}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </View>
      </View>

      <View style={styles.main1}>
        <View style={{flexDirection: 'column', gap: 35}}>
          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label, emailFloatingLabelStyle]}>
              Email
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onFocus={handleEmailFocus}
              onBlur={handleBlur}
            />
          </View>

          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label, passwordFloatingLabelStyle]}>
              Password
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={handlePasswordFocus}
              onBlur={handleBlur}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={require('../../assets/hiddenpass.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('forget')}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.btncontainer}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignIn}
            disabled={isSigningIn}>
            <Text style={styles.buttonText}>
              {isSigningIn ? 'loading..' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: '#F4F4F6',
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
              textAlign: 'center',
              justifyContent: 'center',
              width: 360,
              marginBottom:10
            }}>
            By signing in, I accept the Terms of Service and Community
            Guidelines and have red{' '}
            <Text
              onPress={() => navigation.navigate('privacy')}
              style={styles.privacytext}>
              {' '}
              Privacy Policy
            </Text>{' '}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },

  main1: {
    flex: 2,
  },
  label: {
    position: 'absolute',
    color: '#E6E6E9',
    fontFamily: 'Poppins-Light',
    fontSize: 13,
  },

  input: {
    flex: 1,
    height: 45,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    alignItems: 'flex-end',
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 60,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
  },

  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  btncontainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'flex-end',
  },
  privacytext: {
    color: '#F4F4F6',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
  },

  legalTexted: {
    color: '#F4F4F6',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
  },
  legalLinked: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
    marginLeft:5
  },
});

export default SignIn;
