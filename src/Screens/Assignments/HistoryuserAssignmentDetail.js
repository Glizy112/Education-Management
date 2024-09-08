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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../theme/Colors';
import { paraGray } from '../../theme/styles/Base';
import { Header } from '../../Components/Header';
import Moment from 'moment';

const HistoryuserAssignmentDetail = props => {
  const { userdetail, assignmentdetail } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { userinfo, userid, username, showmodal, schoolid } = useSelector(
    state => state.userReducer,
  );
  const [getdata, setGetdata] = useState([]);


  const updatestatus = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('submission_id', userdetail.id);
      formData.append('student_id', userdetail.student_id);
      formData.append('submit_status', 1);
      let resp = await fetch(`${Url.updateStudentSubmissionStatusBySubmissionId}`, {
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
          if (result.status == true) {
            // console.log(result);
            props.navigation.goBack();
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('Assign Error => ' + error);
      setLoading(false);
    }
  };

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
          headerFirstName={userdetail.student_name}
          marginLeft
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.bg,
                borderRadius: 20,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: COLORS.active,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text style={[paraGray.darkpara, { color: COLORS.active }]}>
                  {assignmentdetail.subject_name}
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
                    {assignmentdetail.class_name}
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
                    Submitted Date
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.section, marginLeft: 5 },
                    ]}>
                    {Moment(userdetail.submitted_at).format('d/MM/YY')}
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
                    Submitted Timing
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.section, marginLeft: 5 },
                    ]}>
                    {Moment(userdetail.submitted_at).format('hh:mm a')}
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
                    Last Submission Date
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.section, marginLeft: 5 },
                    ]}>
                    {assignmentdetail.deadline}
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
                    Topic
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.section, marginLeft: 5 },
                    ]}>
                    {assignmentdetail.note}
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
                    Student Name
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.section, marginLeft: 5 },
                    ]}>
                    {userdetail.student_name}
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
                    {assignmentdetail.mode}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      { color: COLORS.lightblack, marginLeft: 5 },
                    ]}>
                    Assigment
                  </Text>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        color: COLORS.tablebackground,
                        marginLeft: 5,
                      },
                    ]}>
                    Download
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryuserAssignmentDetail;

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
