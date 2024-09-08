import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-paper';
import Button from '../../Components/Button';
import Search from '../../Components/Search';
const HistoryDoc = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [studentData, setStudentData] = useState([]);
  const [getdata, setData] = useState([]);
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['username', 'class_name'];
  const [state, setState] = useState({searchTerm: ''});
  const [searchData, setSearchData] = useState([]);
  const studentfilter = getdata.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
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
      let resp = await fetch(`${Url.library_student_list}`, {
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
          // console.log('DATA' + JSON.stringify(result.data));
          setData(result.data);
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
  const height = Dimensions.get('window').height;
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
              placeholder="Search by Names./Stream"
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
          getdata={getdata}
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          filter={setSearchData}
        />
        <View style={{marginBottom: 20}}>
          {searchData.length > 0
            ? searchData.map(
                (student, index) =>
                  student.is_returned == '1' && (
                    <View key={index}>
                      <TouchableOpacity
                        style={{
                          //flex: 1,
                          width: '90%',
                          borderWidth: 0.6,
                          borderColor: COLORS.primary,
                          //borderColor: '#E5E5E5',
                          alignSelf: 'center',
                          //borderWidth: 1,
                          marginTop: 20,
                          borderRadius: 15,
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                          backgroundColor: COLORS.bgColor,
                        }}
                        onPress={() => {
                          //   props.navigation.navigate('HistoryDetail', {
                          //     student: getdata[index],
                          //   });

                          setStudentData(() => getdata[index]);
                          setShowModal(() => true);
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              color: '#000000',
                              fontSize: 14,
                              fontFamily: 'Montserrat-SemiBold',
                            }}>
                            {student.username}
                          </Text>
                          <Text
                            style={{
                              color: '#000000',
                              fontFamily: 'Montserrat-SemiBold',
                            }}>
                            {student.class_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lblack,
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            {student.book_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 8,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            {student.issuedate} to {student.submissiondate}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.section,
                          }}
                        />
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Submitted on
                          </Text>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            20/03/23 {/* {student.submitteddate} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Penalty
                          </Text>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Forgive
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ),
              )
            : getdata.map(
                (student, index) =>
                  student.is_returned == '1' && (
                    <View key={index}>
                      <TouchableOpacity
                        style={{
                          //flex: 1,
                          width: '90%',
                          borderWidth: 0.6,
                          borderColor: COLORS.primary,
                          //borderColor: '#E5E5E5',
                          alignSelf: 'center',
                          //borderWidth: 1,
                          marginTop: 20,
                          borderRadius: 15,
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                          backgroundColor: COLORS.bgColor,
                        }}
                        onPress={() => {
                          //   props.navigation.navigate('HistoryDetail', {
                          //     student: getdata[index],
                          //   });

                          setStudentData(() => getdata[index]);
                          setShowModal(() => true);
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10,
                          }}>
                          <Text
                            style={{
                              color: '#000000',
                              fontSize: 14,
                              fontFamily: 'Montserrat-SemiBold',
                            }}>
                            {student.username}
                          </Text>
                          <Text
                            style={{
                              color: '#000000',
                              fontFamily: 'Montserrat-SemiBold',
                            }}>
                            {student.class_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lblack,
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            {student.book_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 8,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            {student.issuedate} to {student.submissiondate}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.section,
                          }}
                        />
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Submitted on
                          </Text>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            20/03/23 {/* {student.submitteddate} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                          }}>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontSize: 14,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Penalty
                          </Text>
                          <Text
                            style={{
                              color: COLORS.lightblack,
                              fontFamily: 'Montserrat-Regular',
                            }}>
                            Forgive
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ),
              )}
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
            height: height / 1.2,
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
              <Text style={paraGray.largebold}>
                {studentData && studentData.username
                  ? studentData.username
                  : 'Student Name'}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
                {/* <Header
                  backgroundColor
                  navigation={props.navigation}
                  color={COLORS.bg}
                  back
                  headerFirstName={student.username}
                  marginLeft
                /> */}
                {console.log('Student', studentData)}
              </View>
              {studentData && studentData.username ? (
                <ScrollView style={{marginTop: 10, paddingBottom: 40}}>
                  <View
                    style={{
                      flex: 1,
                      //   flexDirection: 'row',
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        marginVertical: 10,
                        marginLeft: -15,
                      }}>
                      {studentData == null ? (
                        <ImageBackground
                          style={{
                            backgroundColor: COLORS.black,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 65,
                            height: 65,
                            borderRadius: 30,
                          }}>
                          <FontAwesome5
                            name="user-alt"
                            size={40}
                            color="#FFFFFF"
                          />
                        </ImageBackground>
                      ) : (
                        <Avatar.Image
                          size={75}
                          source={{uri: Url.student_IMG + studentData.photo}}
                          backgroundColor={COLORS.black}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                        borderRadius: 12,
                        width: '95%',
                        //height: 242,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        paddingVertical: 14,
                        // paddingHorizontal: 10,
                      }}>
                      <View>
                        <View style={[styles.mainViewContainer]}>
                          <View
                            style={{
                              width: '45%',
                            }}>
                            <View style={[styles.mainView, {marginTop: 12}]}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Stream :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={[styles.mainView]}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                {/* {Taken Book Stream} */}
                                Book Stream :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.mainView}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Degree
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={[styles.mainView]}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                ISBN No
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.mainView}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Book Code :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.mainView}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Book Edition :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              //alignSelf: 'flex-start',
                              width: '45%',
                            }}>
                            <View style={[styles.mainView, {marginTop: 12}]}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Book Assigned :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.mainView}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Publisher
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>

                            <View style={styles.mainView}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Aadhaar No.
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={[styles.mainView]}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Taken :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.mainView}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Return Date :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>

                            <View style={styles.mainView}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {fontSize: 15, color: COLORS.txtGray},
                                ]}>
                                Late Submission :
                              </Text>
                              <View style={styles.inputTextView}>
                                <Text
                                  style={[paraGray.darkpara, styles.userText]}>
                                  {studentData.class_name}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.mainView,
                            {width: '90%', alignSelf: 'center'},
                          ]}>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {fontSize: 15, color: COLORS.txtGray},
                            ]}>
                            Penalty :
                          </Text>
                          <View style={styles.inputTextView}>
                            <Text style={[paraGray.darkpara, styles.userText]}>
                              {studentData.penaltyamount}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Student Name :</Text>
                    <Text style={styles.datatxt}>
                      {studentData.username ? studentData.username : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Student Number :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.number ? studentData.number : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Student Class :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.class ? studentData.class : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Book Name :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.bookname ? studentData.bookname : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Book assigned on :</Text>
                    <Text style={styles.datatxt}>
                      {studentData.assigneddate
                        ? studentData.assigneddate
                        : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Last submission date :</Text>
                    <Text style={styles.datatxt}>
                      {studentData.submissiondate
                        ? studentData.submissiondate
                        : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>ISBN no :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.ISBNno ? studentData.ISBNo : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Book Code :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.code ? studentData.code : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Stream :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.class ? studentData.class : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Degree :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.degree ? studentData.degree : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Publisher :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.publisher ? studentData.publisher : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Author :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.Author ? studentData.Author : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Late Submission :</Text>
                    <Text style={styles.datatxt}>
                      {studentData.LateSubmission
                        ? studentData.LateSubmission
                        : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Penalty :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.Penalty ? studentData.Peanalty : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Book Edition :</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.BookEdition ? studentData.BookEdition : null}
                    </Text>
                  </View>

                  <View style={styles.divline} />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Submitted on</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.Submittedon ? studentData.Submittedon : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.txt}>Penalty</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.Peanalty ? studentData.Peanalty : null}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginBottom: 20,
                    }}>
                    <Text style={styles.txt}>Collected by</Text>
                    <Text style={styles.datatxt}>
                      {' '}
                      {studentData.Collectedby ? studentData.Collectedby : null}
                    </Text>
                  </View> */}
                </ScrollView>
              ) : (
                <View>
                  <Text>NO Data</Text>
                </View>
              )}
            </ScrollView>
          </View>
          {/* <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              width: '90%',
            }}>
            <Button title="History Details" styles={{width: '100%'}} />
          </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
};

export default HistoryDoc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    //backgroundColor: COLORS.bgColor,
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
  mainViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    //marginVertical: 5,
  },
  mainView: {
    alignSelf: 'center',
    marginTop: 12,
    width: 140,
    heigth: 60,
    backgroundColor: 'white',
  },
});
