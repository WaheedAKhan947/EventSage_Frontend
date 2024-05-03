import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Verify = ({navigation}: any) => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailID, setEmailID] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setEmailID(email);
    };

    fetchEmail();
  }, []);

  const hiddenPart =
    emailID?.split('@')[0].slice(0, 3) + '@' + emailID?.split('@')[1];

  const handleSubmit = async () => {
    const completeCode = code;
    if (completeCode.length < 4) {
      Alert.alert('Error', 'Please enter the complete code!');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/confirmOtp',
        {
          email: emailID,
          otp: completeCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        Alert.alert(
          'Success',
          response.data.message ||
          'Verification successful, please update your password!',
        );
        navigation.navigate('confirmation', { email: emailID });
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data.message || 'Failed to verify code!',
      );
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/sendOtp',
        JSON.stringify({
          email: emailID,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response?.status === 200) {
        const responseData = response.data;
        Alert.alert('Success', responseData.message || 'Otp send to you email');
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
      setLoading(false);
    }
  };

  const handleContactSupport = () => { };

  return (
    <View style={styles.container}>
      <View style={{flex:3,justifyContent:"center"}}>
      <View>
      <Image
        source={require('../../assets/tutu_white.png')}
        style={styles.logo}
      />
      </View>
      </View>

      
      <View style={styles.maincontent}>
        <View>
        <Text style={styles.title}>Forgot Password</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Password recovery email sent to </Text>
          <View style={styles.hiddenContainer}>
            <Text style={{color: '#fff', fontSize: 16}}>{hiddenPart}</Text>
          </View>
        </View>
      </View>

      <View style={{ flex:3,}}>
      <OTPInputView
        style={styles.otpInput}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => setCode(code)}
      />
     
        <View style={styles.resend}>
          <Text style={styles.vertext}>
            <TouchableOpacity onPress={handlePasswordReset} disabled={loading}>
              <Text style={[styles.resendLink, styles.vertext]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
        </View>
      
      <View style={{flex:2,justifyContent:"flex-end"}}>
        <View style={{alignItems: 'center',}}>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactsup}>
          <TouchableOpacity onPress={handleContactSupport}>
            <Text style={styles.contactupText}>
              Still not working? <Text>Contact Support</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
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
  },
  input: {
    textAlign: 'center',
    width: 50,
    height: 60,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Poppins',
    borderBottomWidth: 2,
    borderBottomColor: '#E6E6E9',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hiddenContainer: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 160,
  },

  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
    marginTop: 30,
    // marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#F4F4F6',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    lineHeight: 25,
  },
  title: {
   textAlign:"center",
    fontSize: 32,
    color: '#F4F4F6',
    fontFamily: 'PlayfairDisplay-Bold',
    textTransform: 'uppercase',
  },
  maincontent: {
    flex:3,
    alignItems:"center",
    gap:5,
  },
  verifycode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertext: {
    color: '#FFFFFF',
    fontFamily: 'IbarraRealNova-Regular',
    fontSize: 16,
  },

  resend: {
    alignItems: 'flex-start',
    fontSize: 16,
    paddingHorizontal: 20,
    fontWeight: '500',
    color:"#fff",
    marginTop:20
  },
  contactsup: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  contactupText: {
    color: '#F4F4F6',
    fontFamily: 'Poppins-Light',
    fontSize: 11,
    fontWeight: '300',
  },
  resendLink: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  seccont: {
    alignItems: 'flex-start',
    marginTop: 25,
  },
  borderStyleBase: {
    width: 40,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#fff',
  },

  underlineStyleBase: {
    width: 70,
    height: 60,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 30,
  },

  underlineStyleHighLighted: {
    borderColor: '#fff',
  },
  otpInput: {
    width: '90%',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
   
  },
});

export default Verify;
