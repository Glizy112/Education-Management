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
} from 'react-native';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ShareLink = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
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
  //const videoId = 'YOUR_VIDEO_ID'; // Replace with the video ID or channel ID
  //const youtubeUrl = `https://www.youtube.com/${videoId ? 'watch?v=' + videoId : ''}`;
  useFocusEffect(
    useCallback(() => {
      //  getapiData();
    }, []),
  );

  useEffect(() => {
    //  getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.listLinkType}`, {
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
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Leave List Error => ' + error);
      setLoading(false);
    }
  };

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getapiData();
  }, []);

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
          <Text style={[paraGray.largebold, {color: 'black'}]}>
            Shared Links
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {/* {getdata.map((data, index) => (
            <View
              style={{flex: 1, paddingHorizontal: 10, marginVertical: 10}}
              key={index}>
              <TouchableOpacity
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
                }}
                onPress={() => handleClick(data.link_type)}>
                <View
                  style={{
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor: COLORS.active,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {marginHorizontal: 10, marginVertical: 8},
                    ]}>
                    Connect
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                    {data.title}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[paraGray.darkpara, {color: COLORS.section}]}>
                      {data.description}
                    </Text>
                    <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                      (Std:{data.class_name})
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))} */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{width: '90%', alignSelf: 'center'}}
            data={files}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  width: '100%',
                  //flex: 1,
                  //paddingHorizontal: 10,
                  marginVertical: 10,

                  alignSelf: 'center',
                }}
                onPress={() => Linking.openURL('https://www.youtube.com')}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: COLORS.bgColor,
                    borderRadius: 10,

                    paddingHorizontal: 20,
                    // borderWidth: 1,
                    //borderColor: COLORS.active,
                    // backgroundColor: COLORS.active,
                    paddingVertical: 15,
                    //justifyContent: 'space-between',
                    alignItems: 'center',
                    //flex: 1,
                  }}>
                  <View
                    style={{
                      marginRight: 10,
                      borderRadius: 20,
                      //backgroundColor: COLORS.active,
                    }}>
                    <FontAwesome5
                      name="link"
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <View
                    style={{
                      //flex: 1,
                      // justifyContent: 'center',
                      //borderWidth: 1,
                      width: '90%',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        paraGray.darkpara,
                        {
                          color: COLORS.black,
                        },
                      ]}>
                      {item.thumb}
                    </Text>
                    {/* <Text
                                style={[
                                  paraGray.darkpara,
                                  {color: COLORS.section},
                                ]}>
                                {data.desc}
                              </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {loading == false && getdata?.length !== 0 ? (
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
        ) : //   <View
        //     style={{
        //       alignItems: 'center',
        //       justifyContent: 'center',
        //       flex: 1,
        //       margin: 'auto',
        //     }}>
        //     <TouchableOpacity
        //       style={{padding: 12, borderWidth: 1}}
        //       onPress={() => navigation.navigate('AddLink')}>
        //       <Text style={paraGray.darkpara}>Add Video</Text>
        //     </TouchableOpacity>
        //   </View>
        null}
      </ScrollView>
    </View>
  );
};

export default ShareLink;
