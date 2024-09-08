import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Header } from '../../Components/Header';
import { COLORS } from '../../theme/Colors';
import { container, paraGray } from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import { useSelector } from 'react-redux';

const ClassResult = props => {
  const { Sem, teacherdata } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { teacherid, userid, schoolid } = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);

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
      formData.append('term_id', Sem.id);
      formData.append('class_id', teacherdata[0].class_id);
      formData.append('section_id', teacherdata[0].section_id);
      // console.log("Result Send Data==> ", JSON.stringify(formData));
      let resp = await fetch(`${Url.getStudentResultByTermId}`, {
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
          // console.log('Result Response ===> ', JSON.stringify(result.data));
          setdata(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('ClassRoom Result Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);
  return (
    <View style={[container.container]}>
      <View style={{ paddingHorizontal: 15, backgroundColor: COLORS.black }}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={Sem.title}
          marginLeft
          righttxt
          onPresss={
            () => alert("Feature Coming Soon")
          }
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        {loading == true && <Spinner visible={load} />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ marginTop: 10, paddingBottom: 20 }}>
            {getdata.map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { fontFamily: 'Montserrat-SemiBold' },
                    ]}>
                    {item.student_details.student[0].student_name}
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { fontFamily: 'Montserrat-SemiBold' },
                    ]}>
                    Roll No : {item.student_details.student[0].roll_no}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderBottomColor: COLORS.background,
                    borderBottomWidth: 1,
                    marginVertical: 10,
                  }}
                />
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  {item.student_details.result.map((result, i) => (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }} key={i}>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {
                              color: COLORS.active,
                              marginLeft: 10,
                              marginTop: 10,
                            },
                          ]}>
                          {result.subject_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.lighterblue,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            paraGray.darkpara,
                            { color: COLORS.lighterblack, marginTop: 10 },
                          ]}>
                          {result.written_mark}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.lightinggreen,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {
                              color: COLORS.lighterblack,
                              fontFamily: 'Poppins-SemiBold',
                              marginTop: 10,
                            },
                          ]}>
                          {result.written_obtain} - {result.grade}
                        </Text>
                      </View>
                    </View>
                  ))}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      paddingHorizontal: 10,
                      marginTop: 10,
                    }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.green, fontFamily: 'Poppins-SemiBold' },
                      ]}>
                      Grade: A {
                        ((item.student_details.total_marks[0] / (item.student_details.result.length * 100)) * 100).toFixed(2)}%
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderBottomColor: COLORS.background,
                      borderBottomWidth: 1,
                      marginVertical: 10,
                    }}
                  />
                </View>
              </View>
            ))}
            {getdata.length < 1 && loading == false && (
              <View
                style={{
                  flex: 1,
                  marginBottom: 80,
                  alignSelf: 'center',
                  marginTop: 250,
                }}>
                <Text style={[paraGray.darklarge, { textAlign: 'center' }]}>
                  NO Data Found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ClassResult;
