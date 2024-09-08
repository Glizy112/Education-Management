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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {paraGray} from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {ApiMethod} from '../../Config/Api/ApiMethod';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/Colors';
const ProvideCertificate = () => {
  // --------Date-time Picker----------
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {teacherid, schoolid} = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [certidesc, setCertiDesc] = useState('');
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
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append('user_id', userid);
      formData.append('class_id', item.value);
      console.log(formData);
      let resp = await fetch(`${Url.get_all_book}`, {
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
          // console.log("erroe",result);
          // setClassId(result[0].class_id);
          setsubjectdata(result);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('subjectDetail getsubjectData Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getclassData();
  }, []);

  // const addcretificate = async () => {
  //   setLoading(true)
  //   const formData = new FormData();
  //   formData.append('school_id', schoolid);
  //   formData.append('teacher_id', teacherid);
  //   formData.append('class_id', stream);
  //   formData.append('student_id', item.value);
  //   formData.append('event_id', item.value);
  //   formData.append('certificate', item.value);
  //   formData.append('event_date', item.value);
  //   formData.append('comment', item.value);
  //   await ApiMethod(Url.provideCertificate, formData).then(result => {
  //     if (result != false) {
  //       if (result.status == true) {
  //         props.navigation.goBack();
  //         setLoading(false);
  //       } else {
  //         alert('Retry');
  //         setLoading(false);
  //       }
  //     }
  //     setLoad(false)
  //   })
  // }

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
                  label: item.title,
                  value: item.title,
                  subject: item.subject_id,
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
                  label: item.title,
                  value: item.title,
                  subject: item.subject_id,
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
          </View>
          <Text style={styles.formtxt}>Event Date:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '90%',
              height: 50,
              borderColor: '#C4C4C4',
              paddingHorizontal: 0,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 5,
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Choose Date"
              placeholderTextColor="#808080"
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
          <View>
            <Text style={styles.formtxt}>Event Detail:</Text>
            <AutoGrowingTextInput
              style={styles.txtboxDesc}
              placeholder={'Add Description'}
              value={certidesc}
              onChangeText={value => setCertiDesc(value)}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#C4C4C4',
                width: '80%',
                height: 50,
                borderColor: '#C4C4C4',
                alignSelf: 'center',
                borderWidth: 2,
                marginTop: 30,
                marginBottom: 30,
                borderRadius: 15,
                justifyContent: 'center',
              }}
              onPress={{}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProvideCertificate;

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
    fontFamily: 'Montserrat-Regular',
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
