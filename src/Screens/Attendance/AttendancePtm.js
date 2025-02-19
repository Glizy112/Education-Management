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
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import StandardSelectBtn from './StandardSelectBtn';
import StreamDropDown from '../DropDown/StreamDropDown';
import SubjectDropDown from '../DropDown/SubjectDropDown';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {COLORS} from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {Dropdown} from 'react-native-element-dropdown';

const AttendancePtm = props => {
  // DropDownPicker.setListMode('SCROLLVIEW');
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

  useEffect(() => {
    getapiData();

    // console.log(date);
    // console.log("Tid"+teacherid)
    // console.log('Uid' + userid);
  }, []);

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
          setGetdata(result.data);
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
          setGetsectiondata(result.data);
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
      formData.append('class_id', classvalue);
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
          setGetsubdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);
  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginTop: 20, paddingHorizontal: 15}}>
          <Text style={styles.labeltxt}>Class</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
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
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={classvalue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setClassValue(item.value);
              setIsFocus(false);
              getsectionData(item);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text style={styles.labeltxt}>Section</Text>
          <Dropdown
            style={[styles.dropdown, issectionFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={getsectiondata.map(item => ({
              label: item.section_name,
              value: item.section_id,
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
            placeholder={!issectionFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={sectionvalue}
            onFocus={() => setIssectionFocus(true)}
            onBlur={() => setIssectionFocus(false)}
            onChange={item => {
              setSectionValue(item.value);
              setIssectionFocus(false);
              getsubjectData(item);
            }}
          />
        </View>
        <View style={{paddingHorizontal: 15, marginBottom: 10}}>
          <Text style={styles.labeltxt}>Subject</Text>
          <Dropdown
            style={[styles.dropdown, issubjectFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={getsubdata.map(item => ({
              label: item.name,
              value: item.id,
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
            placeholder={!issubjectFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={subjectvalue}
            onFocus={() => setIssubjectFocus(true)}
            onBlur={() => setIssubjectFocus(false)}
            onChange={item => {
              getsubjectData(item);
              setSubjectName(item.label);
              setSubjectValue(item.value);
              setIssubjectFocus(false);
            }}
          />
        </View>
        {subjectvalue !== null && (
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
                marginTop: '40%',
                marginBottom: 30,
                borderRadius: 15,
                justifyContent: 'center',
              }}
              onPress={() => {
                props.navigation.navigate('TakeAttendance', {
                  classvalue: classvalue,
                  sectionvalue: sectionvalue,
                  subjectvalue: subjectvalue,
                  subjectname: subjectname,
                });
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
        )}
      </ScrollView>
    </View>
  );
};

export default AttendancePtm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  labeltxt: {
    color: '#000000',
    // marginLeft: 10,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 15,
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
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 10,
    fontSize: 14,
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
});
