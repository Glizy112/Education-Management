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

const HistoryLeave = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name', 'leave_from'];
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
              borderWidth: 2,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Names./Date"
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
          {filterleaves.map(
            (data, index) =>
              data.leave_status !== '1' &&
              data.leave_status !== '0' && (
                <View style={{flex: 1, paddingHorizontal: 10}} key={index}>
                  <List.Section>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: COLORS.bg,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        borderWidth: 2,
                        borderColor: COLORS.background,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        <Text style={[paraGray.darkpara]}>
                          {data.student_name}
                        </Text>
                        <Text
                          style={[paraGray.darkpara, {color: COLORS.section}]}>
                          {data.class_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        <Text
                          style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                          {data.title}
                        </Text>
                        <Text
                          style={[paraGray.darkpara, {color: COLORS.section}]}>
                          {data.leave_from}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          marginBottom: 10,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <MaterialIcons
                            name="watch-later"
                            size={20}
                            color={COLORS.section}
                          />
                          <Text
                            style={[
                              paraGray.darkpara,
                              {color: COLORS.section, marginLeft: 5},
                            ]}>
                            {data.leave_day} days
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          {data.leave_status == '3' && (
                            <Text
                              style={[
                                paraGray.darkpara,
                                {
                                  color: COLORS.red,
                                  marginLeft: 5,
                                },
                              ]}>
                              Rejected
                            </Text>
                          )}
                          {data.leave_status == '2' && (
                            <Text
                              style={[
                                paraGray.darkpara,
                                {
                                  color: COLORS.green,
                                  marginLeft: 5,
                                },
                              ]}>
                              Approved
                            </Text>
                          )}
                        </View>
                      </View>
                      <List.Accordion
                        //   theme={{colors:COLORS.black}}
                        style={{
                          // borderBottomLeftRadius: 10,
                          // borderBottomRightRadius: 10,
                          backgroundColor: COLORS.bg,
                        }}
                        titleStyle={[paraGray.darkpara]}
                        title="View Detail">
                        <Text
                          style={[
                            paraGray.darkpara,
                            {color: COLORS.lighterblack},
                          ]}>
                          Reason :
                        </Text>
                        <View style={{flex: 1, marginLeft: 20}}>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {color: COLORS.lightbblack},
                            ]}>
                            {data.leave_reason}
                          </Text>
                        </View>
                        {data.leave_note != '' && (
                          <View style={{marginTop: 10}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                {color: COLORS.lighterblack, marginLeft: 5},
                              ]}>
                              Reply :
                            </Text>
                            <View
                              style={{
                                flex: 1,
                                marginLeft: 20,
                                marginBottom: 10,
                              }}>
                              <Text
                                style={[
                                  paraGray.darkpara,
                                  {color: COLORS.lightbblack},
                                ]}>
                                {data.leave_note}
                              </Text>
                            </View>
                          </View>
                        )}
                      </List.Accordion>
                    </View>
                  </List.Section>
                </View>
              ),
          )}
        </View>
        {(loading == false && getdata.leave_status == '1') ||
          (getdata.length < 1 && (
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
          ))}
      </ScrollView>
    </View>
  );
};

export default HistoryLeave;

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
