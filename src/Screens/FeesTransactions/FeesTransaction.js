import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../theme/Colors';
import {paraGray, container} from '../../theme/styles/Base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const FeesTransaction = props => {
  const [isHistory, setIsHistory] = useState(false);
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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-between',

          paddingHorizontal: 10,
          borderBottomColor: '#275CE0',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            onPress={() =>
              //   props.navigation.navigate('StudentEdit', {
              //     studentdetail: studentdetail,
              //   })
              props.navigation.goBack()
            }>
            <Ionicons
              style={{marginVertical: 5, paddingHorizontal: 7}}
              name="arrow-back"
              size={20}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
          }}>
          <Text style={[paraGray.largebold, {color: 'black'}]}>
            FeesTransaction
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('UserTrans');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>FeesTransaction & Update</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('HistoryTrans');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>History</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <View style={{width: '90%', alignSelf: 'center'}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={() => props.navigation.navigate('AddNewBook')}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>
                FeesTransaction & Updates
              </Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '100%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={() => setIsHistory(() => !isHistory)}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>History</Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
        {isHistory ? (
          <View style={{marginTop: 10}}>
            {/* <Text
              style={[
                paraGray.darkpara,
                {marginLeft: 15, marginBottom: 0, paddingTop: 20},
              ]}>
              Choose Date
            </Text> */}
            <Text
              style={[
                paraGray.darkpara,
                {
                  fontSize: 14,
                  textAlign: 'left',

                  width: '100%',
                  alignSelf: 'center',
                  marginTop: 10,
                },
              ]}>
              From
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                //width: '100%',
                height: 50,
                borderWidth: 0.6,
                borderColor: COLORS.primary,

                marginTop: 10,
                borderRadius: 12,
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
                  paddingLeft: 10,
                  borderRadius: 10,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {text}
              </TextInput>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={26}
                //color="#434b56"
                color={COLORS.primary}
                style={{marginRight: 10}}
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
            <View style={{marginTop: 20}}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    fontSize: 14,
                    textAlign: 'left',

                    width: '100%',
                    alignSelf: 'center',
                  },
                ]}>
                To
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',

                  height: 50,
                  //borderColor: '#C4C4C4',
                  borderWidth: 0.6,
                  borderColor: COLORS.primary,
                  //paddingHorizontal: 0,
                  marginTop: 10,
                  borderRadius: 12,
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
                    paddingLeft: 10,
                    height: 40,
                    fontSize: 12,
                    borderRadius: 10,

                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {texts}
                </TextInput>
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={26}
                  //color="#434b56"
                  color={COLORS.primary}
                  style={{marginRight: 10}}
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
            </View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //backgroundColor: '#000000',
                  backgroundColor: COLORS.primary,
                  width: '80%',
                  height: 50,
                  borderColor: '#000000',
                  alignSelf: 'center',
                  //borderWidth: 1,
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
        ) : null}
      </View>
    </View>
  );
};

export default FeesTransaction;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  content: {
    alignSelf: 'center',
    width: '80%',

    backgroundColor: '#D3D3D3',
    padding: 10,
  },

  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
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
});
