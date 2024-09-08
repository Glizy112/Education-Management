import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';

const TeacherAttendance = props => {
  const dispatch = useDispatch();
  const [absent, setAbsent] = useState(2);
  const [holiday, setHoliday] = useState(1);
  const [active, setActive] = useState('1');
  const {schoolid, classid, sectionid, studentid} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [get, set] = useState([]);
  const [getdata, setdata] = useState([]);
  const [attenddata, setAttenddata] = useState([]);
  const TeacherAttendances = [
    {
      id: '1',
      name: 'Social Study',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Monday',
      date: '14th March',
      attend: 'Login',
      time: '10.00am',
      apply: 'Leave',
    },
    {
      id: '2',
      name: 'Science',
      holidayname: 'Holi',
      day: 'Saturday',
      hday: 'Tuesday',
      date: '14th March',
      attend: 'Logout',
      time: '11.00am',
      apply: 'Leave',
    },
  ];

  const subjectAttend = [
    {
      date: '1-07-22',
      subject: ['English', 'Maths', 'Science'],
      attendances: ['P', 'A'],
    },
    {
      date: 'day_2',
      subject: ['English', 'Maths', 'Science'],
      attendances: ['P', 'A'],
    },
    {
      date: 'day_3',
      subject: ['English', 'Maths', 'Science'],
      attendances: ['P', 'A'],
    },
  ];
  useEffect(() => {
    getAttendanceapiData();
  }, []);
  let nextDay = [];
  let newDaysObject = {};

  const getAttendanceapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('class_id', '1');
      formData.append('section_id', '1');
      formData.append('student_id', '1');

      let resp = await fetch(
        'http://intraedu.in/admin/StudentApi/student_attendance_list_by_ID',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      )
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setAttenddata(result.data);
          // console.log('hi',result.data);
          setLoading(false);
        });
      // holidayarray();
    } catch (error) {
      console.log('TeacherAttendance Error => ' + error);
      setLoading(false);
    }
  };

  const getholidayapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(
        'http://intraedu.in/admin/StudentApi/holiday_by_school_id',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      )
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          setdata(result);
          if (result != '') {
            result.map(item => {
              var json_data = item.date_from;
              nextDay.push(json_data);
            }),
              set(nextDay);
          }
          setLoading(false);
        });
      // holidayarray();
    } catch (error) {
      console.log('TeacherHoliday Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (active == '1') {
      getAttendanceapiData();
    } else {
      getholidayapiData();
    }
  }, []);

  get.forEach(day => {
    newDaysObject[day] = {
      selected: true,
      marked: false,
      selectedColor: COLORS.green,
    };
  });
  return (
    <View style={container.container}>
      {loading == true && <Spinner visible={loading} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.bluee}}>
        <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 20}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <AntDesign name="left" size={20} color={COLORS.bg} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -3,
            }}>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor: active === '1' ? COLORS.skyblue : COLORS.bg,
                backgroundColor: active === '1' ? COLORS.skyblue : COLORS.bg,
                width: 130,
                zIndex: active === '1' ? 10 : 0,
              }}
              onPress={() => {
                setActive('1');
                getAttendanceapiData();
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: active === '1' ? 0 : -10,
                    color: active === '1' ? COLORS.bg : COLORS.txtblue,
                    fontSize: 12,
                  },
                ]}>
                ATTENDANCE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor: active === '1' ? COLORS.bg : COLORS.skyblue,
                backgroundColor: active === '1' ? COLORS.bg : COLORS.skyblue,
                width: 100,
                marginLeft: -20,
              }}
              onPress={() => {
                setActive('2');
                getholidayapiData();
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: active === '1' ? 10 : 0,
                    color: active === '1' ? COLORS.txtblue : COLORS.bg,
                    fontSize: 12,
                  },
                ]}>
                HOLIDAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {active === '1' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image
            style={{backgroundColor: COLORS.bluee, width: '100%'}}
            source={require('../../../assets/star_pattern.png')}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingHorizontal: 15,
              paddingBottom: 30,
              marginTop: -30,
            }}>
            <View style={{marginTop: 20}}>
              <Calendar
                firstDay={1}
                enableSwipeMonths={true}
                arrowColor="#000000"
                markedDates={{
                  '2022-03-12': {
                    selected: true,
                    marked: false,
                    selectedColor: COLORS.red,
                  },
                  '2022-03-16': {
                    selected: true,
                    marked: false,
                    selectedColor: COLORS.red,
                  },
                  '2022-03-14': {
                    selected: true,
                    marked: false,
                    selectedColor: COLORS.green,
                  },
                  // '2022-03-18': {marked: false,  activeOpacity: 0},
                  // '2022-03-19': {disabled: true, disableTouchEvent: true}
                }}
                onDayPress={day => {
                  console.log('selected day', day.dateString);
                }}
                theme={{
                  selectedDayBackgroundColor: '#00adf5',
                  'stylesheet.calendar.header': {
                    dayTextAtIndex0: {
                      color: 'red',
                    },
                    dayTextAtIndex6: {
                      color: 'blue',
                    },
                  },
                  arrowColor: COLORS.black,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.red,
              }}
              onPress={() => props.navigation.navigate('TeacherAbsent')}>
              <View
                style={{
                  width: `${((100 * absent) / 30).toFixed(1)}%`,
                  backgroundColor: COLORS.red,
                  height: 50,
                  borderRadius: 8.3,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  position: 'absolute',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={[
                    paraGray.darkpara,
                    {
                      flex: 1,
                      position: 'absolute',
                      top: 12,
                      left: 28,
                      zIndex: 5,
                    },
                  ]}>
                  Absent
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      backgroundColor: COLORS.lightred,
                      top: 5,
                      right: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        paraGray.darkpara,
                        {
                          top: 2,
                          color: COLORS.red,
                          fontFamily: 'Poppins-SemiBold',
                        },
                      ]}>
                      {absent}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.green,
              }}
              onPress={() => props.navigation.navigate('TeacherHoliday')}>
              <View
                style={{
                  width: `${((100 * holiday) / 30).toFixed(1)}%`,
                  backgroundColor: COLORS.green,
                  height: 50,
                  borderRadius: 8.3,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  position: 'absolute',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={[
                    paraGray.darkpara,
                    {
                      flex: 1,
                      position: 'absolute',
                      top: 12,
                      left: 25,
                      zIndex: 5,
                    },
                  ]}>
                  Festival & Holidays
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      backgroundColor: COLORS.lightgreen,
                      top: 5,
                      right: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        paraGray.darkpara,
                        {
                          top: 2,
                          color: COLORS.green,
                          fontFamily: 'Poppins-SemiBold',
                        },
                      ]}>
                      {holiday}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              marginTop: -20,
              marginBottom: 30,
            }}>
            {TeacherAttendances.map((attend, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  marginTop: 15,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={[paraGray.darklarge]}>{attend.date}</Text>
                  <Text style={[paraGray.lightParaSmall]}>{attend.time}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                    marginTop: 5,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={[paraGray.lightParaSmall]}>You are {''}</Text>
                    <Text
                      style={[
                        paraGray.lightParaSmall,
                        {
                          color:
                            attend.attend === 'Login'
                              ? COLORS.green
                              : COLORS.red,
                        },
                      ]}>
                      {attend.attend} {''}
                    </Text>
                  </View>
                  <Text style={[paraGray.lightParaSmall]}>{attend.day}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image
            style={{backgroundColor: COLORS.bluee, width: '100%'}}
            source={require('../../../assets/star_pattern.png')}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingHorizontal: 15,
              paddingBottom: 30,
              marginTop: -30,
            }}>
            <View style={{marginTop: 20}}>
              <Calendar
                firstDay={1}
                arrowColor="#000000"
                enableSwipeMonths={true}
                markedDates={newDaysObject}
                theme={{
                  'stylesheet.calendar.header': {
                    dayTextAtIndex0: {
                      color: 'red',
                    },
                    dayTextAtIndex6: {
                      color: 'blue',
                    },
                  },
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              marginTop: -20,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.blue,
              }}
              onPress={() => props.navigation.navigate('TeacherApplyHistory')}>
              <View
                style={{
                  width: `${((100 * absent) / 30).toFixed(1)}%`,
                  backgroundColor: COLORS.blue,
                  height: 50,
                  borderRadius: 8.3,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  position: 'absolute',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={[
                    paraGray.darkpara,
                    {
                      flex: 1,
                      position: 'absolute',
                      top: 12,
                      left: 28,
                      zIndex: 5,
                    },
                  ]}>
                  Apply for Leave
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      backgroundColor: COLORS.lightSkyblue,
                      top: 5,
                      right: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        paraGray.darkpara,
                        {
                          top: 2,
                          color: COLORS.blue,
                          fontFamily: 'Poppins-SemiBold',
                        },
                      ]}>
                      {absent}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.green,
              }}
              onPress={() => props.navigation.navigate('TeacherHoliday')}>
              <View
                style={{
                  width: `${((100 * absent) / 30).toFixed(1)}%`,
                  backgroundColor: COLORS.green,
                  height: 50,
                  borderRadius: 8.3,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  position: 'absolute',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  numberOfLines={1}
                  style={[
                    paraGray.darkpara,
                    {
                      flex: 1,
                      position: 'absolute',
                      top: 12,
                      left: 28,
                      zIndex: 5,
                    },
                  ]}>
                  Festival & Holidays
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      backgroundColor: COLORS.lightSkygreen,
                      top: 5,
                      right: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        paraGray.darkpara,
                        {
                          top: 2,
                          color: COLORS.green,
                          fontFamily: 'Poppins-SemiBold',
                        },
                      ]}>
                      {holiday}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.border,
                justifyContent: 'center',
                paddingHorizontal: 10,
                marginTop: 15,
              }}
              onPress={() => props.navigation.navigate('TeacherLeaveApply')}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={[paraGray.darklarge]}>31-11-2020</Text>
                {/* <Text style={[paraGray.lightParaSmall]}>{attend.time}</Text> */}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                  marginTop: 5,
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={[paraGray.lightParaSmall]}>Apply for {''}</Text>
                  <Text
                    style={[
                      paraGray.lightParaSmall,
                      {
                        color: COLORS.blue,
                      },
                    ]}>
                    Leave {''}
                  </Text>
                </View>
                <Text style={[paraGray.lightParaSmall]}>Saturday</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default TeacherAttendance;
