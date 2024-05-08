import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const DropdownModal = ({ setOpen, open }) => {
    const handleClose=()=>{
        setOpen(false)
    }
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Cross button to close the modal */}
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
           <Text>close</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>Modal Content</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background covering the entire screen
  },
  modalView: {
    width: 300,
    height: 200,
    backgroundColor: '#2D0717',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default DropdownModal;
