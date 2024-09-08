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
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { paraGray } from '../../theme/styles/Base';
import Feather from 'react-native-vector-icons/Feather';
import Url from '../../Config/Api/Url';

import { COLORS } from '../../theme/Colors';

const CreateMeeting = props => {
  const { teacherid, schoolid, userid } = useSelector(state => state.userReducer);
  // <--------Drop Down---------->
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [stream, setStream] = useState(null);
  const [isstudentFocus, setIsstudentFocus] = useState(false);
  const [student, setStudent] = useState(null);
  const [getstudentdata, setStudentdata] = useState([]);
  const [ismodeFocus, setIsmodeFocus] = useState(false);
  const [lecmode, setLecMode] = useState(null);
  const [title, setTitle] = useState('');
  const [getdata, setdata] = useState([]);
  // <------------Select section-------------->
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(null);
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);
  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [items, setItems] = useState([
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' },
  ]);
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
  // const showTimepicker = () => {
  //     showMode('time');
  // };
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
    getStudent();
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
          setdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Getting Class Meeting PTM Error => ' + error);
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
          setStudentdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };

  const createMeeting = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', stream);
      formData.append('teacher_id', teacherid);
      formData.append('title', title.replace(/\s+/g, ''));
      formData.append('ptm_date', text);
      formData.append('ptm_time', fromtime);
      formData.append('mode', lecmode);
      formData.append('student_id', student);
      formData.append('end_time', endtime);
      // console.log('PTM Meeting', formData);
      let resp = await fetch(`${Url.insert_ptm}`, {
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
          if (result.status == true) {
            alert(result.message);
            props.navigation.navigate('Ptm');
          } else {
            alert('Retry');
          }
          // setdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Creating Meeting PTM Error => ' + error);
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
              setStream(item.value);
              setIsstreamFocus(false);
              getsectionData(item);
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>Section</Text>
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
              // getsubjectData(item);
            }}
          />
        </View>
        <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
          <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>
            Select Student (Optional)
          </Text>
          <Dropdown
            style={{
              height: 50,
              borderColor: isstudentFocus ? 'blue' : 'gray',
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
            data={getstudentdata.map(item => ({
              label: item.student_name,
              value: item.student_id,
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
            placeholder={!isstudentFocus ? 'Select Student' : '...'}
            searchPlaceholder="Search..."
            value={student}
            onFocus={() => setIsstudentFocus(true)}
            onBlur={() => setIsstudentFocus(false)}
            onChange={item => {
              setStudent(item.value);
              setIsstudentFocus(false);
            }}
          />
        </View>
        <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
          <Text style={[paraGray.darkpara, { marginVertical: 10 }]}>
            Select Mode
          </Text>
          <Dropdown
            style={{
              height: 50,
              borderColor: ismodeFocus ? 'blue' : 'gray',
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
            data={items.map(item => ({
              label: item.label,
              value: item.value,
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
            placeholder={!ismodeFocus ? 'Select Mode' : '...'}
            searchPlaceholder="Search..."
            value={lecmode}
            onFocus={() => setIsmodeFocus(true)}
            onBlur={() => setIsmodeFocus(false)}
            onChange={item => {
              setLecMode(item.value);
              setIsmodeFocus(false);
            }}
          />
        </View>
        <View>
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
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
        </View>
        <Text style={styles.labeltxt}>Choose Timing</Text>
        <Text style={styles.formtxt}>Date</Text>
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
            borderRadius: 10,
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
          <Text style={[styles.formtxt, { flex: 1, marginLeft: -25 }]}>To:</Text>
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
            onPress={showTimepickers}>
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
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.lightbackground,
              width: '80%',
              height: 50,
              alignSelf: 'center',
              marginTop: 30,
              marginBottom: 20,
              borderRadius: 20,
              justifyContent: 'center',
            }}
            onPress={createMeeting}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Create Meeting
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateMeeting;

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
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});
