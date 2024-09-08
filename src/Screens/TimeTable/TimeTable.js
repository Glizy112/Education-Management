import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {setTimetable, setuserInfo} from '../../Redux/Actions/actions';

const TimeTable = props => {
  const [active, setActive] = useState('1');
  const dispatch = useDispatch();
  const {schoolid, classid, sectionid, timetable, teacherid} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [day, setDay] = useState('');
  useEffect(() => {
    SetCurrentDay();
  }, []);

  const SetCurrentDay = () => {
    let date = new Date();
    let newday = date.getDay();
    let currentday;
    // console.log('dayy', newday);
    newday == '1'
      ? ((currentday = 'monday'), setActive('1'))
      : newday == '2'
      ? ((currentday = 'tuesday'), setActive('2'))
      : newday == '3'
      ? ((currentday = 'wednesday'), setActive('3'))
      : newday == '4'
      ? ((currentday = 'thursday'), setActive('4'))
      : newday == '5'
      ? ((currentday = 'friday'), setActive('5'))
      : newday == '6'
      ? ((currentday = 'saturday'), setActive('6'))
      : '';
    getapiData(currentday);
  };

  const getapiData = async d => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      // formData.append('section_id', '1');
      if (d == null) {
        formData.append('day', 'monday');
      } else {
        formData.append('day', d);
      }
      // console.log('Send Data ==>', formData);
      let resp = await fetch(Url.timetable, {
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
          // console.log('data', result.data);
          dispatch(setTimetable(result.data));
          setLoading(false);
        });
    } catch (error) {
      console.log('TimeTable => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SetCurrentDay();
  }, []);
  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={loading} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName="My Time Table"
          marginLeft
          back
          time
          onPresss={() =>
            // alert("Feature Coming Soon")}
            props.navigation.navigate('TimeTableHistroy')
          }
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: COLORS.background,
            }}>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor:
                  active === '1' ? COLORS.tablebackground : COLORS.bg,
                backgroundColor:
                  active === '1' ? COLORS.tablebackground : COLORS.bg,
                // width: 64,
                zIndex: active === '1' ? 10 : 0,
              }}
              onPress={() => {
                setActive('1');
                getapiData('monday');
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    color: active === '1' ? COLORS.bg : COLORS.txtblue,
                  },
                ]}>
                MON
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor:
                  active === '2' ? COLORS.tablebackground : COLORS.bg,
                backgroundColor:
                  active === '2' ? COLORS.tablebackground : COLORS.bg,
                // width: 63,
                // marginLeft: -20,
              }}
              onPress={() => {
                setActive('2');
                getapiData('tuesday');
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    color: active === '2' ? COLORS.bg : COLORS.txtblue,
                  },
                ]}>
                TUE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor:
                  active === '3' ? COLORS.tablebackground : COLORS.bg,
                backgroundColor:
                  active === '3' ? COLORS.tablebackground : COLORS.bg,
                // width: 63,
                zIndex: active === '3' ? 10 : 0,
              }}
              onPress={() => {
                setActive('3');
                getapiData('wednesday');
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    color: active === '3' ? COLORS.bg : COLORS.txtblue,
                  },
                ]}>
                WED
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor:
                  active === '4' ? COLORS.tablebackground : COLORS.bg,
                backgroundColor:
                  active === '4' ? COLORS.tablebackground : COLORS.bg,
                // width: 63,
                // marginLeft: -20,
              }}
              onPress={() => {
                setActive('4');
                getapiData('thursday');
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    color: active === '4' ? COLORS.bg : COLORS.txtblue,
                  },
                ]}>
                THU
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor:
                  active === '5' ? COLORS.tablebackground : COLORS.bg,
                backgroundColor:
                  active === '5' ? COLORS.tablebackground : COLORS.bg,
                // width: 63,
                zIndex: active === '5' ? 10 : 0,
              }}
              onPress={() => {
                setActive('5');
                getapiData('friday');
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    color: active === '5' ? COLORS.bg : COLORS.txtblue,
                  },
                ]}>
                FRI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                borderColor:
                  active === '6' ? COLORS.tablebackground : COLORS.bg,
                backgroundColor:
                  active === '6' ? COLORS.tablebackground : COLORS.bg,
                // width: 64,
                // marginLeft: -20,
              }}
              onPress={() => {
                setActive('6');
                getapiData('saturday');
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    marginLeft: 10,
                    marginRight: 10,
                    color: active === '6' ? COLORS.bg : COLORS.txtblue,
                  },
                ]}>
                SAT
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            {timetable.map((table, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  marginTop: 20,
                  borderColor: COLORS.border,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  props.navigation.navigate('Period', {
                    period: timetable[index],
                  });
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.lblack, marginTop: 10, marginBottom: 5},
                  ]}>
                  {table.subject_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: table.subname === 'Lunch Break' ? 10 : 0,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    {table.start_time} - {table.end_time}
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color:
                          table.mode == 'Cancelled' ? COLORS.red : COLORS.green,
                      },
                    ]}>
                    {table.mode}
                  </Text>
                </View>
                {table.subname === 'Lunch Break' && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: -60,
                      marginBottom: 20,
                    }}>
                    <Image source={require('../../../assets/lunch.png')} />
                  </View>
                )}
                {table.subname === 'Lunch Break' ? (
                  <View />
                ) : (
                  <View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: COLORS.background,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                      }}>
                      <Text
                        style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                        {table.class_name}
                      </Text>
                      <Text
                        style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                        Period {index + 1}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          {timetable == '' && loading == false && (
            <View
              style={{
                flex: 1,
                marginBottom: 80,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: '60%',
              }}>
              <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
                NO Data Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default TimeTable;
