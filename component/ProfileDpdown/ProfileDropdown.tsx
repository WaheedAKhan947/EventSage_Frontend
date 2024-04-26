import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


interface ProfileDropdownProps {
  isVisible: boolean;
  onLogout: () => void;
  onAccountSettings: () => void;
  onClose: () => void;
}
const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isVisible,
  onLogout,
  onAccountSettings,
  onClose,
}) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    onLogout();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.dropdown}>
          <View style={styles.main}>
            <View style={styles.header}>
              <TouchableOpacity>
                <Image source={require('../../assets/Subtract.png')} 
                  />
                
              </TouchableOpacity>
              <Text style={styles.headname}>Eric Sullivan</Text>
            </View>
            <View>
              <TouchableOpacity onPress={onClose}>
                <Image source={require('../../assets/close.png')}
                style={{ tintColor: '#fff' }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.account}>
            <View>
              <TouchableOpacity onPress={() => (navigation as any).navigate('profile')} style={styles.dropdownItem}>
                <View style={styles.itemContent}>
                  <Image source={require('../../assets/puser.png')} style={styles.icon} />
                  <Text style={styles.dropdownText}>My Account</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => (navigation as any).navigate('reservationhistory')} style={styles.dropdownItem}>
                <View style={styles.itemContent}>
                  <Image source={require('../../assets/Mask.png')} style={styles.icon} />
                  <Text style={styles.dropdownText}>Reservations</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => (navigation as any).navigate('reservationrequests')} style={styles.dropdownItem}>
                <View style={styles.itemContent}>
                  <Image source={require('../../assets/Mask.png')} style={styles.icon} />
                  <Text style={styles.dropdownText}>Admin Approval</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => (navigation as any).navigate('paymentmethod')} style={styles.dropdownItem}>
                <View style={styles.itemContent}>
                  <Image source={require('../../assets/pay.png')} style={styles.icon} />
                  <Text style={styles.dropdownText}>Payment</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => (navigation as any).navigate('managepayment')} style={styles.dropdownItem}>
                <View style={styles.itemContent}>
                  <Image source={require('../../assets/pay.png')} style={styles.icon} />
                  <Text style={styles.dropdownText}>Manage Payment</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={onAccountSettings} style={styles.dropdownItem}>
                <View style={styles.itemContent}>
                  <Image source={require('../../assets/setting.png')} style={styles.icon} />
                  <Text style={styles.dropdownText}>Settings</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleLogout} style={styles.footer}>
              <View style={styles.itemContent}>
                <Image source={require('../../assets/logout.png')} style={styles.icon} />
                <Text style={styles.dropdownText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dropdown: {
    width: "90%",
    height: "100%",
    backgroundColor: '#3E3E3E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 45,
    paddingHorizontal: 30
  },
  dropdownItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E9',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: "700",
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headname: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'IbarraRealNova-Regular',
    fontWeight: "600",
    color: "white"
  },
  account: {
    marginTop: 15
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor:"#fff"


  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  }
});

export default ProfileDropdown;
