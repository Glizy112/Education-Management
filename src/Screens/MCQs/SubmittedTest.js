import React, { useState, useEffect } from 'react';
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
  ImageBackground,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../theme/Colors';
import { paraGray } from '../../theme/styles/Base';
import Moment from 'moment';
import { ApiMethod } from '../../Config/Api/ApiMethod';


const SubmittedTest = props => {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { teacherid, schoolid } = useSelector(state => state.userReducer);
  const [getdata, setdata] = useState([]);
  const [join, setjoin] = useState([]);

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['subject_name', 'class_name'];
  const [state, setState] = useState({ searchTerm: '' });

  const filterdata = getdata.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({ searchTerm: term });
  };

  useEffect(() => {
    getapiData();
  }, []);
  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('teacher_id', teacherid);
    await ApiMethod(Url.getMcqCreateByTeacher, formData)
      .then(result => {
        // console.log(JSON.stringify(result.data));
        if (result != false) {
          if (result.status == true) {
            var list = [];
            result.data.forEach((item, i) => {
              var data = {
                mcq_id: item.test_details.test[0].id,
                exam_date: item.test_details.test[0].exam_date,
                start_time: item.test_details.test[0].start_time,
                end_time: item.test_details.test[0].end_time,
                class_name: item.test_details.test[0].class_name,
                subject_name: item.test_details.test[0].subject_name,
                total_question: item.test_details.question[0].total_question,
                total_student: item.test_details.student[0].total_student,
                total_attend: item.test_details.attend[0].total_attend
              }
              list.push(data);
            })
            setdata(list);
            newArray(list)
          }
        }
        setLoading(false);
      });
  };

  const newArray = data => {
    let lists = [];
    data.map((sub, index) => {
      lists.push(false);
    });
    setjoin(lists);
    datetime(data);
  };

  const datetime = data => {
    let times = Moment().format('HH : mm');
    data.map((sub, index) => {
      let today = new Date();
      let dates =
        (today.getDate() > 9 ? today.getDate() : '0' + today.getDate()) +
        '/' +
        (today.getMonth() + 1) +
        '/' +
        today.getFullYear();
      let list = [...join];
      if (sub.exam_date == dates) {
        times >= sub.start_time
          ? join[index] = times <= sub.end_time ? true : false
          : join[index] = false
      }
      else { join[index] = false }
      setjoin(list);
    });
    setLoading(false);
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
        <View style={styles.search}>
          <View
            style={{
              flexDirection: 'row',
              alignbooks: 'center',
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 0,
              borderWidth: 1,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Subject Name/Class."
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 2,
                marginTop: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
            <Feather
              style={{ marginTop: 6 }}
              name="search"
              size={29}
              color="#000000"
            />
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
          {filterdata.map((data, index) => (
            <View style={{ flex: 1, paddingHorizontal: 10 }} key={index}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLORS.bg,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.active,
                  marginVertical: 10,
                }}
                onPress={() => {
                  props.navigation.navigate('SubmittedDetailTest', {
                    data: filterdata[index],
                    join: join[index]
                  });
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View style={{ flex: 1 }} />
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Text
                      style={[
                        paraGray.darkpara,
                        { color: COLORS.active, textAlign: 'center' },
                      ]}>
                      {data.subject_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    {join[index] === true ? (
                      <View
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
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                      // onPress={() =>
                      //   data.starttime !== data.time &&
                      //   props.navigation.navigate('EditTest', {
                      //     test: subjects[index],
                      //   })
                      // }
                      >
                        <FontAwesome5
                          name="pen"
                          size={10}
                          color={COLORS.black}
                        />
                      </TouchableOpacity>
                    )}
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
      </ScrollView>
    </View>
  );
};

export default SubmittedTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignbooks: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
});
