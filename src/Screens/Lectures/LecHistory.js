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
  ImageBackground,
} from 'react-native';
import {DataTable, Avatar} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {Header} from '../../Components/Header';

const LecHistory = props => {
  const {ptm} = props.route.params;
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, teacherid, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [parent, setParent] = useState(false);

  const eventss = [
    {
      id: '1',
      name: 'Vikash Yadav',
      totaltime: '1hr',
      stream: 'FY',
      eventname: 'kabbadi',
      contact: '45 Minute',
      attendance: 'Present',
    },
    {
      id: '2',
      name: 'Vikash Gupta',
      totaltime: '45min',
      stream: 'SY',
      eventname: 'Cricket',
      contact: '05 Minute',
      attendance: 'Absent',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      totaltime: '50min',
      stream: 'TY',
      eventname: 'VolleyBall',
      contact: '55 Minute',
      attendance: 'Present',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      totaltime: '50min',
      stream: 'TY',
      eventname: 'VolleyBall',
      contact: '25 Minute',
      attendance: 'Absent',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      totaltime: '50min',
      stream: 'TY',
      eventname: 'VolleyBall',
      contact: '35 Minute',
      attendance: 'Present',
    },
  ];

  useEffect(() => {
    // getapiData();
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
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={ptm.subname}
          marginLeft
        />
      </View>
      {loading == true && <Spinner visible={load} />}
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
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={[paraGray.darkpara]}>{ptm.subject_name}</Text>
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
                  {ptm.class_name}
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
                  {ptm.class_date}
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
                  {ptm.start_time} - {ptm.end_time}
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
                  Static
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
                      color: ptm.status == '3' ? COLORS.red : COLORS.section,
                      marginLeft: 5,
                    },
                  ]}>
                  {ptm.status == '3' ? 'Cancelled' : ''}
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
                        ptm.class_type == 'offline' ? COLORS.red : COLORS.green,
                      marginLeft: 5,
                    },
                  ]}>
                  {ptm.class_type}
                </Text>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 15,
              marginRight: 10,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: COLORS.lightbackground,
                borderRadius: 20,
              }}>
              <Text
                style={[
                  paraGray.whitepara,
                  {
                    marginLeft: 15,
                    marginVertical: 7,
                    fontFamily: 'Montserrat-SemiBold',
                  },
                ]}>
                Download
              </Text>
              <MaterialCommunityIcons
                style={{marginVertical: 8, marginRight: 15}}
                name="download"
                size={20}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomColor: COLORS.background,
              borderBottomWidth: 0.5,
              marginTop: 15,
            }}
          />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{flex: 1}}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Student Name
                </Text>
              </DataTable.Title>
              <DataTable.Title
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                {ptm.Mode == 'Online' ? (
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 12,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    Total Minutes
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 12,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    Attendance
                  </Text>
                )}
              </DataTable.Title>
            </DataTable.Header>
          </DataTable>
          {eventss.map((events, index) => (
            <DataTable key={index}>
              <DataTable.Row style={{borderBottomWidth: 0}}>
                <DataTable.Cell style={{flex: 1}}>
                  <Text
                    style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                    {events.name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  {ptm.Attendent == 'Cancelled' ? (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                        color: COLORS.red,
                      }}>
                      Cancelled
                    </Text>
                  ) : ptm.Mode !== 'Online' ? (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                        color:
                          events.attendance == 'Absent'
                            ? COLORS.red
                            : COLORS.green,
                      }}>
                      {events.attendance}
                    </Text>
                  ) : (
                    <Text
                      style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                      {events.contact}
                    </Text>
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          ))} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default LecHistory;

const styles = StyleSheet.create({
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignbooks: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
});
