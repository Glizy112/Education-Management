import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  ImageBackground,
  // TouchableOpacity
} from 'react-native';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {TouchableOpacity} from 'react-native-gesture-handler';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const GroupUserDetail = props => {
  const {groupuser, userdetail} = props.route.params;
  const [active, setActive] = useState('media');
  const [subactive, setSubActive] = useState('1');
  const [getdata, setdata] = useState([]);
  const [studentlist, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userinfo, userid, username, showmodal, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const [admin, setAdmin] = useState(false);
  const list = [
    {label: 'All participant', value: 'All participant'},
    {label: 'Admin', value: 'Admin'},
  ];
  // <------------Select section-------------->
  const [selectedsection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(null);
  const [issectionFocus, setIsSectionFocus] = useState(false);
  const [getsectiondata, setSectiondata] = useState([]);

  useEffect(() => {
    if (groupuser.admin == true) {
      setAdmin(true);
    }
    getapiData();
  }, []);
  {
    console.log('Sub', active);
  }
  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.list_school_gallery}`, {
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
          setdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('GalleryList Error => ' + error);
      setLoading(false);
    }
  };

  const files = [
    {
      id: '1',
      video: '',
      thumb:
        'https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/750-arm-a-b-test-blog-post-image.png',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
    {
      id: '2',
      video: '',
      thumb:
        'https://thumbs.dreamstime.com/b/time-to-study-school-tools-around-blackboard-background-46060556.jpg',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
    {
      id: '3',
      video: '',
      thumb:
        'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'Chapter-wise MCQs & Answers ',
      desc: 'Live Stream Capture',
    },
  ];

  const PhotoRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  const FileRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    // getapiData();
  }, []);

  const LinkRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    // getapiData();
  }, []);

  // --------APICall----------

  const getStudents = async () => {
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
          setStudentList(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };

  return (
    <View style={[container.container]}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.bg}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.black}
          back
          headerFirstName={''}
          marginLeft
          // rightdownload
          // onPresss={{}}
        />
      </View>
      {loading == true && <Spinner visible={load} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {groupuser.photo == null ? (
              <Avatar.Image
                size={140}
                source={groupuser.image}
                // source={require('../../../assets/user.jpg')}
                backgroundColor={COLORS.black}
              />
            ) : (
              <Avatar.Image
                size={140}
                source={{uri: Url.student_IMG + user.photo}}
                // source={user.image}
                backgroundColor={COLORS.black}
              />
            )}
            <Text
              style={[
                paraGray.darklarge,
                {fontFamily: 'Montserrat-SemiBold', marginTop: 10},
              ]}>
              {groupuser.name}
            </Text>
            <Text
              style={[
                paraGray.darkpara,
                {marginTop: 5, color: COLORS.lightblack},
              ]}>
              Description
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 0.5,
              borderColor: COLORS.background,
              marginTop: 10,
              marginBottom: 15,
            }}
          />
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor:
                      active == '1' ? COLORS.active : COLORS.background,
                  }}
                  onPress={() =>
                    props.navigation.navigate('ChatDetail', {
                      user: groupuser,
                    })
                  }>
                  <View
                    style={{
                      width: 45,
                      height: 40,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.lightSkyblue,
                    }}>
                    <MaterialCommunityIcons
                      name="message"
                      size={22}
                      color={COLORS.blue}
                    />
                  </View>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {marginTop: 5, marginBottom: 10, fontSize: 12},
                    ]}>
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor:
                      active == 'media' ? COLORS.active : COLORS.background,
                  }}
                  onPress={() => {
                    setActive('media'), getapiData();
                  }}>
                  <View
                    style={{
                      width: 45,
                      height: 40,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: COLORS.lightSkygreen,
                    }}>
                    <MaterialIcons
                      name="photo-library"
                      size={25}
                      color={COLORS.green}
                    />
                  </View>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {marginTop: 5, marginBottom: 10, fontSize: 12},
                    ]}>
                    Media
                  </Text>
                </TouchableOpacity>
              </View>
              {userdetail.admin == true ? (
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: COLORS.background,
                    }}
                    onPress={() => setAdmin(!admin)}>
                    <View
                      style={{
                        width: 45,
                        height: 40,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lightpurple,
                      }}>
                      {admin == true ? (
                        <MaterialCommunityIcons
                          name="shield-off"
                          size={25}
                          color={COLORS.active}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="shield-plus"
                          size={25}
                          color={COLORS.active}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginTop: 5, marginBottom: 10, fontSize: 12},
                      ]}>
                      {admin == true ? 'Dismiss Admin' : 'Create Admin'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                groupuser.admin == true && (
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: COLORS.background,
                      }}>
                      <View
                        style={{
                          width: 45,
                          height: 40,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: COLORS.lightpurple,
                        }}>
                        <MaterialCommunityIcons
                          name="shield-off"
                          size={25}
                          color={COLORS.active}
                        />
                      </View>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {marginTop: 5, marginBottom: 10, fontSize: 12},
                        ]}>
                        Admin
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
            {active == '1' ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={[paraGray.darklarge]}>Edit Data</Text>
              </View>
            ) : active == '2' ? (
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                  paddingHorizontal: 5,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                  Group Settings:
                </Text>
                <View>
                  <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                    Send message
                  </Text>
                  <Dropdown
                    style={{
                      height: 50,
                      borderColor: issectionFocus ? 'blue' : 'gray',
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
                    data={list.map(item => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    search
                    containerStyle={{
                      backgroundColor: COLORS.background,
                      borderColor: '#E5E5E5',
                    }}
                    fontFamily={'Montserrat-Regular'}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!issectionFocus ? 'Send Message' : '...'}
                    searchPlaceholder="Search..."
                    value={section}
                    onFocus={() => setIsSectionFocus(true)}
                    onBlur={() => setIsSectionFocus(false)}
                    onChange={item => {
                      setSelectedSection(item);
                      setSection(item.value);
                      setIsSectionFocus(false);
                    }}
                  />
                </View>
              </View>
            ) : active == 'media' ? (
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                  Shared Media : 50
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor:
                          subactive == '1' ? COLORS.active : COLORS.background,
                      }}
                      onPress={() => setSubActive('1')}>
                      <Text
                        style={[
                          paraGray.darklarge,
                          {
                            marginTop: 5,
                            marginBottom: 5,
                            fontFamily: 'Poppins-SemiBold',
                            color:
                              subactive == '1'
                                ? COLORS.black
                                : COLORS.background,
                          },
                        ]}>
                        Photos
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor:
                          subactive == '2' ? COLORS.active : COLORS.background,
                      }}
                      onPress={() => setSubActive('2')}>
                      <Text
                        style={[
                          paraGray.darklarge,
                          {
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontFamily: 'Poppins-SemiBold',
                            color:
                              subactive == '2'
                                ? COLORS.black
                                : COLORS.background,
                          },
                        ]}
                        onPress={() => setSubActive('2')}>
                        Files
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor:
                          subactive == '3' ? COLORS.active : COLORS.background,
                      }}
                      onPress={() => setSubActive('3')}>
                      <Text
                        style={[
                          paraGray.darklarge,
                          {
                            marginTop: 5,
                            marginBottom: 5,
                            fontFamily: 'Poppins-SemiBold',
                            color:
                              subactive == '3'
                                ? COLORS.black
                                : COLORS.background,
                          },
                        ]}>
                        Link
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {subactive == '1' ? (
                  <GestureRecognizer onSwipeLeft={() => setSubActive('2')}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={PhotoRefresh}
                        />
                      }>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginBottom: 20,
                        }}>
                        {getdata.map((image, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{marginTop: 10}}
                            onPress={() =>
                              props.navigation.navigate('Images', {
                                Images: getdata[index],
                              })
                            }>
                            <Image
                              source={{uri: Url.gallery_IMG + image.image}}
                              style={{
                                height: deviceHeight / 7,
                                width: deviceWidth / 3 - 12,
                                borderRadius: 10,
                                marginLeft: 4,
                              }}
                            />
                          </TouchableOpacity>
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
                          <Text
                            style={[paraGray.darklarge, {textAlign: 'center'}]}>
                            NO Data Found
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  </GestureRecognizer>
                ) : subactive == '2' ? (
                  <GestureRecognizer
                    onSwipeLeft={() => setSubActive('3')}
                    onSwipeRight={() => setSubActive('1')}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={FileRefresh}
                        />
                      }>
                      <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
                        {files.map((data, index) => (
                          <TouchableOpacity
                            style={{
                              flex: 1,
                              paddingHorizontal: 10,
                              marginVertical: 10,
                            }}
                            key={index}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: COLORS.bg,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: COLORS.active,
                                // backgroundColor: COLORS.active,
                                paddingVertical: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View style={{paddingRight: 15}}>
                                <FontAwesome
                                  name="file-pdf-o"
                                  size={50}
                                  color={COLORS.active}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={[
                                    paraGray.darkpara,
                                    {color: COLORS.bluee},
                                  ]}>
                                  {data.title}
                                </Text>
                                <Text
                                  style={[
                                    paraGray.darkpara,
                                    {color: COLORS.section},
                                  ]}>
                                  {data.desc}
                                </Text>
                                <Text
                                  style={[
                                    paraGray.darkpara,
                                    {color: COLORS.section},
                                  ]}>
                                  {data.desc}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                      {loading == false && files == '' && (
                        <View
                          style={{
                            flex: 1,
                            marginBottom: 80,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: 120,
                          }}>
                          <Text
                            style={[paraGray.darklarge, {textAlign: 'center'}]}>
                            NO Data Found
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  </GestureRecognizer>
                ) : (
                  subactive == '3' && (
                    <GestureRecognizer onSwipeRight={() => setSubActive('2')}>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={LinkRefresh}
                          />
                        }>
                        <View
                          style={{flex: 1, marginTop: 20, marginBottom: 20}}>
                          {files.map((data, index) => (
                            <TouchableOpacity
                              style={{
                                flex: 1,
                                paddingHorizontal: 10,
                                marginVertical: 10,
                              }}
                              key={index}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  backgroundColor: COLORS.bg,
                                  borderRadius: 10,
                                  paddingHorizontal: 10,
                                  borderWidth: 1,
                                  borderColor: COLORS.active,
                                  // backgroundColor: COLORS.active,
                                  paddingVertical: 15,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    marginRight: 10,
                                    borderRadius: 20,
                                    backgroundColor: COLORS.active,
                                  }}>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {
                                        marginHorizontal: 10,
                                        marginVertical: 8,
                                      },
                                    ]}>
                                    Connect
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.bluee},
                                    ]}>
                                    {data.title}
                                  </Text>
                                  <Text
                                    style={[
                                      paraGray.darkpara,
                                      {color: COLORS.section},
                                    ]}>
                                    {data.desc}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))}
                        </View>
                        {loading == false && files == '' && (
                          <View
                            style={{
                              flex: 1,
                              marginBottom: 80,
                              alignSelf: 'center',
                              justifyContent: 'center',
                              marginTop: 120,
                            }}>
                            <Text
                              style={[
                                paraGray.darklarge,
                                {textAlign: 'center'},
                              ]}>
                              NO Data Found
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </GestureRecognizer>
                  )
                )}
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.lightblack}]}>
                  Participant : 50
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingBottom: 30,
                    marginLeft: 10,
                    paddingTop: 10,
                  }}>
                  {studentlist.map((student, index) => (
                    <TouchableOpacity key={index} style={{marginHorizontal: 3}}>
                      {student.photo == null ? (
                        <View style={{flexDirection: 'row'}}>
                          <Avatar.Image
                            size={50}
                            source={require('../../../assets/user.jpg')}
                            backgroundColor={COLORS.bg}
                          />
                          <Entypo
                            style={{marginTop: 15, marginLeft: -33}}
                            name="dot-single"
                            size={50}
                            color="#51DD78"
                          />
                        </View>
                      ) : (
                        <View style={{flexDirection: 'row'}}>
                          <Avatar.Image
                            size={50}
                            source={{uri: Url.student_IMG + student.photo}}
                            backgroundColor={COLORS.black}
                          />
                          <Entypo
                            style={{marginTop: 15, marginLeft: -33}}
                            name="dot-single"
                            size={50}
                            color="#51DD78"
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupUserDetail;
