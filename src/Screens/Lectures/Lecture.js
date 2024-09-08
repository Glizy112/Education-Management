import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import {container, paraGray} from '../../theme/styles/Base';
import {COLORS} from '../../theme/Colors';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import Swiper from 'react-native-swiper';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
const Lecture = props => {
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
        (today.getDate() > 9 ? today.getDate() : '0' + today.getDate()) +
        '-' +
        (today.getMonth() + 1);
      // setDate(dates);
      // console.log(dates);
      let list = [...join];
      sub.class_date == dates && console.log('current_time', times); //not to remove this log
      times >= sub.start_time && times <= sub.end_time
        ? (join[index] = true)
        : (join[index] = false),
        console.log('newList---> ', list);
      setjoin(list);
    });
    setLoading(false);
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

  return (
    <View style={styles.container}>
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
          <Text style={[paraGray.largebold, {color: 'black'}]}>Lecture</Text>
        </View>
      </View>
      <View
        style={{
          height: getdata.length < 1 && loading == false ? 0 : 200,
          marginBottom: getdata.length < 1 && loading == false ? 1 : 0,
        }}>
        {loading == true && <Spinner visible={load} />}

        {/*
 <Swiper
          height={180}
          showsPagination={true}
          horizontal={true}
          loop={true}
          onIndexChanged={item => console.log(item)}
          renderPagination={(index, total, context) => {
            return (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {Array.from(Array(total), (item, i) => (
                  <View
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginHorizontal: 5,
                      backgroundColor: index === i ? 'blue' : 'gray', // Adjust active and inactive dot styles
                    }}
                  />
                ))}
              </View>
            );
          }}
          paginationStyle={{}}>
          {getdata
            // .filter(function (item) {
            //   console.log(item.status);
            //   return item.status == 1;
            // })
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
        {/* {join[index] == true &&
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
                    ))} */}
        {/* <View
                    style={{
                      borderBottomWidth: 0.8,
                      borderBottomColor: COLORS.background,
                      marginBottom: 5,
                    }}
                  /> */}
        {/* <View
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
        {/* </View> */}
        {/* </TouchableOpacity>
              </View> */}
        {/* ))}
        </Swiper> */}
        <SwiperFlatList
          style={{
            backgroundColor: 'white',
            flex: 1,

            // height: hp('55%'),
            // paddingVertical: 50,
          }}
          paginationStyle={{}}
          paginationStyleItemActive={{width: 10, height: 10}}
          paginationStyleItem={{width: 10, height: 10}}
          data={getdata}
          getCurrentIndex={item => console.log(item)}
          // paginationStyle={{position: 'absolute', zIndex: 99}}
          showPagination={true}
          horizontal={true}
          paginationActiveColor="blue"
          renderItem={({item, index}) => (
            <View
              style={{
                width: wp('100%'),
                alignSelf: 'center',
                //height: '40%',
                paddingBottom: 30,
              }}>
              <TouchableOpacity
                style={{
                  //a1spectRatio: 800.1, // Adjust the aspect ratio to maintain card size
                  width: '90%',
                  height: '70%',
                  borderColor: COLORS.border,
                  borderWidth: 1,
                  borderRadius: 10,

                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  props.navigation.navigate('UpComingDetailLecture', {
                    subjects: getdata[index],
                  });
                }}>
                <View
                  style={{
                    flex: 1,

                    // width: '100%',
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
                    {item.subject_name}
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        fontSize: 13,
                      },
                    ]}>
                    {item.class_date}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      color: COLORS.lightblack,
                      fontSize: 12,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    {item.start_time} - {item.end_time}
                  </Text>
                </View>
                {/* Show 5min before Lecture  */}
                {join[index] == true &&
                  (item.class_type == 'Online' ? (
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
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    {item.class_name}
                  </Text>
                  <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                    {item.title}
                  </Text>
                  {/* <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                {sub.peroid}
              </Text> */}
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('CreateLecture');
        }}>
        <View style={[styles.arrow, {marginTop: 10}]}>
          <Text style={styles.headerText}>Create Lecture</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} /> */}
      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('UpComingLecture');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Upcoming</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} /> */}
      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('TimeTable');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>My Time Table</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('HistoryLecture');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>History</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} /> */}
      <View style={{marginTop: 10}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            //onPress={() => props.navigation.navigate('AddBulkBook')}
            onPress={() => props.navigation.navigate('CreateLecture')}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>
                Create Lecture
              </Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            //onPress={() => props.navigation.navigate('AddBulkBook')}
            onPress={() => props.navigation.navigate('TimeTable')}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>
                My Time Table
              </Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#275CE0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 80,
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
            //onPress={() => props.navigation.navigate('AddBulkBook')}
            onPress={() => props.navigation.navigate('HistoryLecture')}>
            <View>
              <Text style={[paraGray.parahome, {fontSize: 14}]}>History</Text>
              <View style={{marginTop: 5}}>
                <Text tyle={paraGray.darkpara}>
                  View the attendance report for a recent examination
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Lecture;
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
