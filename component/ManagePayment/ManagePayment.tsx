import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import API, {ENDPOINTS} from '../../api/apiService';
import StorageManager from '../../storage/StorageManager';

const ManagePayment = ({navigation}: any) => {
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const [name, setName] = useState(null); // State to store card info
  const [createAt, setCreatedAt] = useState(null);

  useEffect(() => {
    if (isFocused) {
      fetchCardInfo();
      if (scrollViewRef.current) {
        (scrollViewRef.current as ScrollView).scrollTo({y: 0, animated: false});
      }
    }
  }, [isFocused]);
  const fetchCardInfo = async () => {
    try {
      const userData = await StorageManager.get('userData');

      console.log('User Data:', userData);
      setPaymentMethods(userData.cardInfo);
      setName(userData.fullName);
      con;
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
      date:'',
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

      // Optionally, update the paymentMethods state after successful deletion
      // setPaymentMethods(prevMethods =>
      //   prevMethods.filter(method => method._id !== idToDelete),
      // );
      console.log('Card deleted successfully');
    } catch (error) {
      console.log('Error deleting card:', error);
      // Handle errors, such as displaying an alert or logging the error
      throw new Error('Failed to delete card. Please try again later.');
    }
  };

  const formatDate = (date: any) => {
    let date1 = new Date(date);
    const options = {
      year: 'numeric', // 'numeric', '2-digit'
      month: '2-digit', // 'numeric', '2-digit', 'long', 'short', 'narrow'
      day: '2-digit', // 'numeric', '2-digit'
      hour: '2-digit', // 'numeric', '2-digit'
      minute: '2-digit', // 'numeric', '2-digit'
      second: '2-digit', // 'numeric', '2-digit'
      hour12: true, // Whether to use 12-hour clock (true) or 24-hour clock (false)
    };
    // Format the date and time according to the options
    const formattedDateTime = date1.toLocaleString(undefined, options);

    console.log('Formatted Date and Time: ', formattedDateTime);
    // setCreatedAt(formattedDateTime); // Assuming setCreatedAt is defined somewhere in your component
    return formattedDateTime;
  };

  const addPaymentMethod = () => {
    navigation.navigate('paymentmethod');
  };
  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/wback.png')} />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 32,
              fontFamily: 'PlayfairDisplay-SemiBold',
              textAlign: 'center',
              marginTop: 20,
            }}>
            PAYMENT METHODS
          </Text>
        </View>

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
      </View>
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
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  main: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  addNew: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginBottom: 150,
  },
  addNewText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default ManagePayment;
