import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { COLORS } from '../../theme/Colors';
import { container, paraGray } from '../../theme/styles/Base';
import { Header } from '../../Components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Url from '../../Config/Api/Url';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';
import GestureRecognizer, { swipeDirections } from "react-native-swipe-detect";


const Ptm = props => {
  const { userinfo, userid, username, showmodal, userimage, schoolid, teacherid } =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indexx, setIndexx] = useState(0);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [join, setjoin] = useState([]);

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
      let resp = await fetch(`${Url.ptmByTeacherId}`, {
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
          // console.log('PTM List Response===> ', result);
          setData(result.data);
          newArray(result.data)
          // setLoading(false);
        });
    } catch (error) {
      console.log('PTM List Error => ' + error);
      setLoading(false);
    }
  };

  const newArray = data => {
    let list = [];
    data.map((sub, index) => {
      list.push(false);
    });
    setjoin(list);
    datetime(data);
  };

  const datetime = data => {
    let times = Moment().format('HH : mm');
    data.map((sub, index) => {
      let today = new Date();
      let dates =
        (today.getDate() > 9 ? today.getDate() : '0' + today.getDate()) +
        '/' +
        (today.getMonth() + 1) +
        '/' +
        today.getFullYear();
      let list = [...join];
      if (sub.mode === 'Online') {
        if (sub.ptm_date == dates) {
          times >= sub.ptm_time
            ? join[index] = times <= sub.end_time ? true : false
            : join[index] = false
        }
        else { join[index] = false }
      } else {
        join[index] = false
      }
      setjoin(list);
    });
    setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );
  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.black }}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName="PTM"
          marginLeft
          back
          time
          onPresss={() =>
            props.navigation.navigate('PTMHistory')
          }
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flex: 1 }}>
          <Swiper
            height={300}
            showsButtons={false}
            showsPagination={true}
            autoplay={true}
            loop={true}
          // index={indexx}
          >
            {getdata.map((sub, index) => (
              <View
                key={index}
                style={{
                  // flex: 1,
                  marginTop: 30,
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: COLORS.outline,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      backgroundColor: COLORS.lighterblue,
                      borderRadius: 6,
                      paddingHorizontal: 5,
                      paddingVertical: 3
                    }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.tablebackground },
                      ]}>
                      {sub.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={[paraGray.lightPara, { color: COLORS.lightblack }]}>
                    Stream
                  </Text>
                  <Text style={[paraGray.lightPara, { color: COLORS.lblack }]}>
                    {sub.class_name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[paraGray.lightPara, { color: COLORS.lightblack }]}>
                    PTM Date
                  </Text>
                  <Text style={[paraGray.lightPara, { color: COLORS.lblack }]}>
                    {sub.ptm_date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[paraGray.lightPara, { color: COLORS.lightblack }]}>
                    PTM Timing
                  </Text>
                  <Text style={[paraGray.lightPara, { color: COLORS.lblack }]}>
                    {Moment(sub.ptm_time["HH.mm"]).format("hh:mm a")}
                  </Text>
                </View>
                {join[index] === true ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.bluee,
                      width: '100%',
                      height: 45,
                      alignSelf: 'center',
                      marginTop: 20,
                      marginBottom: 20,
                      borderRadius: 10,
                      justifyContent: 'center',
                    }}
                  // onPress={{}}
                  >
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Join Session
                    </Text>
                  </TouchableOpacity>
                ) : (<View style={{ height: 45 }}>
                </View>
                )}
              </View>
            ))}
          </Swiper>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => {
              props.navigation.navigate('CreateMeeting');
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.bluee,
                marginBottom: 10,
              }}>
              <Image
                style={{ height: 100, width: 105 }}
                source={require('../../../assets/MeetingRoom(1).png')}
              />
            </View>
            <Text style={styles.headerText}>Create Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
          // onPress={() => {
          //   props.navigation.navigate('CreateMeeting');
          // }}
          >
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.bluee,
                marginBottom: 10,
              }}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'center',
                  color: COLORS.bluee,
                }}
                source={require('../../../assets/AttendancePTM.png')}
              />
            </View>
            <Text style={styles.headerText}>Attendance</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Ptm;
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
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
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
