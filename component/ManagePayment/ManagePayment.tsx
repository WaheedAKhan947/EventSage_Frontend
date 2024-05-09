import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import API, { ENDPOINTS } from '../../api/apiService';
import StorageManager from '../../storage/StorageManager';

const ManagePayment = ({ navigation }: any) => {
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (isFocused) {
      fetchCardInfo();
      if (scrollViewRef.current) {
        (scrollViewRef.current as ScrollView).scrollTo({ y: 0, animated: false });
      }
    }
  }, [isFocused]);
  const fetchCardInfo = async () => {
    try {
      const userData = await StorageManager.get('userData');

      console.log('User Data:', userData);
      setPaymentMethods(userData.cardInfo);
      setName(userData.fullName);
    } catch (error) {
      console.log('error', error);
    }
  };

  const [paymentMethods, setPaymentMethods] = useState([
    {
      _id: '',
      fullName: '',
      cardType: '',
      holderName: '',
      addedDate: '',
      cardNumber: '',
      date: '',
      expiryDate: '',
    },
  ]);

  const deletePaymentMethod = async (idToDelete: string) => {
    try {
      const response = await API.deleteResource(
        `${ENDPOINTS.USER.CARDINFO}/${idToDelete}`,
      );
      await StorageManager.put('userData', response.user);
      console.log(response);
      setPaymentMethods(response.user.cardInfo);


      console.log('Card deleted successfully');
    } catch (error) {
      console.log('Error deleting card:', error);
      throw new Error('Failed to delete card. Please try again later.');
    }
  };

  const formatDate = (date: any) => {
    let date1 = new Date(date);
    // const options = {
    //   year: 'numeric', 
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit', 
    //   minute: '2-digit', 
    //   second: '2-digit', 
    //   hour12: true, 
    // };
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    const formattedDateTime = date1.toLocaleString(undefined, options);
    

    return formattedDateTime;
  };

  const addPaymentMethod = () => {
    navigation.navigate('paymentmethod');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ paddingVertical: 40, marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/wback.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20 }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 32,
            fontFamily: 'PlayfairDisplay-SemiBold',
            textAlign: 'center',

          }}>
          PAYMENT METHODS
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.reservationsContainer}>
        {paymentMethods.map(method => (
          <View key={method._id} style={styles.mainbox}>
            <View style={styles.box1}>
              <Text style={styles.cardText}>{method.cardNumber}</Text>
              <TouchableOpacity onPress={() => deletePaymentMethod(method._id)}>
                <Image source={require('../../assets/wdlt.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.box2}>
              <View style={styles.b1}>
                <Text style={styles.holderName}>{name}</Text>
                <Text style={styles.dateText}>
                  Added on: {formatDate(method.date)}
                </Text>
              </View>
              <View style={styles.b2}>
                <Image source={require('../../assets/wpay.png')} />
              </View>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addNew} onPress={addPaymentMethod}>
          <Image source={require('../../assets/addnew.png')} />
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>
      </ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  holderName: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  dateText: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  mainbox: {
    maxHeight: 180,
    padding: 10,
    backgroundColor: '#1B1B1B',
    borderRadius: 10,
    marginTop: 10,
  },
  reservationsContainer: {
    flex: 1,
    marginBottom: 80


  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
  },
  box2: {
    height: '50%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  b1: {},
  b2: {},
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  main: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  addNew: {
    flexDirection: 'row',

    padding: 10,
    marginTop: 10,

  },
  addNewText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default ManagePayment;






