import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Url from '../../../Config/Api/Url';
import {COLORS} from '../../../theme/Colors';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ExamAttendance = props => {
  const {userinfo, userid, username, showmodal, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const [isclassroomFocus, setClassroomFocus] = useState(false);
  const [classroomvalue, setClassroomValue] = useState(null);
  const [classroom_name, setClassroom_Name] = useState(null);
  const [getdata, setGetdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
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
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 15, marginBottom: 10}}>
        <Text style={styles.labeltxt}>Classroom</Text>
        <Dropdown
          style={[styles.dropdown, isclassroomFocus && {borderColor: 'blue'}]}
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
          placeholder={!isclassroomFocus ? 'Select Classroom' : '...'}
          searchPlaceholder="Search..."
          value={classroomvalue}
          onFocus={() => setClassroomFocus(true)}
          onBlur={() => setClassroomFocus(false)}
          onChange={item => {
            setClassroomValue(item.value);
            setClassroom_Name(item.label);
            setClassroomFocus(false);
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.lightbackground,
            width: '50%',
            height: 50,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 30,
            justifyContent: 'center',
          }}
          onPress={() => {
            // setLoading(true);
            props.navigation.navigate('TakeExamAttendance', {
              classnumber: '102',
            });
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontFamily: 'Montserrat-SemiBold',
              marginRight: 5,
            }}>
            Take Attendance
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          // alert("Feature Coming Soon")
          props.navigation.navigate('ExamAttenReport', {
            classnumber: '102',
          });
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Exam Attendance Report</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          // alert("Feature Coming Soon")
          props.navigation.navigate('MySubjectAtten');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>My Subject Attendance</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          // alert("Feature Coming Soon")
          props.navigation.navigate('MyClassRoomAtten');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>My Classroom Attendance</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
    </View>
  );
};

export default ExamAttendance;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
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
    color: '#000000',
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
