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

      console.log('userdadjfdfjkegilgjerhkrekh:', userData);
      setPaymentMethods(userData.cardInfo);
      setName(userData.fullName);
    } catch (error) {
      console.log('error', error);
    }
  };

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '',
      fullName: '',
      cardType: '',
      holderName: '',
      addedDate: '',
      cardNumber: '',
      expiryDate: '',
    },
  ]);

  const deletePaymentMethod = (id: string) => {
    console.log('id : ', id);

    setPaymentMethods(prevMethods =>
      prevMethods.filter(method => method.id !== id),
    );
  };

  const addPaymentMethod = () => {
    navigation.navigate('paymentmethod');
  };
  return (
    <View  style={styles.container}>
      <View style={{paddingVertical:40,marginTop:20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/wback.png')} />
        </TouchableOpacity>
        </View>
        <View style={{paddingVertical:20}}>
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
          <View key={method.id} style={styles.mainbox}>
            <View style={styles.box1}>
              <Text style={styles.cardText}>{method.cardNumber}</Text>
              <TouchableOpacity onPress={() => deletePaymentMethod(method.id)}>
                <Image source={require('../../assets/wdlt.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.box2}>
              <View style={styles.b1}>
                <Text style={styles.holderName}>{name}</Text>
                <Text style={styles.dateText}>
                  Added on: {method?.expiryDate}
                </Text>
              </View>
              <View style={styles.b2}>
                <Image source={require('../../assets/wpay.png')} />
              </View>
            </View>
          </View>
        ))}
        </ScrollView>

        <TouchableOpacity style={styles.addNew} onPress={addPaymentMethod}>
          <Image source={require('../../assets/addnew.png')} />
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>
      
    </View>
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
   paddingTop:10
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






