import React, {useEffect, useState} from 'react';
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
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import DropdownComponent from '../ResturantDropDown/DropDown';
import ProfileDropdown from '../ProfileDpdown/ProfileDropdown';
import {ENDPOINTS} from '../../api/apiRoutes';
import API from '../../api/apiService';

const Reservation = ({}: any) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const startDate = getFormatedDate(tomorrow, 'YYYY/MM/DD');
  const [selectedOption, setSelectedOption] = useState('');
  const [guests, setGuests] = useState<Number>(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [pricePerHead, setPricePerHead] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [selectedPreferredTime, setSelectedPreferredTime] =
    useState<Date | null>(null);
  const [selectedBackupTime, setSelectedBackupTime] = useState<Date | null>(
    null,
  );
  const [showPreferredTimePicker, setShowPreferredTimePicker] = useState(false);
  const [showBackupTimePicker, setShowBackupTimePicker] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);

  const handleMouseEnter = (index: number) => {
    setHoveredItemIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredItemIndex(null);
  };

  const handleReservation = async () => {
    try {
      if (
        !selectedOption ||
        !date ||
        !guests ||
        !selectedBackupTime ||
        !selectedPreferredTime ||
        !pricePerHead ||
        !totalPayments
      ) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      const reservationData = {
        restaurant: selectedOption,
        date: date,
        guests: guests,
        preferredTime: selectedPreferredTime,
        backupTime: selectedBackupTime,
        pricePerHead: pricePerHead,
        totalPayments: totalPayments,
      };

      const response = await API.post(
        ENDPOINTS.USER.RESERVATION,
        reservationData,
      );
      console.log('respoonse :', response);
      if (response.success) {
        Alert.alert('Success', response.message || 'Reservation successful');
      } else {
        const errorMessage = response.message || 'Something went wrong.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      Alert.alert(
        'Error Reservation:',
        'Failed to make reservation. Please try again later.',
      );
    }
  };

  const showPreferredTimePickerModal = () => {
    setShowPreferredTimePicker(true);
  };

  const showBackupTimePickerModal = () => {
    setShowBackupTimePicker(true);
  };

  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleChange = (propDate: any) => {
    setDate(propDate);
  };
  const updateTotalPrice = () => {
    const total = guests * pricePerHead;
    setTotalPayments(total);
  };

  useEffect(() => {
    const total = guests * pricePerHead;
    setTotalPayments(total);
  }, [guests, pricePerHead]);

  function handleLogout(): void {
    setIsDropdownVisible(false);
  }

  function handleAccountSettings(): void {
    setIsDropdownVisible(false);
  }

  function handleClose(): void {
    setIsDropdownVisible(false);
  }

  const guestsOptions = [
    100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800,
    850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
    2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000,
  ]; // Example options
  const priceOptions = [
    500, 600, 700, 800, 900, 1000, 1200, 1500, 1750, 2000, 2500, 3000,
  ]; // Example price options

  const handleGuestSelect = (guest: number) => {
    setGuests(guest);
    setModalVisible(false);
    updateTotalPrice();
  };

  const handlePriceSelect = (price: number) => {
    setPricePerHead(price);
    setPriceModalVisible(false);
    updateTotalPrice();
  };
  const generatePreferredTimes = () => {
    const preferredTimes = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        preferredTimes.push({hour, minute});
      }
    }
    return preferredTimes;
  };
  const generateBackupTimes = () => {
    const backupTimes = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        backupTimes.push({hour, minute});
      }
    }
    return backupTimes;
  };

  const preferredTimes = generatePreferredTimes();
  const backupTimes = generateBackupTimes();

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
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
        <View>
          <Image
            source={require('../../assets/Logo2.png')}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.pagecontent}>
        <Text style={styles.title}>RESERVATION REQUEST</Text>
        <Text style={styles.subtitle}>Make your first reservations</Text>
      </View>
      <View style={{flex: 2, flexDirection: 'column'}}>
        <View style={{gap: 20}}>
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
                      textHeaderFontSize: 20,
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
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <ScrollView>
                    {guestsOptions.map(guest => (
                      <TouchableOpacity
                        key={guest}
                        onPress={() => handleGuestSelect(guest)}>
                        <Text style={[styles.modalItem]}>{guest}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          {/* <Text>Time from to</Text> */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.dropdownContainer, styles.halfWidth]}
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
                      {[
                        ...Array(Math.ceil(preferredTimes.length / 3)).keys(),
                      ].map(rowIndex => (
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
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            )}
            <TouchableOpacity
              style={[styles.dropdownContainer, styles.halfWidth]}
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
                                      selectedBackupTime &&
                                        selectedBackupTime.getHours() ===
                                          time.hour &&
                                        selectedBackupTime.getMinutes() ===
                                          time.minute && {
                                          backgroundColor: '#FFFFFF',
                                          color: '#000000',
                                        },
                                    ]}
                                    onPressIn={() => handleMouseEnter(index)}
                                    onPressOut={handleMouseLeave}>
                                    {time.hour > 12
                                      ? time.hour - 12
                                      : time.hour}
                                    :{time.minute === 0 ? '00' : '30'}{' '}
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
          <View style={[styles.row, styles.dropdownContainer]}>
            <TouchableOpacity
              style={[styles.row, styles.dropdownContainer]}
              onPress={() => setPriceModalVisible(true)}>
              <Image
                source={require('../../assets/wcard.png')}
                style={styles.image}
              />
              <TextInput
                style={styles.dropdownText}
                value={`RS ${pricePerHead}`}
                placeholder="Price per Head"
                placeholderTextColor="#E6E6E9"
                editable={false}
              />
              <Image
                source={require('../../assets/selectdp.png')}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={priceModalVisible}
              onRequestClose={() => setPriceModalVisible(false)}>
              <View style={styles.centeredview}>
                <View style={styles.modalview}>
                  <Text style={styles.modalTitle}>Select Price per Head</Text>
                  <ScrollView>
                    {priceOptions.map(price => (
                      <TouchableOpacity
                        key={price}
                        onPress={() => handlePriceSelect(price)}
                        style={styles.modalOption}>
                        <Text
                          style={[
                            styles.modalOptionText,
                            price === pricePerHead && styles.selectedOptionText,
                          ]}>
                          RS {price}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.totaltext}>
          <Text style={styles.text}>Total Price:</Text>
          <Text style={styles.textp}>RS {totalPayments}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
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
    margin: 5,
  },
  modalpref: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    bottom: 75,
  },
  modalback: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    top: 30,
  },
  modalprefcont: {
    backgroundColor: '#242424',
    borderRadius: 10,
    color: 'white',
    width: '95%',
    maxHeight: 220,
    padding: 10,
  },
  modalItem: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#3E3E3E',
    fontFamily: 'Poppins-Regular',
    paddingVertical: 5,
    margin: 4,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#1B3132',
    paddingTop: 10,
  },
  pagecontent: {
    flex: 1,
    justifyContent: 'center',
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
    width: '100%',
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
    marginBottom: 12,
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
    height: 75,
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
    top: 95,
    left: 70,
  },
  modalContent: {
    backgroundColor: '#242424',
    alignItems: 'center',
    width: 120,
    height: 300,
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
    marginTop: 10,
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
    justifyContent: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerprof: {
    width: 30,
    height: 30,
    position: 'relative',
    top: 10,
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
    backgroundColor: '#242424',
    alignItems: 'center',
  },
  datePicker: {
    backgroundColor: '#242424',
  },
  btn: {
    backgroundColor: '#3E3E3E',
  },
  modalItemHovered: {
    backgroundColor: '#242424',
    color: '#000000',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  modalOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalOptionText: {
    fontSize: 18,
    color: '#E6E6E9',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  okButton: {
    backgroundColor: '#F7931E',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginTop: 16,
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Reservation;
