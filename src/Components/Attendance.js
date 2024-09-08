import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {paraGray} from '../theme/styles/Base';

import {COLORS} from '../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import FieldInputs from './FieldInputs';
import {useEffect} from 'react';
const Attendance = ({styles, stylesCheck}) => {
  const [markAttendance, setMarkAttendance] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState(new Date());
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [texts, setTexts] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [applicationValue, setApplicationValue] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [items, setItems] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [applicationTo, setApplicationTo] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const showDatepicker = () => {
    showMode('date');
  };
  const showDatepickers = () => {
    showModes('date');
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showModes = currentMode => {
    setShows(true);
    setModes(currentMode);
  };
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

  const height = Dimensions.get('window').height;
  return (
    <View>
      {markAttendance ? (
        <View
          style={
            stylesCheck
              ? [
                  {
                    width: '90%',
                    // justifyContent: 'center',
                    alignSelf: 'center',
                    borderRadius: 16,
                    backgroundColor: 'white',

                    //paddingVertical: 10,
                    marginTop: 20,
                    //height: 180,
                    paddingVertical: 17,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  stylesCheck,
                ]
              : {
                  width: '90%',
                  // justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 16,
                  backgroundColor: 'white',

                  //paddingVertical: 10,
                  marginTop: 20,
                  //height: 180,
                  paddingVertical: 17,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
          }>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 5,
              width: '90%',
              paddingLeft: 8,
            }}>
            <Text
              style={[
                paraGray.largebold,
                {
                  fontSize: 16,
                },
              ]}>
              Mark your attendance for today
            </Text>
            <Text style={[paraGray.darkpara, {marginTop: 5}]}>
              Status of your attendance!
            </Text>
          </View>
          <View
            style={{
              width: '85%',
              marginTop: 20,
            }}>
            <Ionicons name="checkmark-circle" size={25} />
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Medium',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 5,
                textAlign: 'left',
                opacity: 0.5,
                width: '85%',
              }}>
              You’ve marked your presence for the day.
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={
            styles
              ? [
                  {
                    width: '90%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderRadius: 16,
                    backgroundColor: COLORS.bgColor,

                    marginTop: 20,
                    //height: 180,
                    paddingVertical: 17,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  styles,
                ]
              : {
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 16,
                  backgroundColor: COLORS.bgColor,

                  marginTop: 20,
                  //height: 180,
                  paddingVertical: 17,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
          }>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 5,
              width: '90%',
              paddingLeft: 8,
            }}>
            <Text
              style={[
                paraGray.largebold,
                {
                  fontSize: 16,
                },
              ]}>
              Mark your attendance for today
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Medium',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 5,
                textAlign: 'left',
                opacity: 0.5,
              }}>
              Please click the button below to register your attendance for
              today or apply a leave.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',

              width: '88%',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => setMarkAttendance(true)}
              style={{
                backgroundColor: COLORS.primary,
                width: 150,
                height: 50,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 14,

                    fontWeight: '500',

                    alignSelf: 'center',
                  }}>
                  Mark Present
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                backgroundColor: COLORS.red,
                width: 150,
                height: 50,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 14,

                  fontWeight: '500',

                  alignSelf: 'center',
                }}>
                Apply Leave
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          //position: 'absolute',
          //bottom: 0,
        }}
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            height: height / 1.6,
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '88%',
              alignSelf: 'center',

              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={paraGray.largebold}>Apply for Leave</Text>
              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 5}}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 4,
                    //borderColor: '#D3D3D3',
                    borderColor: COLORS.primary,
                    alignSelf: 'center',
                    borderWidth: 0.8,
                    marginTop: 15,
                    borderRadius: 12,
                  },
                  {paddingHorizontal: 8},
                ]}
                placeholder={'Select Leave type'}
                placeholderStyle={{color: COLORS.lightergray, paddingLeft: 4}}
                dropDownDirection="BOTTOM"
                dropDownContainerStyle={{
                  width: '100%',
                  alignSelf: 'center',
                  borderColor: COLORS.primary,
                }}
                textStyle={{
                  fontSize: 13,
                  color: '#000000',
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: 5,
              }}>
              <TouchableOpacity
                style={{
                  width: '48%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  borderColor: COLORS.primary,
                  borderWidth: 0.6,

                  marginTop: 12,
                  borderRadius: 12,
                  alignSelf: 'center',
                  //marginHorizontal: 3,
                  paddingHorizontal: 12,
                }}
                onPress={showDatepicker}>
                <TextInput
                  placeholder="Start Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  style={{
                    marginLeft: 2,
                    backgroundColor: '#FFFFFF',
                    flex: 1,
                    height: 40,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    color: '#000000',
                  }}>
                  {text}
                </TextInput>
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={26}
                  //color="#434b56"
                  color={COLORS.primary}
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
                    minimumDate={new Date()}
                  />
                )}
              </TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 18,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {' '}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: '48%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  borderColor: COLORS.primary,
                  borderWidth: 0.6,
                  marginTop: 8,

                  borderRadius: 12,
                  alignSelf: 'center',
                  //marginHorizontal: 3,
                  paddingHorizontal: 12,
                }}
                onPress={showDatepickers}>
                <TextInput
                  placeholder="End Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  style={{
                    marginLeft: 2,
                    backgroundColor: '#FFFFFF',
                    flex: 1,
                    height: 40,
                    //fontSize: 12,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    color: '#000000',
                  }}>
                  {texts}
                </TextInput>
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={26}
                  //color="#434b56"
                  color={COLORS.primary}
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
                    minimumDate={new Date()}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',

                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={[
                  {
                    //marginLeft: 0,
                    width: '50%',
                    backgroundColor: COLORS.white,

                    height: 50,
                    borderColor: COLORS.primary,
                    //borderColor: '#000000',
                    alignSelf: 'center',
                    borderWidth: 0.6,
                    marginTop: 12,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    justifyContent: 'center',
                    marginRight: 1,
                  },
                ]}>
                <Text
                  style={[
                    paraGray.largebold,
                    {
                      fontSize: 16,
                      textAlign: 'center',
                      opacity: 0.5,
                    },
                  ]}>
                  Full Day
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    marginLeft: 1,
                    width: '50%',
                    backgroundColor: COLORS.white,

                    height: 50,
                    borderColor: COLORS.primary,
                    //borderColor: '#000000',
                    alignSelf: 'center',
                    borderWidth: 0.6,
                    marginTop: 15,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: 'center',
                  },
                ]}>
                <Text
                  style={[
                    paraGray.largebold,
                    {
                      fontSize: 16,
                      textAlign: 'center',
                      opacity: 0.5,
                    },
                  ]}>
                  Half Day
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                {
                  // flexDirection: 'row',
                  //alignItems: 'center',
                }
              }>
              <FieldInputs
                placeholder="Reason To Leave"
                placeholderTextColor="#808080"
                value={title}
                onChangeText={value => setTitle(value)}
              />
            </View>
            <View>
              <DropDownPicker
                open={applicationOpen}
                value={applicationValue}
                items={applicationTo}
                setOpen={setApplicationOpen}
                setValue={setApplicationValue}
                setItems={setApplicationTo}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: 50,
                    paddingHorizontal: 4,
                    //borderColor: '#D3D3D3',
                    borderColor: COLORS.primary,
                    alignSelf: 'center',
                    borderWidth: 0.8,
                    marginTop: 15,
                    borderRadius: 12,
                  },
                  {paddingHorizontal: 8},
                ]}
                placeholder={'Application To'}
                placeholderStyle={{color: COLORS.lightergray, paddingLeft: 4}}
                dropDownDirection="BOTTOM"
                dropDownContainerStyle={{
                  width: '100%',
                  alignSelf: 'center',
                  borderColor: COLORS.primary,
                }}
                textStyle={{
                  fontSize: 13,
                  color: '#000000',
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View>

            <Button title="Apply" styles={{width: '100%'}} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Attendance;
