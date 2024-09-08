import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import {useFocusEffect} from '@react-navigation/native';
import Search from '../../Components/Search';
const HistoryAss = props => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [getdata, setGetdata] = useState([]);

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['subname', 'stream'];
  const [state, setState] = useState({searchTerm: ''});

  const filtersubjects = getdata.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
  };

  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      // console.log('Send Data' + JSON.stringify(formData));
      let resp = await fetch(`${Url.assignmentlist}`, {
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
          setGetdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Assignment History Error => ' + error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    // <View style={styles.container}>
    //   {loading == true && <Spinner visible={load} />}
    //   <ScrollView
    //     showsVerticalScrollIndicator={false}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }>
    //     <View style={styles.search}>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           alignbooks: 'center',
    //           backgroundColor: '#FFFFFF',
    //           width: '100%',
    //           height: 50,
    //           borderColor: '#D3D3D3',
    //           paddingHorizontal: 0,
    //           borderWidth: 1,
    //           marginTop: 15,
    //           borderRadius: 10,
    //         }}>
    //         <TextInput
    //           placeholder="Search by Subject Name / Stream"
    //           placeholderTextColor="#808080"
    //           onChangeText={term => {
    //             searchUpdated(term);
    //           }}
    //           style={{
    //             marginLeft: 2,
    //             marginTop: 2,
    //             backgroundColor: '#FFFFFF',
    //             width: '90%',
    //             height: 40,
    //             fontSize: 12,
    //             fontFamily: 'Montserrat-Regular',
    //           }}
    //         />
    //         <Feather
    //           style={{ marginTop: 6 }}
    //           name="search"
    //           size={29}
    //           color="#000000"
    //         />
    //       </View>
    //     </View>
    //     <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
    //       {filtersubjects.map((data, index) => (
    //         <View style={{ flex: 1, paddingHorizontal: 10 }} key={index}>
    //           <TouchableOpacity
    //             style={{
    //               flex: 1,
    //               backgroundColor: COLORS.bg,
    //               borderRadius: 20,
    //               paddingHorizontal: 10,
    //               borderWidth: 1,
    //               borderColor: COLORS.active,
    //               marginVertical: 10,
    //             }}
    //             onPress={() => {
    //               props.navigation.navigate('HistoryDetailAss', {
    //                 data: getdata[index],
    //               });
    //             }}>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 marginTop: 10,
    //               }}>
    //               <Text style={[paraGray.darkpara, { color: COLORS.active }]}>
    //                 {data.subject_name}
    //               </Text>
    //             </View>
    //             <View
    //               style={{
    //                 flex: 1,
    //                 borderBottomColor: COLORS.background,
    //                 borderBottomWidth: 1,
    //                 marginTop: 15,
    //               }}
    //             />
    //             <View
    //               style={{
    //                 flex: 1,
    //                 justifyContent: 'space-between',
    //                 marginTop: 10,
    //                 marginBottom: 10,
    //               }}>
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   marginTop: 10,
    //                   justifyContent: 'space-between',
    //                 }}>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.lightblack, marginLeft: 5 },
    //                   ]}>
    //                   Stream
    //                 </Text>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.section, marginLeft: 5 },
    //                   ]}>
    //                   {data.class_name}
    //                 </Text>
    //               </View>
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   marginTop: 10,
    //                   justifyContent: 'space-between',
    //                 }}>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.lightblack, marginLeft: 5 },
    //                   ]}>
    //                   Assigment Created Date
    //                 </Text>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.section, marginLeft: 5 },
    //                   ]}>
    //                   {data.date}
    //                 </Text>
    //               </View>
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   marginTop: 10,
    //                   justifyContent: 'space-between',
    //                 }}>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.lightblack, marginLeft: 5 },
    //                   ]}>
    //                   Assigment Created Timing
    //                 </Text>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.section, marginLeft: 5 },
    //                   ]}>
    //                   {data.time}
    //                 </Text>
    //               </View>
    //             </View>
    //             <View
    //               style={{
    //                 flex: 1,
    //                 borderBottomColor: COLORS.background,
    //                 borderBottomWidth: 1,
    //                 marginTop: 10,
    //               }}
    //             />
    //             <View
    //               style={{
    //                 flex: 1,
    //                 justifyContent: 'space-between',
    //                 marginTop: 5,
    //                 marginBottom: 10,
    //               }}>
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   marginTop: 10,
    //                   justifyContent: 'space-between',
    //                 }}>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.lightblack, marginLeft: 5 },
    //                   ]}>
    //                   Last Submission Date
    //                 </Text>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.section, marginLeft: 5 },
    //                   ]}>
    //                   {data.deadline}
    //                 </Text>
    //               </View>
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   marginTop: 10,
    //                   justifyContent: 'space-between',
    //                 }}>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.lightblack, marginLeft: 5 },
    //                   ]}>
    //                   Total Student
    //                 </Text>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.section, marginLeft: 5 },
    //                   ]}>
    //                   {data.total_student}
    //                 </Text>
    //               </View>
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   marginTop: 10,
    //                   justifyContent: 'space-between',
    //                 }}>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.lightblack, marginLeft: 5 },
    //                   ]}>
    //                   Attendent
    //                 </Text>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     {
    //                       color: COLORS.section,
    //                       marginLeft: 5,
    //                     },
    //                   ]}>
    //                   {data.attendent}
    //                 </Text>
    //               </View>
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   marginTop: 10,
    //                   justifyContent: 'space-between',
    //                 }}>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     { color: COLORS.lightblack, marginLeft: 5 },
    //                   ]}>
    //                   Mode
    //                 </Text>
    //                 <Text
    //                   style={[
    //                     paraGray.darkpara,
    //                     {
    //                       color: COLORS.section,
    //                       marginLeft: 5,
    //                     },
    //                   ]}>
    //                   {data.mode}
    //                 </Text>
    //               </View>
    //             </View>
    //           </TouchableOpacity>
    //         </View>
    //       ))}
    //     </View>
    //   </ScrollView>
    // </View>
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
            alignbooks: 'center',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: 50,
            borderColor: '#D3D3D3',
            paddingHorizontal: 0,
            borderWidth: 1,
            marginTop: 15,
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Search by Subject Name / Stream"
            placeholderTextColor="#808080"
            onChangeText={term => {
              searchUpdated(term);
            }}
            style={{
              marginLeft: 2,
              marginTop: 2,
              backgroundColor: '#FFFFFF',
              width: '90%',
              height: 40,
              fontSize: 12,
              fontFamily: 'Montserrat-Regular',
            }}
          />
          <Feather
            style={{marginTop: 6}}
            name="search"
            size={29}
            color="#000000"
          />
        </View>
      </View> */}
        <Search
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          getdata={getdata}
          filter={setSearchData}
        />
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {searchData && searchData.subject_name ? (
            <FlatList
              data={searchData}
              style={{width: '95%', alignSelf: 'center'}}
              keyExtractor={item => item.time}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.bgColor,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    marginVertical: 10,
                  }}
                  onPress={() => {
                    props.navigation.navigate('HistoryDetailAss', {
                      //data: getdata[index],
                      data: item,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View
                      style={
                        {
                          // paddingLeft: 10,
                          // alignItems: 'center',
                          //justifyContent: 'center',
                        }
                      }>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {
                            color: COLORS.primary,
                            textAlign: 'left',
                          },
                        ]}>
                        {item.subject_name}
                      </Text>
                    </View>
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
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.class_name}
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
                        Assigment Created Date
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.date}
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
                        Assigment Created Timing
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.time}
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
                        Last Submission Date
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.deadline}
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
                        Total Student
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.total_student}
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
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.attendent}
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
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.mode}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <FlatList
              data={filtersubjects}
              style={{width: '95%', alignSelf: 'center'}}
              keyExtractor={item => item.time}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.bgColor,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    marginVertical: 10,
                  }}
                  onPress={() => {
                    props.navigation.navigate('HistoryDetailAss', {
                      //data: getdata[index],
                      data: item,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View
                      style={
                        {
                          // paddingLeft: 10,
                          // alignItems: 'center',
                          //justifyContent: 'center',
                        }
                      }>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {
                            color: COLORS.primary,
                            textAlign: 'left',
                          },
                        ]}>
                        {item.subject_name}
                      </Text>
                    </View>
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
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.class_name}
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
                        Assigment Created Date
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.date}
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
                        Assigment Created Timing
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.time}
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
                        Last Submission Date
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.deadline}
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
                        Total Student
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.total_student}
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
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.attendent}
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
                          {color: COLORS.black, marginLeft: 5},
                        ]}>
                        {item.mode}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          {/*
        {filtersubjects.map((data, index) => (
          <View style={{flex: 1, paddingHorizontal: 10}} key={index}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: COLORS.bg,
                borderRadius: 20,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: COLORS.active,
                marginVertical: 10,
              }}
              onPress={() => {
                props.navigation.navigate('SubmittedDetailAss', {
                  data: getdata[index],
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <View style={{flex: 1}} />
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                    {data.subject_name}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: 30,
                      borderWidth: 1,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      borderColor: COLORS.section,
                    }}
                    onPress={() =>
                      props.navigation.navigate('UpdateAss', {
                        data: data,
                      })
                    }>
                    <MaterialCommunityIcons
                      name="pencil"
                      color={COLORS.black}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
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
                    Assigment Created Date
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    {data.date}
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
                    Assigment Created Timing
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    {data.time}
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
                    Last Submission Date
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    {data.deadline}
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
                    Total Student
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    {data.total_student}
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
                        color: COLORS.section,
                        marginLeft: 5,
                      },
                    ]}>
                    {data.attendent}
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
                        color: COLORS.section,
                        marginLeft: 5,
                      },
                    ]}>
                    {data.mode}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryAss;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
