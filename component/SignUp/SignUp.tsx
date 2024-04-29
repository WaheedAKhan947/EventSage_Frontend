import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';


const SignUp = ({navigation}: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const apiUrl = process.env.apiUrl;
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
      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/signup',
        JSON.stringify({
          fullName,
          email,
          phone,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const responseData = response.data;
    
        Alert.alert('Success', responseData.message || 'Sign-up successful!');
        navigation.navigate('Login');
      } else {
        const errorMessage =
          response.data.message ||
          'Email or phoneNo already exist or Something went wrong.';
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
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/tutu_white.png')}
        style={styles.logo}
      />
      <View style={{flex:1, flexDirection:"column",gap:10,marginTop:10}}>
      <Text style={styles.title}>Let's Get Started!</Text>
      <View style={styles.ascontainer}>
        <Text style={styles.legalTexted}>Already have an account? </Text>
        <Text
          style={styles.legalLinked}
          onPress={() => navigation.navigate('Login')}>
          Sign In
        </Text>
      </View>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#fff"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

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
          placeholder="Phone"
          placeholderTextColor="#fff"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
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
         
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          
        </TouchableOpacity>
      </View>
     
<View>
<View style={{ alignItems: "center",marginTop:20}}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={isSigningUp}>
          <Text style={styles.buttonText}>
            {isSigningUp ? 'Signing Up' : 'Sign Up'}
          </Text>
      </TouchableOpacity>
      </View>

     

      <View style={styles.legalLinks}>
        <Text style={styles.legalText}>By signing in, I accept the </Text>
        <Text style={styles.legalLink}>Terms of Service</Text>
        <Text style={styles.legalText}> and </Text>
        <Text
          onPress={() => navigation.navigate('dropdown')}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems:"center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Playfair Display',
  },
  subtitle: {
    fontSize: 16,
    width: 269,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: 'IbarraRealNova-Regular',
  },
  txt: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'IbarraRealNova-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical:13,
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
    fontFamily: 'poppins',
  },

  logo: {
    width: 126,
    height: 125,
    alignSelf: 'center',
  },
  ascontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center"
  },
  legalLinks: {
    width: 350,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'poppins',
  },
  legalText: {
    fontFamily: 'poppins',
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
  },
  legalLink: {
    fontFamily: 'poppins',
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
  },

  legalTexted: {
    fontFamily: 'poppins',
    fontWeight:"300",
    color: '#fff',
    fontSize: 16,
  },
  legalLinked: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
