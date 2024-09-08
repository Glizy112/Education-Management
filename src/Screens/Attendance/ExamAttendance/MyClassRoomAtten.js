import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Url from '../../../Config/Api/Url';
import {COLORS} from '../../../theme/Colors';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyClassRoomAtten = props => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          // alert("Feature Coming Soon")
          props.navigation.navigate('ClassSubject', {
            classname: '1st Unit Test',
          });
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>1st Unit Test</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ClassSubject', {
            classname: '1st Semester Exam',
          });
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>1st Semester Exam</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ClassSubject', {
            classname: '2nd Unit Test',
          });
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>2nd Unit Test</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          // alert("Feature Coming Soon")
          props.navigation.navigate('ClassSubject', {
            classname: '2nd Semester Exam',
          });
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>2nd Semester Exam</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          // alert("Feature Coming Soon")
          props.navigation.navigate('ClassSubject', {
            classname: '1st Prelims',
          });
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>1st Prelims</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          // alert("Feature Coming Soon")
          props.navigation.navigate('ClassSubject', {
            classname: '2nd Prelims',
          });
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>2nd Prelims</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
    </View>
  );
};

export default MyClassRoomAtten;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  label: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: '6%',
  },
  formtxt: {
    marginTop: 10,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  labeltxt: {
    color: '#000000',
    // marginLeft: 10,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
