import {ToastAndroid} from 'react-native';
import API, {ENDPOINTS} from '../api/apiService';
import {USER} from '../storage/StorageKeys';
import StorageManager from '../storage/StorageManager';



export const updateUser = async (id, body, setUser, dontToast) => {
  //console.log(body);
  try {
    let res = await API.put(ENDPOINTS.GET_UPDATE_ME, body);
    //console.log(res);
    await StorageManager.put(USER, res);
    return res
    if (dontToast) return;
    ToastAndroid.show(
      'User Details have been updated successfully 🎉',
      ToastAndroid.SHORT,
    );
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async setUser => {
  try {
    const resp = await API.get(ENDPOINTS.GET_UPDATE_ME);
    await StorageManager.put(USER, resp);
    //console.log(resp);
    // setUser(resp);
    return resp
  } catch (error) {
    console.log('Error in user Function' + error);
  }
};

export const login = async ( body) => {
  //console.log(body);
  try {
    let res = await API.post(ENDPOINTS.USER, body);
    //console.log(res);
    await StorageManager.put(USER, res);
    return res
    if (dontToast) return;
    ToastAndroid.show(
      'User Details have been updated successfully 🎉',
      ToastAndroid.SHORT,
    );
  } catch (error) {
    console.log(error);
  }
};
