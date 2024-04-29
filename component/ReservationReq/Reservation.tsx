import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import DropdownComponent from '../ResturantDropDown/DropDown';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProfileDropdown from '../ProfileDpdown/ProfileDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Reservation = ({ navigation }: any) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const apiUrl = process.env.apiUrl;

  const startDate = getFormatedDate(tomorrow, 'YYYY/MM/DD');

  const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [fullName, setFullName] = useState('');

  const [guests, setGuests] = useState<Number>(0);
  const [exp, setExp] = useState('');
  const [cvv, setCVV] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(100);
  const [selectedPreferredTime, setSelectedPreferredTime] = useState<Date | null>(null);
  const [selectedBackupTime, setSelectedBackupTime] = useState< Date | null>(null);
  const [showPreferredTimePicker, setShowPreferredTimePicker] = useState(false);
  const [showBackupTimePicker, setShowBackupTimePicker] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleReservation = async () => {
    console.log('resturant', selectedOption);
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    console.log(userId);
    console.log(token);

    if (!userId || !token) {
      Alert.alert('Error', 'User ID or token not found.');
      return;
    }

    if (
      !selectedOption ||
      !date ||
      !guests ||
      !selectedBackupTime ||
      !selectedPreferredTime ||
      !cardNumber ||
      !fullName ||
      !exp ||
      !cvv
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(
        'https://jittery-tan-millipede.cyclic.app/api/v1/auth/reservation',
        {
          restaurant: selectedOption,
          date: date,
          guests: guests,
          preferredTime: selectedPreferredTime,
          backupTime: selectedBackupTime,
          fullName,
          cardNumber: cardNumber,
          expiryDate: exp,
          cvv,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
          },
        },
      );

      console.log('response :', response);
      if (response.status === 200) {
        Alert.alert('reserved succesfully');
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error: any) {
      Alert.alert('Error Reservation:', error);
    }
  };

  const handlePreferredTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || selectedPreferredTime;
    setShowPreferredTimePicker(false);
    setSelectedPreferredTime(currentTime);
  };

  const handleBackupTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || selectedBackupTime;
    setShowBackupTimePicker(false);
    setSelectedBackupTime(currentTime);
  };

  const showPreferredTimePickerModal = () => {
    setShowPreferredTimePicker(true);
  };

  const showBackupTimePickerModal = () => {
    setShowBackupTimePicker(true);
  };

  const [cardNumber, setCardNumber] = useState('');

  const handleCardNumberChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCardNumber(numericValue);
  };

  const handleDropdownSelect = (option: string) => {
    setSelectedOption(option);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleChange = (propDate: any) => {
    setDate(propDate);
  };

  const updateTotalPrice = (restaurant: string, selectedDate: any) => {
    const dateComponents = selectedDate.split('/');
    const year = parseInt(dateComponents[0]);
    const month = parseInt(dateComponents[1]) - 1;
    const day = parseInt(dateComponents[2]);

    const dateObject = new Date(year, month, day);
    if (isNaN(dateObject.getTime())) {
      setTotalPrice(100);
      return;
    }

    const dayOfWeek = dateObject.getDay();
    console.log('dayOfWeek:', dayOfWeek);
    const restaurantsWithSpecialPrice = [
      'Mastros',
      'STK',
      "Abe & Louie's",
      'Savr',
      'Mariel',
      'Yvonnes',
      'Ruka',
      'Caveau',
      'Grille 23',
    ];
    if (
      (dayOfWeek === 5 || dayOfWeek === 6) &&
      restaurantsWithSpecialPrice.includes(restaurant)
    ) {
      setTotalPrice(125);
    } else {
      setTotalPrice(100);
    }
  };

  useEffect(() => {
    if (selectedOption && date) {
      updateTotalPrice(selectedOption, date);
    }
  }, [selectedOption, date]);

  function handleLogout(): void {
    setIsDropdownVisible(false);
  }

  function handleAccountSettings(): void {
    setIsDropdownVisible(false);
  }

  function handleClose(): void {
    setIsDropdownVisible(false);
  }


  const [modalVisible, setModalVisible] = useState(false);
  const guestsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example options

  const handleGuestSelect = (guest:number) => {
    setGuests(guest);
    setModalVisible(false);
  };


  const generatePreferredTimes = () => {
    const preferredTimes = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        preferredTimes.push({ hour, minute });
      }
    }
    return preferredTimes;
  };
  const generateBackupTimes = () => {
    const backupTimes = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        backupTimes.push({ hour, minute });
      }
    }
    return backupTimes;
  };

  const preferredTimes = generatePreferredTimes();
  const backupTimes = generateBackupTimes();


  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headercon}>
          <TouchableOpacity
            onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
            <Image
              source={require('../../assets/menutwo.png')}
              style={styles.headerprof}
            />
            <ProfileDropdown

              isVisible={isDropdownVisible}
              onLogout={handleLogout}
              onAccountSettings={handleAccountSettings}
              onClose={handleClose}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>


          <TouchableOpacity>
            <Image
              source={require('../../assets/confirmed_logo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>

        </View>

        <Text style={styles.title}>RESERVATION REQUEST</Text>
        <Text style={styles.subtitle}>Make your first reservations</Text>

        <View>
          <DropdownComponent onValueChange={setSelectedOption} />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.halfWidth, styles.dropdownContainer]}
            onPress={handleOnPress}>
            <Image
              source={require('../../assets/calendar2.png')}
              style={styles.image}
            />
            <TextInput
              style={styles.dropdownText}
              value={date.toString()}
              placeholder="Date"
              placeholderTextColor="#fff"
              editable={false}
            />
            <Image
              source={require('../../assets/selectdp.png')}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredview}>
              <View style={styles.modalview}>
                <DatePicker
                  options={{
                    textDefaultColor: '#ffffff',
                    textHeaderColor: '#ffffff',
                    textSecondaryColor: '#ffffff',
                    selectedTextColor: '#ffffff',
                    mainColor: '#ffffff',
                  }}
                  style={styles.datePicker}
                  mode="calendar"
                  selected={date}
                  minimumDate={startDate}
                  onDateChange={date => {
                    handleChange(date);
                    setOpen(false);
                  }}
                />

              </View>
            </View>
          </Modal>

          <TouchableOpacity style={[styles.halfWidth, styles.dropdownContainer]} onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../assets/users22.png')}
              style={styles.image}
            />
            <Text style={styles.dropdownText}>{guests ? `${guests}` : 'Select Guests'}</Text>

            <Image
              source={require('../../assets/selectdp.png')}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>

          {/* Modal for guest selection */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView style={styles.scrollView}>
                  {guestsOptions.map((guest) => (
                    <TouchableOpacity key={guest} onPress={() => handleGuestSelect(guest)}>
                      <Text style={[styles.modalItem, { color: 'white', borderBottomWidth: 1, borderBottomColor: '#E6E6E9', paddingVertical: 13 }]}>{guest}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>

        {/* Dropdown for Preferred Time */}
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={showPreferredTimePickerModal}
        >
          <Image
            source={require('../../assets/selecttime.png')}
            style={styles.image}
          />
          <Text style={styles.dropdownText}>
          {selectedPreferredTime ? selectedPreferredTime.toLocaleTimeString() : 'Prefer Time'}
         
          </Text>
          <Image
            source={require('../../assets/selectdp.png')}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>

        {showPreferredTimePicker && (
          <Modal
            transparent={true}
            visible={showPreferredTimePicker}
            animationType="slide"
            onRequestClose={() => setShowPreferredTimePicker(false)}
          >
            <View style={styles.modalpref}>
              <View style={styles.modalprefcont}>
                <ScrollView>
                  {[...Array(Math.ceil(preferredTimes.length / 3)).keys()].map((rowIndex) => (
                    <View key={rowIndex} style={styles.modalRow}>
                      {preferredTimes.slice(rowIndex * 3, (rowIndex + 1) * 3).map((time, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            const newDate = new Date();
                            newDate.setHours(time.hour);
                            newDate.setMinutes(time.minute);
                            setSelectedPreferredTime(newDate);
                            setShowPreferredTimePicker(false);
                          }}
                        >
                          <Text style={styles.modalItem}>
                            {time.hour > 12 ? time.hour - 12 : time.hour}:{time.minute === 0 ? '00' : '30'}{' '}
                            <Text style={{ color: "#fff" }}>{time.hour >= 12 ? 'AM' : 'PM'}</Text>
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}



        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={showBackupTimePickerModal}>
          <Image
            source={require('../../assets/clock-plus.png')}
            style={styles.image}
          />
          <Text style={styles.dropdownText}>
          {selectedBackupTime ? selectedBackupTime.toLocaleTimeString() : 'Backup Time'}
          </Text>
          <Image
            source={require('../../assets/selectdp.png')}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>

        {showBackupTimePicker && (
          <Modal
            transparent={true}
            visible={showBackupTimePicker}
            animationType="slide"
            onRequestClose={() => setShowBackupTimePicker(false)}
          >
            <View style={styles.modalpref}>
              <View style={styles.modalprefcont}>
                <ScrollView>
                  {[...Array(Math.ceil(backupTimes.length / 3)).keys()].map((rowIndex) => (
                    <View key={rowIndex} style={styles.modalRow}>
                      {backupTimes.slice(rowIndex * 3, (rowIndex + 1) * 3).map((time, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            const newDate = new Date();
                            newDate.setHours(time.hour);
                            newDate.setMinutes(time.minute);
                            setSelectedBackupTime(newDate);
                            setShowBackupTimePicker(false);
                          }}
                        >
                          <Text style={styles.modalItem}>
                            {time.hour > 12 ? time.hour - 12 : time.hour}:{time.minute === 0 ? '00' : '30'}{' '}
                            <Text style={{ color: "#fff" }}>{time.hour >= 12 ? 'AM' : 'PM'}</Text>
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}

        <View style={styles.totaltext}>
          <Text style={styles.text}>Total price:</Text>
          <Text style={styles.textp}>$ {totalPrice}</Text>
        </View>

        {/* Modal */}

        <View style={{ flex: 1, alignSelf: "center", justifyContent: "center",marginBottom:20 }}>
          <TouchableOpacity style={styles.button} onPress={handleReservation}>

            <Text style={styles.buttonText}>Request Reservation</Text>

          </TouchableOpacity>
        </View>


      </ScrollView>
      {/* <ReservationFooter  />  */}
    </View>

  );
};

const styles = StyleSheet.create({

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

  },
  modalpref: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    position: "relative",
    bottom: 20,

  },
  modalprefcont: {
    backgroundColor: '#242424',
    borderRadius: 10,
    color: "white",
    padding: 10,
    width: 370,
    maxHeight: 300,
  },
  modalItem: {
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 10,
    color: "#fff",
    backgroundColor: "#353535",
    borderRadius: 5,
    width: 100,
    height: 45

  },
  mainContainer: {
    flex: 1,
    position: 'relative'
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: '#000000',
    fontSize: 16,
    fontFamily: 'IbarraRealNova-Regular',
  },

  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    height: 40,
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
    
  },
  halfWidth: {
    width: '45%',
  },
  dropdownText: {
    fontSize: 16,
    color: '#E6E6E9',
    marginRight: 'auto',
    fontFamily: 'Poppins',

  },

  dropdownIcon: {
    width: 20,
    height: 20,

  },
  maincontent: {
    fontSize: 16,
    color: '#E6E6E9',
    textAlign: 'center',
    padding: 20,
    fontFamily: 'IbarraRealNova-Regular',
  },

  buttonDone: {
    width: '70%',
    marginTop: 10,
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
  scrollView: {
    maxHeight: 200,
    color: "#fff"
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  logo: {
    width: 155,
    height: 50,
    alignSelf: 'center',
    marginVertical: -40
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
    position: "relative",
    top: 75,
    left: 75

  },
  modalContent: {
    backgroundColor: '#242424',
    padding: 5,
    width: 100,
    height: 240,
    color: "#fff"
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  icon: {
    marginRight: 10,
    width: 26,
    height: 24,
  },
  totaltext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  textp: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E6E9',
    textAlign: 'center',
    fontFamily: 'poppins',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: "600",
    fontFamily: 'IbarraRealNova-Regular',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 45
  },
  headerContainer: {
    marginLeft: "auto",
    marginRight: 'auto'

  },
  headercon: {
    marginRight: "auto",

  },
  headerButton: {
    marginTop: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerprof: {
    width: 30,
    height: 30,

  },
  centeredview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  modalview: {
    color: 'white',
    width: 380,
    height: 350,
    backgroundColor: '#2D0717',
    alignItems: 'center',

  },
  datePicker: {
    backgroundColor: "#242424",


  },
});

export default Reservation;