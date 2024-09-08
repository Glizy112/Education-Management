import React, {useEffect, useState, useCallback} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {container, paraGray} from '../../theme/styles/Base';
import {COLORS} from '../../theme/Colors';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useFocusEffect} from '@react-navigation/native';

const UpComingLecture = props => {
  const [join, setjoin] = useState([]);
  const [getdata, setGetdata] = useState([]);
  const {userinfo, userid, username, timetable, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    getapiData();
  }, []);

  const newArray = data => {
    let list = [];
    data.map((sub, index) => {
      list.push(false);
    });
    setjoin(list);
    datetime(data);
  };
  const datetime = data => {
    let times = moment().format('HH:mm');
    data.map((sub, index) => {
      let today = new Date();
      let dates =
        today.getFullYear() +
        '-' +
        (today.getDate().length > 1 ? today.getDate() : '0' + today.getDate()) +
        '-' +
        (today.getMonth() + 1);
      // setDate(dates);
      // console.log(dates);
      let list = [...join];
      sub.class_date == dates && console.log('current_time', times); //not to remove this log
      times >= sub.start_time && times <= sub.end_time
        ? (join[index] = true)
        : (join[index] = false),
        setjoin(list);

      // console.log('JOIN LIST', list);
    });
    setLoading(false);
  };

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['subject_name'];
  const [search, setSearch] = useState('');

  const studentlecture = getdata.filter(createFilter(search, KEYS_TO_FILTERS));
  const searchUpdated = term => {
    setSearch(term);
  };

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
          // console.log(result);
          setGetdata(result.data);
          newArray(result.data);
          // setLoading(false);
        });
    } catch (error) {
      console.log('UpComing Lecture List Error => ' + error);
      setLoading(false);
    }
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
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.search}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 2,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Subject Names."
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
            <Feather name="search" size={29} color="#000000" />
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          {studentlecture
            .filter(function (item) {
              return item.status == 1;
            })
            .map((sub, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={{
                    width: '93%',
                    height: 110,
                    borderColor: COLORS.border,
                    alignSelf: 'center',
                    borderWidth: 1,
                    marginTop: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                  }}
                  onPress={() => {
                    props.navigation.navigate('UpComingDetailLecture', {
                      subjects: getdata[index],
                    });
                  }}>
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
                        {
                          fontSize: 13,
                        },
                      ]}>
                      {sub.subject_name}
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          fontSize: 13,
                        },
                      ]}>
                      {sub.class_date}
                    </Text>
                  </View>
                  <View style={{flex: 1, marginTop: 5}}>
                    <Text
                      style={{
                        color: COLORS.lightblack,
                        fontSize: 12,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {sub.start_time} - {sub.end_time}
                    </Text>
                  </View>
                  {/* Show 5min before Lecture  */}
                  {join[index] == true &&
                    (sub.class_type == 'Online' ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          style={{
                            color: COLORS.bluee,
                            fontSize: 12,
                            fontFamily: 'Montserrat-Regular',
                            marginTop: -5,
                          }}>
                          Join
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          style={{
                            color: COLORS.bluee,
                            fontSize: 12,
                            fontFamily: 'Montserrat-Regular',
                            marginTop: -5,
                          }}>
                          Take Attendance
                        </Text>
                      </View>
                    ))}
                  <View
                    style={{
                      borderBottomWidth: 0.8,
                      borderBottomColor: COLORS.background,
                      marginBottom: 5,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                      {sub.class_name}
                    </Text>
                    {/* <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    {sub.peroid}
                  </Text> */}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          {getdata == '' && loading == false && (
            <View
              style={{
                flex: 1,
                marginBottom: 80,
                alignSelf: 'center',
                marginTop: 150,
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

export default UpComingLecture;

const styles = StyleSheet.create({
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
  label: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    paddingHorizontal: 15,
  },
});
