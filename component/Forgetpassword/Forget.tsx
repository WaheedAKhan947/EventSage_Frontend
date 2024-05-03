import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Animated
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Forget = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const emailFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/sendOtp',
        JSON.stringify({
          email,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const responseData = response.data;
        console.log(response);
        await AsyncStorage.setItem('userEmail', email);
        Alert.alert(
          'Success',
          responseData.message || 'send email succesfull!',
        );
        navigation.navigate('verification');
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
      setIsSigningUp(false);
    }
  }

    const handleEmailFocus = () => {
      Animated.timing(emailFloatingLabelAnimation, {
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
  
  
  return (
      <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
        <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />
        </View>

        <View style={{marginTop:20}}>
          <Text style={styles.title}>Forget Password</Text>
          <Text style={styles.subtitle}>Enter your registered email below</Text>
        </View>
        
        <View style={styles.main1}>
        <View >
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
        </View>
        <View style={{alignItems:"center"}} >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handlePasswordReset();
            }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{flexDirection:"row",marginTop:10}}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.legalTexted}>Remember the password? </Text>
            <Text style={styles.legalLinked}>Sign In</Text>
          </TouchableOpacity>
        </View>
     
      </View>
     </View>
      </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  main1:{
    flexDirection:"column",
    justifyContent:"space-between",
    height:400,
   marginTop:60
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    paddingHorizontal:20,
    paddingVertical:40,
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
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    
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
    margin: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
  },
  ascontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },

  legalTexted: {
    color: '#F4F4F6',
    fontSize: 11,
    fontFamily: 'Poppins-Light',
  },
  legalLinked: {
    fontSize: 11,
    color: '#F4F4F6',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    marginTop: 10,
    marginHorizontal: -20,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#F4F4F6',
    fontFamily: 'Poppins-Light',
    textAlign:"center"
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '600',
    color: '#F4F4F6',
    fontFamily: 'PlayfairDisplay-SemiBold',
    marginTop: 40,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  maincontent: {
    // marginBottom: 50,
    alignItems: 'center',
  },
  
  
   label:{
    position:"absolute",
    color:"#E6E6E9",
    fontFamily:"Poppins-Light",
    fontSize:13,
  },
});

export default Forget;
