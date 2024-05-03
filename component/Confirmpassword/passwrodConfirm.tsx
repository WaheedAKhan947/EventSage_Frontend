import React, {useEffect, useState,useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Confirmpass = ({navigation}: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [emailID, setEmailID] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  const confirmpasswordFloatingLabelAnimation = useRef(new Animated.Value(0)).current;
  // const navigation = useNavigation();
  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setEmailID(email);
    };

    fetchEmail();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return Alert.alert(
        'Error',
        'The passwords do not match. Please try again.',
      );
    }
    if (newPassword?.length < 5) {
      return Alert.alert(
        'Error',
        'please enter valid the password length will be atleat 6.',
      );
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/resetPassword',
        {
          email: emailID,
          newPassword: confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', response.data.message || 'successfully updated');
        navigation.navigate('Login');
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.response
        ? error.response.data.message
        : 'Something went wrong.';
      Alert.alert('Error', errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex:2,justifyContent:"center",}}>
      <View>
     <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />
        </View>
        </View>

         <View style={{flex:1,alignItems:"center",}}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>
           Enter a different password with the previous
        </Text>
     </View> 


     <View style={{flex:3,}}>
     <View style={{ flexDirection: "column", gap: 40}}>
      <View style={styles.inputContainer}>
      <Animated.Text style={[styles.label, passwordFloatingLabelStyle]}>Password</Animated.Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#FFFFFF"
            value={newPassword}
            onChangeText={setNewPassword}
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


        <View style={styles.inputContainer}>
        <Animated.Text style={[styles.label, confirmpasswordFloatingLabelStyle]}>Confirm Password</Animated.Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#FFFFFF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword2}
            onFocus={handleConfirmPasswordFocus}
              onBlur={handleBlur}
          />

          <TouchableOpacity onPress={togglePasswordVisibility2}>
            <Image
              source={require('../../assets/hiddenpass.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        </View>
        </View>

       <View style={{flex:1,alignItems:"center",justifyContent:"flex-end",}}>
     <TouchableOpacity
          style={styles.button}
          onPress={handleChangePassword}
          disabled={loading}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View> 

    </ScrollView>


  );
 };

 const styles = StyleSheet.create({

  container:{
    flex:1,
   paddingHorizontal:20,
  backgroundColor: '#000',

  },
    logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
  },
    subtitle: {
    fontSize: 16,
    color: '#F4F4F6',
    fontFamily: 'Poppins-Light',
  },
  title: {
    fontSize: 30,
    color: '#F4F4F6',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
    input: {
      flex:1,
    height:50,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent:"space-between"
  },
    icon: {
    marginBottom: 5,
    width: 20,
    height: 20,
    tintColor: 'white',
  },
    button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height:60
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  label: {
    position: "absolute",
    color: "#E6E6E9",
    fontFamily: "Poppins-Light",
    fontSize: 13,
  },

});

export default Confirmpass;