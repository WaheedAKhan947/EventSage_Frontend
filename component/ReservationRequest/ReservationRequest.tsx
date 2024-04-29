import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View,ScrollView,Modal} from 'react-native';
import ApproveModal from '../ApproveModal/ApproveModal';
import BottomTabNavigator from '../AdminBottomNavigator/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';

const ReservationRequest = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDeny = () => {
    // Logic for denying action
    toggleModal();
  };

  const handleApprove = () => {
    // Logic for approving action
    toggleModal();
  };

  const handleSelectPreferredTime = () => {
    // Logic for selecting preferred time
    toggleModal();
  };
  const data = [
    {
      id: '1',
      name: 'Eric Sullivan',
      restaurant: "Tony's Pizza Napoletana",
      price: '$50,00',
      preferredTime: '2:30 PM',
      backupTime: '3:00 PM',
      guests: '2',
    },
    {
      id: '1',
      name: 'Eric Sullivan',
      restaurant: "Tony's Pizza Napoletana",
      price: '$50,00',
      preferredTime: '2:30 PM',
      backupTime: '3:00 PM',
      guests: '2',
    },
  
  ]
  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/wback.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        </View>

        <View style={{marginTop:20}}>
          <Text style={styles.maintext}>RESERVATION</Text>
          <Text style={styles.maintext}>REQUESTS</Text>
        </View>

        <View>
          <Text style={{color:"#fff",marginTop:20}}>11 Feb, 2024</Text>
        </View>

        {data.map((item, index) => (
        <View key={index} style={styles.mainbox}>
          <View style={styles.box1}>
            <View style={styles.b1}>
              <View style={styles.a1}>
                <Text style={{ color: "#fff",fontSize:13 }}>{item.name}</Text>
                <Text style={{ color: "#fff", fontSize: 16 }}>{item.restaurant}</Text>
              </View>
              <View style={styles.a2}>
                <Text style={{ color: "#E6E6E9",fontSize:13 }}>Price</Text>
                <Text style={{ color: "#51C2FC", fontSize: 14 }}>{item.price}</Text>
              </View>
            </View>
            <View style={styles.b2}>
              <View style={styles.c1}>
                <Text style={{ color: "#E6E6E9",fontSize:13 }}>Preferred time</Text>
                <Text style={{ color: "#fff", fontSize: 14 }}>{item.preferredTime}</Text>
              </View>
              <View style={styles.c2}>
                <Text style={{ color: "#E6E6E9",fontSize:13 }}>Backup time</Text>
                <Text style={{ color: "#fff", fontSize: 14 }}>{item.backupTime}</Text>
              </View>
              <View style={styles.c3}>
                <Text style={{ color: "#E6E6E9",fontSize:13 }}>Guests</Text>
                <Text style={{ color: "#fff", fontSize: 14 }}>{item.guests}</Text>
              </View>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={styles.pay}>
              <Image source={require('../../assets/payverify.png')} />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#20EB63" }}>Payment</Text>
                <Text style={{ color: "#20EB63" }}>Verified</Text>
              </View>
            </View>
            <View style={styles.btns}>
              <View>
                <TouchableOpacity style={styles.Dbutton}>
                  <Text style={styles.DbuttonText}>Deny</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
       <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
        style={styles.modalBackground}
          
          onPress={toggleModal}
        >
           <View style={styles.modalContainer}>
      <View >
        <ApproveModal
          onClose={toggleModal}
          onDeny={handleDeny}
          onApprove={handleApprove}
        />
      </View>
    </View>
        </TouchableOpacity>
      </Modal>

        
    
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Align modal to the bottom
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align modal to the bottom
  },
 
  
  btns:{
    flexDirection:"row",
    gap:10

  },
  pay:{
    flexDirection:"row",
    gap:10,
    alignItems:"center"
  },
  b1:{
    flexDirection:"row",
    justifyContent:"space-between"
    
  },
  b2:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  container: {
    flexGrow:1,
    backgroundColor: '#000',
    paddingHorizontal:10,
    paddingVertical:25

  },
  headerIcon:{
    width:30,
    height:30
  },
  maintext:{
    fontSize:32,
    color:"#fff",
    fontFamily: 'IbarraRealNova-Regular',
    textAlign:"center"
    
  },
  mainbox:{
    height:230,
    backgroundColor:"#1B1B1B",
    borderRadius:10,
    marginTop:20,
  },
  box1:{
    height:"65%",
    flexDirection:"column",
    padding:15,
    gap:30
  },
  box2:{
    height:"35%",
    borderTopWidth:0.5,
    borderColor:"#E6E6E9",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:15,
  },
  Dbutton:{
    borderWidth:1,
    borderColor:"#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    
  },
  DbuttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'poppins',
    
  },
  button: {
    backgroundColor: '#E6E6E9',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
 
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  a1:{

  },
  a2:{

  },
  c1:{},c2:{},c3:{}
  
});

export default ReservationRequest;
