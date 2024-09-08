import React, { useCallback, useEffect, useState } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import Url from '../../Config/Api/Url';
import { container, paraGray } from '../../theme/styles/Base';
import { COLORS } from '../../theme/Colors';
import { useFocusEffect } from '@react-navigation/native';

const HistoryEvent = props => {
  const dispatch = useDispatch();
  const {
    userinfo,
    userid,
    username,
    showmodal,
    userimage,
    schoolid,
    teacherid,
  } = useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['title', 'event_from', 'day'];
  const [search, setSearch] = useState('');

  const filterevents = getdata.filter(createFilter(search, KEYS_TO_FILTERS));
  const searchUpdated = term => {
    setSearch(term);
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
      formData.append('teacher_id', teacherid);
      // console.log('Send Data ==>', formData);
      let resp = await fetch(`${Url.event_by_teacher}`, {
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
          // console.log("Event History Response===> "+JSON.stringify(result.data));
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Event List Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(false);
    getapiData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

  return (
    <View style={{}}>
      {loading == true && <Spinner visible={load}/>}
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
        <View style={styles.search}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              width: '100%',
              height: 50,
              borderColor: COLORS.white,
              paddingHorizontal: 2,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
              elevation: 2,
            }}>
            <TextInput
              placeholder="Search by Name or Mobile Number"
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                color: COLORS.black,
                width: '90%',
                height: 40,
                fontSize: 14,
                paddingHorizontal: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
            <Feather name="search" size={24} color="#000000" />
          </View>
        </View>
        <View style={{ marginBottom: 20, marginTop: 4, paddingHorizontal: 2 }}>
          <View style={{paddingHorizontal: 12, paddingTop: 12}}>
            <Text 
              style={{
                fontSize: 14, 
                fontFamily: 'Montserrat-Medium',
                color: COLORS.secondary,
              }}
            > Results ({filterevents?.length}) </Text>
          </View>
          {filterevents?.map((event, index) => (
            <View key={index}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  borderWidth: 0.6,
                  borderColor: COLORS.primary,
                  marginVertical: 5,
                  marginHorizontal: 15,
                }}
                onPress={() =>
                  props.navigation.navigate('EventDetailHistory', {
                    events: getdata[index]
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[paraGray.largebold, {fontSize: 16}]}>{event.title}</Text>
                  <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditEvent', {
                      eventdata: getdata[index]
                    })}>
                      <View
                        style={{
                          backgroundColor: COLORS.bg,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 30,
                          height: 30,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: COLORS.background,
                        }}>
                        <FontAwesome5
                          name="pen"
                          size={12}
                          color={COLORS.black}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                  }}>
                  <Text style={[paraGray.darkpara, { color: COLORS.section }]}>
                    {event.event_from} to {event.event_to}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderBottomColor: COLORS.background,
                    borderBottomWidth: 1,
                    marginTop: 10,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[paraGray.darkpara, { color: COLORS.lightblack }]}>
                      Total Applicant
                    </Text>
                    <Text style={[paraGray.darkpara, { color: COLORS.section }]}>
                      100
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[paraGray.darkpara, { color: COLORS.lightblack }]}>
                      Date of Event
                    </Text>
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          color: COLORS.section,
                        },
                      ]}>
                      {event.event_date}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
           {getdata == '' && loading == false && (
            <View
              style={{
                flex: 1,
                marginBottom: 80,
                alignSelf: 'center',
                marginTop: 150,
              }}>
              <Text style={[paraGray.darklarge, { textAlign: 'center' }]}>
                NO Data Found
              </Text>
            </View>
          )}
        </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default HistoryEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
    paddingBottom: 10,
    marginTop: 10,
  },
  label: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    paddingHorizontal: 15,
  },
});
