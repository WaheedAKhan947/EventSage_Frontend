import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import CountriesList from '../../assets/Data/countries.json'

const CountryPicker = ({ onValueChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  type Countries = {
    name: string;
    code: string;
  };
  
  let countriesList:Countries[]= CountriesList


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectCountry = (countryValue:String) => {
    setSelectedCountry(countryValue);
    onValueChange(countryValue);
    setShowDropdown(false);
  };

  const renderItem = ({ item, index }: { item: Countries; index: number }) => (
    <TouchableOpacity
      key={index}
      style={styles.dropdownItem}
      onPress={() => selectCountry(item.code)}>
      <Text style={styles.dropdownItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <View style={{flexDirection:"row"}}>
          <Image
            source={require('../../assets/wcountry.png')}
          />
          <Text style={styles.selectedCountry}>{selectedCountry || 'Select Country'}</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/selectdp.png')} 
            style={styles.dropdownIcon}
          />
        </View>
      </TouchableOpacity>
      {showDropdown && (
        <ScrollView style={styles.dropdownContent}>
          {/* {countriesList?.map((country, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => selectCountry(country.code)}>
              <Text style={styles.dropdownItemText}>{country.name}</Text>
            </TouchableOpacity>
          ))} */}
{showDropdown && (
        <FlatList
          data={countriesList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}


        </ScrollView>
      )}
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
      justifyContent:"space-between"
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
    dropdownContent: {
      position: 'absolute',
      backgroundColor: '#242424',
      width: "100%",
      maxHeight: 300,
      borderRadius: 10,
      top: 40,
      zIndex: 999, 
      paddingHorizontal: 20,
    },
    dropdownItem: {
      paddingVertical: 20,
      justifyContent:"center",
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
