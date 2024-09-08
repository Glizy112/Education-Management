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
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

const RequestHistory = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [accept, setAccept] = React.useState(true);

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name'];
  const [state, setState] = useState({searchTerm: ''});

  const filterleaves = getdata.filter(
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
        <View style={styles.search}>
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
              placeholder="Search by Names."
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
        </View>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {filterleaves.map((data, index) => (
            <View style={{flex: 1, paddingHorizontal: 10}} key={index}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.bg,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.active,
                  marginVertical: 10,
                }}
                onPress={() => {
                  props.navigation.navigate('RequestHistoryDetail', {
                    requestData: getdata[index],
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[paraGray.darkpara, {color: COLORS.active}]}>
                    {data.student_name}
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
                </View>
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
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {loading == false && getdata == '' && (
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
    </View>
  );
};

export default RequestHistory;

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
