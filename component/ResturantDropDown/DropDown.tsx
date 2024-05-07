// import React, {useState} from 'react';
// import {Image, StyleSheet, Text, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';

// const restaurants = [
//   {value: 'Mastros', label: 'Mastros'},
//   {value: 'STK', label: 'STK'},
//   {value: "Abe & Louie's", label: "Abe & Louie's"},
//   {value: 'Savr', label: 'Savr'},
//   {value: 'Mariel', label: 'Mariel'},
//   {value: 'Yvonnes', label: 'Yvonnes'},
//   {value: 'Ruka', label: 'Ruka'},
//   {value: 'Caveau', label: 'Caveau'},
//   {value: 'Grille 23', label: 'Grille 23'},
//   {value: 'Lolita Fort Point', label: 'Lolita Fort Point'},
//   {value: 'Lolita Fort Point', label: 'Lolita Back bay'},
//   {value: 'Serafina', label: 'Serafina'},
//   {value: 'Atlantic Fish', label: 'Atlantic Fish'},
//   {value: 'Prima', label: 'Prima'},
// ];

// const DropdownComponent = ({
//   onValueChange,
// }: {
//   onValueChange: (value: string) => void;
// }) => {
//   const [value, setValue] = useState<string | null>(null);
//   const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && {color: '#fff'}]}>
//           Select Resturant
//         </Text>
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       {renderLabel()}
//       <Image
//         source={require('../../assets/building.png')}
//         style={styles.inputImage}
//       />
//       <Dropdown
//         style={[
//           styles.dropdown,
//           {borderBottomWidth: 1, borderColor: '#fff'},
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         itemContainerStyle={styles.itemContainer}
//         itemTextStyle={styles.itemTextStyle}   
//         iconStyle={styles.iconStyle}
//         data={restaurants}
//         activeColor="#242424"
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? 'Select Restaurant' : ''}
//         value={value}
//         iconColor="#E6E6E9"
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           setValue(item.value);
//           setIsFocus(false);
//           onValueChange(item.value);
//         }}
//       />
//     </View>
//   );
// };

// export default DropdownComponent;

// const styles = StyleSheet.create({
//   itemTextStyle: {
//     color: '#fff',  
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//      borderBottomWidth:1,
//     borderBottomColor:"#E6E6E9",
//     padding:4

//   },
//   container: {
//     paddingVertical: 8,
    

//   },
//   dropdown: {
//     height: 45,
//     alignItems:"center",
    
//   },
//   icon: {
//     marginRight: 10,
//   },
//   label: {
//     position: 'absolute',
//     left: 22,
//     top: 20,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 16,
//     color: '#fff',
//     fontFamily: 'Poppins-Medium',
//   },
//   placeholderStyle: {
//     marginLeft: 35,
//     fontSize: 16,
//     color: '#fff',
//     fontFamily: 'Poppins-Medium',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: '#fff',
//     marginLeft: 30,
//     marginTop:10,
//     fontFamily: 'Poppins',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//     position: 'relative',
  
//   },
//   inputSearchStyle: {
    
//     fontSize: 16,
//     backgroundColor: '#242424',
//     color: '#fff',
//     fontFamily: 'Poppins',
//   },
//   itemContainer: {
//     backgroundColor: '#242424',
//     color: 'white',   
//   },

//   inputImage: {
//     width: 20,
//     height: 20,
//     zIndex: 999,
//     top: 35,
//   },
// });

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// const DropdownComponent = () => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
//         <Image
//           source={require('../../assets/selectdp.png')} // Change this to your custom image path
//           style={styles.dropdownIcon}
//         />
//       </TouchableOpacity>
//       {showDropdown && (
//         <View style={styles.dropdownContent}>
//           {/* Your dropdown content here */}
//           <Text>Option 1</Text>
//           <Text>Option 2</Text>
//           <Text>Option 3</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
    
//   },
//   dropdownButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#fff',
//     height: 45,
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//     justifyContent:"flex-end"
    
//   },
//   dropdownIcon: {
//     width: 20,
//     height: 20,

//   },
//   dropdownContent: {
//     position: 'absolute',
//     backgroundColor: '#242424',
//    width:"100%",
//    height:300,
//    borderRadius:5,
//    top:40

//   },
// });

// export default DropdownComponent;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const DropdownComponent = ({ onValueChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const restaurants = [
    { value: 'Mastros', label: 'Mastros' },
    { value: 'STK', label: 'STK' },
    { value: "Abe & Louie's", label: "Abe & Louie's" },
    { value: 'Savr', label: 'Savr' },
    { value: 'Mariel', label: 'Mariel' },
    { value: 'Yvonnes', label: 'Yvonnes' },
    { value: 'Ruka', label: 'Ruka' },
    { value: 'Caveau', label: 'Caveau' },
    { value: 'Grille 23', label: 'Grille 23' },
    { value: 'Lolita Fort Point', label: 'Lolita Fort Point' },
    { value: 'Lolita Back bay', label: 'Lolita Back bay' },
    { value: 'Serafina', label: 'Serafina' },
    { value: 'Atlantic Fish', label: 'Atlantic Fish' },
    { value: 'Prima', label: 'Prima' },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectRestaurant = (restaurantValue) => {
    setSelectedRestaurant(restaurantValue);
    onValueChange(restaurantValue);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <View style={{flexDirection:"row"}}>
       <Image
        source={require('../../assets/building.png')}
      />
       
        <Text style={styles.selectedRestaurant}>{selectedRestaurant || 'Select Restaurant'}</Text>
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
          {restaurants.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => selectRestaurant(restaurant.value)}>
              <Text style={styles.dropdownItemText}>{restaurant.label}</Text>
            </TouchableOpacity>
          ))}
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
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
    height: 50,
    justifyContent: 'space-between'
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  selectedRestaurant: {
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

export default DropdownComponent;

