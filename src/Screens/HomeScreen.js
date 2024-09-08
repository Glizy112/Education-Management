import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Alert,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Avatar, Modal} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {btnStyles, container, paraGray} from '../theme/styles/Base';
import {
  setShowModal,
  setuserName,
  setuserId,
  setuserInfo,
  setuserEmail,
  setuserImage,
  setschoolId,
  setTeacherId,
  setuserPhone,
  setuserAddress,
  setuserDOB,
  setRoleId,
  setAcademicyear,
  setOtherinfo,
} from '../Redux/Actions/actions';
import {COLORS} from '../theme/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {NavigationActions, StackActions} from 'react-navigation';
import Search from '../Components/Search';
import Attendance from '../Components/Attendance';

const categoryList01 = [
  {
    categoryHeading: 'Quick Actions',
  },
  {
    id: '1',
    categoryTitle: 'Mark Attendance',
    categoryIcon: <Ionicons name="today" size={30} color={COLORS.primary} />,
    categoryScreen: 'AttendanceShow',
  },
  {
    id: '2',
    categoryTitle: 'Documents',
    categoryIcon: (
      <Ionicons name="ios-document-text" size={30} color={COLORS.primary} />
    ),
    categoryScreen: 'Document',
  },
  {
    id: '3',
    categoryTitle: 'PTM',
    categoryIcon: (
      <Ionicons name="person-add" size={30} color={COLORS.primary} />
    ),
    categoryScreen: 'Ptm',
  },
  {
    id: '4',
    categoryTitle: 'Gallery',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'Gallery',
  },
  {
    id: '5',
    categoryTitle: 'Library',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'Library',
  },
  {
    id: '6',
    categoryTitle: 'Lecture',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'Lecture',
  },
  {
    id: '9',
    categoryTitle: 'Announcement',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'Announcement',
  },
  {
    id: '8',
    categoryTitle: 'StudyMaterial',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'StudyMaterial',
  },
  {
    id: '11',
    categoryTitle: 'FeesTransaction',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'FeesTransaction',
  },
  {
    id: '12',
    categoryTitle: 'Certificate',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'Certificate',
  },
  {
    id: '7',
    categoryTitle: 'Assignment',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'Assignment',
  },
];

const categoryList02 = [
  {
    categoryHeading: 'My Activities',
  },
  {
    id: '1',
    categoryTitle: 'Mark Attendance',
    categoryIcon: <Ionicons name="today" size={30} color={COLORS.primary} />,
    //categoryScreen: 'AttendanceShow',
    categoryScreen: 'AttendancePtm',
    //categoryScreen: 'HistoryAtten',
    //categoryScreen: 'MarkAttendance',
  },
  {
    id: '2',
    categoryTitle: 'Documents',
    categoryIcon: (
      <Ionicons name="ios-document-text" size={30} color={COLORS.primary} />
    ),
    categoryScreen: 'Document',
  },
  {
    id: '3',
    categoryTitle: 'PTM',
    categoryIcon: (
      <Ionicons name="person-add" size={30} color={COLORS.primary} />
    ),
    categoryScreen: 'Ptm',
  },
  {
    id: '4',
    categoryTitle: 'Gallery',
    categoryIcon: <Ionicons name="albums" size={30} color={COLORS.primary} />,
    categoryScreen: 'Gallery',
  },
];

