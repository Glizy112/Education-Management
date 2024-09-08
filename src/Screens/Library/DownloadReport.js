import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {container, paraGray} from '../../theme/styles/Base';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../theme/Colors';

const DownloadReport = () => {
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
    const currentDates = selectedDate || date;
    setShows(Platform.OS === 'ios');
    setDates(currentDates);

    //For Date Picker
    let tempDate = new Date(currentDates);
    let fDates =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setTexts(fDates);
    console.log(fDates);
  };

  const showModes = currentMode => {
    setShows(true);
    setModes(currentMode);
  };

  const showDatepickers = () => {
    showModes('date');
  };

  return (
    <View style={[container.container, {paddingHorizontal: 15}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
        }}>
        <View style={{flex: 1}}>
          <Text style={[paraGray.parahome, {fontSize: 12, marginLeft: 5}]}>
            From :
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              height: 50,
              borderColor: '#C4C4C4',
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 5,
              alignSelf: 'center',
            }}
            onPress={showDatepicker}>
            <TextInput
              placeholder="Choose Date"
              placeholderTextColor="#808080"
              editable={false}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                borderColor: '#C4C4C4',
                width: '80%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}>
              {text}
            </TextInput>
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={26}
              color="#434b56"
              onPress={showDatepicker}
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                maximumDate={new Date()}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text style={[paraGray.parahome, {fontSize: 12, marginLeft: 8}]}>
            To :
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              height: 50,
              borderColor: '#C4C4C4',
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 5,
              alignSelf: 'center',
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
                width: '80%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}>
              {texts}
            </TextInput>
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={26}
              color="#434b56"
              onPress={showDatepickers}
            />

            {shows && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dates}
                mode={modes}
                is24Hour={true}
                display="default"
                onChange={onChanges}
                maximumDate={new Date()}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.lightbackground,
            height: 45,
            borderColor: COLORS.lightbackground,
            alignSelf: 'center',
            marginTop: 40,
            marginBottom: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              //   flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
                marginRight: 3,
              }}>
              Download Excel
            </Text>
            <MaterialCommunityIcons
              name="download"
              size={20}
              color={COLORS.bg}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DownloadReport;
