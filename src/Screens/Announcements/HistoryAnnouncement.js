import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const event_IMG = 'http://intraedu.in/admin/assets/uploads/event/';
const HistoryAnnouncement = props => {
  const {schoolid} = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [announcementData, setAnnouncementData] = useState(null);
  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.list_notice}`, {
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
          setLoading(false);
        });
    } catch (error) {
      console.log('AttendancePtm Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={loading} />}
      {/* <View
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
          <Text style={[paraGray.largebold, {color: 'black'}]}>History</Text>
        </View>
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          numColumns={2} // Number of columns for the wrap effect
          contentContainerStyle={{
            width: '100%', // Adjust the width percentage as needed
            //alignSelf: 'center',
            paddingHorizontal: 15, // Adjust horizontal padding for equal spacing
            paddingBottom: 20,
          }}
          data={getdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item: notice, index}) => (
            <View style={{marginVertical: 10, flex: 1}} key={index}>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={{
                    height: deviceHeight / 4.8,
                    //height: 170,
                    //width: deviceWidth / 2.1,
                    //width: 190,
                    // width: '100%',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: COLORS.skypurple,
                    backgroundColor: COLORS.skypurple,
                    justifyContent: 'center',
                  }}
                  //   onPress={() =>
                  //     props.navigation.navigate('HistoryDetailAnn', {
                  //       notice: getdata[index],
                  //     })
                  //   }
                  onPress={() => {
                    setAnnouncementData(getdata[index]);
                    setShowModal(true);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      // marginTop: 20,
                      //marginBottom: 10,
                      justifyContent: 'center',
                    }}>
                    {notice.image == null ? (
                      <Image
                        style={{
                          // borderWidth: 1,
                          height: '100%',
                          width: '100%',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          //marginLeft: 10,
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
                      justifyContent: 'space-between',
                      width: '90%',
                      alignSelf: 'center',
                    }}>
                    <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                      {/* {notice.created_at} */}
                      {Moment(notice.created_at).format('d MMM')}
                    </Text>
                    <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                      {/* {notice.created_at} */}
                      horn icon
                    </Text>
                  </View>
                  {/* <Text
          style={[
            paraGray.darkpara,
            {marginLeft: 10, marginTop: 10},
          ]}>
          {notice.title}
        </Text> */}
                  {/* <View style={{flex: 1}}>
          <Text
            style={[
              paraGray.darkpara,
              {marginLeft: 10, color: COLORS.active},
            ]}>
            {Moment(notice.created_at).format('d MMM')}
          </Text>
        </View> */}
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
                      Announcement Title
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      // justifyContent: 'space-between',
                      width: '90%',
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={[paraGray.darkpara, {fontSize: 10}]}>
                      {/* {notice.created_at} */}
                      Class- 5th
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {marginLeft: 5, fontSize: 10},
                      ]}>
                      {/* {notice.created_at} */}
                      Section- A
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 220,
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
            height: '60%',
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              //width: '100%',
              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={paraGray.largebold}>Announcement</Text>
              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            {announcementData && announcementData.class_id ? (
              <View style={{height: '60%', marginTop: 15}}>
                <View style={{}}>
                  <Image
                    source={{uri: Url.notice_IMG + announcementData.image}}
                    style={{width: '100%', height: '100%', borderRadius: 12}}
                    resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.primary,
                    marginTop: 15,
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[paraGray.darkpara, {fontSize: 14}]}>
                      {/* {notice.created_at} */}
                      {Moment(announcementData.created_at, 'DD MMM').format(
                        'DD-MM-YYYY',
                      )}
                    </Text>
                    <Text style={[paraGray.darkpara, {fontSize: 14}]}>
                      {/* {notice.created_at} */}
                      horn icon
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {
                            fontSize: 14,

                            alignSelf: 'center',
                            marginTop: 5,
                          },
                        ]}>
                        Announcement Title
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={[paraGray.darkpara, {fontSize: 12}]}>
                        {/* {notice.created_at} */}
                        Class- 5th
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {marginLeft: 5, fontSize: 12},
                        ]}>
                        {/* {notice.created_at} */}
                        Section- A
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={[paraGray.largebold, {fontSize: 12}]}>
                    This is the announcement message to be given to the students
                    that today’s 4th period is being a free period.
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default HistoryAnnouncement;
