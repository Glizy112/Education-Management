import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../Components/Button';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import DropDown from '../../Components/DropDown';
import Search from '../../Components/Search';
const Assign = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openStream, setOpenStream] = useState(false);
  const [valueStream, setValueStream] = useState(null);

  const [itemsStream, setItemsStream] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);

  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [getdata, setGetdata] = useState([]);
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name', 'class_name'];
  const [state, setState] = useState({searchTerm: ''});

  const studentfilter = getdata.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );

  const [searchData, setSearchData] = useState([]);
  const searchUpdated = term => {
    setState({searchTerm: term});
  };

  useEffect(() => {
    getapiData();
    // console.log("Tid"+schoolid)
    // console.log("Uid"+userid)
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
          if (result.status == true) {
            // console.log(result);
            setGetdata(result.data);
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Assign Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
    //setRefreshing(true);
    CurrentDate();
  }, []);
  // BookDetails
  //const {student} = props.route.params;
  const [studentData, setStudentData] = useState(null);
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [isbookFocus, setIsbookFocus] = useState(false);
  const [stream, setStream] = useState(null);
  const [selectedstream, setselectedStream] = useState(null);
  const [selectedbook, setselectedbook] = useState(null);
  const [book, setBook] = useState(null);
  const [getClassData, setClassdata] = useState([]);

  //   const {userinfo, userid, username, showmodal, schoolid, teacherid} =
  //     useSelector(state => state.userReducer);
  //   const [loading, setLoading] = useState(false);
  //   const [load, setLoad] = useState(true);
  //   const [refreshing, setRefreshing] = React.useState(false);
  const [getbookdata, setBookdata] = useState([]);
  const [getmemberid, setMemberId] = useState([]);
  const [getclassid, setClassId] = useState([]);
  const [getbookid, setBookId] = useState([]);
  const [returndate, setreturnDate] = useState(null);
  const [currentdate, setcurrentDate] = useState(null);

  useEffect(() => {
    CurrentDate();
  }, []);

  const CurrentDate = () => {
    var today = new Date();
    let date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    setcurrentDate(date);
    ReturnDate();
  };
  const ReturnDate = () => {
    var today = new Date();
    today.setDate(today.getDate() + 7);
    let date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    setreturnDate(date);
    getmember();
  };

  const getmember = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append('user_id', userid);
      formData.append('user_id', student.user_id);
      formData.append('school_id', student.school_id);
      let resp = await fetch(`${Url.list_member}`, {
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
          setMemberId(result.data[0].member_id);
          setLoading(false);
          getclassData();
        });
    } catch (error) {
      console.log('BookDetail getmember Error => ' + error);
      setLoading(false);
    }
  };

  const getclassData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.get_all_class}`, {
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
          setClassdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('BookDetail getclassData Error => ' + error);
      setLoading(false);
    }
  };
  const getBookData = async item => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append('user_id', userid);
      formData.append('class_id', item.value);

      let resp = await fetch(`${Url.get_all_book}`, {
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
          // console.log("erroe",result);
          setClassId(result[0].class_id);
          setBookdata(result);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('BookDetail getBookData Error => ' + error);
      setLoading(false);
    }
  };
  const AssignBook = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('teacher_id', userid);
      formData.append('school_id', student.school_id);
      formData.append('library_member_id', getmemberid);
      formData.append('book_id', getbookid);
      formData.append('class_id', getclassid);
      formData.append('due_date', returndate);
      //  console.log('Send Data ==> ', formData);
      let resp = await fetch(`${Url.library_assign_book}`, {
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
          if (result.status == true) {
            props.navigation.navigate('AssignBook', {
              student: studentData,
              stream: selectedstream,
              book: selectedbook,
              currentdate: currentdate,
              returndate: returndate,
            });
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('BookDetail AssignBook Error => ' + error);
      setLoading(false);
    }
  };

  //   const onRefresh = React.useCallback(() => {

  //   }, []);

  const height = Dimensions.get('window').height;
  useEffect(() => {
    console.log('student', studentData);
    if (studentData && showModal && studentData.username) {
      {
        studentData.map(item => {
          setselectedStream(item);
          setStream(item.value);
          setIsstreamFocus(false);
          getBookData(item);
        });
        //studentData.map(item => console.log('console.log', item.roll_no));
      }
    }
  }, [studentData, showModal]);
  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View
          style={[
            styles.search,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignbooks: 'center',
              backgroundColor: '#FFFFFF',
              width: '90%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 10,
              borderBottomWidth: 1.5,
              marginTop: 15,
              //borderRadius: 10,
              //borderColor: '#97A7C3',
            }}>
            <TextInput
              placeholder="Search by Names."
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 2,
                marginTop: 2,
                backgroundColor: '#FFFFFF',
                width: '87%',
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

          <TouchableOpacity>
            <MaterialIcons
              style={{marginTop: 15}}
              name="qr-code-scanner"
              size={40}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View> */}
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
                Assign Books
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
                          setStudentData(getdata[index]);
                          setShowModal(true);
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          Assign
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
                          setStudentData(getdata[index]);
                          setShowModal(() => true);
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          Assign
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
              justifyContent: 'center',
              marginTop: 120,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          //position: 'absolute',
          //bottom: 0,
        }}
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            height: height / 2,
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',

              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[paraGray.largebold, {marginRight: 10}]}>
                  {studentData ? studentData.student_name : 'Student Name'}
                </Text>

                <Text
                  style={[
                    paraGray.largebold,
                    {borderLeftWidth: 2, paddingLeft: 10},
                  ]}>
                  {studentData ? studentData.class_name : 'class Name'}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                //flexDirection: 'row',
                //justifyContent: 'center',
                //alignItems: 'center',

                //alignSelf: 'flex-start',

                //              marginBottom: 60,
                width: '100%',
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <View style={{marginTop: 15}}>
                  {/* <Text style={[styles.txt, {fontSize: 15}]}>Student Info</Text> */}
                  <View
                    style={{
                      flex: 1,
                      //   flexDirection: 'row',
                      //   justifyContent: 'space-between',
                      //marginRight: 20,
                      alignItems: 'center',
                    }}>
                    {/* studentData.photo == null */}
                    {studentData == null ? (
                      <ImageBackground
                        style={{
                          backgroundColor: COLORS.black,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 62,
                          height: 62,
                          borderRadius: 30,
                        }}>
                        <FontAwesome5
                          name="user-alt"
                          size={45}
                          color="#FFFFFF"
                        />
                      </ImageBackground>
                    ) : studentData && studentData.photo ? (
                      <FastImage
                        style={{width: 62, height: 62, borderRadius: 50}}
                        source={{uri: Url.student_IMG + studentData.photo}}
                        backgroundColor={COLORS.black}
                      />
                    ) : (
                      <ImageBackground
                        style={{
                          backgroundColor: COLORS.black,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 62,
                          height: 62,
                          borderRadius: 30,
                        }}>
                        <FontAwesome5
                          name="user-alt"
                          size={45}
                          color="#FFFFFF"
                        />
                      </ImageBackground>
                    )}
                    <View style={{width: '50%'}}>
                      {/* <Text style={styles.txt}>
                        Name :
                        <Text style={styles.datatxt}>
                          {' '}
                          {studentData ? studentData.student_name : 'set Name'}
                        </Text>
                      </Text> */}
                      {/* <Text style={styles.txt}>
                        Stream :
                        <Text style={styles.datatxt}>
                          {' '}
                          {studentData ? studentData.class_name : 'class Name'}
                        </Text>
                      </Text> */}
                      <Text style={[paraGray.darkpara, {marginTop: 10}]}>
                        ID Card No :
                        <Text style={styles.datatxt}>
                          {' '}
                          {studentData ? studentData.card_no : 'CardNumber'}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{marginTop: 15, paddingHorizontal: 20}}>
                  {/* <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                    Stream
                  </Text> */}
                  {/* <Dropdown
                    style={{
                      height: 50,
                      borderColor: isstreamFocus ? 'blue' : 'gray',
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 8,
                    }}
                    placeholderStyle={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Regular',
                    }}
                    selectedTextStyle={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Regular',
                    }}
                    inputSearchStyle={{
                      height: 40,
                      fontSize: 16,
                      fontFamily: 'Montserrat-Regular',
                    }}
                    iconStyle={{
                      width: 20,
                      height: 20,
                    }}
                    data={getClassData.map(item => ({
                      label: item.class_name,
                      value: item.class_id,
                    }))}
                    search
                    containerStyle={{
                      backgroundColor: '#E5E5E5',
                      borderColor: '#E5E5E5',
                    }}
                    fontFamily={'Montserrat-Regular'}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isstreamFocus ? 'Select Stream' : '...'}
                    searchPlaceholder="Search..."
                    value={stream}
                    onFocus={() => setIsstreamFocus(true)}
                    onBlur={() => setIsstreamFocus(false)}
                    onChange={item => {
                      // getsectionData(item);
                      setselectedStream(item);
                      setStream(item.value);
                      setIsstreamFocus(false);
                      getBookData(item);
                    }}
                  /> */}

                  {/* <DropDown
                    open={openStream}
                    value={valueStream}
                    items={getdata.map(item => ({
                      label: item.class_name,
                      value: item.class_id,
                    }))}
                    setOpen={setOpenStream}
                    setValue={setValueStream}
                    setItems={setItemsStream}
                    style={{borderWidth: 1}}
                    onSelectItem={item => {
                      console.log('item', item);
                      setselectedStream(item);
                      setStream(item.value);
                      setIsstreamFocus(false);
                      getBookData(item);
                    }}
                    containerStyle={{width: '100%'}}
                  /> */}
                </View>

                <View>
                  <View style={{marginTop: 15, paddingHorizontal: 5}}>
                    <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                      Assign Book
                    </Text>
                    <Dropdown
                      style={{
                        height: 50,
                        borderColor: isbookFocus ? 'blue' : 'gray',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                      }}
                      placeholderStyle={{
                        fontSize: 16,
                        fontFamily: 'Montserrat-Regular',
                      }}
                      selectedTextStyle={{
                        fontSize: 16,
                        fontFamily: 'Montserrat-Regular',
                      }}
                      inputSearchStyle={{
                        height: 40,
                        fontSize: 16,
                        fontFamily: 'Montserrat-Regular',
                      }}
                      iconStyle={{
                        width: 20,
                        height: 20,
                      }}
                      data={getbookdata.map(item => ({
                        label: item.title,
                        value: item.title,
                        book: item.book_id,
                      }))}
                      search
                      containerStyle={{
                        backgroundColor: '#E5E5E5',
                        borderColor: '#E5E5E5',
                      }}
                      fontFamily={'Montserrat-Regular'}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isbookFocus ? 'Select Book' : '...'}
                      searchPlaceholder="Search..."
                      value={book}
                      onFocus={() => setIsbookFocus(true)}
                      onBlur={() => setIsbookFocus(false)}
                      onChange={item => {
                        setselectedbook(item);
                        setBook(item.value);
                        setIsbookFocus(false);
                        setBookId(item.book);
                      }}
                    />
                  </View>
                </View>
                {book != null && (
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#C4C4C4',
                        width: '80%',
                        height: 45,
                        alignSelf: 'center',
                        marginTop: 40,
                        marginBottom: 20,
                        justifyContent: 'center',
                      }}
                      onPress={AssignBook}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 16,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        Assign Book
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              width: '90%',
            }}>
            <Button title="Assign Book" styles={{width: '100%'}} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Assign;

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
