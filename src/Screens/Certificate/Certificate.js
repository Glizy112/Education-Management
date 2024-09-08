import React, {useState, useEffect} from 'react';
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
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import {ListItem} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
//import {Dropdown} from 'react-native-element-dropdown';

import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import DropDown from '../../Components/DropDown';
import FieldInputs from '../../Components/FieldInputs';
const Certificate = props => {
  const [isCertificate, setIsCerificate] = useState(false);
  const [openStream, setOpenStream] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
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
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
              Certificate
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ProvideCertificate');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Provide Certificate</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('CertificateHistory');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>History</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
        <View style={styles.divline} />

        {/* <TouchableOpacity onPress={() => { props.navigation.navigate('ReportAttendance') }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Report</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
 */}
        <View style={{width: '90%', alignSelf: 'center'}}>
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
                        Provide Certificate
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
            isExpanded={isCertificate}
            onPress={() => {
              setIsCerificate(!isCertificate);
            }}>
            <ScrollView>
              <View style={{}}>
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
                  setOpen={setOpenStream}
                  placeholder={'Select Stream'}
                  items={getdata.map(item => ({
                    label: item.class_name,
                    value: item.class_id,
                  }))}
                  value={stream}
                  onSelectItem={item => {
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
                  <View style={{}}>
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
                  /> */}
                    <DropDown
                      open={openSection}
                      setOpen={setOpenSection}
                      placeholder={'Select Stream'}
                      items={getsectiondata.map(item => ({
                        label: item.title,
                        value: item.title,
                        subject: item.subject_id,
                      }))}
                      value={section}
                      onSelectItem={item => {
                        setSelectedSection(item);
                        setSection(item.value);
                        setIsSectionFocus(false);
                        getsubjectData(item);
                      }}
                    />
                  </View>
                  <View style={{}}>
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
                  /> */}
                    <DropDown
                      open={openSubject}
                      setOpen={setOpenSubject}
                      placeholder={'Select subject'}
                      items={getsubjectdata.map(item => ({
                        label: item.title,
                        value: item.title,
                        subject: item.subject_id,
                      }))}
                      value={subject}
                      onSelectItem={item => {
                        setSelectedSubject(item);
                        setsubject(item.value);
                        setIssubjectFocus(false);
                        // setsubjectId(item.subject);
                      }}
                    />
                  </View>
                </View>
                <View>
                  <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                    Event title:
                  </Text>
                  <FieldInputs
                    placeholder={'Add Title'}
                    styles={{
                      paddingVertical: 10,
                      marginTop: 0,
                      fontSize: 13,
                      fontFamily: 'Montserrat-Regular',
                    }}
                  />
                </View>
                <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                  Event Date:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: 50,
                    // borderColor: '#C4C4C4',
                    borderColor: COLORS.primary,
                    paddingHorizontal: 0,
                    //borderWidth: 1,
                    borderWidth: 0.6,
                    //   marginTop: 15,
                    // borderRadius: 5,
                    borderRadius: 12,
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    placeholder=" Choose Date"
                    placeholderTextColor="#808080"
                    style={{
                      marginLeft: 0,
                      backgroundColor: '#FFFFFF',
                      borderColor: '#C4C4C4',
                      width: '90%',
                      height: 40,
                      fontSize: 13,
                      color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    {text}
                  </TextInput>
                  <MaterialCommunityIcons
                    name="calendar-blank-outline"
                    size={26}
                    // color="#434b56"
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
                </View>
                <View>
                  <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                    Event Detail:
                  </Text>
                  <AutoGrowingTextInput
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: COLORS.primary,
                      borderWidth: 0.6,
                      borderRadius: 12,
                      height: 80,
                      width: '100%',
                      alignSelf: 'center',
                      fontSize: 13,
                      //color: '#000000',
                      fontFamily: 'Montserrat-Regular',
                    }}
                    placeholder={' Add Description'}
                    value={certidesc}
                    onChangeText={value => setCertiDesc(value)}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      //backgroundColor: '#C4C4C4',
                      backgroundColor: COLORS.primary,
                      width: '80%',
                      height: 50,
                      borderColor: '#C4C4C4',
                      alignSelf: 'center',
                      //   borderWidth: 2,
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
          </ListItem.Accordion>
          <View>
            <Text
              style={[paraGray.largebold, {fontSize: 16, marginBottom: 10}]}>
              History
            </Text>
            <FlatList
              data={[{}, {}, {}, {}]}
              renderItem={({item}) => (
                <View
                  style={{
                    // borderWidth: 1,

                    alignSelf: 'center',
                    borderRadius: 10,
                    width: '100%',
                    padding: 10,
                    backgroundColor: '#EEF2FD',
                    marginBottom: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FontAwesome name="star" size={23} color={'#385AB1'} />
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 16, marginLeft: 5},
                        ]}>
                        Event Title
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {
                            color: 'rgba(0, 0, 0, 0.60)',
                            fontSize: 12,
                            textAlign: 'right',
                          },
                        ]}>
                        Date
                      </Text>
                      <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                        09-01-2024
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={1}
                        style={[paraGray.darkpara, {fontSize: 12}]}>
                        This is the event description...
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[paraGray.largebold, {fontSize: 12}]}>
                        Class 5th A
                      </Text>
                      <Text
                        style={{
                          height: 14,
                          width: 1,
                          backgroundColor: '#97A7C3',
                          marginLeft: 5,
                        }}
                      />
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 12, marginLeft: 5},
                        ]}>
                        English
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />

            <Text
              style={[paraGray.largebold, {fontSize: 14, textAlign: 'right'}]}>
              View All
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Certificate;

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
    color: '#000000',
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
