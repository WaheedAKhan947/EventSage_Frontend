import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import CountryPicker from '../CountryPickerDropdown/Countrypicker'; // Make sure to import the correct CountryPicker component
import StorageManager from '../../storage/StorageManager';
import {ENDPOINTS} from '../../api/apiRoutes';
import API from '../../api/apiService';

const PaymentMethod = ({navigation}: any) => {
  const [selectedCountry, setSelectedCountry] = useState<String>('');
  const [zipCode, setZipCode] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const handlePayment = async () => {
    if (loading) {
      return;
    }
    if (!selectedCountry || !cardNumber || !exp || !cvv || !zipCode) {
      throw new Error('Please fill in all required fields.');
    }

    const paymentData = {
      regionOrCountry: selectedCountry,
      cardNumber,
      expiryDate: exp,
      cvv,
      zipCode,
    };
    try {
      setLoading(true);
      let userId = await StorageManager.get('userId');
      let response = await API.post(
        `${ENDPOINTS.USER.CARDINFO}/${userId}`,
        paymentData,
      );
      await StorageManager.put('userData', response.user);
      Alert.alert('Success', response?.message);
      navigation.navigate('reservation');
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Failed to process payment. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumberChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCardNumber(numericValue);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectCountry = (country: any) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <Image
            source={require('../../assets/tutu_white.png')}
            style={styles.logo}
          />
        </View>
      </View>

      <View style={{flex: 1, flexDirection: 'column', gap: 10}}>
        <Text style={styles.title}>PAYMENT INFORMATION</Text>
        <Text style={styles.maincontent}>Lets add a payment method.</Text>
      </View>

      <View style={{flex: 2, flexDirection: 'column', gap: 30}}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/wcard.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#fff"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="numeric"
            maxLength={16}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.halfWidth, styles.dropdownContainer]}>
            <Image
              source={require('../../assets/wcalendar.png')}
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder="Exp: MM/YYYY"
              placeholderTextColor="#fff"
              value={exp}
              onChangeText={setExp}
            />
          </View>

          <View style={[styles.halfWidth, styles.dropdownContainer]}>
            <Image
              source={require('../../assets/wcvv.png')}
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              maxLength={3}
              value={cvv}
              onChangeText={text => {
                if (/^\d*$/.test(text)) {
                  setCVV(text);
                }
              }}
            />
          </View>
        </View>
        <View>
          <CountryPicker onValueChange={setSelectedCountry} />
        </View>
        <View style={[styles.fullWidth, styles.dropdownContainer]}>
          <Image
            source={require('../../assets/wzip.png')}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            maxLength={3}
            value={zipCode}
            onChangeText={setZipCode}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 40,
        }}>
        <View>
          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Save card & continue</Text>
          </TouchableOpacity>
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
    fontSize: 16,
    paddingTop: 30,
  },
  countryPickerContainer: {
    color: '#fff',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '45%',
  },
  fullWidth: {
    width: '100%',
  },
  dropdownText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 'auto',
    fontFamily: 'IbarraRealNova-Regular',
  },

  dropdownIcon: {
    width: 20,
    height: 20,
  },
  maincontent: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },

  buttonDone: {
    width: '70%',
    marginTop: 10,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 230,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 126,
    height: 122,
    alignSelf: 'center',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2D0717',
    padding: 20,
    width: '80%',
    color: 'white',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
  },
  icon: {
    marginRight: 12,
    width: 26,
    height: 24,
  },
  totaltext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  textp: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'IbarraRealNova-Regular',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E6E9',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 29,
    color: '#fff',
    fontFamily: 'PlayfairDisplay-SemiBold',
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {},
  headerIcon: {
    width: 30,
    height: 30,
  },
  headerprof: {
    width: 35,
    height: 35,
  },
  modalview: {
    color: 'white',
    width: 271,
    height: 370,
    backgroundColor: '#2D0717',
    alignItems: 'center',
    position: 'relative',
    top: 60,
    right: 30,
  },
  datePicker: {},
});

export default PaymentMethod;
