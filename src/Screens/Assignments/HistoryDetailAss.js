import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Header } from '../../Components/Header';
import { COLORS } from '../../theme/Colors';
import { paraGray } from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import Url from '../../Config/Api/Url';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';

const HistoryDetailAss = props => {
  const { data } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { userinfo, userid, username, showmodal, schoolid } = useSelector(
    state => state.userReducer,
  );
  const [getdata, setGetdata] = useState([]);
  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', '5');
      formData.append('teacher_id', '1');
      formData.append('class_id', '1');
      formData.append('assignment_id', '2');
      // formData.append('school_id', schoolid);
      // formData.append('teacher_id', userid);
      // formData.append('class_id', data.class_id);
      // formData.append('assignment_id', data.id);
      // console.log('Send Data' + JSON.stringify(formData));
      let resp = await fetch(`${Url.getSubmitAssignmentDetailsById}`, {
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
          // console.log('Assignment Userlist List', JSON.stringify(result));
          setGetdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('History Assignment Detail Error => ' + error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);


  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.black }}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={data.subject_name}
          marginLeft
        // rightdownload
        // onPresss={{}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.bg,
            borderRadius: 20,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: COLORS.active,
            marginVertical: 10,
            marginHorizontal: 10,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[paraGray.darkpara, { color: COLORS.active }]}>
                {data.subject_name}
              </Text>
            </View>
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
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Stream
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {data.class_name}
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
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Assigment Created Date
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {data.date}
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
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Assigment Created Timing
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {data.time}
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
              // marginBottom: 10,
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
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Last Submission Date
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {data.deadline}
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
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Total Student
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {data.total_student}
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
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Attendent
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    color: COLORS.section,
                    marginLeft: 5,
                  },
                ]}>
                {data.attendent}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.lightblack, marginLeft: 5 },
                ]}>
                Mode
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  {
                    color: COLORS.section,
                    marginLeft: 5,
                  },
                ]}>
                {data.mode}
              </Text>
            </View>
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
        <View style={styles.stlabel}>
          <Text style={styles.stlabeltext}>Student Name</Text>
          <Text style={styles.stlabeltext}>Submission Date</Text>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomColor: COLORS.background,
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
        {getdata.map((student, index) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('HistoryuserAssignmentDetail', {
                userdetail: getdata[index],
                assignmentdetail: data
              })
            }>
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                paddingHorizontal: 10,
              }}>
              <Text style={[paraGray.darkpara]}>{student.student_name}</Text>

              {student.submit_status == 1 ? (
                <View style={{ borderWidth: 1, borderRadius: 20 }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { paddingHorizontal: 10, marginVertical: 2 },
                    ]}>
                    Submitted
                  </Text>
                </View>
              ) : (
                <Text style={[paraGray.darkpara, { paddingHorizontal: 10 }]}>
                  {Moment(student.submitted_at).format('d MMM YY')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
        {
          getdata.length < 1 && loading == false &&
          <View View style={{
            flex: 1,
            marginBottom: 80,
            alignSelf: 'center',
            marginTop: 80,
          }}>
            <Text style={[paraGray.darkpara, { textAlign: 'center' }]}>
              NO Data Found
            </Text>
          </View>
        }
      </ScrollView >
    </View >
  );
};

export default HistoryDetailAss;

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
    marginTop: 10,
    paddingHorizontal: 5,
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
    // paddingHorizontal: 15,
    marginVertical: 2,
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: COLORS.section,
    borderBottomWidth: 0.5,
    width: '100%',
  },
});
