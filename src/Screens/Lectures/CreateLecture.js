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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
//import {Dropdown} from 'react-native-element-dropdown';
import DropDown from '../../Components/DropDown';
import FieldInputs from '../../Components/FieldInputs';
import {paraGray} from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {COLORS} from '../../theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SelectMultipleButton,
  SelectMultipleGroupButton,
} from 'react-native-selectmultiple-button';
import _ from 'lodash';

const CreateLecture = props => {
  const [openStream, setOpenStream] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [openLectureMode, setOpenLectureMode] = useState(false);
  const [itemsStream, setItemsStream] = useState(null);
  const [itemsSection, setItemsSection] = useState(null);
  const [itemsSubject, setItemsSubject] = useState(null);
  const [itemsLectureMode, setItemsLectureMode] = useState(null);

  const [radioSelectedData, setradioSelectedData] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {teacherid, userid, schoolid} = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [title, setTitle] = useState('');
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
  // <------------Select Mode-------------->
  const [selectedmode, setSelectedMode] = useState(null);
  const [ismodeFocus, setIsmodeFocus] = useState(false);
  const [lecmode, setLecMode] = useState(null);
  const [getmodedata, setmodedata] = useState([]);
  const [items, setItems] = useState([
    {label: 'Online', value: 'Online'},
    {label: 'Offline', value: 'Offline'},
  ]);
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
          console.log(result);
          setdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Create Lecture ClassData Error => ' + error);
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
      console.log('Create Lecture Section Error => ' + error);
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
  const createLec = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', stream);
      formData.append('section_id', section);
      formData.append('subject_id', subject);
      formData.append('teacher_id', teacherid);
      formData.append('class_type', lecmode);
      formData.append('title', title.replace(/\s+/g, ''));
      formData.append('date', text);
      formData.append('start_time', fromtime);
      formData.append('end_time', endtime);
      console.log('PTM Meeting', formData);
      let resp = await fetch(`${Url.teacher_create_lecture}`, {
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
            props.navigation.navigate('Lecture');
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
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <View>
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
                Create Lecture
              </Text>
            </View>
          </View>
          <View style={{marginTop: 15, paddingHorizontal: 20}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Stream
            </Text>
            {/* <Dropdown
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
            /> */}
            <DropDown
              open={openStream}
              value={stream}
              items={getdata.map(item => ({
                label: item.class_name,
                value: item.class_id,
              }))}
              setOpen={setOpenStream}
              setItems={setItemsStream}
              onSelectItem={item => {
                // getsectionData(item);
                setselectedStream(item);
                setStream(item.value);
                setIsstreamFocus(false);
                getsectionData(item);
              }}
            />
          </View>
        </View>
        <View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Section
            </Text>
            {/* <Dropdown
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
            /> */}
            <DropDown
              open={openSection}
              value={section}
              items={getsectiondata.map(item => ({
                label: item.section_name,
                value: item.section_id,
                // subject: item.subject_id,
              }))}
              setOpen={setOpenSection}
              setItems={setItemsSection}
              onSelectItem={item => {
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
            {/* <Dropdown
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
            /> */}
            <DropDown
              open={openSubject}
              value={subject}
              items={getsubjectdata.map(item => ({
                label: item.name,
                value: item.id,
                // subject: item.subject_id,
              }))}
              setOpen={setOpenSubject}
              setItems={setItemsSubject}
              onSelectItem={item => {
                setSelectedSubject(item);
                setsubject(item.value);
                setIssubjectFocus(false);
                // setsubjectId(item.subject);
              }}
            />
          </View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Lecture Mode
            </Text>
            {/* <Dropdown
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
              placeholder={!ismodeFocus ? 'Select Mode' : '...'}
              searchPlaceholder="Search..."
              value={lecmode}
              onFocus={() => setIsmodeFocus(true)}
              onBlur={() => setIsmodeFocus(false)}
              onChange={item => {
                setSelectedMode(item);
                setLecMode(item.value);
                setIsmodeFocus(false);
                // setsubjectId(item.subject);
              }}
            /> */}
            <DropDown
              open={openLectureMode}
              value={lecmode}
              items={items.map(item => ({
                label: item.label,
                value: item.value,
                // subject: item.subject_id,
              }))}
              setOpen={setOpenLectureMode}
              setItems={setItemsLectureMode}
              onSelectItem={item => {
                setSelectedMode(item);
                setLecMode(item.value);
                setIsmodeFocus(false);
                // setsubjectId(item.subject);
              }}
            />
          </View>
          <Text style={styles.formtxt}>Title:</Text>
          <View>
            {/* <TextInput
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
            /> */}
            <FieldInputs
              placeholder="ENTER TITLE"
              value={title}
              onChangeText={value => setTitle(value)}
              styles={{width: '90%', alignSelf: 'center'}}
            />
          </View>
          {/* <Text style={styles.labeltxt}>Choose Timing</Text> */}
          <Text style={styles.formtxt}>Date</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '90%',
              height: 50,
              borderColor: COLORS.primary,
              paddingHorizontal: 0,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 12,
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
                width: '90%',
                height: 40,
                fontFamily: 'Montserrat-Regular',
              }}>
              {text}
            </TextInput>
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={26}
              //color="#434b56"
              color={COLORS.primary}
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
          </TouchableOpacity>
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
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height: 50,
                //borderColor: '#D3D3D3',
                borderColor: COLORS.primary,
                borderWidth: 1,
                marginTop: 15,
                // borderRadius: 5,
                borderRadius: 12,
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
                //color="#434b56"
                color={COLORS.primary}
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
                //borderColor: '#D3D3D3',
                paddingHorizontal: 3,
                borderColor: COLORS.primary,
                borderWidth: 1,
                marginTop: 15,
                //borderRadius: 5,
                borderRadius: 12,
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
                //color="#434b56"
                color={COLORS.primary}
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
                // backgroundColor: '#000000',
                backgroundColor: COLORS.primary,
                width: '80%',
                height: 50,
                borderColor: '#000000',
                alignSelf: 'center',
                //borderWidth: 2,
                marginTop: 30,
                marginBottom: 30,
                borderRadius: 15,
                justifyContent: 'center',
              }}
              onPress={createLec}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Create Lecture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateLecture;

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
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
});
