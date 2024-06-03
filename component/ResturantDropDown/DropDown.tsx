import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';

const DropdownComponent = ({onValueChange}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventType, setEventType] = useState(null);
  const events = [
    {value: 'Wedding Event', label: 'Wedding Event'},
    {value: 'Engagement ceremony', label: 'Engagement ceremony'},
    {value: 'Corporate Event', label: 'Corporate Event'},
    {value: 'Cultural Event', label: 'Cultural Event'},
    {value: 'Sports Event', label: 'Sports Event'},
    {value: 'Concert', label: 'Concert'},
    {value: 'Festival', label: 'Festival'},
    {value: 'Exhibition', label: 'Exhibition'},
    {value: 'Birthday Party', label: 'Birthday Party'},
    {value: 'Graduation Party', label: 'Graduation Party'},
    {value: 'Workshops and Seminars', label: 'Workshops and Seminars'},
    {value: 'Award Ceremony', label: 'Award Ceremony'},
    {value: 'Networking Event', label: 'Networking Event'},
    {value: 'Fashion Show', label: 'Fashion Show'},
  ];

  const selectRestaurant = restaurantValue => {
    setEventType(restaurantValue);
    onValueChange(restaurantValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownButton}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../../assets/building.png')} />
          <Text style={styles.eventType}>{eventType || 'Event Type'}</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/selectdp.png')}
            style={styles.dropdownIcon}
          />
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {events.map((restaurant, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectRestaurant(restaurant.value)}>
                  <Text style={styles.modalItem}>{restaurant.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
    height: 50,
    justifyContent: 'space-between',
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  eventType: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
    top: 100,
  },
  modalContent: {
    backgroundColor: '#242424',
    padding: 20,
    borderRadius: 10,
    maxHeight: 300,
    width: '95%',
  },
  modalItem: {
    paddingVertical: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default DropdownComponent;
