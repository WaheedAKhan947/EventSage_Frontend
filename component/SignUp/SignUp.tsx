
import React, { useState, useRef } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageManager from '../../storage/StorageManager';

const SignUp = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const emailFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const fullnameFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const passwordFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const confirmpasswordFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const phonenumberFloatingLabelAnimation = useRef(new Animated.Value(0)).current;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (isSigningUp) return;
    setIsSigningUp(true);

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      setIsSigningUp(false);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      setIsSigningUp(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      setIsSigningUp(false);
      return;
    }

    try {
      const payload = { fullName, email, phone, password, confirmPassword };
      const response = await API.post(ENDPOINTS.USER.SIGNUP, payload);
    
      if (response?.success) {
        const userId = response.user._id;
        const userIdString = userId.toString();
        await StorageManager.put("userId", userIdString);
        Alert.alert('Success', response.message || 'Sign-up successful!');
        navigation.navigate('Login');
      } else {
        const errorMessage = response.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error:any) {
      const errorMessage =  error.response?.message || 'Something went wrong.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleEmailFocus = () => {
    Animated.timing(emailFloatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleNameFocus = () => {
    Animated.timing(fullnameFloatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePhoneFocus = () => {
    Animated.timing(phonenumberFloatingLabelAnimation, {
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

  const handleConfirmPasswordFocus = () => {
    Animated.timing(confirmpasswordFloatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    // Check for each input field and animate the label accordingly
    if (!fullName) {
      Animated.timing(fullnameFloatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    if (!email) {
      Animated.timing(emailFloatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    if (!phone) {
      Animated.timing(phonenumberFloatingLabelAnimation, {
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
    if (!confirmPassword) {
      Animated.timing(confirmpasswordFloatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };
  
  // Styles for floating labels
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

  const fullnameFloatingLabelStyle = {
    top: fullnameFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -5],
    }),
    fontSize: fullnameFloatingLabelAnimation.interpolate({
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

  const confirmpasswordFloatingLabelStyle = {
    top: confirmpasswordFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -5],
    }),
    fontSize: confirmpasswordFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  const phonenumberFloatingLabelStyle = {
    top: phonenumberFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -5],
    }),
    fontSize: phonenumberFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <View>
        <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.maincontainer}>
        <Text style={{ fontSize: 32, color: "white", fontFamily: "PlayfairDisplay-SemiBold" }}>LETS GET STARTED!</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.legalTexted}>Already have an account? </Text>
          <Text
            style={styles.legalLinked}
            onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </View>
      </View>
      <View style={styles.main1}>
        <View style={{ flexDirection: "column",gap:30  }}>
          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label, fullnameFloatingLabelStyle]}>Full Name</Animated.Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              onFocus={handleNameFocus}
              onBlur={handleBlur}
            />
          </View>

          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label, emailFloatingLabelStyle]}>Email</Animated.Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={handleEmailFocus}
              onBlur={handleBlur}
            />
          </View>
          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label,phonenumberFloatingLabelStyle ]}>Phone Number</Animated.Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              onFocus={handlePhoneFocus}
              onBlur={handleBlur}
            />
          </View>
          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label,passwordFloatingLabelStyle ]}>Password</Animated.Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              onFocus={handlePasswordFocus}
              onBlur={handleBlur}
            />
          </View>
          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label,passwordFloatingLabelStyle ]}>Confirm Password</Animated.Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={handleConfirmPasswordFocus}
              onBlur={handleBlur}
            />
          </View>

        </View>

      </View>

      <View style={styles.btncontainer}>
          <View style={{ alignItems: "center", marginTop:40}}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={isSigningUp}>
              <Text style={styles.buttonText}>
                {isSigningUp ? 'loading..' : 'Sign Up'}
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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
  },
  main1: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop:30
  
    
  },
  label: {
    position: "absolute",
    color: "#E6E6E9",
    fontFamily: "Poppins-Light",
    fontSize: 13,
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical:10
   
    
  },
  button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
  },
  maincontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    gap:10
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
  btncontainer:{
    flexDirection:"column",
  gap:10

  },
  privacytext:{
    color:"#F4F4F6",
    fontFamily:"Poppins-Regular",
    fontSize:11


  },

});

export default SignUp;
