import React, {useState, useEffect, useCallback} from 'react';
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
  ImageBackground,
  Image,
  Linking,
  FlatList,
  Dimensions,
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {createThumbnail} from 'react-native-create-thumbnail';
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

const ShareVideo = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([
    {
      class_id: 'null',
      created_at: '2023-04-27 15:39:01',
      created_by: '0',
      date: '0000-00-00',
      id: '10',
      image: null,
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: '',
      role_id: '5',
      school_id: '10',
      section_id: 'null',
      status: '1',
      subject_id: 'null',
      teacher_id: null,
      title: '',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 09:56:39',
      created_by: '0',
      date: '0000-00-00',
      id: '13',
      image: 'notice-1695117399-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test notee',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:20:37',
      created_by: '0',
      date: '0000-00-00',
      id: '15',
      image: 'notice-1695118837-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:21:50',
      created_by: '0',
      date: '2019-09-23',
      id: '16',
      image: 'notice-1695118910-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: 'null',
      created_at: '2023-04-27 15:39:01',
      created_by: '0',
      date: '0000-00-00',
      id: '10',
      image: null,
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: '',
      role_id: '5',
      school_id: '10',
      section_id: 'null',
      status: '1',
      subject_id: 'null',
      teacher_id: null,
      title: '',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 09:56:39',
      created_by: '0',
      date: '0000-00-00',
      id: '13',
      image: 'notice-1695117399-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test notee',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:20:37',
      created_by: '0',
      date: '0000-00-00',
      id: '15',
      image: 'notice-1695118837-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:21:50',
      created_by: '0',
      date: '2019-09-23',
      id: '16',
      image: 'notice-1695118910-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: 'null',
      created_at: '2023-04-27 15:39:01',
      created_by: '0',
      date: '0000-00-00',
      id: '10',
      image: null,
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: '',
      role_id: '5',
      school_id: '10',
      section_id: 'null',
      status: '1',
      subject_id: 'null',
      teacher_id: null,
      title: '',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 09:56:39',
      created_by: '0',
      date: '0000-00-00',
      id: '13',
      image: 'notice-1695117399-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test notee',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:20:37',
      created_by: '0',
      date: '0000-00-00',
      id: '15',
      image: 'notice-1695118837-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:21:50',
      created_by: '0',
      date: '2019-09-23',
      id: '16',
      image: 'notice-1695118910-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: 'null',
      created_at: '2023-04-27 15:39:01',
      created_by: '0',
      date: '0000-00-00',
      id: '10',
      image: null,
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: '',
      role_id: '5',
      school_id: '10',
      section_id: 'null',
      status: '1',
      subject_id: 'null',
      teacher_id: null,
      title: '',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 09:56:39',
      created_by: '0',
      date: '0000-00-00',
      id: '13',
      image: 'notice-1695117399-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test notee',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:20:37',
      created_by: '0',
      date: '0000-00-00',
      id: '15',
      image: 'notice-1695118837-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
    {
      class_id: '12',
      created_at: '2023-09-19 10:21:50',
      created_by: '0',
      date: '2019-09-23',
      id: '16',
      image: 'notice-1695118910-sms.jpg',
      is_view_on_web: '0',
      modified_at: '0000-00-00 00:00:00',
      modified_by: '0',
      notice: 'Testing',
      role_id: '5',
      school_id: '10',
      section_id: '14',
      status: '1',
      subject_id: '26',
      teacher_id: null,
      title: 'Test',
    },
  ]);
  const [getthumb, setthumb] = useState();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  //   useFocusEffect(
  //     useCallback(() => {
  //       getapiData();
  //     }, []),
  //   );

  useEffect(() => {
    // getapiData();
    thumb();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.listMaterialLink}`, {
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
          // console.log(result);
          //console.log(result);
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('StudyMaterial Video List Error => ' + error);
      setLoading(false);
    }
  };

  const thumb = async () => {
    const response = await createThumbnail({
      url: 'https://www.youtube.com/watch?v=lgj3D5-jJ74',
      timeStamp: 10000,
    })
      .then(response => console.log({response}), setthumb(response.path))
      .catch(err => console.log({err}));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getapiData();
  }, []);

  const handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('Invalid Link');
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  let deviceHeight = Dimensions.get('window').height;
  let deviceWidth = Dimensions.get('window').width;

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
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
          <Text style={[paraGray.largebold, {color: 'black'}]}>Videos</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {/* flatlist use here  */}
          {/* {getdata.map((data, index) => (
            <View
              style={{flex: 1, paddingHorizontal: 10, marginVertical: 10}}
              key={index}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.bg,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.active,
                  // backgroundColor: COLORS.active,
                  paddingVertical: 10,
                }}
                onPress={() => handleClick(data.youtube_link)}>
                <ImageBackground
                  style={{
                    height: 150,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.background,
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      index % 2 === 0
                        ? 'https://thumbs.dreamstime.com/b/time-to-study-school-tools-around-blackboard-background-46060556.jpg'
                        : 'https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/750-arm-a-b-test-blog-post-image.png',
                  }}>
                  <FontAwesome
                    name="youtube-play"
                    size={50}
                    color={COLORS.bg}
                  />
                </ImageBackground>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                      {data.title}
                    </Text>
                    <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                      (Std:{data.class_name})
                    </Text>
                  </View>
                  <Text style={[paraGray.darkpara, {color: COLORS.section}]}>
                    {data.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))} */}
          <FlatList
            numColumns={2} // Number of columns for the wrap effect
            contentContainerStyle={{
              flex: 1,
              //paddingHorizontal: 15, // Adjust horizontal padding for spacing
              paddingBottom: 20,
              alignSelf: 'center',
            }}
            data={getdata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item: notice, index}) => (
              <View
                style={{
                  marginVertical: 10,

                  //flex: 1,
                }}
                key={index}>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 5,
                  }}>
                  <TouchableOpacity
                    style={{
                      height: deviceHeight / 4.8,

                      width: deviceWidth / 2.3,

                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: COLORS.skypurple,
                      //backgroundColor: 'EEF2FD',
                      backgroundColor: COLORS.skypurple,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      // setAnnouncementData(getdata[index]);
                      //   setShowModal(true);
                      Linking.openURL('https://www.youtube.com');
                    }}>
                    <View
                      style={{
                        flex: 1,

                        justifyContent: 'center',
                      }}>
                      {notice.image == null ? (
                        <Image
                          style={{
                            height: '100%',
                            width: '100%',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                          }}
                          source={require('../../../assets/nullimage.png')}
                        />
                      ) : (
                        <FastImage
                          style={{
                            height: '100%',

                            width: '100%',
                            // marginLeft: 10,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                          }}
                          source={{
                            uri: Url.notice_IMG + notice.image,
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'center',
                        width: '90%',
                        alignSelf: 'center',
                      }}>
                      <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                        Class- 5th A
                      </Text>

                      <View
                        style={{
                          height: 10,
                          width: 1,
                          backgroundColor: 'black',
                          marginLeft: 5,
                        }}
                      />
                      <Text
                        style={[
                          paraGray.darkpara,
                          {fontSize: 10, marginLeft: 5},
                        ]}>
                        {/* {notice.created_at} */}
                        Subject Name
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {
                            fontSize: 11,
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 5,
                          },
                        ]}>
                        Video Title
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        //   /marginTop: 5,
                        justifyContent: 'space-between',
                        width: '90%',

                        alignSelf: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          paraGray.darkpara,
                          {
                            fontSize: 10,
                            alignItems: 'center',
                            width: '90%',
                          },
                        ]}>
                        {/* {notice.created_at} */}
                        This is a sample video desc...
                      </Text>
                      <Ionicons name="play-circle" size={24} color={'black'} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {loading == false && getdata?.length == 0 ? (
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
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ShareVideo;
