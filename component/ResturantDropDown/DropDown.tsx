import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const restaurants = [
  {value: 'Mastros', label: 'Mastros'},
  {value: 'STK', label: 'STK'},
  {value: "Abe & Louie's", label: "Abe & Louie's"},
  {value: 'Savr', label: 'Savr'},
  {value: 'Mariel', label: 'Mariel'},
  {value: 'Yvonnes', label: 'Yvonnes'},
  {value: 'Ruka', label: 'Ruka'},
  {value: 'Caveau', label: 'Caveau'},
  {value: 'Grille 23', label: 'Grille 23'},
  {value: 'Lolita Fort Point', label: 'Lolita Fort Point'},
  {value: 'Lolita Fort Point', label: 'Lolita Back bay'},
  {value: 'Serafina', label: 'Serafina'},
  {value: 'Atlantic Fish', label: 'Atlantic Fish'},
  {value: 'Prima', label: 'Prima'},
];

const DropdownComponent = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: '#fff'}]}>
          Select Resturant
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Image
        source={require('../../assets/building.png')}
        style={styles.inputImage}
      />
      <Dropdown
        style={[
          styles.dropdown,
          {borderBottomWidth: 1, borderColor: '#fff'},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemTextStyle}   
        iconStyle={styles.iconStyle}
        data={restaurants}
        activeColor="#242424"
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Restaurant' : ''}
        value={value}
        iconColor="#fff"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onValueChange(item.value);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  itemTextStyle: {
    color: '#fff',  
    fontSize: 16,
    fontFamily: 'Poppins',
     borderBottomWidth:1,
    borderBottomColor:"#E6E6E9",
    padding:4

  },
  container: {
    paddingVertical: 8,
    

  },
  dropdown: {
    height: 40,
    alignItems:"center",
  },
  icon: {
    marginRight: 10,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 20,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins',
  },
  placeholderStyle: {
    marginLeft: 35,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 30,
    marginTop:10,
    fontFamily: 'Poppins',
  },
  iconStyle: {
    width: 20,
    height: 20,
    position: 'relative',
  
  },
  inputSearchStyle: {
    
    fontSize: 16,
    backgroundColor: '#242424',
    color: '#fff',
    fontFamily: 'Poppins',
  },
  itemContainer: {
    backgroundColor: '#242424',
    color: 'white',   
  },

  inputImage: {
    width: 20,
    height: 20,
    zIndex: 999,
    top: 35,
  },
});
