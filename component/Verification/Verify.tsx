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
import { useNavigation } from '@react-navigation/native';
import Confirmpass from '../Confirmpassword/passwrodConfirm';



const Verify = ({navigation}: any) => {
  const [code, setCode] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [emailID, setEmailID] = useState<string | null>(null);
  const [f1, setf1] = useState('');
  const [f2, setf2] = useState('');
  const [f3, setf3] = useState('');
  const [f4, setf4] = useState('');
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
    emailID?.split('@')[0].slice(0, 3) + '@' + emailID?.split('@')[1];
    const handleSubmit = async () => {
      const completeCode = f1 + f2 + f3 + f4;  
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
          style={[
            styles.input,
            {borderBottomColor: f1.length >= 1 ? '#242424' : '#FFFFFF'},
          ]}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          value={f1}
          onChangeText={txt => {
            setf1(txt);
            if (txt.length >= 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput
          ref={et2}
          style={[
            styles.input,
            {borderBottomColor: f2.length >= 1 ? '#242424' : '#FFFFFF'},
          ]}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          value={f2}
          onChangeText={txt => {
            setf2(txt);
            if (txt.length >= 1) {
              et3.current.focus();
            } else if (txt.length < 1) {
              et1.current.focus();
            }
          }}
        />
        <TextInput
          ref={et3}
          style={[
            styles.input,
            {borderBottomColor: f3.length >= 1 ? '#242424' : '#FFFFFF'},
          ]}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          value={f3}
          onChangeText={txt => {
            setf3(txt);
            if (txt.length >= 1) {
              et4.current.focus();
            } else if (txt.length < 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput
          ref={et4}
          style={[
            styles.input,
            {borderBottomColor: f4.length >= 1 ? '#242424' : '#FFFFFF'},
          ]}
          onChangeText={text => setCode(text)}
          value={code}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={true}
          placeholderTextColor="#FFFFFF"
          value={f4}
          onChangeText={txt => {
            setf4(txt);
            if (txt.length >= 1) {
              et4.current.focus();
            } else if (txt.length < 1) {
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
        <View style={{alignItems: 'center', marginTop: 50}}>
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
    fontFamily: 'Poppins',
    borderBottomWidth: 2,
    borderBottomColor: '#E6E6E9',
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
    fontFamily: 'Poppins',
    textAlign: 'center',
    lineHeight: 25,
  },
  hidden: {
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 345,
    fontSize: 32,
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
    fontFamily: 'Poppins',
  },
  resend: {
    marginTop: 20,
    alignItems: 'flex-start',
    fontSize: '16',
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
    marginTop: 10,
  },
});

export default Verify;