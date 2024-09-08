import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../Config/Api/Url';
import {
  setShowModal,
  setuserName,
  setuserId,
  setuserInfo,
  setuserEmail,
} from '../../Redux/Actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import moment from 'moment';

import {CheckBox} from '@rneui/themed';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import Search from '../../Components/Search';
//   return (

const TakeAttendance = props => {
  const SENDER_NUMBER = '9082111479';
  const APIKEY = 'SGhrvzPsC3SW9RxcoLfEjEVVJrHOMA70';
  // const SENDER_NUMBER = '9824072880';
  const {subjectvalue, classvalue, sectionvalue, subjectname} =
    props.route.params;
  //console.log('Params', props.route.params);
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setGetdata] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [checked, setChecked] = useState(true);

  const [getAttendance, setAttendance] = useState([]);
  const [studentFilter, setStudentFilter] = useState([]);
  const demo = [
    {phone: '9082111479', attend: 'P', name: 'Vikash'},
    // {phone: '9714288151', attend: 'P', name: 'Ayush'},
    // {phone: '9824072880', attend: 'A', name: 'Vikash Gupta'},
    {phone: '9082111479', attend: 'A', name: 'Vikash Gupta'},
  ];

  useEffect(() => {
    getapiData();
    let today = new Date();
    let date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    setDate(date);

    var times = moment().utcOffset('+05:30').format('hh:mm a');
    setTime(times);
    // console.log(datetime,"-----");
  }, []);

  // --------APICall----------
  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', classvalue);
      formData.append('section_id', sectionvalue);
      let resp = await fetch(`${Url.Find_Student_By_class_section}`, {
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
          setGetdata(result.data);
          getAttendance_data(result.data);
        });
    } catch (error) {
      console.log('TakeAttendance Error => ' + error);
      setLoading(false);
    }
  };

  const getAttendance_data = data => {
    let list = [];
    // console.log('data', data);
    data.map((value, index) => {
      var json_data = {
        id: value.studentId,
        status: 0,
        attendance: 'P',
      };
      list.push(json_data);
    });
    setAttendance(list);
    // console.log('here' + JSON.stringify(getAttendance));
    setLoading(false);
  };

  const submitAttendance = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', classvalue);
      formData.append('section_id', sectionvalue);
      formData.append('date', date);
      formData.append('subject_id', subjectvalue);
      formData.append('students', JSON.stringify(getAttendance));
      // console.log('Datas', JSON.stringify(getAttendance));
      let resp = await fetch(`${Url.student_attendance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          // console.log('hello' + JSON.stringify(result));
          if (result.status == true) {
            // sendmsg(getAttendance);
            setLoading(false);
            alert(result.message);
            props.navigation.navigate('Home');
          } else {
            alert('Retry');
            setLoading(false);
          }
        });
    } catch (error) {
      console.log('TakeAttendance Error => ' + error);
      alert(error);
      setLoading(false);
    }
  };

  // const sendmsg = async () => {
  //   setLoading(true);
  //   let MESSAGE;
  //   for (let index = 0; index < demo.length; index++) {
  //     const element = demo[index];
  //     // console.log(element, '-------element');
  //     element.attend == 'A'
  //       ? (MESSAGE = `Hello parents,%0a%0a%0a%0aYour child *${element.name}* has been *Absent* for *${subjectname}* *lecture* which was conducted on *${date}*%0aTime : *${time}*.%0a%0a%0aThanks;%0aRegard%0a*${username}*`)
  //       : (MESSAGE = `Hello parents,%0a%0a%0a%0aYour child *${element.name}* is *Present* for *${subjectname}* *lecture* which was conducted on *${date}*%0aTime : *${time}*.%0a%0a%0aThanks;%0aRegard%0a*${username}*`);
  //     let resp = await fetch(
  //       `https://intraedu.wpchat.in/public/send-message?api_key=${APIKEY}&sender=${
  //         91 + SENDER_NUMBER
  //       }&number=${91 + element.phone}&message=${MESSAGE}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //         },
  //       },
  //     )
  //       .then(response => {
  //         return response.json();
  //       })
  //       .then(results => {
  //         // console.log('hello' + JSON.stringify(results));
  //       });
  //   }
  //   setLoading(false);
  //   alert('Done');
  //   props.navigation.navigate('Home');
  // };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  //     <View style={styles.container}>
  //       {loading == true && <Spinner visible={load} />}
  //       <ScrollView
  //         showsVerticalScrollIndicator={false}
  //         refreshControl={
  //           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  //         }>
  //         <View style={styles.rowcontainer}>
  //           <View>
  //             <Text style={styles.rowTxt}>Present</Text>
  //           </View>
  //           <View
  //             style={{
  //               flex: 1,
  //               justifyContent: 'center',
  //               marginRight: 20,
  //             }}>
  //             <Text style={[styles.rowTxt, {textAlign: 'center'}]}>
  //               Student Name
  //             </Text>
  //           </View>
  //           <View>
  //             <Text style={styles.rowTxt}>Absent</Text>
  //           </View>
  //         </View>

  //         {getdata.map(
  //           (user, index) =>
  //             getAttendance.length > 0 && (
  //               <View style={styles.dataview} key={index}>
  //                 <View style={styles.radio}>
  //                   <View
  //                     style={{
  //                       // flex: 1,
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                     }}>
  //                     <RadioButton
  //                       status={
  //                         getAttendance[index].attendance === 'P'
  //                           ? 'checked'
  //                           : 'unchecked'
  //                       }
  //                       onPress={() => {
  //                         let list = [...getAttendance];
  //                         var json_data = {
  //                           id: user.studentId,
  //                           status: 0,
  //                           attendance: 'P',
  //                         };
  //                         list[index] = json_data;
  //                         setAttendance(list);
  //                       }}
  //                     />
  //                   </View>
  //                   <View
  //                     style={{
  //                       flex: 1,
  //                       justifyContent: 'center',
  //                       alignItems: 'center',
  //                     }}>
  //                     <Text style={styles.datatxt}>{user.name}</Text>
  //                   </View>
  //                   <View
  //                     style={{
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                     }}>
  //                     <RadioButton
  //                       status={
  //                         getAttendance[index].attendance === 'A'
  //                           ? 'checked'
  //                           : 'unchecked'
  //                       }
  //                       onPress={() => {
  //                         let list = [...getAttendance];
  //                         var json_data = {
  //                           id: user.studentId,
  //                           status: 0,
  //                           attendance: 'A',
  //                         };
  //                         list[index] = json_data;
  //                         setAttendance(list);
  //                       }}
  //                     />
  //                   </View>
  //                 </View>
  //               </View>
  //             ),
  //         )}
  //         {getdata != '' && (
  //           <View>
  //             <TouchableOpacity
  //               style={{
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 backgroundColor: COLORS.bluee,
  //                 width: '50%',
  //                 height: 50,
  //                 alignSelf: 'center',
  //                 marginTop: '20%',
  //                 marginBottom: 30,
  //                 borderRadius: 22,
  //                 justifyContent: 'center',
  //               }}
  //               onPress={() => {
  //                 submitAttendance();
  //               }}>
  //               <Text
  //                 style={{
  //                   color: '#FFFFFF',
  //                   fontSize: 15,
  //                   fontFamily: 'Montserrat-SemiBold',
  //                 }}>
  //                 Submit Attendance
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //         )}
  //         {getdata == '' && loading == false && (
  //           <View
  //             style={{
  //               flex: 1,
  //               marginBottom: 80,
  //               alignSelf: 'center',
  //               marginTop: 100,
  //             }}>
  //             <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
  //               NO Data Found
  //             </Text>
  //           </View>
  //         )}
  //       </ScrollView>
  //     </View>
  //   );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              6th A | English
            </Text>
          </View>
        </View>
        <Search
          getdata={getdata}
          KEYS_TO_FILTERS={['name']}
          filter={setStudentFilter}
          mainViewStyle={{borderWidth: 1, borderColor: '#275CE0'}}
          iconColor={'#385AB1'}
          placeholder={'Search student name'}
          placeholderTextColor={'rgba(0, 0, 0, 0.50)'}
        />
        <View style={{marginTop: 10}}>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',

              flex: 1,
            }}>
            <View>
              <Text
                style={[
                  paraGray.largebold,
                  {fontSize: 12, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                Filter By
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {marginRight: 15, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                All Present
              </Text>
              <Text style={[paraGray.darkpara, {color: 'rgba(0, 0, 0, 0.60)'}]}>
                All Absent
              </Text>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',

              marginTop: 10,
            }}>
            <Text
              style={[
                paraGray.largebold,
                {fontSize: 12, color: 'rgba(0, 0, 0, 0.60)'},
              ]}>
              Filter By
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  paraGray.darkpara,
                  {marginRight: 25, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                Present
              </Text>
              <Text style={[paraGray.darkpara, {color: 'rgba(0, 0, 0, 0.60)'}]}>
                Absent
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',

              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                //flex: 1,
                //  alignSelf: 'flex-start',

                //              marginBottom: 60,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 32,
                  borderColor: COLORS.primary,
                  alignSelf: 'center',
                  borderWidth: 1.2,
                  marginTop: 15,
                  borderRadius: 45,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Present
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 32,
                  borderColor: COLORS.red,
                  alignSelf: 'center',
                  borderWidth: 1.2,
                  marginTop: 15,
                  borderRadius: 45,
                  justifyContent: 'center',
                  marginLeft: 16,
                }}>
                <Text
                  style={{
                    color: COLORS.red,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                alignSelf: 'center',
                //width: '35%',
                justifyContent: 'space-between',
                marginTop: 10,
                //flex: 1,
              }}>
              <View
                style={[
                  paraGray.darkpara,
                  {marginRight: 11, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                <CheckBox
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                  // Use ThemeProvider to make change for all checkbox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  uncheckedColor="#275CE0"
                  checkedColor="#275CE0"
                  size={30}
                />
              </View>
              <View>
                <CheckBox
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                  // Use ThemeProvider to make change for all checkbox
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  uncheckedColor="#E92020"
                  checkedColor="#E92020"
                  size={30}
                />
              </View>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '95%',
              alignSelf: 'flex-end',
              //marginVertical: 10,
              //borderWidth: 1,
              // flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'flex-start',
                //justifyContent: 'flex-start',

                alignSelf: 'flex-start',
                // alignContent: 'flex-start',

                //height: '100%',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 32,
                  borderColor: COLORS.primary,
                  alignSelf: 'center',
                  borderWidth: 1.2,
                  borderRadius: 45,
                  justifyContent: 'center',
                  marginTop: 15,
                  marginRight: 16,
                }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Present
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 32,
                  borderColor: COLORS.red,
                  alignSelf: 'center',
                  borderWidth: 1.2,
                  borderRadius: 45,
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: COLORS.red,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'flex-end',
                alignSelf: 'center',
                marginRight: 2,
              }}>
              <View
                style={[
                  paraGray.darkpara,
                  {
                    color: 'rgba(0, 0, 0, 0.60)',
                    borderRadius: 50,
                    overflow: 'hidden',
                  },
                ]}>
                <CheckBox
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  uncheckedColor="#275CE0"
                  checkedColor="#275CE0"
                  size={30}
                  wrapperStyle={{borderRadius: 100, overflow: 'hidden'}}
                  style={{}}
                />
                <Text style={[paraGray.darkpara, {textAlign: 'center'}]}>
                  All
                </Text>
              </View>
              <View style={[paraGray.darkpara, {color: 'rgba(0, 0, 0, 0.60)'}]}>
                <CheckBox
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  uncheckedColor="#E92020"
                  checkedColor="#E92020"
                  size={30}
                />
                <Text style={[paraGray.darkpara, {textAlign: 'center'}]}>
                  All
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
              //borderWidth: 1,
            }}>
            <View>
              <Text
                style={[
                  paraGray.largebold,
                  {fontSize: 16, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                All Students (40)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {marginRight: 25, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                Present
              </Text>
              <Text style={[paraGray.darkpara, {color: 'rgba(0, 0, 0, 0.60)'}]}>
                Absent
              </Text>
            </View>
          </View>
          {studentFilter.length > 0 && studentFilter ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={studentFilter}
              keyExtractor={item => item.EnrollId}
              renderItem={({item}) => (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      alignItems: 'center',
                      // justifyContent: 'center',
                      //alignSelf: 'center',
                      // borderWidth: 1,
                      width: '90%',
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    <View>
                      <View>
                        <Text style={[paraGray.largebold, {fontSize: 14}]}>
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '50%',
                          marginTop: 2,
                        }}>
                        <View>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {
                                fontSize: 11,
                                color: '#97A7C3',
                                textAlign: 'left',
                              },
                            ]}>
                            Roll NO- {item.roll_no}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        //borderWidth: 1,
                        width: '35%',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={[
                          paraGray.darkpara,
                          {marginRight: 11, color: 'rgba(0, 0, 0, 0.60)'},
                        ]}>
                        <CheckBox
                          checked={checked}
                          onPress={() => setChecked(!checked)}
                          // Use ThemeProvider to make change for all checkbox
                          iconType="material-community"
                          checkedIcon="checkbox-marked"
                          uncheckedIcon="checkbox-blank-outline"
                          uncheckedColor="#275CE0"
                          checkedColor="#275CE0"
                          size={30}
                        />
                      </View>
                      <View>
                        <CheckBox
                          checked={checked}
                          onPress={() => setChecked(!checked)}
                          // Use ThemeProvider to make change for all checkbox
                          iconType="material-community"
                          checkedIcon="checkbox-marked"
                          uncheckedIcon="checkbox-blank-outline"
                          uncheckedColor="#E92020"
                          checkedColor="#E92020"
                          size={30}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '100%',
                      marginTop: 5,
                      borderColor: '#97A7C3',
                    }}></View>
                </View>
              )}
            />
          ) : (
            // <FlatList
            //   showsVerticalScrollIndicator={false}
            //   data={getdata}
            //   keyExtractor={item => item.EnrollId}
            //   renderItem={({item}) => (
            //     <View>
            //       <View
            //         style={{
            //           flexDirection: 'row',
            //           justifyContent: 'space-between',
            //           marginTop: 10,
            //           alignItems: 'center',
            //           // justifyContent: 'center',
            //           //alignSelf: 'center',

            //           width: '90%',
            //           alignSelf: 'center',
            //           marginBottom: 3,
            //           flex: 1,
            //         }}>
            //         <View style={{borderWidth: 1}}>
            //           <View>
            //             <Text
            //               style={[
            //                 paraGray.largebold,
            //                 {fontSize: 14, width: '40%'},
            //               ]}>
            //               {item.name}
            //             </Text>
            //           </View>
            //           <View
            //             style={{
            //               flexDirection: 'row',
            //               justifyContent: 'space-between',
            //               alignItems: 'center',
            //               // width: '50%',
            //               marginTop: 10,
            //             }}>
            //             <View>
            //               <Text
            //                 style={[
            //                   paraGray.darkpara,
            //                   {
            //                     fontSize: 12,
            //                     color: '#97A7C3',
            //                     textAlign: 'left',
            //                   },
            //                 ]}>
            //                 Roll NO- {item.roll_no}
            //               </Text>
            //             </View>
            //           </View>
            //         </View>
            //         <View
            //           style={{
            //             flexDirection: 'row',
            //             justifyContent: 'space-between',
            //             alignItems: 'center',
            //             //borderWidth: 1,
            //             // /width: '35%',
            //             alignSelf: 'center',
            //           }}>
            //           <View
            //             style={[
            //               paraGray.darkpara,
            //               {marginRight: 11, color: 'rgba(0, 0, 0, 0.60)'},
            //             ]}>
            //             <CheckBox
            //               checked={checked}
            //               onPress={() => setChecked(!checked)}
            //               // Use ThemeProvider to make change for all checkbox
            //               iconType="material-community"
            //               checkedIcon="checkbox-marked"
            //               uncheckedIcon="checkbox-blank-outline"
            //               uncheckedColor="#275CE0"
            //               checkedColor="#275CE0"
            //               size={30}
            //             />
            //           </View>
            //           <View>
            //             <CheckBox
            //               checked={checked}
            //               onPress={() => setChecked(!checked)}
            //               // Use ThemeProvider to make change for all checkbox
            //               iconType="material-community"
            //               checkedIcon="checkbox-marked"
            //               uncheckedIcon="checkbox-blank-outline"
            //               uncheckedColor="#E92020"
            //               checkedColor="#E92020"
            //               size={30}
            //             />
            //           </View>
            //         </View>
            //       </View>
            //       <View
            //         style={{
            //           borderBottomWidth: 1,
            //           width: '100%',
            //           marginTop: 5,
            //           borderColor: '#97A7C3',
            //         }}></View>
            //     </View>
            //   )}
            // />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={getdata}
              keyExtractor={item => item.EnrollId}
              renderItem={({item}) => (
                <View style={{marginVertical: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      //  justifyContent: 'space-between',
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        //width: '90%',
                        alignSelf: 'center',
                        paddingLeft: 20,
                      }}>
                      <Text style={[paraGray.largebold, {fontSize: 14}]}>
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 12, color: '#97A7C3', marginTop: 5},
                        ]}>
                        Roll NO- {item.roll_no}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <CheckBox
                        right={true}
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        uncheckedColor="#275CE0"
                        checkedColor="#275CE0"
                        size={30}
                      />
                      <CheckBox
                        right={true}
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        uncheckedColor="#E92020"
                        checkedColor="#E92020"
                        size={30}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#97A7C3',
                      marginTop: 5,
                    }}
                  />
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TakeAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  rowcontainer: {
    alignItems: 'center',
    paddingHorizontal: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTxt: {
    flexWrap: 'wrap',
    marginTop: 20,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  dataview: {
    paddingHorizontal: '6%',
    marginTop: 10,
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datatxt: {
    alignSelf: 'center',

    fontSize: 15,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  radio: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
});
