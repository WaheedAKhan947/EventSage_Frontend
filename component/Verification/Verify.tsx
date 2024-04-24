import React, {useEffect, useRef, useState} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Verify = ({navigation}: any) => {
  const [code, setCode] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [emailID, setEmailID] = useState<string | null>(null);
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setEmailID(email);
    };

    fetchEmail();
  }, []);

  const hiddenPart =
    emailID?.split('@')[0].slice(0, 3) + '****@' + emailID?.split('@')[1];
  const handleSubmit = async () => {
    try {
      if (!code) {
        return Alert.alert('please enter the code!');
      }
      setLoading(true);
      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/confirmOtp',
        {
          email: emailID,
          otp: code,
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
          response.data.message || 'please update your password!',
        );
        navigation.navigate('confirmpass');
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'please enter valid code!');
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
        console.log(response);
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

  const handleContactSupport = () => {};

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
        <Text style={styles.subtitle}>
          Password recovery email sent to{' '}
          <Text style={styles.hidden}>{hiddenPart}</Text>
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          ref={et1}
          style={styles.input}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          onChangeText={txt => {
            if (txt.length >= 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput
          ref={et2}
          style={styles.input}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          onChangeText={txt => {
            if (txt.length >= 1) {
              et3.current.focus();
            }
            else if (txt.length<1){
              et1.current.focus();
            }
          }}
        />
        <TextInput
          ref={et3}
          style={styles.input}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          onChangeText={txt => {
            if (txt.length >= 1) {
              et4.current.focus();
            }
            else if (txt.length<1){
              et2.current.focus();
            }
          }}
        />
        <TextInput
          ref={et4}
          style={styles.input}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          onChangeText={txt => {
            if (txt.length >= 1) {
              et4.current.focus();
            }
            else if (txt.length<1){
              et3.current.focus();
            }
          }}
        />
      </View>

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
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.contactsup}>
          <TouchableOpacity onPress={handleContactSupport}>
            <Text style={styles.contactsupText}>
              Still not working?{' '}
              <Text style={styles.link}>Contact Support</Text>
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 24,
    height: 24,
  },
  input: {
    textAlign: 'center',
    width: 50,
    height: 60,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'IbarraRealNova-Regular',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginTop: 80,
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
    fontFamily: 'IbarraRealNova-Regular',
    textAlign: 'center',
  },
  hidden: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    width: 345,
    color: '#F4F4F6',
    fontWeight: '600',
    fontFamily: 'IbarraRealNova-Regular',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  maincontent: {
    marginTop: 30,
    marginBottom: 40,
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
    fontFamily: 'IbarraRealNova-Regular',
  },
  resend: {
    alignItems: 'flex-start',
    fontWeight: '500',
  },
  contactsup: {
    color: '#F4F4F6',
  },
  contactupText: {
    color: '#F4F4F6',
  },
  resendLink: {
    textDecorationLine: 'underline',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  link: {
    textDecorationLine: 'underline',
  },
  seccont: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
});

export default Verify;
