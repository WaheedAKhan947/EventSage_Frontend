import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';


const SignIn = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
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
      const response = await axios.post(
        `https://jittery-tan-millipede.cyclic.app/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const responseData = response.data;

        const userIds = responseData.user._id;
        const userId = userIds.toString();
        const tokens = responseData.token;
        const token = tokens.toString();
        await AsyncStorage.setItem('userId', userId);
        Alert.alert('Success', responseData.message || 'Sign-in successful!');
        navigation.navigate('reservation');
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
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />

        <View style={styles.maincontainer}>
          <Text style={{ fontSize:32,color: "white",fontFamily:"PlayfairDisplay-SemiBold" }}>LOGIN</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.legalTexted}>Don't have an account? </Text>
            <Text
              style={styles.legalLinked}
              onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Text>
          </View>
        </View>


        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={require('../../assets/hiddenpass.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View >
            <TouchableOpacity onPress={() => navigation.navigate('forget')}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View>
          <View style={{ alignItems: "center",marginTop:100 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignIn}
              disabled={isSigningIn}>
              <Text style={styles.buttonText}>
                {isSigningIn ? 'Login' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>



          <View style={styles.legalLinks}>
            <Text style={styles.legalText}>By signing in, I accept the </Text>
            <Text style={styles.legalLink}>Terms of Service</Text>
            <Text style={styles.legalText}> and </Text>
            <Text
              onPress={() => navigation.navigate('reservation')}
              style={styles.legalLink}>
              Community Guidelines
            </Text>
            <Text style={styles.legalText}> and have read the </Text>
            <Text
              onPress={() => navigation.navigate('privacy')}
              style={styles.legalLink}>
              {' '}
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical:40,
    backgroundColor: '#000000',

  },

  txt: {
    fontSize: 14,
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginVertical: 20,
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
    width: 160
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
    textDecorationLine: "underline",
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
    marginTop: 30,
  },

  legalLinks: {
    marginTop: 10,
    width: 350,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Poppins-Light"
  },
  legalText: {
    color: '#F4F4F6',
    fontSize: 11,
    fontWeight: "300",
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
  legalLink: {
    fontSize: 11,
    fontWeight: "300",
    color: '#F4F4F6',
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },

  legalTexted: {
    color: '#F4F4F6',
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
