import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {DataTable, Avatar} from 'react-native-paper';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import FastImage from 'react-native-fast-image';
import Search from '../../Components/Search';
import Button from '../../Components/Button';

const UserTrans = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userinfo, userid, username, showmodal, schoolid, reload} = useSelector(
    state => state.userReducer,
  );
  const fees = [
    {
      id: '1',
      name: 'Vikas Yadav',
      stream: 'FYBCOM',
      tfees: '20,000Rs',
      rfees: '10,000Rs',
      firsttrans: 'First',
      secondtrans: 'Second',
      firstmode: 'offline',
      firstamount: '10,000',
      firstdate: '1/7/2021',
      secondmode: 'online',
      secondamount: '10,000',
      seconddate: '1/9/2021',
    },
    {
      id: '2',
      name: 'Vikas Gupta',
      stream: 'TYBCOM',
      tfees: '20,000Rs',
      rfees: '10,000Rs',
      firsttrans: 'First',
      secondtrans: 'Second',
      firstmode: 'offline',
      firstamount: '10,000',
      firstdate: '10/7/2021',
      secondmode: 'online',
      secondamount: '10,000',
      seconddate: '5/9/2021',
    },
  ];

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name'];
  const [search, setSearch] = useState('');
  const [getdata, setGetdata] = useState([]);

  const studentfilter = getdata.filter(createFilter(search, KEYS_TO_FILTERS));
  const searchUpdated = term => {
    setSearch(term);
  };

  useEffect(() => {
    getapiData();
  }, []);

  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.studentList}`, {
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
          setLoading(false);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View style={styles.search}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 2,
              borderWidth: 2,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Names."
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

        {studentfilter.map((student, index) => (
          <View style={{flex: 1}} key={index}>
            <TouchableOpacity
              style={styles.userinfo}
              key={index}
              onPress={() =>
                props.navigation.navigate('FeesDetail', {
                  fees: studentfilter[index],
                })
              }>
              <DataTable>
                <DataTable.Row style={{borderBottomWidth: 0}}>
                  <DataTable.Cell>
                    {student.photo == null ? (
                      <ImageBackground
                        style={{
                          backgroundColor: COLORS.black,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 45,
                          height: 45,
                          borderRadius: 30,
                        }}>
                        <FontAwesome5
                          name="user-alt"
                          size={25}
                          color="#FFFFFF"
                        />
                      </ImageBackground>
                    ) : (
                      <FastImage
                        style={{width: 50, height: 50, borderRadius: 50}}
                        source={{uri: Url.student_IMG + student.photo}}
                        backgroundColor={COLORS.black}
                      />
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 4.5}}>
                    <Text style={styles.label}>{student.student_name}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </TouchableOpacity>
          </View>
        ))} */}
        <Search
          getdata={getdata}
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          filter={setSearchData}
        />
        <View style={{flex: 1, marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <View>
              <Text
                style={[
                  paraGray.largebold,
                  {fontSize: 16, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                All Students (40)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                //justifyContent: 'space-between',
                alignItems: 'center',
                //width: '10%',
                paddingLeft: -30,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {marginRight: 11, color: 'rgba(0, 0, 0, 0.60)'},
                ]}>
                Student Details
              </Text>
              {/* <Text style={[paraGray.darkpara, {color: 'rgba(0, 0, 0, 0.60)'}]}>
                Mark Absent
              </Text> */}
            </View>
          </View>
          {searchData.length > 0 && searchData
            ? searchData.map((student, index) => (
                <View
                  key={index}
                  style={{
                    //height: 50,

                    marginTop: 20,
                    borderRadius: 5,
                    // width: '90%',
                    //width: '100%',
                    //width:"100%"
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#97A7C3',

                    alignSelf: 'center',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      //justifyContent: 'space-between',

                      width: '90%',
                      alignSelf: 'center',
                    }}>
                    {/*  */}
                    {student.photo == '' ? (
                      <ImageBackground
                        style={{
                          backgroundColor: COLORS.black,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 30,
                        }}>
                        <FontAwesome5
                          name="user-alt"
                          size={20}
                          color="#FFFFFF"
                        />
                      </ImageBackground>
                    ) : (
                      <FastImage
                        style={{width: 42, height: 42, borderRadius: 50}}
                        source={{uri: Url.student_IMG + student.photo}}
                        backgroundColor={COLORS.black}
                      />
                    )}
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          alignItems: 'center',
                          // justifyContent: 'center',
                          //alignSelf: 'center',
                          //borderWidth: 1,
                          width: '65%',
                          alignSelf: 'center',
                          marginBottom: 3,
                          marginLeft: 10,
                        }}>
                        <View>
                          <View>
                            <Text style={[paraGray.largebold, {fontSize: 14}]}>
                              {student.student_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              // width: '50%',
                              marginTop: 3,
                            }}>
                            <View>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {
                                    fontSize: 12,
                                    color: '#97A7C3',
                                    textAlign: 'left',
                                  },
                                ]}>
                                Roll NO- {student.roll_no}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          paddingHorizontal: 16,
                          height: 32,
                          // borderColor: COLORS.primary,
                          backgroundColor: COLORS.primary,
                          alignSelf: 'center',
                          //borderWidth: 1.2,
                          //marginTop: 15,
                          borderRadius: 45,

                          justifyContent: 'center',
                        }}
                        // onPress={() => {
                        //   props.navigation.navigate('BookDetail', {
                        //     student: getdata[index],
                        //   });
                        // }}
                        onPress={() => {
                          props.navigation.navigate('FeesDetail', {
                            fees: studentfilter[index],
                          });
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            : getdata.map((student, index) => (
                <View
                  key={index}
                  style={{
                    //height: 50,

                    marginTop: 20,
                    borderRadius: 5,
                    // width: '90%',
                    //width: '100%',
                    //width:"100%"
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#97A7C3',

                    alignSelf: 'center',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',

                      alignItems: 'center',
                      //justifyContent: 'space-between',

                      width: '90%',
                      alignSelf: 'center',
                    }}>
                    {/*  */}
                    {student.photo == '' ? (
                      <ImageBackground
                        style={{
                          backgroundColor: COLORS.black,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 30,
                        }}>
                        <FontAwesome5
                          name="user-alt"
                          size={20}
                          color="#FFFFFF"
                        />
                      </ImageBackground>
                    ) : (
                      <FastImage
                        style={{width: 42, height: 42, borderRadius: 50}}
                        source={{uri: Url.student_IMG + student.photo}}
                        backgroundColor={COLORS.black}
                      />
                    )}
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          alignItems: 'center',
                          // justifyContent: 'center',
                          //alignSelf: 'center',
                          //borderWidth: 1,
                          width: '65%',
                          alignSelf: 'center',
                          marginBottom: 3,
                          marginLeft: 10,
                        }}>
                        <View>
                          <View>
                            <Text style={[paraGray.largebold, {fontSize: 14}]}>
                              {student.student_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              // width: '50%',
                              marginTop: 3,
                            }}>
                            <View>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {
                                    fontSize: 12,
                                    color: '#97A7C3',
                                    textAlign: 'left',
                                  },
                                ]}>
                                Roll NO- {student.roll_no}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          paddingHorizontal: 16,
                          height: 32,
                          // borderColor: COLORS.primary,
                          backgroundColor: COLORS.primary,
                          alignSelf: 'center',
                          //borderWidth: 1.2,
                          //marginTop: 15,
                          borderRadius: 45,

                          justifyContent: 'center',
                        }}
                        // onPress={() => {
                        //   props.navigation.navigate('BookDetail', {
                        //     student: getdata[index],
                        //   });
                        // }}
                        onPress={() => {
                          props.navigation.navigate('FeesDetail', {
                            fees: studentfilter[index],
                          });
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
        </View>
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              marginTop: 80,
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

export default UserTrans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    // height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
    paddingBottom: 10,
  },
  userinfo: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    flexDirection: 'row',
    color: 'black', // <-- The magic
    textAlign: 'center', // <-- The magic
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    color: '#000000',
  },
  centeredView: {
    // flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '30%',
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});
