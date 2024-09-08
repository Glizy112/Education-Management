import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {container, paraGray} from '../../theme/styles/Base';
import {COLORS} from '../../theme/Colors';
import {Header} from '../../Components/Header';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Search from '../../Components/Search';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Chat = props => {
  const {userinfo, userid, username, showmodal, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const [active, setActive] = useState('1');
  const [studentlist, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const users = [
    {
      id: '1',
      name: 'Ayushi Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '10 min ago',
      image: require('../../../assets/user2.png'),
      msg: '2',
      type: 'single',
      role: 'Student',
      class: 'FYBCOM',
      details: [
        {
          id: '3',
          name: 'Simran Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '1 hour ago',
          image: require('../../../assets/user2.png'),
          msg: '4',
          type: 'single',
          role: 'Parent',
          // details: [
          //   {
          //     id: '1',
          //     name: 'Ayushi Gupta',
          //     content:
          //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          //     time: '10 min ago',
          //     image: require('../../../assets/user2.png'),
          //     msg: '2',
          //     type: 'single',
          //     role: 'Student',
          //     class: 'FTBCOM',
          //     details: [
          //       {
          //         id: '1',
          //         name: 'Simran Gupta',
          //         content:
          //           'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          //         time: '1 hour ago',
          //         image: require('../../../assets/user2.png'),
          //         msg: '4',
          //         type: 'single',
          //         role: 'Parent',
          //       },
          //       {
          //         id: '2',
          //         name: 'Vikash Gupta',
          //         content:
          //           'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          //         time: '1 hour ago',
          //         image: require('../../../assets/user2.png'),
          //         msg: '0',
          //         type: 'single',
          //         role: 'Parent',
          //       },
          //     ],
          //   },
          // ],
        },
        {
          id: '5',
          name: 'Vikash Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '1 hour ago',
          image: require('../../../assets/user2.png'),
          msg: '0',
          type: 'single',
          role: 'Parent',
          // details: [
          //   {
          //     id: '1',
          //     name: 'Ayushi Gupta',
          //     content:
          //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          //     time: '10 min ago',
          //     image: require('../../../assets/user2.png'),
          //     msg: '2',
          //     type: 'single',
          //     role: 'Student',
          //     class: 'FTBCOM',
          //     details: [
          //       {
          //         id: '1',
          //         name: 'Simran Gupta',
          //         content:
          //           'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          //         time: '1 hour ago',
          //         image: require('../../../assets/user2.png'),
          //         msg: '4',
          //         type: 'single',
          //         role: 'Parent',
          //       },
          //       {
          //         id: '2',
          //         name: 'Vikash Gupta',
          //         content:
          //           'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          //         time: '1 hour ago',
          //         image: require('../../../assets/user2.png'),
          //         msg: '0',
          //         type: 'single',
          //         role: 'Parent',
          //       },
          //     ],
          //   },
          // ],
        },
      ],
    },
    {
      id: '2',
      name: 'FY(BCA)',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user1.png'),
      msg: '1',
      type: 'group',
      admin: true,
    },
    {
      id: '3',
      name: 'Simran Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user2.png'),
      msg: '4',
      type: 'single',
      role: 'Parent',
      details: [
        {
          id: '1',
          name: 'Ayushi Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '10 min ago',
          image: require('../../../assets/user2.png'),
          msg: '2',
          type: 'single',
          role: 'Student',
          class: 'FTBCOM',
          details: [
            {
              id: '3',
              name: 'Simran Gupta',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              time: '1 hour ago',
              image: require('../../../assets/user2.png'),
              msg: '4',
              type: 'single',
              role: 'Parent',
            },
            {
              id: '5',
              name: 'Vikash Gupta',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              time: '1 hour ago',
              image: require('../../../assets/user2.png'),
              msg: '0',
              type: 'single',
              role: 'Parent',
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'SY(BCA)',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '50 min ago',
      image: require('../../../assets/user1.png'),
      msg: '0',
      type: 'group',
      admin: false,
    },
    {
      id: '5',
      name: 'Vikash Gupta',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '1 hour ago',
      image: require('../../../assets/user2.png'),
      msg: '0',
      type: 'single',
      role: 'Parent',
      details: [
        {
          id: '1',
          name: 'Ayushi Gupta',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          time: '10 min ago',
          image: require('../../../assets/user2.png'),
          msg: '2',
          type: 'single',
          role: 'Student',
          class: 'FTBCOM',
          details: [
            {
              id: '3',
              name: 'Simran Gupta',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              time: '1 hour ago',
              image: require('../../../assets/user2.png'),
              msg: '4',
              type: 'single',
              role: 'Parent',
            },
            {
              id: '5',
              name: 'Vikash Gupta',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              time: '1 hour ago',
              image: require('../../../assets/user2.png'),
              msg: '0',
              type: 'single',
              role: 'Parent',
            },
          ],
        },
      ],
    },
  ];
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['name'];
  const [search, setSearch] = useState('');
  const filterdata = users.filter(createFilter(search, KEYS_TO_FILTERS));
  const searchUpdated = term => {
    setSearch(term);
  };

  // useEffect(() => {
  //   getStudents();
  // }, []);

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
      <View style={{backgroundColor: COLORS.bg}}>
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
            <Text style={[paraGray.largebold, {color: 'black'}]}>Chat</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.search}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F6F7FA',
            width: '100%',
            height: 50,
            borderColor: '#F6F7FA',
            elevation: 1,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor="#808080"
            onChangeText={term => {
              searchUpdated(term);
            }}
            style={{
              marginLeft: 5,
              backgroundColor: '#F6F7FA',
              width: '85%',
              height: 40,
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
            }}
          />
          <TouchableOpacity
            style={{
              marginRight: 30,
              borderWidth: 1,
              borderRadius: 5,
              width: '12%',
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.bluee,
              borderColor: COLORS.bluee,
            }}>
            <EvilIcons name="search" size={26} color={COLORS.bg} />
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={{marginTop: 10, marginBottom: 20}}>
        <Search
          getdata={users}
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          filter={setSearchData}
        />
      </View>
      {loading == true && <Spinner visible={load} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingBottom: 30,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: active == '1' ? COLORS.active : COLORS.background,
              }}
              onPress={() => setActive('1')}>
              <Text
                style={[
                  paraGray.darklarge,
                  {
                    marginTop: 5,
                    marginBottom: 5,
                    fontFamily: 'Poppins-SemiBold',
                    color: active == '1' ? COLORS.black : COLORS.background,
                  },
                ]}>
                Chats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: active == '2' ? COLORS.active : COLORS.background,
              }}
              onPress={() => setActive('2')}>
              <Text
                style={[
                  paraGray.darklarge,
                  {
                    marginTop: 5,
                    marginBottom: 5,
                    fontFamily: 'Poppins-SemiBold',
                    color: active == '2' ? COLORS.black : COLORS.background,
                  },
                ]}>
                Groups
              </Text>
            </TouchableOpacity>
          </View>
          {active == '1' ? (
            <View style={{marginTop: 5}}>
              {searchData && searchData.username
                ? searchData.map(
                    (user, index) =>
                      user.type !== 'group' && (
                        <View key={index}>
                          <TouchableOpacity
                            style={{marginVertical: 5}}
                            onPress={() =>
                              props.navigation.navigate('ChatDetail', {
                                user: users[index],
                              })
                            }>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 15,
                              }}>
                              {user.photo == null ? (
                                <Avatar.Image
                                  size={50}
                                  // source={require('../../../assets/user.jpg')}
                                  source={user.image}
                                  backgroundColor={COLORS.bg}
                                />
                              ) : (
                                <Avatar.Image
                                  size={50}
                                  source={{uri: Url.student_IMG + user.photo}}
                                  backgroundColor={COLORS.black}
                                />
                              )}
                              <View style={{flex: 1}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      marginRight: 10,
                                    }}>
                                    <Text
                                      numberOfLines={1}
                                      style={[
                                        paraGray.parahome,
                                        {
                                          marginLeft: 10,
                                          fontSize: 13,
                                          color:
                                            user.msg != '0'
                                              ? COLORS.black
                                              : COLORS.lightblack,
                                        },
                                      ]}>
                                      {user.name}
                                    </Text>
                                    {/* <View
                                      style={{
                                        backgroundColor: COLORS.lightpurple,
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        marginLeft: 10,
                                        paddingHorizontal: 5,
                                      }}>
                                      {user.role == 'Parent' ? (
                                        <Text
                                          style={[
                                            paraGray.darkpara,
                                            {
                                              color: COLORS.bluee,
                                              fontSize: 11,
                                            },
                                          ]}>
                                          {user.role}
                                        </Text>
                                      ) : (
                                        <Text
                                          style={[
                                            paraGray.darkpara,
                                            {
                                              color: COLORS.bluee,
                                              fontSize: 11,
                                            },
                                          ]}>
                                          {user.class}
                                        </Text>
                                      )}
                                    </View> */}
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                    }}>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: '#4F4F4F', fontSize: 12},
                                      ]}>
                                      {user.time}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                    marginTop: 10,
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      paraGray.darkpara,
                                      {
                                        marginLeft: 5,
                                        fontSize: 13,
                                        marginTop: -10,
                                        color:
                                          user.msg != '0'
                                            ? COLORS.black
                                            : COLORS.lightblack,
                                      },
                                    ]}>
                                    {user.content}
                                  </Text>
                                  {user.msg != '0' ? (
                                    <View
                                      style={{
                                        backgroundColor: COLORS.bluee,
                                        borderRadius: 20,
                                        height: 25,
                                        width: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: -7,
                                      }}>
                                      <Text
                                        style={[
                                          paraGray.darkpara,
                                          {color: COLORS.bg, fontSize: 12},
                                        ]}>
                                        {user.msg}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        borderRadius: 20,
                                        height: 25,
                                        width: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: -7,
                                      }}>
                                      <Text
                                        style={[
                                          paraGray.darkpara,
                                          {color: COLORS.black, fontSize: 12},
                                        ]}>
                                        {/* {user.msg} */}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                          {/* <View
                            style={{
                              marginTop: 10,
                              borderBottomColor: COLORS.background,
                              borderBottomWidth: 1,
                            }}
                          /> */}
                        </View>
                      ),
                  )
                : filterdata.map(
                    (user, index) =>
                      user.type !== 'group' && (
                        <View key={index}>
                          <TouchableOpacity
                            style={{marginVertical: 5}}
                            onPress={() =>
                              props.navigation.navigate('ChatDetail', {
                                user: users[index],
                              })
                            }>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 15,
                              }}>
                              {user.photo == null ? (
                                <Avatar.Image
                                  size={50}
                                  // source={require('../../../assets/user.jpg')}
                                  source={user.image}
                                  backgroundColor={COLORS.bg}
                                />
                              ) : (
                                <Avatar.Image
                                  size={50}
                                  source={{uri: Url.student_IMG + user.photo}}
                                  backgroundColor={COLORS.black}
                                />
                              )}
                              <View style={{flex: 1}}>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      marginRight: 10,
                                    }}>
                                    <Text
                                      numberOfLines={1}
                                      style={[
                                        paraGray.parahome,
                                        {
                                          marginLeft: 10,
                                          fontSize: 13,
                                          color:
                                            user.msg != '0'
                                              ? COLORS.black
                                              : COLORS.lightblack,
                                        },
                                      ]}>
                                      {user.name}
                                    </Text>
                                    {/*<View
                                      style={{
                                        backgroundColor: COLORS.lightpurple,
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        marginLeft: 10,
                                        paddingHorizontal: 5,
                                      }}>
                                       {user.role == 'Parent' ? (
                                        <Text
                                          style={[
                                            paraGray.darkpara,
                                            {
                                              color: COLORS.bluee,
                                              fontSize: 11,
                                            },
                                          ]}>
                                          {user.role}
                                        </Text>
                                      ) : (
                                        <Text
                                          style={[
                                            paraGray.darkpara,
                                            {
                                              color: COLORS.bluee,
                                              fontSize: 11,
                                            },
                                          ]}>
                                          {user.class}
                                        </Text>
                                      )} 
                                        </View>*/}
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                    }}>
                                    {/* <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: '#4F4F4F', fontSize: 12},
                                      ]}>
                                      {user.time}
                                    </Text> */}
                                    {user.msg != '0' ? (
                                      <View
                                        style={{
                                          backgroundColor: COLORS.primary,
                                          borderRadius: 20,
                                          height: 25,
                                          width: 25,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          // marginTop: -7,
                                        }}>
                                        <Text
                                          style={[
                                            paraGray.darkpara,
                                            {color: COLORS.bg, fontSize: 12},
                                          ]}>
                                          {user.msg}
                                        </Text>
                                      </View>
                                    ) : (
                                      <View
                                        style={{
                                          borderRadius: 20,
                                          height: 25,
                                          width: 25,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          marginTop: -7,
                                        }}>
                                        <Text
                                          style={[
                                            paraGray.darkpara,
                                            {color: COLORS.black, fontSize: 12},
                                          ]}>
                                          {/* {user.msg} */}
                                        </Text>
                                      </View>
                                    )}
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                    marginTop: 10,
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      paraGray.darkpara,
                                      {
                                        marginLeft: 5,
                                        fontSize: 13,

                                        width: '70%',
                                        marginTop: -10,
                                        color:
                                          user.msg != '0'
                                            ? COLORS.black
                                            : COLORS.lightblack,
                                      },
                                    ]}>
                                    {user.content}
                                  </Text>
                                  {user.msg != '0' ? (
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        //  marginTop: -7,
                                      }}>
                                      <Text
                                        style={[
                                          paraGray.darkpara,
                                          {color: '#4F4F4F', fontSize: 12},
                                        ]}>
                                        {user.time}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        borderRadius: 20,
                                        height: 25,
                                        width: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: -7,
                                      }}>
                                      <Text
                                        style={[
                                          paraGray.darkpara,
                                          {color: COLORS.black, fontSize: 12},
                                        ]}>
                                        {/* {user.msg} */}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                          {/* <View
                            style={{
                              marginTop: 10,
                              borderBottomColor: COLORS.background,
                              borderBottomWidth: 1,
                            }}
                          /> */}
                        </View>
                      ),
                  )}
            </View>
          ) : (
            <View style={{marginTop: 10}}>
              {searchData == null
                ? users.map(
                    (user, index) =>
                      user.type == 'group' && (
                        <View key={index}>
                          <TouchableOpacity
                            style={{marginVertical: 5}}
                            onPress={() =>
                              props.navigation.navigate('ChatDetail', {
                                user: users[index],
                              })
                            }>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 15,
                              }}>
                              <Avatar.Image size={45} source={user.image} />
                              <View style={{flex: 1}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      marginRight: 10,
                                    }}>
                                    <Text
                                      numberOfLines={1}
                                      style={[
                                        paraGray.parahome,
                                        {
                                          marginLeft: 10,
                                          fontSize: 15,
                                          color:
                                            user.msg != '0'
                                              ? COLORS.black
                                              : COLORS.lightblack,
                                        },
                                      ]}>
                                      {user.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                    }}>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: '#4F4F4F'},
                                      ]}>
                                      {user.time}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                    marginTop: 10,
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      paraGray.darkpara,
                                      {
                                        marginLeft: 5,
                                        fontSize: 13,
                                        marginTop: -10,
                                        color:
                                          user.msg != '0'
                                            ? COLORS.black
                                            : COLORS.lightblack,
                                      },
                                    ]}>
                                    {user.content}
                                  </Text>
                                  {user.msg != '0' && (
                                    <View
                                      style={{
                                        backgroundColor: COLORS.bluee,
                                        borderRadius: 20,
                                        height: 25,
                                        width: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: -7,
                                      }}>
                                      <Text
                                        style={[
                                          paraGray.darkpara,
                                          {color: COLORS.bg, fontSize: 12},
                                        ]}>
                                        {user.msg}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              marginTop: 10,
                              borderBottomColor: COLORS.background,
                              borderBottomWidth: 1,
                            }}
                          />
                        </View>
                      ),
                  )
                : searchData.map(
                    (user, index) =>
                      user.type == 'group' && (
                        <View key={index}>
                          <TouchableOpacity
                            style={{marginVertical: 5}}
                            onPress={() =>
                              props.navigation.navigate('ChatDetail', {
                                user: users[index],
                              })
                            }>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 15,
                              }}>
                              <Avatar.Image size={45} source={user.image} />
                              <View style={{flex: 1}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      marginRight: 10,
                                    }}>
                                    <Text
                                      numberOfLines={1}
                                      style={[
                                        paraGray.parahome,
                                        {
                                          marginLeft: 10,
                                          fontSize: 15,
                                          color:
                                            user.msg != '0'
                                              ? COLORS.black
                                              : COLORS.lightblack,
                                        },
                                      ]}>
                                      {user.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                    }}>
                                    <Text
                                      style={[
                                        paraGray.darkpara,
                                        {color: '#4F4F4F'},
                                      ]}>
                                      {user.time}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                    marginTop: 10,
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={[
                                      paraGray.darkpara,
                                      {
                                        marginLeft: 5,
                                        fontSize: 13,
                                        marginTop: -10,
                                        color:
                                          user.msg != '0'
                                            ? COLORS.black
                                            : COLORS.lightblack,
                                      },
                                    ]}>
                                    {user.content}
                                  </Text>
                                  {user.msg != '0' && (
                                    <View
                                      style={{
                                        backgroundColor: COLORS.bluee,
                                        borderRadius: 20,
                                        height: 25,
                                        width: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: -7,
                                      }}>
                                      <Text
                                        style={[
                                          paraGray.darkpara,
                                          {color: COLORS.bg, fontSize: 12},
                                        ]}>
                                        {user.msg}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              marginTop: 10,
                              borderBottomColor: COLORS.background,
                              borderBottomWidth: 1,
                            }}
                          />
                        </View>
                      ),
                  )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
});
