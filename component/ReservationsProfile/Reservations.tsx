import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const Reservations = ({ navigation } :any) => {
  const data = [
    { label1: 'Date', 
    value1: '12/04/2024' ,
    label2: 'Restaurant',
    value2: 'Liberty Grille',
    label3: 'Total', 
    value3: '$50.00',
    label4: 'Guests',
     value4: '2' 
  },
    { label1: 'Date', 
    value1: '12/04/2024' ,
    label2: 'Restaurant',
    value2: 'Liberty Grille',
    label3: 'Total', 
    value3: '$50.00',
    label4: 'Guests',
     value4: '2' 
  },
    { label1: 'Date', 
    value1: '12/04/2024' ,
    label2: 'Restaurant',
    value2: 'Liberty Grille',
    label3: 'Total', 
    value3: '$50.00',
    label4: 'Guests',
     value4: '2' 
  },
    { label1: 'Date', 
    value1: '12/04/2024' ,
    label2: 'Restaurant',
    value2: 'Liberty Grille',
    label3: 'Total', 
    value3: '$50.00',
    label4: 'Guests',
     value4: '2' 
  },
    
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrow.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.headtxt}>Reservations</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../assets/Subtract.png')}
            style={styles.headerprof}
          />
        </TouchableOpacity>
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.mainbox}>
          <View style={styles.box1}>
            <Text style={[{fontSize:14,fontFamily: 'IbarraRealNova-Regular',color:"#fff",fontWeight:"600"}]}>{item.label1}: {item.value1}</Text>
            <Text style={[{fontSize:18,fontFamily: 'IbarraRealNova-Regular',color:"#F6BED6",fontWeight:"600"}]}>{item.label2}: {item.value2}</Text>
            <Text style={styles.text}>{item.label3}: {item.value3}</Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.text}>{item.label4}: {item.value4}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#470D25',
    fontSize: 16,
    fontFamily: 'IbarraRealNova-Regular',
  },
 
headerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',

},

headerIcon: {
  width: 24,
  height: 24,
},
headerprof: {
  width: 35,
  height: 35,
},
headtxt:{
  fontFamily: 'IbarraRealNova-Regular',
    color: '#E581AB',
    fontSize: 20,
    alignSelf:"center"
},
mainbox:{
  marginTop:20,
  flexDirection:"row",
  justifyContent:"space-between",
  borderBottomWidth:1,
  borderBottomColor:"#fff"

  
},
box1:{
  flexDirection:"column",
  // borderWidth:2,
  // borderColor:"white",
  width:"60%",
  height:100,
  gap:10
},
box2:{
  width:"40%",
alignItems:"flex-end",
justifyContent:"center",
height:100

},
text:{
  fontSize: 18,
    fontFamily: 'IbarraRealNova-Regular',
    color:"#fff",
    fontWeight:"600"
}


});


export default Reservations;
