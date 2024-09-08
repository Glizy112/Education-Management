import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import {List, Modal} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setShowModal} from '../../Redux/Actions/actions';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';

const UpComingDetailLecture = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, showmodal, teacherid, schoolid} =
    useSelector(state => state.userReducer);
  const {subjects} = props.route.params;
  const [cancelreason, setCancelReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);

  const CancelLec = async () => {
    if (cancelreason.length < 1) {
      alert('Please Enter Reason to Cancel the Lecture');
    } else {
      dispatch(setShowModal(false));
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('school_id', schoolid);
        formData.append('lecture_id', subjects.id);
        formData.append('class_id', subjects.class_id);
        formData.append('teacher_id', teacherid);
        formData.append('section_id', subjects.section_id);
        formData.append('subject_id', subjects.subject_id);
        formData.append('status', 3);
        formData.append('note', cancelreason);
        // console.log("Data",formData);
        let resp = await fetch(`${Url.update_lecture_status}`, {
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
            if (result.status == true) {
              setLoading(false);
              alert(result.message);
              props.navigation.navigate('UpComingLecture');
            } else {
              alert('Retry');
              setLoading(false);
            }
          });
      } catch (error) {
        console.log('TimeTable getclassData Error => ' + error);
        setLoading(false);
      }
    }
  };

  return (
    <View style={[container.container]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingVertical: 20}}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.bgColor,
              borderRadius: 20,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: COLORS.border,
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
                justifyContent: 'space-between',
                width: '95%',
                alignSelf: 'center',
              }}>
              <Text style={[paraGray.darkpara]}>{subjects.subject_name}</Text>
              <Text style={[paraGray.darkpara]}>{subjects.title}</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderBottomColor: COLORS.background,
                borderBottomWidth: 1,
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
                    {color: COLORS.lightblack, marginLeft: 5},
                  ]}>
                  Stream
                </Text>
                <Text
                  style={[
                    paraGray.largebold,
                    {color: COLORS.black, marginLeft: 5, fontSize: 14},
                  ]}>
                  {subjects.class_name}
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
                  Lecture Date
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.black, marginLeft: 5, fontSize: 14},
                  ]}>
                  {subjects.class_date}
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
                  Lecture Timing
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.black, marginLeft: 5, fontSize: 14},
                  ]}>
                  {subjects.start_time} - {subjects.end_time}
                </Text>
              </View>
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
                marginTop: 5,
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
                  Total Student
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.black, marginLeft: 5, fontSize: 14},
                  ]}>
                  {subjects.TotalStudent}Static
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
                  Attendent
                </Text>
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.black, marginLeft: 5, fontSize: 14},
                  ]}>
                  Not Started
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
                  Mode
                </Text>
                {console.log('class type', subjects.class_type)}
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color:
                        subjects.class_type !== 'Online'
                          ? COLORS.red
                          : COLORS.black,
                      fontSize: 14,
                      marginLeft: 5,
                    },
                  ]}>
                  {subjects.class_type}
                </Text>
              </View>
            </View>
          </View>
          {subjects.class_type == 'Online' ? (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={() => alert('Feature Coming Soon')}>
              <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                Join Session
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={() =>
                props.navigation.navigate('TakeAttendance', {
                  classvalue: subjects.class_id,
                  sectionvalue: subjects.section_id,
                  subjectvalue: subjects.subject_id,
                })
              }>
              <Text style={[paraGray.darkpara, {color: COLORS.bluee}]}>
                Take Attendent
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  // backgroundColor: COLORS.black,
                  backgroundColor: '#97A7C3',
                  borderRadius: 20,
                }}
                onPress={() => {
                  // alert('Feature Coming Soon');
                  props.navigation.navigate('UpdateLecture', {
                    lecdetail: subjects,
                  });
                }}>
                <Text
                  style={[
                    paraGray.whitepara,
                    {marginVertical: 8, marginHorizontal: 20},
                  ]}>
                  Edit Lecture
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  /// backgroundColor: COLORS.black,
                  backgroundColor: COLORS.red,
                  borderRadius: 20,
                }}
                onPress={() => {
                  dispatch(setShowModal(!showmodal));
                }}>
                <Text
                  style={[
                    paraGray.whitepara,
                    {marginVertical: 8, marginHorizontal: 15},
                  ]}>
                  Cancel Lecture
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
        <Text style={[paraGray.darkpara]}>Cancellation Reason</Text>
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
            marginTop: 10,
            borderRadius: 5,
            fontSize: 13,
            fontFamily: 'Montserrat-Regular',
          }}
          value={cancelreason}
          onChangeText={value => setCancelReason(value)}
          placeholder="Reason"
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={CancelLec}>
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
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default UpComingDetailLecture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: '6%',
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

  txt: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  formtxt: {
    marginTop: 25,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
  },
  datatxt: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  stlabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  stlabeltext: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    paddingHorizontal: 10,
  },
  sttext: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    paddingHorizontal: 15,
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
  },
});
