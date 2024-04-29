import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView, StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Verify = ({ navigation }: any) => {
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

  const hiddenPart = emailID?.split('@')[0].slice(0, 3) + '@' + emailID?.split('@')[1];

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
          response.data.message || 'Verification successful, please update your password!',
        );
        navigation.navigate('confirmation', { email: emailID });
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data.message || 'Failed to verify code!');
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
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.title}>Forgot Password</Text>
        <View>
  <Text style={styles.subtitle}>
    Password recovery email sent to{' '}
  </Text>
  <View style={styles.hiddenContainer}>
    <Text style={{color:"#fff",fontSize:16}}>{hiddenPart}</Text>
  </View>
</View>
      </View>
      <OTPInputView
        style={{width: '100%', height: 70}}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />


      <OTPInputView
        style={styles.otpInput}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => setCode(code)}
      />
      <View style={styles.seccont}>
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
      <View>
        <View style={{ alignItems: 'center',marginTop:100}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical:30
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
    flexDirection: 'row', 
    color:"#fff",
    alignItems:"center",
    justifyContent:"center"
    
  },
  hidden: {
    color:"#fff"
  },
  icon: {
    marginRight: 10,
    width: 26,
    height: 24,
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
    fontFamily: 'poppins',
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#F4F4F6',
    fontFamily: 'Poppins',
    textAlign: 'center',
    lineHeight: 25,
    fontWeight:"500"
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 345,
    fontSize: 32,
    color: '#F4F4F6',
    fontWeight: '600',
    fontFamily: 'IbarraRealNova-Regular',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  maincontent: {
    marginTop: 20,
    alignItems: 'center',
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
  foottext: {
    flexDirection: 'row',
    color: '#E581AB',
    fontFamily: 'Poppins',
  },
  resend: {
    alignItems: 'flex-start',
    fontSize: 16,
    paddingHorizontal:20,
    fontWeight: '500',
  },
  contactsup: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  contactupText: {
    color: '#F4F4F6',
    fontFamily: 'Poppins',
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
   
  },
  borderStyleBase: {
    width: 40,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#fff",
  },

  underlineStyleBase: {
    width: 80,
    height: 60,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize:30
  },

  underlineStyleHighLighted: {
    borderColor: "#fff",
  },
  otpInput: {
    marginTop:30,
    width: '90%',
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Verify;
