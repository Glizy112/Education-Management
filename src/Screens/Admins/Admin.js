import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {container, paraGray} from '../../theme/styles/Base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import Url from '../../Config/Api/Url';

const Admin = props => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [getdata, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {schoolid} = useSelector(state => state.userReducer);

  useEffect(() => {
    getemployeelist();
  }, []);

  // --------APICall----------

  const getemployeelist = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      // console.log('DATA',formData);
      let resp = await fetch(`${Url.list_employee}`, {
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
          // console.log('data', result);
          setData(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('AdminList Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getemployeelist();
  }, []);
  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={'Admins'}
          marginLeft
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, paddingBottom: 20, paddingHorizontal: 10}}>
          {getdata.map((user, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                borderColor: COLORS.bluee,
                alignSelf: 'center',
                borderWidth: 0.5,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={{justifyContent: 'center', marginTop: 5}}
                  onPress={
                    () => alert('Feature Coming Soon')
                    // props.navigation.navigate('ChatDetail', {
                    //   user: getdata[index],
                    // })
                  }>
                  <AntDesign name="message1" size={22} color={COLORS.blue} />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[paraGray.darklarge, {color: COLORS.bluee}]}>
                    {user.name}{' '}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{justifyContent: 'center', marginTop: 5}}
                  onPress={
                    () => alert('Feature Coming Soon')
                    // props.navigation.navigate('PhoneCall', {
                    //   user: user,
                    // })
                  }>
                  <FontAwesome name="phone" size={22} color={COLORS.blue} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  marginVertical: 10,
                }}
              />
              <View style={{flex: 1}}>
                {/* <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.lightblack,
                      },
                    ]}>
                    Class Teacher
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.lightblack,
                      },
                    ]}>
                    {user.classteacher}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.lightblack,
                      },
                    ]}>
                    Lecturer
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.lightblack,
                      },
                    ]}>
                    {user.Lecturer}
                  </Text>
                </View> */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.lightblack,
                      },
                    ]}>
                    Administration
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.lightblack,
                      },
                    ]}>
                    {user.role_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.background,
                  marginVertical: 12,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color: COLORS.lightblack,
                    },
                  ]}>
                  Contact Number
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color: COLORS.lightblack,
                    },
                  ]}>
                  {user.phone}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              marginTop: 100,
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

export default Admin;
