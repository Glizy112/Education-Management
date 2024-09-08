import React, { useState, useEffect } from 'react';
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
import { Avatar, Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AddmoreOptionInc from './AddmoreOptionInc';
import { Dropdown } from 'react-native-element-dropdown';
import { paraGray } from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import Url from '../../Config/Api/Url';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { COLORS } from '../../theme/Colors';

const CreateMcqTest = props => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { teacherid, userid, schoolid } = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [title, setTitle] = useState([]);
  const [subtitle, setSubTitle] = useState([]);
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [isSwitchOns, setisSwitchOns] = useState(false);
  // <------------Select Stream-------------->
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [stream, setStream] = useState(null);
  const [selectedstream, setselectedStream] = useState(null);
  // <------------Select section-------------->
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(null);
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);
  // <------------Select Subject-------------->
  const [selectedsubject, setSelectedSubject] = useState(null);
  const [subject, setsubject] = useState(null);
  const [issubjectFocus, setIssubjectFocus] = useState(false);
  const [getsubjectdata, setsubjectdata] = useState([]);
  // <----------Multiple Input And Switch---------->
  const [question, setQuestion] = useState([{ question: '', point: '', option: [{ value: '', correct: false }] }]);
  const [dataarray, setDataArray] = useState([{ question: '', point: '', right_ans: '', option: [''] }]);

  const addHandler = (i) => {
    const _input = [...question];
    const _inputs = [...dataarray];
    _input[i].option.push({ value: '', correct: false })
    _inputs[i].option.push('')
    setQuestion(_input);
    setDataArray(_inputs);
  };
  const inputHandler = (text, i, key, value) => {
    const _input = [...question];
    const _inputs = [...dataarray];
    _input[key].option[i].value = text;
    _input[key].option[i].correct = value;
    _inputs[key].option[i] = text;
    setQuestion(_input);
    setDataArray(_inputs);
  };
  const SwitchHandler = (value, i, key) => {
    const _input = [...question];
    const _inputs = [...dataarray];
    _input[key].option.forEach((item) =>
      item.correct = false
    )
    _input[key].option[i].correct = value;
    _inputs[key].right_ans = _input[key].option[i].value;
    setQuestion(_input);
    setDataArray(_inputs);
  };
  const addQHandler = () => {
    const _question = [...question];
    const _questions = [...dataarray];
    _question.push({ question: '', point: '', option: [{ value: '', correct: false }] });
    _questions.push({ question: '', point: '', right_ans: '', option: [''] });
    setQuestion(_question);
    setDataArray(_questions);
  };

  const inputQHandler = (text, key) => {
    const _question = [...question];
    const _questions = [...dataarray];
    _question[key].question = text;
    _questions[key].question = text;
    setQuestion(_question);
    setDataArray(_questions);
  };
  const inputpointHandler = (text, key) => {
    const _question = [...question];
    const _questions = [...dataarray];
    _question[key].point = text;
    _questions[key].point = text;
    setQuestion(_question);
    setDataArray(_questions);
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
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
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
      fTime = tempDate.getHours() + ':' + '0' + tempDate.getMinutes();
    } else {
      fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
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
      fTime = tempDate.getHours() + ':' + '0' + tempDate.getMinutes();
    } else {
      fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
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
          return response.json();
        })
        .then(result => {
          setdata(result.data);
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

  const createtest = async () => {
    // console.log('data==> ', JSON.stringify(dataarray));
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', stream);
      formData.append('section_id', section);
      formData.append('teacher_id', teacherid);
      formData.append('subject_id', subject);
      formData.append('title', title.replace(/\s+/g, ''));
      formData.append('sub_title', subtitle.replace(/\s+/g, ''));
      formData.append('exam_date', text);
      formData.append('start_time', fromtime);
      formData.append('end_time', endtime);
      formData.append('question', JSON.stringify(dataarray));
      // console.log('Send Test Data', JSON.stringify(formData));
      let resp = await fetch(`${Url.teacher_create_mcq}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          // console.log('response==>' + JSON.stringify(result));
          if (result.status == true) {
            alert(result.message);
            props.navigation.goBack();
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Create Test Error => ' + error);
      alert('Retry');
      setLoading(false);
    }
  }

  const checkdata = () => {
    for (let index = 0; index < dataarray.length; index++) {
      if (dataarray[index].question == '') {
        alert(`Please Enter Question No : ${index + 1}`)
      } else if (dataarray[index].point == '') {
        alert(`Please Enter Point for Question No : ${index + 1}`)
      }
      else
        for (let i = 0; i < dataarray[index].option.length; i++) {
          if (dataarray[index].option[i] == '') {
            alert(`Please Enter Option for Question No : ${index + 1}`)
          }
        }
      if (dataarray[index].right_ans == '') {
        alert(`Please Select Correct Ans for Question No : ${index + 1}`)
      } else {
        createtest();
      }
    }
  }
  const removeItem = index => {
    setQuestion(question.filter((o, i) => index !== i));
    setDataArray(dataarray.filter((o, i) => index !== i));
  };

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
          <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>Stream</Text>
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
            placeholder={!isstreamFocus ? 'Select Stream' : '...'}
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
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>
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
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>
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
              placeholder={!issubjectFocus ? 'Select subject' : '...'}
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
              onChangeText={text => setTitle(text)}
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
              placeholder="ENTER TITLE"
              placeholderTextColor="#808080"
              value={subtitle}
              onChangeText={text => setSubTitle(text)}
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
          <TouchableOpacity
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
            }}
            onPress={() => showDatepicker()}>
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
                minimumDate={new Date()}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={[styles.formtxt, { flex: 1 }]}>From:</Text>
            <Text style={[styles.formtxt, { flex: 1, marginLeft: -25 }]}>
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
            <TouchableOpacity
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
              }}
              onPress={() => showTimepicker()}>
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
            </TouchableOpacity>
            <TouchableOpacity
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
              }}
              onPress={() => showTimepickers()}>
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
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 0.5,
              borderBottomColor: COLORS.section,
              marginVertical: 15,
            }}
          />
          <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 10 }}>
            <Text style={[paraGray.darkpara, { marginLeft: 5 }]}>
              Shuffle Test:
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{ flex: 1 }}>
                <Text style={[paraGray.darkpara, { marginLeft: 5 }]}>
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
              <View style={{ flex: 1 }}>
                <Text style={[paraGray.darkpara, { marginLeft: 5 }]}>
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
            {question.map((item, key) => (
              <View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      marginTop: 10,
                      color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Question {key + 1}:
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeItem(key)}
                  >
                    <Text
                      style={{
                        paddingHorizontal: 20,
                        marginTop: 10,
                        color: '#000000',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.txtbox}>
                  <TextInput
                    placeholder="ENTER QUESTION HERE"
                    placeholderTextColor="#808080"
                    value={question.value}
                    onChangeText={text => inputQHandler(text, key)}
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
                      value={question.point}
                      onChangeText={text => inputpointHandler(text, key)}
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
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 11,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Add Options of Questions {key + 1}:
                    </Text>
                  </View>

                  {item.option.length < 4 && <View
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
                      onPress={() => {
                        console.log("length", item.option.length);
                        addHandler(key)
                      }}>
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
                  </View>}
                </View>
                {item.option.map((input, i) => (
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
                        value={item.option.value}
                        onChangeText={text => inputHandler(text, i, key, false)}
                        style={{
                          marginLeft: 0,
                          backgroundColor: '#FFFFFF',
                          width: '100%',
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
                        marginLeft: 15
                      }}>
                      <Switch
                        value={input.correct}
                        onValueChange={() => {
                          SwitchHandler(!input.correct, i, key);
                        }}
                        color={COLORS.black}
                      />
                    </View>

                  </View>
                ))}
              </View>
            ))}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E5E5E5',
                width: '80%',
                height: 50,
                borderColor: '#E5E5E5',
                alignSelf: 'center',
                borderWidth: 0,
                marginTop: 20,
                marginBottom: 20,
                bottom: 0,
                borderRadius: 5,
                justifyContent: 'center',
              }}
              activeOpacity={0.8}
              onPress={addQHandler}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 17,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                ADD More Questions
                <MaterialCommunityIcons name="plus" size={18} color="#000000" />
              </Text>
            </TouchableOpacity>
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
                if (stream == null) {
                  alert('Please Select Stream')
                } else if (section == null) {
                  alert('Please Select Section')
                } else if (subject == null) {
                  alert('Please Select Subject')

                } else if (title == '') {
                  alert('Please Enter Title')

                } else if (subtitle == '') {
                  alert('Please Enter Subtitle')

                } else if (text == '') {
                  alert('Please Select Date')

                } else if (fromtime == '') {
                  alert('Please Select Start Time')

                } else if (endtime == '') {
                  alert('Please Select End Time')
                } else {
                  checkdata()

                }
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

export default CreateMcqTest;

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