const HomeScreen = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal} = useSelector(
    state => state.userReducer,
  );
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [greeting, setGreeting] = React.useState('');
  const [Notify, setNotify] = React.useState('0');
  const [studentFilter, setStudentFilter] = useState();

  const Logout = async () => {
    setLoading(true);
    try {
      dispatch(setShowModal(false));
      dispatch(setuserName(''));
      dispatch(setuserImage(null));
      setLoading(false);
      props.navigation.pop();
      props.navigation.navigate('SignIn');
    } catch (error) {
      console.log('Logout' + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setmsg();
  }, []);

  const setmsg = () => {
    dispatch(setShowModal(false));
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12) {
      greet = 'Good Morning';
    } else if (hrs >= 12 && hrs <= 17) {
      greet = 'Good Afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      greet = 'Good Evening';
    }
    setGreeting(greet);
    Store();
    console.log('msg', greet);
  };
  const Store = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const user_Id = await AsyncStorage.getItem('user_id');
      const teacher_Id = await AsyncStorage.getItem('teacher_id');
      const academic_year_id = await AsyncStorage.getItem('academic_year_id');
      const user_name = await AsyncStorage.getItem('user_name');
      const school_id = await AsyncStorage.getItem('school_id');
      const user_email = await AsyncStorage.getItem('user_email');
      const user_image = await AsyncStorage.getItem('user_image');
      const user_dob = await AsyncStorage.getItem('dob');
      const user_present_address = await AsyncStorage.getItem(
        'present_address',
      );
      const user_phone = await AsyncStorage.getItem('phone');
      const user_role_id = await AsyncStorage.getItem('role_id');
      const user_other_info = await AsyncStorage.getItem('other_info');

      dispatch(setuserId(user_Id));
      dispatch(setTeacherId(teacher_Id));
      dispatch(setAcademicyear(academic_year_id));
      dispatch(setuserName(user_name));
      dispatch(setschoolId(school_id));
      dispatch(setuserEmail(user_email));
      dispatch(setuserImage(user_image));
      dispatch(setuserDOB(user_dob));
      dispatch(setuserAddress(user_present_address));
      dispatch(setuserPhone(user_phone));
      dispatch(setRoleId(user_role_id));
      dispatch(setOtherinfo(user_other_info));
      console.log('Username===>' + user_name);
      setLoading(false);
    } catch (error) {
      console.log('Catch' + error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Store();
  }, []);

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <StatusBar backgroundColor={'#fafef8'} barStyle={'dark-content'} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 24,
              alignItems: 'center',
              paddingBottom: 10,
              marginHorizontal: 8,
            }}>
            <View
              style={{
                flex: 1,
                marginHorizontal: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[paraGray.largebold, {fontSize: 18, paddingLeft: 4}]}>
                👋 Hi, {username}
              </Text>
              <Ionicons
                name="ios-exit-outline"
                size={28}
                color={COLORS.black}
                onPress={Logout}
              />
            </View>
            {/* <TouchableOpacity
              style={{
                marginRight: 10,
                justifyContent: 'center',
              }}
              onPress={() =>
                // alert('Feature Coming Soon')}
                props.navigation.navigate('Notification')
              }>
              <Feather
                style={{ marginTop: Notify == '0' ? 8 : 0 }}
                name="bell"
                size={25}
                color={COLORS.black}
              />
              {Notify !== '0' && (
                <View
                  style={{
                    backgroundColor: COLORS.bluee,
                    borderRadius: 20,
                    height: 20,
                    width: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -33,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.bg, fontSize: 10 },
                    ]}>
                    {Notify}
                  </Text>
                </View>
              )}
            </TouchableOpacity> */}
          </View>
          {/* <View style={styles.header}>
            <Text style={styles.headline}>{greeting}</Text>
          </View> */}

          <Search
            getdata={categoryList01}
            KEYS_TO_FILTERS={['categoryTitle']}
            filter={setStudentFilter}
          />
          <View style={[styles.categoryContainer, {borderWidth: 0}]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled>
              <View
                style={{
                  flex: 1,
                  marginRight: 16,
                  paddingHorizontal: 8,
                  width: Dimensions.get('screen').width / 1.05,
                  marginLeft: 4,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddinLeft: 8,
                    marginLeft: 4,
                  }}>
                  <Text style={[paraGray.largebold, {fontSize: 16}]}>
                    {' '}
                    {categoryList01[0].categoryHeading}{' '}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Montserrat-Medium',
                        color: COLORS.secondary,
                      }}>
                      {' '}
                      Swipe Left
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={28}
                      color={COLORS.secondary}
                    />
                  </View>
                </View>
                <FlatList
                  //data={studentfilter}
                  data={categoryList01.slice(1)}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  contentContainerStyle={{alignSelf: 'center', paddingRight: 8}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 24,
                        width: '46%',
                        borderRadius: 16,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 2,
                        margin: 10,
                      }}
                      onPress={() => {
                        props.navigation.navigate(item.categoryScreen);
                      }}>
                      {item.categoryIcon}
                      <Text
                        style={[
                          paraGray.darkpara,
                          {textAlign: 'center', paddingTop: 8},
                        ]}>
                        {' '}
                        {item.categoryTitle}{' '}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingRight: 12,
                  paddingLeft: 4,
                  width: Dimensions.get('screen').width / 1.05,
                  marginLeft: -12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 8,
                    marginLeft: 0,
                  }}>
                  <Text style={[paraGray.largebold, {fontSize: 16}]}>
                    {' '}
                    {categoryList02[0].categoryHeading}{' '}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="chevron-back"
                      size={28}
                      color={COLORS.secondary}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Montserrat-Medium',
                        color: COLORS.secondary,
                      }}>
                      {' '}
                      Swipe Right
                    </Text>
                  </View>
                </View>
                <FlatList
                  //data={studentfilter}
                  data={categoryList02.slice(1)}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  contentContainerStyle={{alignSelf: 'center', paddingRight: 8}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 24,
                        width: '46%',
                        borderRadius: 16,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 2,
                        margin: 10,
                      }}
                      onPress={() => {
                        props.navigation.navigate(item.categoryScreen);
                      }}>
                      {item.categoryIcon}
                      <Text
                        style={[
                          paraGray.darkpara,
                          {textAlign: 'center', paddingTop: 8},
                        ]}>
                        {' '}
                        {item.categoryTitle}{' '}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('MyAttendance')}
              style={{paddingBottom: 10}}>
              <Attendance
                attendance={false}
                styles={{backgroundColor: 'white'}}
              />
            </TouchableOpacity>
          </View>

          {/* <View style={[styles.categoryContainer, { marginTop: 20 }]}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('Student');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{ height: 55, width: 55, resizeMode: 'center' }}
                    source={require('../../assets/Student.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Students</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {
                props.navigation.navigate('Exam');
              }}>
              <View style={styles.categoryIcon}>
                <Image source={require('../../assets/image2.png')} />
              </View>
              <Text style={styles.categoryBtnTxt}>Exams</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('AttendanceShow');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{ height: 55, width: 55, resizeMode: 'center' }}
                    source={require('../../assets/Attendance.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Attendance</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('Event');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{ height: 55, width: 55, resizeMode: 'center' }}
                    source={require('../../assets/Event.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Events</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.categoryContainer, { marginTop: 20 }]}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('Library');
                }}>
                <View style={styles.categoryIcon}>
                  <Ionicons name="library" size={50} color={COLORS.black} />
                </View>
                <Text style={styles.categoryBtnTxt}>Library</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('Complaint');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{ height: 55, width: 55, resizeMode: 'center' }}
                    source={require('../../assets/complain.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Complaints</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('LeaveRequest');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{ height: 55, width: 55, resizeMode: 'center' }}
                    source={require('../../assets/leave.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Leave Application</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.categoryContainer, { marginTop: 20 }]}>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {
                // props.navigation.navigate('Notification');
              }}>
              <View style={styles.categoryIcons}>
                <Image source={require('../../assets/image7.png')} />
              </View>
              <Text style={styles.categoryBtnTxt}>Performance</Text>
              <Text style={styles.categoryBtnsTxt}>Reports</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  // alert('Feature Coming Soon');
                  props.navigation.navigate('Request');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{ height: 55, width: 55, resizeMode: 'center' }}
                    source={require('../../assets/RequestAccess.png')}
                  />
                </View>
                <Text style={[styles.categoryBtnTxt, { marginLeft: 30 }]}>
                  Request Access
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  // alert('Feature Coming Soon');
                  props.navigation.navigate('Document');
                }}>
                <View style={styles.categoryIcon}>
                  <Ionicons
                    name="ios-document-text-outline"
                    size={50}
                    color={COLORS.black}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Documents</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('Ptm');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{ height: 55, width: 55, resizeMode: 'center' }}
                    source={require('../../assets/PTM.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>PTM</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.categoryContainer, { marginTop: 20 }]}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('Gallery');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{
                      height: 55,
                      width: 55,
                      resizeMode: 'center',
                    }}
                    source={require('../../assets/ImageGallery.png')}
                  />
                </View>
                <Text style={[styles.categoryBtnTxt, { textAlign: 'center' }]}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  props.navigation.navigate('StudyMaterial');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{
                      height: 55,
                      width: 55,
                      resizeMode: 'center',
                    }}
                    source={require('../../assets/StudyMaterial.png')}
                  />
                </View>
                <Text style={[styles.categoryBtnTxt, { textAlign: 'center' }]}>
                  Study Material
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  // alert('Feature Coming Soon');
                  props.navigation.navigate('Result');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{
                      height: 55,
                      width: 55,
                      resizeMode: 'center',
                    }}
                    source={require('../../assets/Result.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Result</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.categoryContainer,
              { marginTop: 20, paddingBottom: 20 },
            ]}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() => {
                  // alert('Feature Coming Soon');
                  props.navigation.navigate('Certificate');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{
                      height: 55,
                      width: 55,
                      resizeMode: 'center',
                    }}
                    source={require('../../assets/Certificate.png')}
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Certificate</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.categoryBtn, { marginTop: 0 }]}
                onPress={() => {
                  // alert('Feature Coming Soon');
                  props.navigation.navigate('AttendRegister');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{
                      height: 55,
                      width: 55,
                      resizeMode: 'center',
                    }}
                    source={require('../../assets/Register.png')}
                  />
                </View>
                <Text style={[styles.categoryBtnTxt, { fontSize: 11 }]}>
                  Attendance Register
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.categoryBtn, {marginTop: 0}]}
                onPress={() => {
                  // props.navigation.navigate('');
                }}>
                <View style={styles.categoryIcon}>
                  <Image
                    style={{
                      height: 55,
                      width: 55,
                      resizeMode: 'center',
                    }}
                    // source={require('../../assets/Certificate.png')}
                  />
                </View>
                <Text style={[styles.categoryBtnTxt, {textAlign: 'center'}]}>
                  // Attendance
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </ScrollView>
      <Modal
        visible={showmodal}
        onDismiss={() => dispatch(setShowModal(false))}
        contentContainerStyle={{
          width: '75%',
          height: 250,
          backgroundColor: COLORS.bg,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}
          onPress={() => props.navigation.navigate('Settings')}>
          <Text style={[paraGray.darkpara]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}
          onPress={() =>
            //  alert('Feature Coming Soon')
            props.navigation.navigate('PayRoll')
          }>
          <Text style={[paraGray.darkpara]}>My Pay Roll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}
          onPress={() =>
            //  alert('Feature Coming Soon')
            props.navigation.navigate('TeacherAttendance')
          }>
          <Text style={[paraGray.darkpara]}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: COLORS.section,
          }}
        />
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}
          onPress={Logout}>
          <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E4E4E4',
  },
  headline: {
    flexDirection: 'row',
    color: 'black',
    textAlign: 'center',

    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-SemiBold',
  },

  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 24,
    //justifyContent: 'space-between',
    //borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  categoryContainer: {
    flex: 1,
    //flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 20,
  },
  categoryBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  categoryIcons: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    marginTop: 10,
    borderRadius: 50,
  },
  categoryBtnsTxt: {
    alignSelf: 'center',
    marginTop: -7,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
});
