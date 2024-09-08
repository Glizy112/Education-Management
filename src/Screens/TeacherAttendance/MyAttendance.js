import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../theme/Colors';
import Attendance from '../../Components/Attendance';

const MyAttendance = ({navigation}) => {
  const [selected, setSelected] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-between',

          paddingHorizontal: 10,
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
              style={{marginVertical: 5, marginHorizontal: 7}}
              name="arrow-back"
              size={20}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', left: 0, right: 0}}>
          <Text
            style={[
              // paraGray.darkpara,
              {
                textAlign: 'center',
                //marginLeft: 30,
                fontFamily: 'Montserrat-Medium',
                fontSize: 16,
                color: COLORS.black,
              },
            ]}>
            My Attendance
          </Text>
        </View>
      </View>
      <ScrollView style={{}}>
        <View>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: COLORS.bgColor,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              width: '90%',
              paddingVertical: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 16,
                  fontWeight: '500',
                  textAlign: 'left',
                }}>
                25 Dec
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 20,
                  fontWeight: '800',
                  textAlign: 'left',
                }}>
                2023
              </Text>
            </View>
            <View
              style={{
                height: 60,
                backgroundColor: 'black',
                width: 1,
                opacity: 0.2,
              }}
            />
            <View
              style={{
                justifyContent: 'center',

                width: '75%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                No events scheduled
              </Text>
            </View>
          </View>
        </View>
        <Attendance stylesCheck={{backgroundColor: COLORS.bgColor}} />

        <View style={{marginTop: 20}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#D9D9D9',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AttendanceHistory')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  Attendance History
                </Text>
                <View style={{marginTop: 5}}>
                  <Text
                    tyle={{
                      color: 'black',
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 12,
                      fontWeight: '400',
                    }}>
                    View your attendance history for this session
                  </Text>
                </View>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TeacherHoliday')}
            style={{
              borderWidth: 1,
              borderColor: '#D9D9D9',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              height: 80,
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  All Holidays
                </Text>
                <View style={{marginTop: 5}}>
                  <Text
                    tyle={{
                      color: 'black',
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 12,
                      fontWeight: '400',
                    }}>
                    View holidays for this session
                  </Text>
                </View>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="arrow-forward" size={20} color={'black'} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyAttendance;
