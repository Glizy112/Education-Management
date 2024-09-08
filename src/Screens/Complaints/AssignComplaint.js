import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {paraGray} from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Url from '../../Config/Api/Url';
import {COLORS} from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import FastImage from 'react-native-fast-image';

const AssignComplaint = props => {
  const {student} = props.route.params;
  const [getdata, setdata] = useState([]);
  const {userinfo, userid, username, showmodal, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentdate, setcurrentDate] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // --------APICall----------

  const Complaint = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);
      // formData.append('role_id', roleid);
      formData.append('class_id', student.class_id);
      formData.append('student_id', student.user_id);
      // formData.append('type_id', roleid);
      formData.append('title', title);
      formData.append('description', desc);
      // console.log('send data==>', formData);
      let resp = await fetch(`${Url.complain_by_teacher}`, {
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
            alert('Successfull');
            props.navigation.navigate('CreateComplaint');
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('CreateEvent Error => ' + error);
      alert('Retry');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 15}}>
          <Text style={[styles.txt, {fontSize: 15}]}>Student Info</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 20,
              alignItems: 'flex-end',
            }}>
            <Text style={styles.txt}>
              Name :<Text style={styles.datatxt}> {student.student_name}</Text>
            </Text>
            {student.photo == null ? (
              <ImageBackground
                style={{
                  backgroundColor: COLORS.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                }}>
                <FontAwesome5 name="user-alt" size={25} color="#FFFFFF" />
              </ImageBackground>
            ) : (
              <FastImage
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: Url.student_IMG + student.photo}}
                backgroundColor={COLORS.black}
              />
            )}
          </View>
          <Text style={styles.txt}>
            Stream :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
        </View>
        <View style={{marginTop: 15, paddingHorizontal: 20}}>
          <Text style={styles.formtxt}>Event Title:</Text>
          <View style={styles.txtbox}>
            <TextInput
              placeholder="ENTER TITLE"
              placeholderTextColor="#808080"
              value={title}
              onChangeText={value => setTitle(value)}
              style={{
                marginLeft: 0,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
          </View>
          <Text style={styles.formtxt}>Add Description:</Text>
          <AutoGrowingTextInput
            style={styles.txtboxDesc}
            placeholder={'Add Description'}
            value={desc}
            onChangeText={value => setDesc(value)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#000000',
              width: '80%',
              height: 50,
              borderColor: '#000000',
              alignSelf: 'center',
              borderWidth: 2,
              marginTop: 40,
              marginBottom: 20,
              borderRadius: 15,
              justifyContent: 'center',
            }}
            onPress={() => Complaint()}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Complaint
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AssignComplaint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    width: '100%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  txtboxDesc: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 80,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  formtxt: {
    marginTop: 10,
    marginBottom: -10,
    color: '#000000',
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
  datatxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});
