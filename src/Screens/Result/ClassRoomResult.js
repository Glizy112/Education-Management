import React, { useState, useEffect } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import { useSelector } from 'react-redux';
import { paraGray } from '../../theme/styles/Base';

const ClassRoomResult = props => {
  const { teacherid, userid, schoolid } = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getdata, setdata] = useState([]);
  const [teacherdata, setTeacherdata] = useState([]);


  useEffect(() => {
    getapiData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      // console.log('DATA' + JSON.stringify(formData));
      let resp = await fetch(`${Url.getExamTerm}`, {
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
          setdata(result.data);
          setTeacherdata(result.teacher_details);
          setLoading(false);
        });
    } catch (error) {
      console.log('ClassRoom Result Sems Error => ' + error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {getdata.map((sem, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ClassResult', { Sem: getdata[index], teacherdata: teacherdata });
              }}>
              <View style={styles.arrow}>
                <Text style={styles.headerText}>{sem.title}</Text>
                <FontAwesome name="angle-right" size={25} color="#000000" />
              </View>
            </TouchableOpacity>
            <View style={styles.divline} />
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
      </ScrollView>
    </View>
  );
};

export default ClassRoomResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  content: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#D3D3D3',
    padding: 10,
  },

  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
