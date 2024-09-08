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
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import {
  setuserId,
  setuserInfo,
  setuserName,
  setShowModal,
  setuserImage,
} from '../../Redux/Actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';
import {Dropdown} from 'react-native-element-dropdown';

const Period = props => {
  const {period} = props.route.params;
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, teacherid, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [fromdate, setFromDate] = useState(period.start_time);
  const [todate, setToDate] = useState(period.end_time);
  const [refreshing, setRefreshing] = React.useState(false);
  const [cancelreason, setCancelReason] = useState('');

  // <------------Select Teacher to Divert-------------->
  const [selecteddivert, setSelectedDivert] = useState(null);
  const [isdivertFocus, setIsdivertFocus] = useState(false);
  const [divert, setDivert] = useState(null);
  const [getdivertdata, setdivertdata] = useState([]);
  const [mode, setMode] = useState(period.mode);

  useEffect(() => {
    getteacherlist();
  }, []);

  const getteacherlist = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', period.class_id);

      let resp = await fetch(`${Url.divert_lecture}`, {
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
          setdivertdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('TimeTable getclassData Error => ' + error);
      setLoading(false);
    }
  };

  const CancelLec = async () => {
    if (cancelreason.length < 1) {
      alert('Please Enter Reason to Cancel the Lecture');
    } else {
      dispatch(setShowModal(false));
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('school_id', schoolid);
        formData.append('lecture_id', period.id);
        formData.append('class_id', period.class_id);
        formData.append('teacher_id', teacherid);
        formData.append('section_id', period.section_id);
        formData.append('subject_id', period.subject_id);
        formData.append('status', 3);
        formData.append('note', cancelreason);
        // console.log("Data",formData);
        let resp = await fetch(`${Url.update_lecture_status}`, {
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
              setLoading(false);
              alert(result.message);
              props.navigation.navigate('TimeTable');
            } else {
              alert('Retry');
              setLoading(false);
            }
          });
      } catch (error) {
        console.log('TimeTable CancelLec Error => ' + error);
        setLoading(false);
      }
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getclassData();
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName={period.subject_name}
          marginLeft
          back
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              borderRadius: 10,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: COLORS.border,
              marginVertical: 10,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                marginTop: 10,
                marginBottom: 10,
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Subject Name :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  {period.subject_name}
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Class Room :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  {period.class_name}
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Date :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  29/4/2022
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Period :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  Period {period.index}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {flex: 1, color: COLORS.black, marginLeft: 5},
                  ]}>
                  From:
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {flex: 1, color: COLORS.black, marginLeft: 5},
                  ]}>
                  To:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="Choose Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={fromdate}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}
                  textAlign="center"
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.black, marginHorizontal: 5},
                    ]}>
                    -
                  </Text>
                </View>
                <TextInput
                  placeholder="Choose Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={todate}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                  textAlign="center"
                />
              </View>
              <View>
                <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                  Lecture Mode
                </Text>
                <TextInput
                  placeholder="Unavailable"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={mode}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                  textAlign="center"
                />
              </View>
              <View>
                <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                  Divert My Lecture
                </Text>
                <TextInput
                  placeholder="Currently Unavailable"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={mode}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                  textAlign="center"
                />
                {/* <Dropdown
                  style={{
                    height: 50,
                    borderColor: isdivertFocus ? 'blue' : 'gray',
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
                  data={getdivertdata.map(item => ({
                    label: item.teacher_name,
                    value: item.teacher_id,
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
                  placeholder={!isdivertFocus ? 'Divert My Lecture' : '...'}
                  searchPlaceholder="Search..."
                  value={divert}
                  onFocus={() => setIsdivertFocus(true)}
                  onBlur={() => setIsdivertFocus(false)}
                  onChange={item => {
                    setSelectedDivert(item);
                    setDivert(item.value);
                    setIsdivertFocus(false);
                    // setsubjectId(item.subject);
                  }}
                /> */}
              </View>
              {mode == 'Online' ? (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                    Join Session
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  onPress={() =>
                    props.navigation.navigate('TakeAttendance', {
                      classvalue: period.class_id,
                      sectionvalue: period.section_id,
                      subjectvalue: period.subject_id,
                    })
                  }>
                  <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                    Take Attendance
                  </Text>
                </TouchableOpacity>
              )}
              {/* <View
                style={{
                  flex: 1,
                  borderBottomColor: COLORS.background,
                  borderBottomWidth: 1,
                  marginTop: 20,
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Date of Lecture :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  20/12/10
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Mode :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  Online
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Total Attendent :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  85 Present
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Lecture Taken By :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  Not Yet Started
                </Text>
              </View> */}
            </View>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 45,
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                backgroundColor: COLORS.bluee,
                borderRadius: 30,
              }}
              // onPress={() => {
              //   props.navigation.navigate('UpdateLecture', {
              //     lecdetail: period,
              //   });
              // }}
            >
              <Text
                style={[
                  paraGray.whitelarge,
                  {fontFamily: 'Montserrat-SemiBold'},
                ]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                backgroundColor: COLORS.black,
                borderRadius: 20,
              }}
              onPress={() => {
                dispatch(setShowModal(!showmodal));
              }}>
              <Text
                style={[
                  paraGray.whitepara,
                  {marginVertical: 8, marginHorizontal: 10},
                ]}>
                Cancel Lecture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* {loading == false && getData == '' && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 120,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )} */}
      </ScrollView>
      <Modal
        visible={showmodal}
        onDismiss={() => dispatch(setShowModal(false))}
        contentContainerStyle={{
          width: '75%',
          height: 350,
          backgroundColor: COLORS.bg,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <Text style={[paraGray.darkpara]}>Cancellation Reason</Text>
        <AutoGrowingTextInput
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: 80,
            borderColor: '#D3D3D3',
            alignSelf: 'center',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
            fontSize: 13,
            fontFamily: 'Montserrat-Regular',
          }}
          value={cancelreason}
          onChangeText={value => setCancelReason(value)}
          placeholder="Reason"
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={CancelLec}>
            <Text
              style={[
                paraGray.whitepara,
                {
                  backgroundColor: COLORS.active,
                  paddingHorizontal: 40,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
              ]}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Period;
