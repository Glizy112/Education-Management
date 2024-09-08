import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '@rneui/themed';
import DropDown from '../../Components/DropDown';
import Button from '../../Components/Button';
import {Avatar, Snackbar} from 'react-native-paper';
import {paraGray} from '../../theme/styles/Base';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import Url from '../../Config/Api/Url';
const AttendanceShow = props => {
  const [expandedTakeAttendace, setExpandedTakeAttendace] =
    React.useState(false);
  const [expandedAttendaceHistory, setExpandedAttendaceHistory] =
    React.useState(false);
  const [expandedReports, setExpandedReports] = React.useState(false);
  const [expandedExamAttendace, setExpandedExamAttendace] =
    React.useState(false);
  const [openAttendanceClass, setOpenAttendanceClass] = useState(false);
  const [openAttendanceSection, setOpenAttendanceSection] = useState(false);
  const [openAttendanceSubject, setOpenAttendanceSubject] = useState(false);
  const [valueAttendanceClass, setValueAttendanceClass] = useState(null);
  const [valueAttendanceSection, setValueAttendanceSection] = useState(null);
  const [valueAttendanceSubject, setValueAttendanceSubject] = useState(null);

  const [itemsAttendanceClass, setItemsAttendanceClass] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [itemsAttendanceSection, setItemsAttendanceSection] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [ItemsAttendanceSubject, setItemsAttendanceSubject] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);

  // Attendance History
  const [openAttendanceHistoryClass, setOpenAttendanceHistoryClass] =
    useState(false);
  const [openAttendanceHistorySection, setOpenAttendanceHistorySection] =
    useState(false);
  const [openAttendanceHistorySubject, setOpenAttendanceHistorySubject] =
    useState(false);
  const [
    openAttendanceHistoryStudentName,
    setOpenAttendanceHistoryStudentName,
  ] = useState(false);
  const [valueAttendanceHistoryClass, setValueAttendanceHistoryClass] =
    useState(null);
  const [valueAttendanceHistorySection, setValueAttendanceHistorySection] =
    useState(null);
  const [valueAttendanceHistorySubject, setValueAttendanceHistorySubject] =
    useState(null);
  const [
    valueAttendanceHistoryStudentName,
    setValueAttendanceHistoryStudentName,
  ] = useState(null);
  const [itemsAttendanceHistoryClass, setItemsAttendanceHistoryClass] =
    useState([
      {label: '9th', value: '9th'},
      {label: '10th', value: '10th'},
      {label: '11th', value: '11th'},
      {label: '12th', value: '12th'},
    ]);
  const [itemsAttendanceHistorySection, setItemsAttendanceHistorySection] =
    useState([
      {label: '9th', value: '9th'},
      {label: '10th', value: '10th'},
      {label: '11th', value: '11th'},
      {label: '12th', value: '12th'},
    ]);
  const [ItemsAttendanceHistorySubject, setItemsAttendanceHistorySubject] =
    useState([
      {label: '9th', value: '9th'},
      {label: '10th', value: '10th'},
      {label: '11th', value: '11th'},
      {label: '12th', value: '12th'},
    ]);
  const [
    ItemsAttendanceHistoryStudentName,
    setItemsAttendanceHistoryStudentName,
  ] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);

  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);

  const [mode, setMode] = useState('date');
  console.log('Value', value);
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date());
  //
  const [classvalue, setClassValue] = useState(null);
  const [sectionvalue, setSectionValue] = useState(null);
  const [subjectname, setSubjectName] = useState(null);
  const [subjectvalue, setSubjectValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setGetdata] = useState([]);
  const [getsubdata, setGetsubdata] = useState([]);
  const [getsectiondata, setGetsectiondata] = useState([]);
  const {userinfo, userid, username, showmodal, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const [isFocus, setIsFocus] = useState(false);
  const [issectionFocus, setIssectionFocus] = useState(false);
  const [issubjectFocus, setIssubjectFocus] = useState(false);

  const showDatepicker = () => {
    showMode('date');
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
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

  useEffect(() => {
    getapiData();
    getsectionData();
    getsubjectData();
    getStudent();

    // console.log(date);
    // console.log("Tid"+teacherid)
    // console.log('Uid' + userid);
  }, []);
  console.log(ItemsAttendanceHistoryStudentName);
  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      // console.log('DATA',formData);
      let resp = await fetch(`${Url.class_attendance}`, {
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
          // console.log("data",result);
          // setGetdata(result.data);
          setItemsAttendanceClass(
            result.data.map(item => ({
              label: item.class_name,
              value: item.class_id,
            })),
          );
          setItemsAttendanceHistoryClass(
            result.data.map(item => ({
              label: item.class_name,
              value: item.class_id,
            })),
          );
          console.log('getData', result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };
  const getsectionData = async item => {
    // setValue(item);

    // console.log('first' + JSON.stringify(classvalue));
    // getsectionData();
    // setRefreshing(false);
    // setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      formData.append('class_id', item.value);
      // console.log('section Data' ,formData);
      let resp = await fetch(`${Url.attendance_section}`, {
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
          // console.log(result);
          //setGetsectiondata(result.data);
          setItemsAttendanceSection(
            result.data.map(item => ({
              label: item.section_name,
              value: item.section_id,
            })),
          );
          setItemsAttendanceHistorySection(
            result.data.map(item => ({
              label: item.section_name,
              value: item.section_id,
            })),
          );
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };
  const getsubjectData = async item => {
    // setSectionValue(item.value);
    // console.log('firstS' + item.value);
    // setRefreshing(false);
    // setLoading(true);
    try {
      const formData = new FormData();
      formData.append('teacher_id', teacherid);
      formData.append('school_id', schoolid);
      formData.append('class_id', value);
      let resp = await fetch(`${Url.attendance_subject}`, {
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
          //setGetsubdata(result.data);
          setItemsAttendanceSubject(
            result.data.map(item => ({
              label: item.name,
              value: item.id,
            })),
          );
          setItemsAttendanceHistorySubject(
            result.data.map(item => ({
              label: item.name,
              value: item.id,
            })),
          );
          console.log(
            'Subject',
            result.data.map(item => ({
              label: item.name,
              value: item.id,
            })),
          );
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };
  // History Attendance
  const getStudent = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.studentList}`, {
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
          setItemsAttendanceHistoryStudentName(
            result.data.map(item => ({
              label: item.student_name,
              value: item.student_id,
            })),
          );

          setLoading(false);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
    getsectionData();
    getsubjectData();
    getStudent();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          // onPress={() => {
          //   props.navigation.navigate('AttendancePtm');
          // }}
          style={{
            backgroundColor: '#275CE0',
            borderWidth: 1,
            //height: 80,
            paddingVertical: 20,
            alignIt: 'center',
          }}>
          <View style={styles.arrow}>
            <Text style={[paraGray.parahome, {fontSize: 16, color: 'white'}]}>
              Take Attendance
            </Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('HistoryAtten');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>History</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ReportAtten');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Report</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ExamAttendance');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Exam Attendance</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
      </View> */}
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
            <Text style={[paraGray.largebold, {fontSize: 16, color: 'black'}]}>
              Attendance
            </Text>
          </View>
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 25}}>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons
                      name="checkmark-circle"
                      size={36}
                      color={'#275CE0'}
                    />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Take Attendance
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Class and subject wise attendance
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(39, 92, 224, 0.15)',
                      borderRadius: 50,
                      alignItems: 'center',
                      alignSelf: 'center',
                      // width: 32,
                      // height: 32,
                      padding: 3,
                    }}>
                    {/* <Ionicons name="chevron-down" size={20} color={'black'} /> */}
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={expandedTakeAttendace}
            onPress={() => {
              setExpandedTakeAttendace(!expandedTakeAttendace);
            }}>
            <ScrollView>
              <ListItem>
                <ListItem.Content style={{}}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{flex: 1, paddingRight: 10}}>
                      <Text
                        style={[
                          paraGray.header,
                          {color: 'black', fontSize: 14},
                        ]}>
                        Class
                      </Text>
                      <DropDown
                        open={openAttendanceClass}
                        value={valueAttendanceClass}
                        items={itemsAttendanceClass}
                        setOpen={setOpenAttendanceClass}
                        setValue={setValueAttendanceClass}
                        setItems={setItemsAttendanceClass}
                        style={{borderWidth: 1}}
                        containerStyle={{width: '100%'}}
                      />
                    </View>
                    <View style={{flex: 1, paddingLeft: 10}}>
                      <Text
                        style={[
                          paraGray.header,
                          {color: 'black', fontSize: 14},
                        ]}>
                        Section
                      </Text>
                      <DropDown
                        open={openAttendanceSection}
                        value={valueAttendanceSection}
                        items={itemsAttendanceSection}
                        setOpen={setOpenAttendanceSection}
                        setValue={setValueAttendanceSection}
                        setItems={setItemsAttendanceSection}
                        containerStyle={{width: '100%'}}
                      />
                    </View>
                  </View>
                  <View style={{width: '100%', marginTop: 10}}>
                    <Text
                      style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                      Subject
                    </Text>
                    <DropDown
                      open={openAttendanceSubject}
                      value={valueAttendanceSubject}
                      items={ItemsAttendanceSubject}
                      setOpen={setOpenAttendanceSubject}
                      setValue={setValueAttendanceSubject}
                      setItems={setItemsAttendanceSubject}
                      containerStyle={{width: '100%'}}
                    />
                  </View>
                  <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() =>
                      props.navigation.navigate('TakeAttendance', {
                        classvalue: valueAttendanceClass,
                        sectionvalue: valueAttendanceSection,
                        subjectvalue: valueAttendanceSubject,
                        subjectname: valueAttendanceSubject,
                      })
                    }>
                    <Button
                      title="Mark Attendance "
                      styles={{
                        width: '100%',

                        paddingVertical: 15,
                      }}
                    />
                  </TouchableOpacity>
                </ListItem.Content>
              </ListItem>
            </ScrollView>
          </ListItem.Accordion>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="clockcircle" size={36} color={'#275CE0'} />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Attendance History
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Class, subject and student wise monthly history
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(39, 92, 224, 0.15)',
                      borderRadius: 50,
                      alignItems: 'center',
                      alignSelf: 'center',
                      // width: 32,
                      // height: 32,
                      padding: 3,
                    }}>
                    {/* <Ionicons name="chevron-down" size={20} color={'black'} /> */}
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={expandedAttendaceHistory}
            onPress={() => {
              setExpandedAttendaceHistory(!expandedAttendaceHistory);
            }}>
            <ListItem.Content>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 1, paddingRight: 10}}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Class
                  </Text>
                  <DropDown
                    open={openAttendanceHistoryClass}
                    value={valueAttendanceHistoryClass}
                    items={itemsAttendanceHistoryClass}
                    setOpen={setOpenAttendanceHistoryClass}
                    setValue={setValueAttendanceHistoryClass}
                    setItems={setItemsAttendanceHistoryClass}
                    containerStyle={{width: '100%'}}
                  />
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Section
                  </Text>
                  <DropDown
                    open={openAttendanceHistorySection}
                    value={valueAttendanceHistorySection}
                    items={itemsAttendanceHistorySection}
                    setOpen={setOpenAttendanceHistorySection}
                    setValue={setValueAttendanceHistorySection}
                    setItems={setItemsAttendanceHistorySection}
                    containerStyle={{width: '100%'}}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <View style={{flex: 1, paddingRight: 10}}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Subject
                  </Text>
                  <DropDown
                    open={openAttendanceHistorySubject}
                    value={valueAttendanceHistorySubject}
                    items={ItemsAttendanceHistorySubject}
                    setOpen={setOpenAttendanceHistorySubject}
                    setValue={setValueAttendanceHistorySubject}
                    setItems={setItemsAttendanceHistorySubject}
                    containerStyle={{width: '100%'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingLeft: 10,

                    //marginTop: -10,
                  }}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Choose Month
                  </Text>
                  <TouchableOpacity
                    style={{
                      //   width: '48%',
                      paddingVertical: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      //height: 50,
                      marginTop: 5,
                      borderColor: COLORS.primary,
                      borderWidth: 0.6,

                      //marginTop: 12,
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
                </View>
              </View>
              <View style={{width: '100%', marginTop: 10}}>
                <Text style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                  Student Name (optional)
                </Text>
                <DropDown
                  open={openAttendanceHistoryStudentName}
                  value={valueAttendanceHistoryStudentName}
                  items={ItemsAttendanceHistoryStudentName}
                  setOpen={setOpenAttendanceHistoryStudentName}
                  setValue={setValueAttendanceHistoryStudentName}
                  setItems={setItemsAttendanceHistoryStudentName}
                  containerStyle={{width: '100%'}}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('HistoryAttendance', {
                    classvalue: '12',
                    sectionvalue: '14',
                    //subjectvalue: valueAttendanceSubject,
                    subjectvalue: '26',
                    studentid: valueAttendanceHistoryStudentName,
                    month: '01',
                    //     classname: class_name,
                    //   classvalue: classvalue,
                    //   sectionname: section_name,
                    //   sectionvalue: sectionvalue,
                    //   subjectname: subject_name,
                    //   subjectvalue: subjectvalue,
                    //   studentid: student,
                    //   month: text,
                  })
                }
                style={{width: '100%'}}>
                <Button
                  title="Show History "
                  styles={{width: '100%', paddingVertical: 15}}
                />
              </TouchableOpacity>
            </ListItem.Content>
          </ListItem.Accordion>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
              marginBottom: 25,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="document-text"
                      size={36}
                      color={'#275CE0'}
                    />
                    <View style={{marginLeft: 20}}>
                      <Text
                        style={[
                          paraGray.parahome,
                          {fontSize: 16, marginTop: 5},
                        ]}>
                        Reports
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Class, subject and type wise monthly report
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(39, 92, 224, 0.15)',
                      borderRadius: 50,
                      alignItems: 'center',
                      alignSelf: 'center',
                      // width: 32,
                      // height: 32,
                      padding: 3,
                    }}>
                    {/* <Ionicons name="chevron-down" size={20} color={'black'} /> */}
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={expandedReports}
            onPress={() => {
              setExpandedReports(!expandedReports);
            }}>
            <ListItem.Content>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 1, paddingRight: 10}}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Class
                  </Text>
                  <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{width: '100%'}}
                  />
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Section
                  </Text>
                  <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{width: '100%'}}
                  />
                </View>
              </View>
              <View
                style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
                <View style={{flex: 1, paddingRight: 10}}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Subject
                  </Text>
                  <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{width: '100%'}}
                  />
                </View>
                <View style={{flex: 1, paddingLeft: 10}}>
                  <Text
                    style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                    Attendance Type
                  </Text>
                  <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{width: '100%'}}
                  />
                </View>
              </View>
              <View style={{width: '100%', marginTop: 10}}>
                <Text style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                  Choose Month
                </Text>
                <TouchableOpacity
                  style={{
                    //   width: '48%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    //height: 50,
                    paddingVertical: 5,
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
              </View>
              <TouchableOpacity style={{width: '100%'}}>
                <Button
                  title="Download "
                  styles={{width: '100%', paddingVertical: 15}}
                />
              </TouchableOpacity>
            </ListItem.Content>
          </ListItem.Accordion>
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: '#EEF2FD',
              borderWidth: 0.4,
              borderColor: '#275CE0',
              //height: 80,
              paddingVertical: 20,
              borderRadius: 16,
            }}
            content={
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="clipboard" size={36} color={'#275CE0'} />
                    <View style={{marginLeft: 20}}>
                      <Text style={[paraGray.parahome, {fontSize: 16}]}>
                        Exam Attendance
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                        ]}>
                        Take attendance for particular exam(s)
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'rgba(39, 92, 224, 0.15)',
                      borderRadius: 50,
                      alignItems: 'center',
                      alignSelf: 'center',
                      // width: 32,
                      // height: 32,
                      padding: 3,
                    }}>
                    {/* <Ionicons name="chevron-down" size={20} color={'black'} /> */}
                  </View>
                </View>
              </ListItem.Content>
            }
            icon={
              <View
                style={{
                  backgroundColor: 'rgba(39, 92, 224, 0.15)',
                  borderRadius: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  // width: 32,
                  // height: 32,
                  padding: 3,
                }}>
                <Ionicons name="chevron-down" size={20} color={'black'} />
              </View>
            }
            isExpanded={expandedExamAttendace}
            onPress={() => {
              setExpandedExamAttendace(!expandedExamAttendace);
            }}>
            <ListItem.Content>
              <View style={{width: '100%', marginTop: 10}}>
                <Text style={[paraGray.header, {color: 'black', fontSize: 14}]}>
                  Classroom
                </Text>
                <View>
                  <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{width: '100%'}}
                  />
                </View>
              </View>
              <TouchableOpacity style={{width: '100%'}}>
                <Button
                  title="Take Attendance "
                  styles={{width: '100%', paddingVertical: 15}}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#275CE0',
                  width: '100%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 80,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <View>
                    <Text style={[paraGray.parahome, {fontSize: 14}]}>
                      Exam Attendance Report
                    </Text>
                    <View style={{marginTop: 5}}>
                      <Text tyle={paraGray.darkpara}>
                        View the attendance report for a recent examination
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={'#275CE0'}
                    />
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
                  }}>
                  <View>
                    <Text style={[paraGray.parahome, {fontSize: 14}]}>
                      My Subject Attendance
                    </Text>
                    <View style={{marginTop: 5}}>
                      <Text tyle={paraGray.darkpara}>
                        View your subject attendance for all exams
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={'#275CE0'}
                    />
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
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <View>
                    <Text style={[paraGray.parahome, {fontSize: 14}]}>
                      My Classroom Attendance
                    </Text>
                    <View style={{marginTop: 5}}>
                      <Text tyle={paraGray.darkpara}>
                        View your class attendance for all exams
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={'#275CE0'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </ListItem.Content>
          </ListItem.Accordion>

          {/* <TouchableOpacity
          style={{
            backgroundColor: '#EEF2FD',
            borderWidth: 0.4,
            borderColor: '#275CE0',
            //height: 80,
            paddingVertical: 20,
            borderRadius: 16,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name="clock" size={25} color={'#275CE0'} />
              <View style={{marginLeft: 10}}>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>
                  Attendance History
                </Text>
                <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                  Class, subject and student wise monthly history
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(39, 92, 224, 0.15)',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                // width: 32,
                // height: 32,
                padding: 3,
              }}>
              <Ionicons name="chevron-down" size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#EEF2FD',
            borderWidth: 0.4,
            borderColor: '#275CE0',
            //height: 80,
            paddingVertical: 20,
            borderRadius: 16,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="checkmark-circle" size={25} color={'#275CE0'} />
              <View style={{marginLeft: 10}}>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>Reports</Text>
                <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                  Class, subject and type wise monthly report
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(39, 92, 224, 0.15)',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                // width: 32,
                // height: 32,
                padding: 3,
              }}>
              <Ionicons name="chevron-down" size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#EEF2FD',
            borderWidth: 0.4,
            borderColor: '#275CE0',
            //height: 80,
            paddingVertical: 20,
            borderRadius: 16,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="checkmark-circle" size={25} color={'#275CE0'} />
              <View style={{marginLeft: 10}}>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>
                  Exam Attendance
                </Text>
                <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                  Take attendance for particular exam(s)
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(39, 92, 224, 0.15)',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                // width: 32,
                // height: 32,
                padding: 3,
              }}>
              <Ionicons name="chevron-down" size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity> */}
        </View>

        {/* <View style={styles.divline} /> */}
      </ScrollView>
    </View>
  );
};

export default AttendanceShow;
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
    fontSize: 18,
    color: 'white',
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
});
