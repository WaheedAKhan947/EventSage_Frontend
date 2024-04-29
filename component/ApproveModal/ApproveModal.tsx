import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import BottomTabNavigator from '../AdminBottomNavigator/BottomTabNavigator';


interface ApproveModalProps {
  onClose: () => void;
  onDeny: () => void;
  onApprove: () => void;
}

const ApproveModal: React.FC<ApproveModalProps> = ({ onClose, onDeny, onApprove }) => {
    const [selectedPreferredTime, setSelectedPreferredTime] = useState(
        new Date(),
      );
  return (
    <View style={styles.container}>
        <View>
            <Text style={{color:"#E6E6E9",fontSize:13}}>Update time</Text>
        </View>
        <TouchableOpacity
          style={styles.dropdownContainer}
        //   onPress={showPreferredTimePickerModal}
        >
          <Image
            source={require('../../assets/selecttime.png')}
            style={styles.image}
          />
          <Text style={styles.dropdownText}>
            {selectedPreferredTime.toLocaleTimeString()}
          </Text>
          <Image
            source={require('../../assets/selectdp.png')}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>

        
        <View style={styles.btns}>
              <View>
                <TouchableOpacity style={styles.Dbutton}>
                  <Text style={styles.DbuttonText}>Deny</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.button} >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
              </View>
            </View>
       
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#353535',
    height:200,
    padding:10
   
  },
  dropdownText: {
    fontSize: 16,
    color: '#E6E6E9',
    marginRight: 'auto',
    fontFamily: 'Poppins',

  },

  dropdownIcon: {
    width: 20,
    height: 20,

  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    height: 40,
    marginVertical: 15
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  btns:{
    flexDirection:"row",
    gap:10,
    marginTop:10
  },
  Dbutton:{
    borderWidth:1,
    borderColor:"#fff",
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height:60
    
  },
  DbuttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'poppins',
    
  },
  button: {
    backgroundColor: '#E6E6E9',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height:60
  },
 
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'poppins',
  },

});

export default ApproveModal;
