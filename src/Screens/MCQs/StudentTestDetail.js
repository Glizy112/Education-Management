import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Header } from '../../Components/Header';
import { COLORS } from '../../theme/Colors';
import { paraGray } from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { ApiMethod } from '../../Config/Api/ApiMethod';
import Url from '../../Config/Api/Url';
import Spinner from 'react-native-loading-spinner-overlay';
import { RefreshControl } from 'react-native';

const StudentTestDetail = props => {
  const { student, totalquestion, testdetail } = props.route.params;
  const [showexam, setShowExam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { teacherid, schoolid } = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);

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
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('test_id', testdetail.mcq_id);
    formData.append('student_id', student.student_id);
    // console.log("Send Data ==> " + JSON.stringify(formData));
    await ApiMethod(Url.getGivenMcqRecordBystudentId, formData)
      .then(result => {
        // console.log("Response Data==> " + JSON.stringify(result.data));
        if (result != false) {
          if (result.status == true) {
            setdata(result.data);
          }
        }
        setLoading(false);
      });
  };
  const createtest = async () => {
    setRefreshing(false);
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('teacher_id', teacherid);
    formData.append('test_id', testdetail.mcq_id);
    formData.append('student_id', student.student_id);
    formData.append('exam_date', text);
    formData.append('start_time', fromtime);
    formData.append('end_time', endtime);
    // console.log("Send Data ==> " + JSON.stringify(formData));
    await ApiMethod(Url.createResubmissionExam, formData)
      .then(result => {
        // console.log("Response Data==> " + JSON.stringify(result));
        if (result != false) {
          if (result.status == true) {
            props.navigation.goBack();
          }
        }
        setLoading(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.black }}>
        {loading == true && <Spinner visible={load} />}
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={student.student_name}
          marginLeft
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.bg,
            borderRadius: 20,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: COLORS.active,
            marginVertical: 10,
            marginHorizontal: 10,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              paddingHorizontal: 5,
            }}>
            <Text style={[paraGray.darkpara, { color: COLORS.active }]}>
              {student.student_name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Total Questions
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {totalquestion}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderBottomColor: COLORS.background,
                borderBottomWidth: 1,
                marginTop: 15,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Submitted
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {student.total_submit == 0 ? 'Missed' : student.total_submit}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.green, marginLeft: 5 },
                ]}>
                Right Answer
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.green, marginLeft: 5 },
                ]}>
                {student.total_submit == 0 ? 'Missed' : student.right}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={[paraGray.darkpara, { color: COLORS.red, marginLeft: 5 }]}>
                Wrong Answer
              </Text>
              <Text
                style={[paraGray.darkpara, { color: COLORS.red, marginLeft: 5 }]}>
                {student.total_submit == 0 ? 'Missed' : totalquestion - student.right}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            justifyContent:
              student.total_submit == 0 ? 'space-between' : 'flex-end',
            marginHorizontal: 20,
          }}>
          {student.total_submit == 0 && (
            <TouchableOpacity
              style={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setShowExam(!showexam)}>
              <Text style={[paraGray.darkpara, { fontSize: 11 }]}>
                Give permission again
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <Text style={[paraGray.darkpara, { fontSize: 11 }]}>Download</Text>
            <MaterialCommunityIcons
              name="download"
              size={15}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        {showexam == true && (
          <View>
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
              onPress={showDatepicker}>
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
                onPress={showTimepicker}>
                <TextInput
                  placeholder="Choose Start Time"
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
                onPress={showTimepickers}>
                <TextInput
                  placeholder="Choose End Time"
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
            {student.total_submit == 0 && (
              <TouchableOpacity
                style={{
                  width: 100,
                  paddingVertical: 4,
                  marginTop: 15,
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => createtest()}>
                <Text style={[paraGray.darkpara, { fontSize: 11 }]}>
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View
          style={{
            flex: 1,
            borderBottomColor: COLORS.background,
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          {getdata.map((item, index) => (
            <View style={{ flex: 1, paddingHorizontal: 15 }} key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={[paraGray.darkpara]}>Q{item.question_id}. {item.question}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color:
                        student.total_submit == 0 ?
                          COLORS.lighttext :
                          item.student_answer == item.correct_answer
                            ? COLORS.green
                            : COLORS.red,
                      textAlign: 'center',
                    },
                  ]}>
                  {student.total_submit == 0 ? 'Missed'
                    :
                    item.student_answer != null ? item.student_answer
                      :
                      'Not Submitted'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentTestDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: '6%',
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },

  txt: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
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
  formtxt: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  datatxt: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  stlabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  stlabeltext: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    paddingHorizontal: 10,
  },
  sttext: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    // paddingHorizontal: 15,
    marginVertical: 2,
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: COLORS.section,
    borderBottomWidth: 0.5,
    width: '100%',
  },
});
