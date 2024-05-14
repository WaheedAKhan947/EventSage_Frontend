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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
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
    {value: 'Lolita Back bay', label: 'Lolita Back bay'},
    {value: 'Serafina', label: 'Serafina'},
    {value: 'Atlantic Fish', label: 'Atlantic Fish'},
    {value: 'Prima', label: 'Prima'},
  ];

  const selectRestaurant = restaurantValue => {
    setSelectedRestaurant(restaurantValue);
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
          <Text style={styles.selectedRestaurant}>
            {selectedRestaurant || 'Select Restaurant'}
          </Text>
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
              {restaurants.map((restaurant, index) => (
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
  selectedRestaurant: {
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
