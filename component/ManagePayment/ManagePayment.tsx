import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ManagePayment = ({navigation}: any) => {
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      cardType: 'MasterCard ****1256',
      holderName: 'Eric Sullivan',
      addedDate: '12 Feb, 2024'
    },
    // You can add more payment methods here
  ]);

  // Function to delete a payment method
  const deletePaymentMethod = (id) => {
    setPaymentMethods(prevMethods => prevMethods.filter(method => method.id !== id));
  };
  return (
    <View style={styles.container}>
      <View >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/wback.png')}
          />
        </TouchableOpacity>
        <View>
          <Text style={{color:"#fff",fontSize:30,fontFamily: 'IbarraRealNova-Regular',textAlign:"center",marginTop:20}}>PAYMENT METHODS</Text>
        </View>

        {paymentMethods.map((method) => (
        <View key={method.id} style={styles.mainbox}>
          <View style={styles.box1}>
            <Text style={styles.cardText}>{method.cardType}</Text>
            <TouchableOpacity onPress={() => deletePaymentMethod(method.id)}>
              <Image source={require('../../assets/wdlt.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <View style={styles.b1}>
              <Text style={styles.holderName}>{method.holderName}</Text>
              <Text style={styles.dateText}>Added on: {method.addedDate}</Text>
            </View>
            <View style={styles.b2}>
              <Image source={require("../../assets/wpay.png")} />
            </View>
          </View>
        </View>
      ))}

        <View style={styles.main}>
        <Image source={require("../../assets/addnew.png")}
              />
              <Text  style={{fontSize:13,color:"#fff"}}>Add New</Text>
        </View>

  
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    color: "#fff",
  },
  holderName: {
    fontSize: 20,
    color: "#fff",
  },
  dateText: {
    fontSize: 13,
    color: "#fff",
  },
  mainbox:{
    maxHeight:180,
    padding:10,
    backgroundColor:"#1B1B1B",
    borderRadius:10,
    marginTop:20
  },
  box1:{
    flexDirection:"row",
    justifyContent:"space-between",
    height:"50%"
  },
  box2:{
    height:"50%",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center"

  },
  b1:{
   
  },
  b2:{
   
  },
  container: {
    flex: 1,
    backgroundColor:"#000",
    paddingHorizontal:10,
    paddingVertical:20
  },
  main:{
    flexDirection:"row",
    padding:20,
    gap:10
  }
  
});

export default ManagePayment;
