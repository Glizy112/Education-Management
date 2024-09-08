import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import {Avatar, Switch} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AddmoreOptionInc from './AddmoreOptionInc';
import {Dropdown} from 'react-native-element-dropdown';
import {paraGray} from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {COLORS} from '../../theme/Colors';

const EditTest = props => {
  const {test} = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {teacherid, userid,schoolid} = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [isSwitchOns, setisSwitchOns] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubTitle] = useState('');
  // <------------Select Stream-------------->
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [stream, setStream] = useState(test.stream);
  const [selectedstream, setselectedStream] = useState(null);
  // <------------Select section-------------->
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(null);
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);
  // <------------Select Subject-------------->
  const [selectedsubject, setSelectedSubject] = useState(null);
  const [subject, setsubject] = useState(test.subname);
  const [issubjectFocus, setIssubjectFocus] = useState(false);
  const [getsubjectdata, setsubjectdata] = useState([]);
  // <----------Multiple Input And Switch---------->
  const [input, setInput] = useState([{key: '', value: '', correct: false}]);

  const addHandler = () => {
    const _input = [...input];
    _input.push({key: '', value: '', correct: false});
    setInput(_input);
  };

  const inputHandler = (text, key, value) => {
    const _input = [...input];
    _input[key].value = text;
    _input[key].key = key;
    _input[key].correct = value;
    setInput(_input);
  };
  const SwitchHandler = (value, key) => {
    const _input = [...input];
    _input[key].correct = value;
    setInput(_input);
  };

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
    // console.log(fDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // <----------Time Picker---------->
  const [time, setTime] = useState(new Date());
  const [timemode, setTimeMode] = useState('date');
  const [showclock, setShowClock] = useState(false);
  const [fromtime, setFromTime] = useState('');
  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowClock(Platform.OS === 'ios');

    let tempDate = new Date(currentDate);
    let fTime;
    const ampm = tempDate.getHours() >= 12 ? 'pm' : 'am';
    if (tempDate.getMinutes() < 10) {
      fTime = tempDate.getHours() + ' : ' + '0' + tempDate.getMinutes();
    } else {
      fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes();
    }
    setFromTime(fTime);
    // console.log(fTime);
  };
  const showtimeMode = currentMode => {
    setShowClock(true);
    setTimeMode(currentMode);
  };

  const showTimepicker = () => {
    showtimeMode('time');
  };

  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState('date');
  const [shows, setShows] = useState(false);
  const [endtime, setEndTime] = useState('');
  const onChanges = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShows(Platform.OS === 'ios');

    let tempDate = new Date(currentDate);
    let fTime;
    const ampm = tempDate.getHours() >= 12 ? 'pm' : 'am';
    if (tempDate.getMinutes() < 10) {
      fTime = tempDate.getHours() + ' : ' + '0' + tempDate.getMinutes();
    } else {
      fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes();
    }
    setEndTime(fTime);
    // console.log(fTime?.format('ddd, MMMM D YYYY, h:mm:ss'));
    console.log(fTime);
  };
  const showModes = currentMode => {
    setShows(true);
    setModes(currentMode);
  };

  const showTimepickers = () => {
    showModes('time');
  };

  useEffect(() => {
    getclassData();
  }, []);

  const getclassData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.get_all_class}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('subjectDetail getclassData Error => ' + error);
      setLoading(false);
    }
  };
  const getsectionData = async item => {
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('class_id', item.value);
      let resp = await fetch(`${Url.get_section_classId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setSectiondata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };
  const getsubjectData = async item => {
    try {
      const formData = new FormData();
      // formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      formData.append('class_id', stream);
      let resp = await fetch(`${Url.get_subject_classID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setsubjectdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getclassData();
  }, []);

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginTop: 15, paddingHorizontal: 20}}>
          <Text style={[paraGray.darkpara, {marginVertical: 10}]}>Stream</Text>
          <Dropdown
            style={{
              height: 50,
              borderColor: isstreamFocus ? 'blue' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
            }}
            placeholderStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            selectedTextStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={getdata.map(item => ({
              label: item.class_name,
              value: item.class_id,
            }))}
            search
            containerStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
            }}
            fontFamily={'Montserrat-Regular'}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isstreamFocus ? stream : '...'}
            searchPlaceholder="Search..."
            value={stream}
            onFocus={() => setIsstreamFocus(true)}
            onBlur={() => setIsstreamFocus(false)}
            onChange={item => {
              // getsectionData(item);
              setselectedStream(item);
              setStream(item.value);
              setIsstreamFocus(false);
              getsectionData(item);
            }}
          />
        </View>
        <View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Section
            </Text>
            <Dropdown
              style={{
                height: 50,
                borderColor: issectionFocus ? 'blue' : 'gray',
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              placeholderStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              selectedTextStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              inputSearchStyle={{
                height: 40,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              data={getsectiondata.map(item => ({
                label: item.section_name,
                value: item.section_id,
                // subject: item.subject_id,
              }))}
              search
              containerStyle={{
                backgroundColor: '#E5E5E5',
                borderColor: '#E5E5E5',
              }}
              fontFamily={'Montserrat-Regular'}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!issectionFocus ? 'Select Section' : '...'}
              searchPlaceholder="Search..."
              value={section}
              onFocus={() => setIsSectionFocus(true)}
              onBlur={() => setIsSectionFocus(false)}
              onChange={item => {
                setSelectedSection(item);
                setSection(item.value);
                setIsSectionFocus(false);
                getsubjectData(item);
              }}
            />
          </View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Subject
            </Text>
            <Dropdown
              style={{
                height: 50,
                borderColor: issubjectFocus ? 'blue' : 'gray',
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              placeholderStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              selectedTextStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              inputSearchStyle={{
                height: 40,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              data={getsubjectdata.map(item => ({
                label: item.name,
                value: item.id,
                // subject: item.subject_id,
              }))}
              search
              containerStyle={{
                backgroundColor: '#E5E5E5',
                borderColor: '#E5E5E5',
              }}
              fontFamily={'Montserrat-Regular'}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!issubjectFocus ? subject : '...'}
              searchPlaceholder="Search..."
              value={subject}
              onFocus={() => setIssubjectFocus(true)}
              onBlur={() => setIssubjectFocus(false)}
              onChange={item => {
                setSelectedSubject(item);
                setsubject(item.value);
                setIssubjectFocus(false);
                // setsubjectId(item.subject);
              }}
            />
          </View>
          <Text style={styles.formtxt}>Title:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER TITLE"
              placeholderTextColor="#808080"
              value={title}
              onChangeText={value => setTitle(value)}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>

          <Text style={styles.formtxt}>Sub Title:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER SUB TITLE"
              placeholderTextColor="#808080"
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Exam Date:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '90%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 0,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 5,
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Choose Date"
              placeholderTextColor="#808080"
              editable={false}
              style={{
                marginLeft: 2,
                backgroundColor: '#FFFFFF',
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
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={[styles.formtxt, {flex: 1}]}>From:</Text>
            <Text style={[styles.formtxt, {flex: 1, marginLeft: -25}]}>
              To:
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height: 50,
                borderColor: '#D3D3D3',
                borderWidth: 1,
                marginTop: 15,
                borderRadius: 5,
                alignSelf: 'center',
                marginHorizontal: 5,
                paddingHorizontal: 3,
              }}>
              <TextInput
                placeholder="Choose Time"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  marginLeft: 2,
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 40,
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {fromtime}
              </TextInput>
              <Feather
                name="clock"
                size={26}
                color="#434b56"
                onPress={showTimepicker}
              />
              {showclock && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={time}
                  mode={timemode}
                  is24Hour={false}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                flex: 1,
                height: 50,
                borderColor: '#D3D3D3',
                paddingHorizontal: 3,
                borderWidth: 1,
                marginTop: 15,
                borderRadius: 5,
                alignSelf: 'center',
                marginHorizontal: 5,
              }}>
              <TextInput
                placeholder="Choose Time"
                placeholderTextColor="#808080"
                editable={false}
                style={{
                  marginLeft: 2,
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  height: 40,
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {endtime}
              </TextInput>
              <Feather
                name="clock"
                size={26}
                color="#434b56"
                onPress={showTimepickers}
              />

              {shows && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dates}
                  mode={modes}
                  is24Hour={false}
                  display="default"
                  onChange={onChanges}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 0.5,
              borderBottomColor: COLORS.section,
              marginVertical: 15,
            }}
          />
          <View style={{flex: 1, paddingHorizontal: 15, marginTop: 10}}>
            <Text style={[paraGray.darkpara, {marginLeft: 5}]}>
              Shuffle Test:
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flex: 1}}>
                <Text style={[paraGray.darkpara, {marginLeft: 5}]}>
                  Shuffle options to everyone
                </Text>
              </View>
              <View
                style={{
                  // flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Switch
                  value={isSwitchOn}
                  onValueChange={() => setisSwitchOn(!isSwitchOn)}
                  color={COLORS.black}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flex: 1}}>
                <Text style={[paraGray.darkpara, {marginLeft: 5}]}>
                  Shuffle question to everyone
                </Text>
              </View>
              <View
                style={{
                  // flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Switch
                  value={isSwitchOns}
                  onValueChange={() => setisSwitchOns(!isSwitchOns)}
                  color={COLORS.black}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 0.5,
              borderBottomColor: COLORS.section,
              marginVertical: 15,
            }}
          />
          <View>
            <Text
              style={{
                paddingHorizontal: 20,
                marginBottom: -10,
                color: '#000000',
                fontFamily: 'Montserrat-Regular',
              }}>
              Question 1:
            </Text>
            <View style={styles.txtbox}>
              <TextInput
                placeholder="ENTER QUESTION HERE"
                placeholderTextColor="#808080"
                style={{
                  marginLeft: 0,
                  backgroundColor: '#FFFFFF',
                  width: '90%',
                  height: 40,
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                paddingLeft: 20,
                color: '#000000',
                fontFamily: 'Montserrat-Regular',
                paddingRight: 5,
              }}>
              Points :
            </Text>
            <View
              style={{
                width: '15%',
                flexDirection: 'row',
                backgroundColor: '#FFFFFF', // height: 22,
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="Points"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                style={{
                  height: 38,
                  width: '90%',
                  backgroundColor: COLORS.bg,
                  fontSize: 10,
                  fontFamily: 'Montserrat-Regular',
                  color: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: COLORS.border,
                  textAlign: 'center',
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 11,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Add Options of Questions 1:
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.lightbackground,
                  borderRadius: 10,
                }}
                onPress={addHandler}>
                <MaterialCommunityIcons name="plus" size={15} color="#434b56" />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#000000',
                  }}>
                  Add more Options
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {input.map((input, key) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: 15,
                alignItems: 'center',
              }}>
              <View style={styles.inputbox}>
                <TextInput
                  placeholder={'OPTIONS'}
                  placeholderTextColor="#808080"
                  value={input.value}
                  onChangeText={text => inputHandler(text, key)}
                  style={{
                    marginLeft: 0,
                    backgroundColor: '#FFFFFF',
                    width: '90%',
                    height: 40,
                    fontSize: 13,
                    fontFamily: 'Montserrat-Regular',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Switch
                  value={input.correct}
                  onValueChange={() => {
                    SwitchHandler(!input.correct, key);
                  }}
                  color={COLORS.black}
                />
              </View>
            </View>
          ))}
          <View>
            <AddmoreOptionInc />
          </View>
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
                borderWidth: 2,
                marginTop: '20%',
                marginBottom: 20,
                bottom: 0,
                borderRadius: 14,
                justifyContent: 'center',
                // elevation: 3,
              }}
              onPress={() => {
                // props.navigation.navigate('');
                alert('Retry');
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  inputbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  txtboxDesc: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 80,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  formtxt: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  labeltxt: {
    color: '#000000',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
});
