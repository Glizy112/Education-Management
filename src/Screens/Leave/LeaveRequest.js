import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {
  setuserId,
  setuserInfo,
  setuserName,
  setShowModal,
  setuserImage,
} from '../../Redux/Actions/actions';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';

const LeaveRequest = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, userimage, schoolid} =
    useSelector(state => state.userReducer);
  // const [expanded, setExpanded] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setData] = useState([]);
  const [leavestatus, setLeaveStatus] = useState('');
  const [leaveId, setLeaveId] = useState('');
  const [studentid, setStudentId] = useState('');
  const [leavenote, setLeaveNote] = useState('');

  useEffect(() => {
    getapiData();
  }, []);
  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      // console.log('Leavedata ===>', formData);
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
          // console.log(result.data);
          setData(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Leave List Error => ' + error);
      setLoading(false);
    }
  };

  const show = () => {
    dispatch(setShowModal(!showmodal));
  };

  const ApproveRequest = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('student_id', studentid);
      formData.append('leave_status', leavestatus);
      formData.append('leave_note', leavenote);
      formData.append('leaveid', leaveId);
      // console.log('Leavedata ===>', formData);
      let resp = await fetch(`${Url.update_leave_status}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          setLeaveNote('');
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          getapiData();
          setLoading(false);
        });
    } catch (error) {
      console.log('LeaveApprove Request Error => ' + error);
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
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName="Leave Request"
          marginLeft
          back
          time
          onPresss={() => props.navigation.navigate('HistoryLeave')}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
          {getdata.map(
            (data, index) =>
              data.leave_status == '1' && (
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
                          <TouchableOpacity
                            onPress={() => (
                              setLeaveStatus('3'),
                              setStudentId(data.userid),
                              setLeaveId(data.leaveid),
                              show()
                            )}>
                            <Entypo
                              style={{marginRight: 20}}
                              name="circle-with-cross"
                              size={25}
                              color={COLORS.red}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => (
                              setLeaveStatus('2'),
                              setStudentId(data.userid),
                              setLeaveId(data.leaveid),
                              show()
                            )}>
                            <AntDesign
                              style={{marginRight: 10, marginTop: 1}}
                              name="checkcircleo"
                              size={24}
                              color={COLORS.green}
                            />
                          </TouchableOpacity>
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
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            marginBottom: 20,
                            marginTop: 20,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(setShowModal(!showmodal));
                            }}>
                            <Text
                              style={[
                                paraGray.whitepara,
                                {
                                  backgroundColor: COLORS.active,
                                  paddingHorizontal: 40,
                                  paddingVertical: 5,
                                  borderRadius: 10,
                                },
                              ]}>
                              Reply
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </List.Accordion>
                    </View>
                  </List.Section>
                </View>
              ),
          )}
        </View>
        {loading == false && getdata.leave_status != '1' && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 190,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showmodal}
        onDismiss={() => dispatch(setShowModal(false))}
        contentContainerStyle={{
          width: '75%',
          height: 350,
          backgroundColor: COLORS.bg,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <AutoGrowingTextInput
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: 80,
            borderColor: '#D3D3D3',
            alignSelf: 'center',
            borderWidth: 1,
            marginTop: 20,
            borderRadius: 5,
            fontSize: 13,
            fontFamily: 'Montserrat-Regular',
          }}
          value={leavenote}
          onChangeText={value => setLeaveNote(value)}
          placeholder="Reply"
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => dispatch(setShowModal(false), ApproveRequest())}>
            <Text
              style={[
                paraGray.whitepara,
                {
                  backgroundColor: COLORS.active,
                  paddingHorizontal: 40,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
              ]}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default LeaveRequest;
