import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Header } from '../../Components/Header';
import { COLORS } from '../../theme/Colors';
import { paraGray } from '../../theme/styles/Base';
import Moment from 'moment';
import Url from '../../Config/Api/Url';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { ApiMethod } from '../../Config/Api/ApiMethod';

const SubmittedDetailTest = props => {
  const { data, join } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { teacherid, schoolid } = useSelector(state => state.userReducer);
  const [attenddata, setAttenddata] = useState([]);
  const [getdata, setdata] = useState([]);


  useEffect(() => {
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('test_id', data.mcq_id);
    formData.append('teacher_id', teacherid);
    // console.log("Send Data ==> " + JSON.stringify(formData));
    await ApiMethod(Url.getStudentDetailsByTestId,formData)
      .then(result => {
        // console.log("Response Data==> " + JSON.stringify(result.data));
        if (result != false) {
          if (result.status == true) {
            setAttenddata(
              {
                livestudents: result.live_student[0].live_student,
                totalsubmit: result.total_submit[0].total_submit,
              })
            setdata(result.data);
          }
        }
        setLoading(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.black }}>
        {loading == true && <Spinner visible={load} />}
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
        }>
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
              marginTop: 10,
            }}>
            <View style={{ flex: 0.9 }} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={[paraGray.darkpara, { color: COLORS.active, textAlign: 'center' }]}>
                {data.subject_name}
              </Text>
            </View>
            <View style={{
              flex: 0.8,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
              {join == true && <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.bg,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 45,
                  height: 25,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: COLORS.lightSkyred,
                  backgroundColor: COLORS.lightSkyred,
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    { fontSize: 12, color: COLORS.red },
                  ]}>
                  Live
                </Text>
              </View>}
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
                Exam Date
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {data.exam_date}
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
                Exam Timing
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {Moment(data.start_time["HH.mm"]).format("hh:mm a")} - {Moment(data.end_time["HH.mm"]).format("hh:mm a")}
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
                Total Questions
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  { color: COLORS.section, marginLeft: 5 },
                ]}>
                {data.total_question}
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
                {data.total_attend}
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
                Online
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
          {attenddata.livestudents != '' &&
            <Text style={[styles.stlabeltext, { color: COLORS.red }]}>
              Live Students: {attenddata.livestudents}
            </Text>}
          <Text style={[styles.stlabeltext, { color: COLORS.green }]}>
            Total Submitted: {attenddata.totalsubmit}
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
        <View style={styles.stlabel}>
          <Text style={styles.stlabeltext}>Student Name</Text>
          <Text style={styles.stlabeltext}>Present</Text>
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
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <Text style={[paraGray.darkpara]}>{student.student_detail.student_name}</Text>
            <View>
              {student.student_detail.status ? (
                <Text
                  style={[
                    paraGray.darkpara,
                    { paddingHorizontal: 10, marginVertical: 2 },
                  ]}>
                  Submitted
                </Text>
              ) : (
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      paddingHorizontal: 10,
                      marginVertical: 2,
                      color: COLORS.lightblack,
                    },
                  ]}>
                  Not Started
                </Text>
              )}
            </View>
          </View>
        ))}
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              marginTop: 80,
            }}>
            <Text style={[paraGray.darklarge, { textAlign: 'center' }]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SubmittedDetailTest;

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
