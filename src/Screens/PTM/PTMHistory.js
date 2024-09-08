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
} from 'react-native';
import { List, Modal } from 'react-native-paper';
import { COLORS } from '../../theme/Colors';
import { container, paraGray } from '../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

const PTMHistory = props => {
  const dispatch = useDispatch();
  const { userinfo, userid, username, showmodal, userimage, schoolid, teacherid } =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
 
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
      // console.log('DATA' + JSON.stringify(formData));
      let resp = await fetch(`${Url.ptm_history}`, {
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
          // console.log('PTM History Response===> ', result);
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('PTM History List Error => ' + error);
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
        <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
          {getdata.map((data, index) => (
            <View style={{ flex: 1, paddingHorizontal: 10 }} key={index}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.bg,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  marginVertical: 10,
                }}
                onPress={() => {
                  props.navigation.navigate('PTMHistoryDetail', {
                    ptm: getdata[index],
                  });
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
                        { color: COLORS.lightblack, marginLeft: 5 },
                      ]}>
                      PTM Date
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.section, marginLeft: 5 },
                      ]}>
                      {data.ptm_date}
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
                      {data.ptm_time} - {data.end_time}
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
                      {data.student[0].total_student}
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
                            data.Attendent == 'Cancelled'
                              ? COLORS.red
                              : COLORS.section,
                          marginLeft: 5,
                        },
                      ]}>
                      {data.parent[0].total_attend_parent}
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
                            data.mode != 'Online'
                              ? COLORS.red
                              : COLORS.section,
                          marginLeft: 5,
                        },
                      ]}>
                      {data.mode}
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
              marginTop: 120,
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

export default PTMHistory;
