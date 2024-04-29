import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';

const PaymentMehtod = ({navigation}: any) => {

 
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const [zipCode, setZipCode] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const handleCardNumberChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCardNumber(numericValue);
  };
  
  

  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectCountry = (country: any) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerButton}>
        <Image
          source={require('../../assets/wback.png')}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../../assets/tutu_white.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <Text style={styles.title}>PAYMENT INFORMATION</Text>

      <Text style={styles.maincontent}>
        Lets add a payment method.
      </Text>

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/wcard.png')} style={styles.icon} />
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
            placeholder="Exp: MM/YY"
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
      <View style={[styles.fullWidth, styles.dropdownContainer]}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={toggleDropdown}>
        <Image
          source={require('../../assets/wcountry.png')}
          style={styles.image}
        />
        <Text style={{ color: '#fff' }}>
          {selectedCountry ? selectedCountry.name : 'Country or region'} 
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <CountryPicker
          
          withCountryNameButton
          withAlphaFilter
          withCallingCode
          onSelect={handleSelectCountry}
          countryCode={selectedCountry?.cca2}
        />
      )}

      <TouchableOpacity onPress={toggleDropdown}>
        <Image
          source={require('../../assets/selectdp.png')}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
    </View>
      <View style={[styles.fullWidth, styles.dropdownContainer]}>
        <Image source={require('../../assets/wzip.png')} style={styles.image} />
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

      <View style={{ flex: 1, alignSelf: "center", justifyContent: "flex-end", marginBottom: 40 }}>
          <TouchableOpacity style={styles.button} onPress={PaymentMehtod}>

            <Text style={styles.buttonText}>Save card & continue</Text>

          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countryPickerContainer: {
    
    color:"#fff"
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#000',
    fontSize: 16,
    
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
    marginBottom: 15,
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
    width: 230
  },


  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom:30
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
    fontFamily: 'Poppins',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
    marginVertical:20,
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
    marginTop: 8,
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
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'IbarraRealNova-Regular',
    textAlign: 'center',
    marginBottom:10
   
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -20,
  },
  headerButton: {
    marginTop: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  headerprof: {
    width: 35,
    height: 35,
  },
  centeredview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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

export default PaymentMehtod;
