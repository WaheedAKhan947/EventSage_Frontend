import React, {useState, useRef} from 'react';
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

const SignUp = ({navigation}: any) => {
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
  const confirmpasswordFloatingLabelAnimation = useRef(
    new Animated.Value(0),
  ).current;
  const phonenumberFloatingLabelAnimation = useRef(
    new Animated.Value(0),
  ).current;

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
      const payload = {fullName, email, phone, password, confirmPassword};
      const response = await API.post(ENDPOINTS.USER.SIGNUP, payload);
      if (response?.success) {
        const userId = response.user._id;
        const userIdString = userId.toString();
        const userData = response.user;
        const userDataString = JSON.stringify(userData);

        await StorageManager.put('userId', userIdString);
        await StorageManager.put('userData', userDataString);
        Alert.alert('Success', response.message || 'Sign-up successful!');
        navigation.navigate('Login');
      } else {
        const errorMessage = response.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.message || 'Something went wrong.';
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
      outputRange: [10, -10],
    }),
    fontSize: fullnameFloatingLabelAnimation.interpolate({
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

  const confirmpasswordFloatingLabelStyle = {
    top: confirmpasswordFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: confirmpasswordFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  const phonenumberFloatingLabelStyle = {
    top: phonenumberFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: phonenumberFloatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 2, justifyContent: 'center', paddingTop: 5}}>
        <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      </View>

      <View style={styles.maincontainer}>
        <Text
          style={{
            fontSize: 32,
            color: 'white',
            fontFamily: 'PlayfairDisplay-SemiBold',
          }}>
          LETS GET STARTED!
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.legalTexted}>Already have an account? </Text>
          <Text
            style={styles.legalLinked}
            onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </View>
      </View>
      <View style={styles.main1}>
        <View style={{flexDirection: 'column', gap: 30}}>
          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label, fullnameFloatingLabelStyle]}>
              Full Name
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              onFocus={handleNameFocus}
              onBlur={handleBlur}
            />
          </View>

          <View style={styles.inputContainer}>
            <Animated.Text style={[styles.label, emailFloatingLabelStyle]}>
              Email
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={handleEmailFocus}
              onBlur={handleBlur}
            />
          </View>
          <View style={styles.inputContainer}>
            <Animated.Text
              style={[styles.label, phonenumberFloatingLabelStyle]}>
              Phone Number
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              onFocus={handlePhoneFocus}
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
              onFocus={handlePasswordFocus}
              onBlur={handleBlur}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={require('../../assets/hiddenpass.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Animated.Text
              style={[styles.label, confirmpasswordFloatingLabelStyle]}>
              Confirm Password
            </Animated.Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={handleConfirmPasswordFocus}
              onBlur={handleBlur}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={require('../../assets/hiddenpass.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.btncontainer}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={isSigningUp}>
            <Text style={styles.buttonText}>
              {isSigningUp ? 'loading..' : 'Sign Up'}
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
              marginBottom: 10,
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
    backgroundColor: '#1B3132',
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
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
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
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
  },
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
    marginLeft: 5,
  },
  icon: {
    marginBottom: 5,
    width: 20,
    height: 20,
  },
  btncontainer: {
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'flex-end',
  },
  privacytext: {
    color: '#F4F4F6',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
  },
});

export default SignUp;
