import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Animated
} from 'react-native';
import API, { ENDPOINTS } from '../../api/apiService';
import StorageManager from '../../storage/StorageManager';


const SignIn = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const emailFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const passwordFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const apiUrl = process.env.apiUrl;

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
      const payload = { email, password };
      const response = await API.post(ENDPOINTS.USER.LOGIN, payload);
      const userId = response?.user?._id;
      const userIdString = userId.toString();
      await StorageManager.put('userId', userIdString);
      Alert.alert('Success', response.message || 'Sign-in successful!');
      navigation.navigate('reservation');
    } catch (error:any) {
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
    Animated.timing(passwordFloatingLabelAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePasswordFocus = () => {
    Animated.timing(emailFloatingLabelAnimation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
    Animated.timing(passwordFloatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };


  const handleBlur = () => {
    if (!email ) { // Checking if email is empty
      Animated.timing(emailFloatingLabelAnimation, {
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
      outputRange: [10, -5],
    }),
    fontSize: passwordFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.maincontainer}>
        <Text style={{ fontSize: 32, color: "white", fontFamily: "PlayfairDisplay-SemiBold" }}>LOGIN</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.legalTexted}>Don't have an account? </Text>
          <Text
            style={styles.legalLinked}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </View>
      </View>

      <View style={styles.main1}>
        <View >
          <View style={{flexDirection:"column",gap:60}}>
        <View style={styles.inputContainer}>
          <Animated.Text style={[styles.label, emailFloatingLabelStyle]}>Email</Animated.Text>
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
          <Animated.Text style={[styles.label, passwordFloatingLabelStyle]}>Password</Animated.Text>
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

           <View >
            <TouchableOpacity onPress={() => navigation.navigate('forget')}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View> 
          </View>
          
       


        <View style={styles.btncontainer}>
          <View style={{ alignItems: "center", }}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignIn}
              disabled={isSigningIn}>
              <Text style={styles.buttonText}>
                {isSigningIn ? 'loading..' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>


          <View style={{alignItems:"center",marginBottom:10}}>
            <Text style={{color:"#F4F4F6",fontFamily:"Poppins-Regular",fontSize:11,textAlign:"center",justifyContent:"center",width:360}}>By signing in, I accept the Terms of Service and Community
Guidelines and have red <Text
              onPress={() => navigation.navigate('privacy')}
              style={styles.privacytext}>
              {' '}
              Privacy Policy
            </Text> </Text>

          </View>

        </View>
        </View>
       
    </ScrollView>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#000',
  },

  main1: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40,
    height:600,
   
  },
  label:{
    position:"absolute",
    color:"#E6E6E9",
    fontFamily:"Poppins-Light",
    fontSize:13,
  },
  txt: {
    fontSize: 14,
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
     borderBottomWidth: 1,
    borderBottomColor: '#fff',
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
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
   
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
    textDecorationLine:"underline",
    marginTop:30
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
    marginBottom: 20,
  },

  maincontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    gap:10
  },
  btncontainer:{
    flexDirection:"column",
    gap:20,
    marginBottom:30

  },
  privacytext:{
    color:"#F4F4F6",
    fontFamily:"Poppins-Regular",
    fontSize:11


  },

  legalTexted: {
    color: '#F4F4F6',
    textAlign:'center',
    fontSize: 16,
    fontWeight: "300",
    fontFamily: 'Poppins-Light',

  },
  legalLinked: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
  },
  
});

export default SignIn;
