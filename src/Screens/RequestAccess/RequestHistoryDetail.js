import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {Avatar, List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector, useDispatch} from 'react-redux';
import {
  setuserId,
  setuserInfo,
  setuserName,
  setShowModal,
  setuserImage,
} from '../../Redux/Actions/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';

const RequestHistoryDetail = props => {
  const {requestData} = props.route.params;
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [parent, setParent] = useState(false);
  const [accept, setAccept] = React.useState(true);

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
      let resp = await fetch(`${Url.list_leave}`, {
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.bg,
                borderRadius: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: COLORS.active,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                  {requestData.student_name}
                </Text>
                <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                  Student Static
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: COLORS.background,
                  borderBottomWidth: 0.5,
                  marginTop: 15,
                }}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                {userimage == null ? (
                  <ImageBackground
                    style={{
                      backgroundColor: COLORS.black,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                    }}>
                    <FontAwesome5 name="user-alt" size={30} color="#FFFFFF" />
                  </ImageBackground>
                ) : (
                  <Avatar.Image
                    source={{uri: Url.profile_IMG + userimage}}
                    size={70}
                  />
                )}
              </View>
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Date:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    20-09-22
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Institute:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    XYZ
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Stream:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    XYZ
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Roll No:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    XYZ
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Teacher Name:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Teacher XYZ
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Academic Year:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    2021-2022
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Admission Form Number:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    16555
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    Phone Number:
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    9824515442
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
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    E-mail ID :
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.section, marginLeft: 5},
                    ]}>
                    XYZ@gmail.com
                  </Text>
                </View>

                {parent == true && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        Parent Name:
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        parent XYZ
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
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        Child Name:
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        XYZ@gmail.com
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
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        Child Phone Number:
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        1254514001
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
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        Child E-mail ID :
                      </Text>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {color: COLORS.section, marginLeft: 5},
                        ]}>
                        XYZ@gmail.com
                      </Text>
                    </View>
                  </View>
                )}
                {accept == true ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginVertical: 20,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: COLORS.lightSkygreen,
                        marginHorizontal: 20,
                      }}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {
                            color: COLORS.green,
                            marginVertical: 8,
                            marginHorizontal: 20,
                            fontFamily: 'Montserrat-SemiBold',
                          },
                        ]}>
                        Accepted
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginVertical: 20,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: COLORS.lightred,
                        marginHorizontal: 20,
                      }}>
                      <Text
                        style={[
                          paraGray.darkpara,
                          {
                            color: COLORS.red,
                            marginVertical: 8,
                            marginHorizontal: 20,
                            fontFamily: 'Montserrat-SemiBold',
                          },
                        ]}>
                        Declined
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RequestHistoryDetail;

const styles = StyleSheet.create({
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
