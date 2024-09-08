import React, {useState} from 'react';
import {dataIndexAttribute} from 'react-horizontal-scrolling-menu/dist/types/constants';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {container, paraGray} from '../../theme/styles/Base';

const HistoryTrans = props => {
  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);

    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // --------Date-time Picker----------
  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [texts, setTexts] = useState('');

  const onChanges = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShows(Platform.OS === 'ios');
    setDates(currentDate);

    //For Date Picker
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setTexts(fDate);
    console.log(fDate);
  };

  const showModes = currentMode => {
    setShows(true);
    setModes(currentMode);
  };

  const showDatepickers = () => {
    showModes('date');
  };

  return (
    <View style={[container.container]}>
      <Text
        style={[
          paraGray.darkpara,
          {marginLeft: 15, marginBottom: 0, paddingTop: 20},
        ]}>
        Choose Date
      </Text>
      <Text style={styles.formtxt}>From</Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          width: '90%',
          height: 50,
          borderColor: '#C4C4C4',
          paddingHorizontal: 0,
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 5,
          alignSelf: 'center',
        }}
        onPress={showDatepicker}>
        <TextInput
          placeholder="Choose Date"
          placeholderTextColor="#808080"
          editable={false}
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#C4C4C4',
            width: '90%',
            height: 40,
            fontSize: 12,
            fontFamily: 'Montserrat-Regular',
          }}>
          {text}
        </TextInput>
        <MaterialCommunityIcons
          name="calendar-blank-outline"
          size={26}
          color="#434b56"
          // onPress={showDatepicker}
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.formtxt}>To</Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          width: '90%',
          height: 50,
          borderColor: '#C4C4C4',
          paddingHorizontal: 0,
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 5,
          alignSelf: 'center',
          marginBottom: 20,
        }}
        onPress={showDatepickers}>
        <TextInput
          placeholder="Choose Date"
          placeholderTextColor="#808080"
          editable={false}
          style={{
            marginLeft: 0,
            backgroundColor: '#FFFFFF',
            borderColor: '#C4C4C4',
            width: '90%',
            height: 40,
            fontSize: 12,
            fontFamily: 'Montserrat-Regular',
          }}>
          {texts}
        </TextInput>
        <MaterialCommunityIcons
          name="calendar-blank-outline"
          size={26}
          color="#434b56"
          // onPress={showDatepickers}
        />

        {shows && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dates}
            mode={modes}
            is24Hour={true}
            display="default"
            onChange={onChanges}
          />
        )}
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000000',
            width: '80%',
            height: 50,
            borderColor: '#000000',
            alignSelf: 'center',
            borderWidth: 1,
            marginTop: 20,
            marginBottom: 30,
            borderRadius: 15,
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('HistoryTransDetail');
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Show
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HistoryTrans;

const styles = StyleSheet.create({
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
});
