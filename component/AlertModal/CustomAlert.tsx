import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const CustomAlert = ({ visible, title, message, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
          <Text style={{ fontSize: 16 }}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignSelf: 'center' }}>
            <Text style={{ fontSize: 16, color: 'blue' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
