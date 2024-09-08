import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Search from '../../Components/Search';

const CertificateHistory = props => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [getdata, setGetdata] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const events = [
    {
      id: '1',
      eventname: 'Kho-Kho',
      time: '10:00AM',
      date: '10/10/21',
      day: 'Saturday',
      stream: 'FY',
      endtime: '11:00AM',
    },
    {
      id: '2',
      eventname: 'Volleyball',
      time: '12:00PM',
      date: '12/10/21',
      day: 'Monday',
      stream: 'SY',
      endtime: '1:00PM',
    },
  ];

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['eventname'];
  const [state, setState] = useState({searchTerm: ''});

  const filterevent = events.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
  };

  const getapiData = async () => {
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
          if (result.status == true) {
            // console.log(result);
            setGetdata(result.data);
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Assign Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

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
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 2,
              borderWidth: 2,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by eventName."
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
            <Feather name="search" size={29} color="#000000" />
          </View>
        </View> */}
        <Search
          getdata={getdata}
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          filter={setSearchData}
        />
        <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
          {searchData && searchData.eventname ? (
            <FlatList
              data={searchData}
              style={{flex: 1}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    // borderWidth: 1,

                    alignSelf: 'center',
                    borderRadius: 10,
                    width: '100%',
                    padding: 10,
                    backgroundColor: '#EEF2FD',
                    marginBottom: 15,
                  }}
                  onPress={() => {
                    // console.log('data=' + JSON.stringify(events[index]));
                    props.navigation.navigate('CertificateHistoryDetail', {
                      //events: events[index],
                      events: item,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FontAwesome name="star" size={23} color={'#385AB1'} />
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 16, marginLeft: 5},
                        ]}>
                        Event Title
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {
                            color: 'rgba(0, 0, 0, 0.60)',
                            fontSize: 12,

                            textAlign: 'right',
                          },
                        ]}>
                        Date
                      </Text>
                      <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                        09-01-2024
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={1}
                        style={[paraGray.darkpara, {fontSize: 12}]}>
                        This is the event description...
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[paraGray.largebold, {fontSize: 12}]}>
                        Class 5th A
                      </Text>
                      <Text
                        style={{
                          height: 14,
                          width: 1,
                          backgroundColor: '#97A7C3',
                          marginLeft: 5,
                        }}
                      />
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 12, marginLeft: 5},
                        ]}>
                        English
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <FlatList
              data={filterevent}
              style={{flex: 1}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    // borderWidth: 1,

                    alignSelf: 'center',
                    borderRadius: 10,
                    width: '100%',
                    padding: 10,
                    backgroundColor: '#EEF2FD',
                    marginBottom: 15,
                  }}
                  onPress={() => {
                    // console.log('data=' + JSON.stringify(events[index]));
                    props.navigation.navigate('CertificateHistoryDetail', {
                      // events: events[index],
                      events: item,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FontAwesome name="star" size={23} color={'#385AB1'} />
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 16, marginLeft: 5},
                        ]}>
                        Event Title
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {
                            color: 'rgba(0, 0, 0, 0.60)',
                            fontSize: 12,

                            textAlign: 'right',
                          },
                        ]}>
                        Date
                      </Text>
                      <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                        09-01-2024
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={1}
                        style={[paraGray.darkpara, {fontSize: 12}]}>
                        This is the event description...
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[paraGray.largebold, {fontSize: 12}]}>
                        Class 5th A
                      </Text>
                      <Text
                        style={{
                          height: 14,
                          width: 1,
                          backgroundColor: '#97A7C3',
                          marginLeft: 5,
                        }}
                      />
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 12, marginLeft: 5},
                        ]}>
                        English
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        {/* {filterevent.map((event, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E5E5E5',
                width: '90%',
                height: 70,
                borderColor: '#E5E5E5',
                alignSelf: 'center',
                borderWidth: 2,
                marginTop: 20,
                borderRadius: 5,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}
              onPress={() => {
                // console.log('data=' + JSON.stringify(events[index]));
                props.navigation.navigate('CertificateHistoryDetail', {
                  events: events[index],
                });
              }}>
              <View>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {event.eventname}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {event.date}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))} */}
        {/* {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 150,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}  */}
      </ScrollView>
    </View>
  );
};

export default CertificateHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
  label: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    paddingHorizontal: 15,
  },
});
