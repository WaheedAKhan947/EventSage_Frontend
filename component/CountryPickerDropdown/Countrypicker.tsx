
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import CountriesList from '../../assets/Data/countries.json'

const CountryPicker = ({ onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countriesList = CountriesList;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const selectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    onValueChange(countryCode);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => selectCountry(item.code)}>
      <Text style={styles.dropdownItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <Image source={require('../../assets/wcountry.png')} />
          <Text style={styles.selectedCountry}>{selectedCountry || 'Select Country'}</Text>
        </View>
        <View>
          <Image source={require('../../assets/selectdp.png')} style={styles.dropdownIcon} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countriesList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
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
    borderBottomWidth: 1.5,
    borderBottomColor: '#E6E6E9',
    height: 50,
    justifyContent: "space-between"
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  selectedCountry: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position:"relative",
    bottom:70
   
  },
  modalContent: {
    backgroundColor: '#242424',
    padding: 20,
    borderRadius: 10,
    maxHeight: 300,
    width: '95%',
  },
  dropdownItem: {
    paddingVertical: 20,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
  },
  dropdownItemText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default CountryPicker;
