import React, { useState, useEffect } from 'react';
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
import { DataTable, Avatar } from 'react-native-paper';
import { COLORS } from '../../theme/Colors';
import { container, paraGray } from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { useSelector, useDispatch } from 'react-redux';
import {
  setuserId,
  setuserInfo,
  setuserName,
  setShowModal,
  setuserImage,
} from '../../Redux/Actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import PTMHistory from './PTMHistory';

const PTMHistoryDetail = props => {
  const { ptm } = props.route.params;
  const dispatch = useDispatch();
  const { userinfo, userid, username, showmodal, userimage, schoolid } =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [parent, setParent] = useState(false);

  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('ptm_id', ptm.id);
      console.log('SEND DATA==> ' + JSON.stringify(formData));
      let resp = await fetch(`${Url.ptmuserlist}`, {
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
      console.log('PTM History Detail List Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
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
              <Text style={[paraGray.darkpara]}>Exam</Text>
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
                    { color: COLORS.lightblack, marginLeft: 5 },
                  ]}>
                  Stream
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    { color: COLORS.section, marginLeft: 5 },
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
                    { color: COLORS.lightblack, marginLeft: 5 },
                  ]}>
                  PTM Date
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    { color: COLORS.section, marginLeft: 5 },
                  ]}>
                  {ptm.ptm_date}
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
                    { color: COLORS.lightblack, marginLeft: 5 },
                  ]}>
                  PTM Timing
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    { color: COLORS.section, marginLeft: 5 },
                  ]}>
                  {ptm.ptm_time}
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
                    { color: COLORS.lightblack, marginLeft: 5 },
                  ]}>
                  Total Student
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    { color: COLORS.section, marginLeft: 5 },
                  ]}>
                  {ptm.student[0].total_student}
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
                    { color: COLORS.lightblack, marginLeft: 5 },
                  ]}>
                  Attendent
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color:
                        ptm.Attendent == 'Cancelled'
                          ? COLORS.red
                          : COLORS.section,
                      marginLeft: 5,
                    },
                  ]}>
                  {ptm.parent[0].total_attend_parent}
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
                    { color: COLORS.lightblack, marginLeft: 5 },
                  ]}>
                  Mode
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color:
                        ptm.mode != 'Online' ? COLORS.red : COLORS.section,
                      marginLeft: 5,
                    },
                  ]}>
                  {ptm.mode}
                </Text>
              </View>
            </View>
          </View>
          <View
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
                style={{ marginVertical: 8, marginRight: 15 }}
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
              <DataTable.Title style={{ flex: 1 }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Student Name
                </Text>
              </DataTable.Title>
              <DataTable.Title style={{ flex: 1, justifyContent: 'center' }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Parent Name
                </Text>
              </DataTable.Title>
              <DataTable.Title
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  Total Minutes
                </Text>
              </DataTable.Title>
            </DataTable.Header>
          </DataTable>
          {getdata.map((events, index) => (
            <DataTable key={index}>
              <DataTable.Row style={{ borderBottomWidth: 0 }}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}>
                    {events.student_name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                  <Text
                    style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}>
                    {events.parent_name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  {ptm.mode != 'Online' ? (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                        color: COLORS.red,
                      }}>
                      Cancelled
                    </Text>
                  ) : (
                    <Text
                      style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}>
                      {events.time}
                    </Text>
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          ))}
           {getdata == '' && loading == false && (
            <View
              style={{
                flex: 1,
                marginBottom: 80,
                alignSelf: 'center',
                marginTop: 80,
              }}>
              <Text style={[paraGray.darklarge, { textAlign: 'center' }]}>
                NO Data Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PTMHistoryDetail;

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
