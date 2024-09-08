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
import Url from '../../Config/Api/Url';

const HistoryLecture = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, teacherid, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const PTM = [
    {
      id: '1',
      Stream: 'FY',
      subname: 'Maths',
      PTMDate: '8/12/10',
      PTMTiming: '9:00am - 9:30am',
      TotalStudent: '100',
      Mode: 'Offline',
      Attendent: 'Cancelled',
    },
    {
      id: '2',
      Stream: 'SY',
      subname: 'Hindi',
      PTMDate: '9/12/10',
      PTMTiming: '9:00am - 9:30am',
      TotalStudent: '100',
      Mode: 'Online',
      Attendent: '65',
    },
    {
      id: '3',
      Stream: 'TY',
      subname: 'Science',
      PTMDate: '10/12/10',
      PTMTiming: '9:00am - 9:30am',
      TotalStudent: '100',
      Mode: 'Online',
      Attendent: '65',
    },
    {
      id: '4',
      Stream: 'TY',
      subname: 'Science',
      PTMDate: '10/12/10',
      PTMTiming: '9:00am - 9:30am',
      TotalStudent: '100',
      Mode: 'Offline',
      Attendent: '65',
    },
  ];

  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      let resp = await fetch(`${Url.list_teacher_lecture}`, {
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
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Leave List Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //height: 30,
          justifyContent: 'center',
          paddingHorizontal: 15,
          paddingBottom: 4,
          borderBottomWidth: 1,
          borderColor: COLORS.primary,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
          }}>
          <Text
            style={[paraGray.largebold, {textAlign: 'center', marginTop: 16}]}>
            History
          </Text>
        </View>
      </View>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {getdata
            .filter(function (item) {
              return item.status != 1;
            })
            .map((data, index) => (
              <View style={{flex: 1, paddingHorizontal: 10}} key={index}>
                {console.log('data', data)}
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.bgColor,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    marginVertical: 10,
                  }}
                  //   onPress={() => {
                  //     props.navigation.navigate('LecHistory', {
                  //       ptm: getdata[index],
                  //     });
                  //   }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      width: '95%',
                      alignSelf: 'center',
                    }}>
                    <Text style={[paraGray.darkpara]}>{data.subject_name}</Text>
                    <Text style={[paraGray.darkpara]}>{data.title}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderBottomColor: COLORS.background,
                      borderBottomWidth: 1,
                      marginTop: 15,
                    }}
                  />
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
                        Stream
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        {data.class_name}
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
                        Lecture Date
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        {data.class_date}
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
                        Lecture Timing
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        {data.start_time} - {data.end_time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderBottomColor: COLORS.background,
                      borderBottomWidth: 1,
                      marginTop: 10,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      marginTop: 5,
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
                        Total Student
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        {data.status}
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
                        Attendent
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {
                            color:
                              data.status == '3' ? COLORS.red : COLORS.section,
                            marginLeft: 5,
                          },
                        ]}>
                        {data.status == '3' ? 'Cancelled' : ''}
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
                        Mode
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {
                            color:
                              data.class_type == 'offline'
                                ? COLORS.red
                                : COLORS.green,
                            marginLeft: 5,
                          },
                        ]}>
                        {data.class_type}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
        </View>
        {loading == false && getdata == '' && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 150,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryLecture;
