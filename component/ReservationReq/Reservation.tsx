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
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import DropdownComponent from '../ResturantDropDown/DropDown';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProfileDropdown from '../ProfileDpdown/ProfileDropdown';
import StorageManager from '../../storage/StorageManager';
import { ENDPOINTS } from '../../api/apiRoutes';
import API from '../../api/apiService';
import DropdownModal from '../Modals/DropdownModal';


const Reservation = ({ navigation }: any) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const apiUrl = process.env.apiUrl;

  const startDate = getFormatedDate(tomorrow, 'YYYY/MM/DD');

  const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [fullName, setFullName] = useState('');
  const [reservationResturantModal, setReservationResturantModal] = useState(false)

  console.log("reservationResturantModal :",reservationResturantModal)
  const [guests, setGuests] = useState<Number>(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [totalPayments, setTotalPayments] = useState(100);
  const [selectedPreferredTime, setSelectedPreferredTime] =
    useState<Date | null>(null);
  const [selectedBackupTime, setSelectedBackupTime] = useState<Date | null>(
    null,
  );
  const [showPreferredTimePicker, setShowPreferredTimePicker] = useState(false);
  const [showBackupTimePicker, setShowBackupTimePicker] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);

  const handleMouseEnter = index => {
    setHoveredItemIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredItemIndex(null);
  };

  const handleReservation = async () => {
    try {
      
      if (!selectedOption || !date || !guests || !selectedBackupTime || !selectedPreferredTime || !totalPayments) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
  
      const reservationData = {
        restaurant: selectedOption,
        date: date,
        guests: guests,
        preferredTime: selectedPreferredTime,
        backupTime: selectedBackupTime,
        totalPayments: totalPayments,
      };
  
      const userId = await StorageManager.get('userId');
      const response = await API.post(ENDPOINTS.USER.RESERVATION, reservationData);
      console.log("respoonse :",response)
      if (response.success) {
        Alert.alert('Success', response.message || 'Reservation successful');
      } else {
        const errorMessage = response.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      Alert.alert('Error Reservation:', 'Failed to make reservation. Please try again later.');
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
      setTotalPayments(100);
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
      setTotalPayments(125);
    } else {
      setTotalPayments(100);
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

  const handleGuestSelect = (guest: number) => {
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

//  const  handleSelectResturantModal=()=>{
//   console.log("handle select ")
//     setReservationResturantModal(!reservationResturantModal);
//   }


  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
    {/* {reservationResturantModal &&  <DropdownModal  setOpen={setReservationResturantModal} open={reservationResturantModal}/>} */}
      <View style={styles.headercon}>
        <View>
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
            <Image
              source={require('../../assets/confirmed_logo.png')}
              style={styles.logo}
            />
    
        </View>
      </View>

      <View style={styles.pagecontent}>
        <Text style={styles.title}>RESERVATION REQUEST</Text>
        <Text style={styles.subtitle}>Make your first reservations</Text>
      </View>

      <View style={{ flex: 2, flexDirection: "column" }}>
        <View style={{ gap: 30 }}>
          <DropdownComponent onValueChange={setSelectedOption} />


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
                placeholderTextColor="#E6E6E9"
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
                      selectedTextColor: '#000000',
                      mainColor: '#ffffff',
                      textFontSize: 20,
                      textHeaderFontSize: 20
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

            <TouchableOpacity
              style={[styles.halfWidth, styles.dropdownContainer]}
              onPress={() => setModalVisible(true)}>
              <Image
                source={require('../../assets/users22.png')}
                style={styles.image}
              />
              <Text style={styles.dropdownText}>
                {guests ? `${guests}` : 'Select Guests'}
              </Text>

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
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <ScrollView >
                    {guestsOptions.map(guest => (
                      <TouchableOpacity
                        key={guest}
                        onPress={() => handleGuestSelect(guest)}>
                        <Text
                          style={[
                            styles.modalItem,
                            {
                              color: 'white',
                              borderBottomWidth: 1,
                              borderBottomColor: '#E6E6E9',

                            },
                          ]}>
                          {guest}
                        </Text>
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
            onPress={showPreferredTimePickerModal}>
            <Image
              source={require('../../assets/selecttime.png')}
              style={styles.image}
            />
            <Text style={styles.dropdownText}>
              {selectedPreferredTime
                ? selectedPreferredTime.toLocaleTimeString()
                : 'Prefer Time'}
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
              onRequestClose={() => setShowPreferredTimePicker(false)}>
              <View style={styles.modalpref}>
                <View style={styles.modalprefcont}>
                  <ScrollView>
                    {[...Array(Math.ceil(preferredTimes.length / 3)).keys()].map(
                      rowIndex => (
                        <View key={rowIndex} style={styles.modalRow}>
                          {preferredTimes
                            .slice(rowIndex * 3, (rowIndex + 1) * 3)
                            .map((time, index) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  const newDate = new Date();
                                  newDate.setHours(time.hour);
                                  newDate.setMinutes(time.minute);
                                  setSelectedPreferredTime(newDate);
                                  setShowPreferredTimePicker(false);
                                }}>
                                <Text
                                  onPressIn={() => handleMouseEnter(index)}
                                  onPressOut={handleMouseLeave}
                                  style={[
                                    styles.modalItem,
                                    hoveredItemIndex === index &&
                                    styles.modalItemHovered,
                                    // Check if this time is selected
                                    selectedPreferredTime &&
                                    selectedPreferredTime.getHours() ===
                                    time.hour &&
                                    selectedPreferredTime.getMinutes() ===
                                    time.minute && {
                                      backgroundColor: '#FFFFFF', // White background
                                      color: '#000000', // Gray text color
                                    },
                                  ]}>
                                  {time.hour > 12 ? time.hour - 12 : time.hour}:
                                  {time.minute === 0 ? '00' : '30'}{' '}
                                  <Text
                                    style={{
                                      color:
                                        selectedPreferredTime &&
                                          selectedPreferredTime.getHours() ===
                                          time.hour &&
                                          selectedPreferredTime.getMinutes() ===
                                          time.minute
                                          ? '#000000'
                                          : '#FFFFFF',
                                    }}>
                                    {time.hour >= 12 ? 'AM' : 'PM'}
                                  </Text>
                                </Text>
                              </TouchableOpacity>
                            ))}
                        </View>
                      ),
                    )}
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
              {selectedBackupTime
                ? selectedBackupTime.toLocaleTimeString()
                : 'Backup Time'}
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
              onRequestClose={() => setShowBackupTimePicker(false)}>
              <View style={styles.modalback}>
                <View style={styles.modalprefcont}>
                  <ScrollView>
                    {[...Array(Math.ceil(backupTimes.length / 3)).keys()].map(
                      rowIndex => (
                        <View key={rowIndex} style={styles.modalRow}>
                          {backupTimes
                            .slice(rowIndex * 3, (rowIndex + 1) * 3)
                            .map((time, index) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  const newDate = new Date();
                                  newDate.setHours(time.hour);
                                  newDate.setMinutes(time.minute);
                                  setSelectedBackupTime(newDate);
                                  setShowBackupTimePicker(false);
                                }}>
                                <Text
                                  style={[
                                    styles.modalItem,
                                    hoveredItemIndex === index &&
                                    styles.modalItemHovered,
                                    // Check if this time is selected
                                    selectedBackupTime &&
                                    selectedBackupTime.getHours() ===
                                    time.hour &&
                                    selectedBackupTime.getMinutes() ===
                                    time.minute && {
                                      backgroundColor: '#FFFFFF', // White background when selected
                                      color: '#000000', // Black text color when selected
                                    },
                                  ]}
                                  onPressIn={() => handleMouseEnter(index)}
                                  onPressOut={handleMouseLeave}>
                                  {time.hour > 12 ? time.hour - 12 : time.hour}:
                                  {time.minute === 0 ? '00' : '30'}{' '}
                                  <Text
                                    style={{
                                      color:
                                        selectedBackupTime &&
                                          selectedBackupTime.getHours() ===
                                          time.hour &&
                                          selectedBackupTime.getMinutes() ===
                                          time.minute
                                          ? '#000000'
                                          : '#FFFFFF',
                                    }}>
                                    {time.hour >= 12 ? 'AM' : 'PM'}
                                  </Text>
                                </Text>
                              </TouchableOpacity>
                            ))}
                        </View>

                      ),
                    )}
                  </ScrollView>
                </View>

              </View>
            </Modal>
          )}
        </View>

        <View style={styles.totaltext}>
          {/* <TouchableOpacity onPress={handleSelectResturantModal}> */}

          <Text style={styles.text}>Total price:</Text>
          {/* </TouchableOpacity> */}
          <Text style={styles.textp}>$ {totalPayments}</Text>
        </View>
       

      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 35,

        }}>
        <TouchableOpacity style={styles.button} onPress={handleReservation}>
          <Text style={styles.buttonText}>Request Reservation</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:5,
    
  },
  modalpref: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    bottom: 45,

  },
  modalback: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    top: 34



  },
  modalprefcont: {
    backgroundColor: '#242424',
    borderRadius: 10,
    color: 'white',
   padding:10,
    width: "95%",
    maxHeight: 260,

  },
  modalItem: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    borderRadius: 10,
    width: 110,
    height: 40,
    backgroundColor: "#3E3E3E",
    fontFamily: "Poppins-Regular",
    alignItems:"center"
    

  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#000000',
    paddingTop:10
  },
  pagecontent: {
     flex: 1,
     justifyContent:"center"
  },
  headerContainer: {
    marginLeft: "auto",
    marginRight: 'auto'
  
  },

  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E6E6E9',
    height: 50,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '47%',
  },
  dropdownText: {
    fontSize: 16,
    color: '#E6E6E9',
    marginRight: 'auto',
    fontFamily: 'Poppins-Regular',

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
    width: 230,
  },
  scrollView: {

    color: '#fff',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 155,
    height: 50,
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
    position: 'relative',
    top: 160,
    left: 65
  },
  modalContent: {
    backgroundColor: '#242424',
    alignItems: "center",
    width: 110,
    height: 250,
    color: '#fff',


  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    
    width: 26,
    height: 24,
  },
  totaltext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  textp: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E6E9',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'PlayfairDisplay-SemiBold',
    textAlign: 'center',
   
  },

  headercon: {
    flex: 1,
    justifyContent: "center",
  
  },
 
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerprof: {
    width: 30,
    height: 30,
    position:"relative",
    top:30
    
  },
  centeredview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalview: {
    color: 'white',
    width: 400,
    height: 300,
    backgroundColor: '#2D0717',
    alignItems: 'center',


  },
  datePicker: {
    backgroundColor: '#242424',
  },
  btn: {
    backgroundColor: '#3E3E3E',
  },
  modalItemHovered: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
});

export default Reservation;