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
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';
import {Dropdown} from 'react-native-element-dropdown';

const PeriodHistory = props => {
  const {period} = props.route.params;
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, teacherid, schoolid} =
    useSelector(state => state.userReducer);
  const [getdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [fromdate, setFromDate] = useState(period.start_time);
  const [todate, setToDate] = useState(period.end_time);
  const [refreshing, setRefreshing] = React.useState(false);
  const [lecmode, setLecMode] = useState('Lecture Taken Online Mode');
  const [divert, setDivert] = useState('You Diverted Lecture To Sheela Yadav');

  useEffect(() => {}, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName={period.name}
          marginLeft
          back
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bg,
              borderRadius: 10,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: COLORS.border,
              marginVertical: 10,
            }}>
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Subject Name :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  {period.name}
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Class Room :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  FYBCA
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Date :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  29/4/2022
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Period :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  Period 3
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {flex: 1, color: COLORS.black, marginLeft: 5},
                  ]}>
                  From:
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {flex: 1, color: COLORS.black, marginLeft: 5},
                  ]}>
                  To:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="Choose Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={fromdate}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                  }}
                  textAlign="center"
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {color: COLORS.black, marginHorizontal: 5},
                    ]}>
                    -
                  </Text>
                </View>
                <TextInput
                  placeholder="Choose Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={todate}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                  textAlign="center"
                />
              </View>
              <View>
                <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                  Lecture Mode
                </Text>
                <TextInput
                  placeholder="Choose Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={lecmode}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    color: COLORS.black,
                  }}
                  textAlign="center"
                />
              </View>
              <View>
                <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
                  Divert My Lecture
                </Text>
                <TextInput
                  placeholder="Choose Date"
                  placeholderTextColor="#808080"
                  editable={false}
                  value={divert}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    color: COLORS.black,
                  }}
                  textAlign="center"
                />
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                  Total Minutes: 120
                </Text>
                <Text style={[paraGray.darkpara, {color: COLORS.red}]}>
                  Total Minutes: Cancelled
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: COLORS.background,
                  borderBottomWidth: 1,
                  marginTop: 20,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Date of Lecture :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  20/12/10
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Mode :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  Online
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Total Attendent :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  85 Present
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Lecture Taken By :
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.section, marginLeft: 5},
                  ]}>
                  Not Yet Started
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* {loading == false && getData == '' && (
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
        )} */}
      </ScrollView>
    </View>
  );
};

export default PeriodHistory;
