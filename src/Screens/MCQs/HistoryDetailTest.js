import React, { useEffect, useState, useCallback } from 'react';
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
import Moment from 'moment';
import Url from '../../Config/Api/Url';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { ApiMethod } from '../../Config/Api/ApiMethod';

const HistoryDetailTest = props => {
  const { data } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { teacherid, schoolid } = useSelector(state => state.userReducer);
  const [attenddata, setAttenddata] = useState([]);
  const [getdata, setdata] = useState([]);
  const [totalquestion, TotalQuestion] = useState();
  const [totalmarks, TotalMarks] = useState();


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
    await ApiMethod(Url.getStudentMcqRecord, formData)
      .then(result => {
        console.log("Response Data==> " + JSON.stringify(result.data));
        if (result != false) {
          if (result.status == true) {
            setdata(result.data);
            TotalQuestion(result.total_question[0].total_question);
            TotalMarks(result.total_point[0].total_point);
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
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text style={[paraGray.darkpara, { color: COLORS.active }]}>
              {data.subject_name}
            </Text>
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
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[paraGray.darkpara, { fontSize: 12 }]}>Publish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[paraGray.darkpara, { fontSize: 12 }]}>Download</Text>
            <MaterialCommunityIcons
              name="download"
              size={15}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomColor: COLORS.background,
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          {getdata.map((student, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                marginHorizontal: 10,
                borderRadius: 10,
                borderColor: COLORS.border,
              }}
              onPress={() => {
                props.navigation.navigate('StudentTestDetail', {
                  student: getdata[index],
                  totalquestion: totalquestion,
                  testdetail:data,
                });
              }}>
              <View
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={[
                    paraGray.darkpara,
                    { fontFamily: 'Montserrat-SemiBold' },
                  ]}>
                  {student.student_name}
                </Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    borderColor:
                      student.total_submit == 0 ? COLORS.gray1 : ((student.student_total_point / totalmarks) * 100) >= 30 ? COLORS.newgreen : COLORS.newred,
                    backgroundColor:
                      student.total_submit == 0 ? COLORS.lightGray : ((student.student_total_point / totalmarks) * 100) >= 30 ? COLORS.newlightgreen : COLORS.newlightred,
                    marginTop: 10,
                    paddingVertical: 5,
                  }}>
                  {student.total_submit == 0
                    ?
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          color: COLORS.lightblack,
                        },
                      ]}>
                      Missed
                    </Text>
                    :
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          color:
                            ((student.student_total_point / totalmarks) * 100) >= 30
                              ? COLORS.newgreen
                              : COLORS.newred,
                        },
                      ]}>
                      {student.student_total_point} / {totalmarks + ''} ({((student.student_total_point / totalmarks) * 100).toFixed(2)}%)
                    </Text>
                  }
                </View>
              </View>
              <View
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {student.total_submit == 0
                  ?
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.lightblack,
                      },
                    ]}>
                    Missed
                  </Text>
                  :
                  <Text
                    style={[
                      paraGray.darkpara,
                      { fontFamily: 'Montserrat-SemiBold', color: ((student.student_total_point / totalmarks) * 100) > 30 ? COLORS.newgreen : COLORS.newred },
                    ]}>
                    {((student.student_total_point / totalmarks) * 100) >= 30 && ((student.student_total_point / totalmarks) * 100) <= 50 ? 'Passed'
                      :
                      ((student.student_total_point / totalmarks) * 100) >= 51 && ((student.student_total_point / totalmarks) * 100) <= 70 ? 'Good'
                        :
                        ((student.student_total_point / totalmarks) * 100) >= 71 ?
                          'Excellent'
                          :
                          ((student.student_total_point / totalmarks) * 100) < 30 && 'Poor'}
                  </Text>}
                <View
                  style={{
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    borderColor: student.total_submit == 0 ? COLORS.gray1 : ((student.student_total_point / totalmarks) * 100) >= 30 ? COLORS.newgreen : COLORS.newred,
                    marginTop: 10,
                    backgroundColor: student.total_submit == 0 ? COLORS.lightGray : ((student.student_total_point / totalmarks) * 100) >= 30 ? COLORS.newlightgreen : COLORS.newlightred,
                    paddingVertical: 5,
                  }}>
                  {student.total_submit == 0
                    ?
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          color: COLORS.lightblack,
                        },
                      ]}>
                      Missed
                    </Text>
                    :
                    <Text
                      style={[
                        paraGray.darkpara,
                        {
                          color:
                            ((student.student_total_point / totalmarks) * 100) >= 30 ? COLORS.newgreen : COLORS.newred,
                        },
                      ]}>
                      {((student.student_total_point / totalmarks) * 100) >= 30 ? 'Passed' : 'Failed'}
                    </Text>}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryDetailTest;

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
