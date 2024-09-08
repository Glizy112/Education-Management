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
import {Dropdown} from 'react-native-element-dropdown';
import {paraGray} from '../../theme/styles/Base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Url from '../../Config/Api/Url';
import {COLORS} from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';

const BookDetail = props => {
  const {student} = props.route.params;
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [isbookFocus, setIsbookFocus] = useState(false);
  const [stream, setStream] = useState(null);
  const [selectedstream, setselectedStream] = useState(null);
  const [selectedbook, setselectedbook] = useState(null);
  const [book, setBook] = useState(null);
  const [getdata, setdata] = useState([]);
  const {userinfo, userid, username, showmodal, schoolid, teacherid} =
    useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getbookdata, setBookdata] = useState([]);
  const [getmemberid, setMemberId] = useState([]);
  const [getclassid, setClassId] = useState([]);
  const [getbookid, setBookId] = useState([]);
  const [returndate, setreturnDate] = useState(null);
  const [currentdate, setcurrentDate] = useState(null);

  useEffect(() => {
    CurrentDate();
  }, []);

  const CurrentDate = () => {
    var today = new Date();
    let date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    setcurrentDate(date);
    ReturnDate();
  };
  const ReturnDate = () => {
    var today = new Date();
    today.setDate(today.getDate() + 7);
    let date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    setreturnDate(date);
    getmember();
  };

  const getmember = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append('user_id', userid);
      formData.append('user_id', student.user_id);
      formData.append('school_id', student.school_id);
      let resp = await fetch(`${Url.list_member}`, {
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
          setMemberId(result.data[0].member_id);
          setLoading(false);
          getclassData();
        });
    } catch (error) {
      console.log('BookDetail getmember Error => ' + error);
      setLoading(false);
    }
  };

  const getclassData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', teacherid);

      let resp = await fetch(`${Url.get_all_class}`, {
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
          setdata(result.data);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('BookDetail getclassData Error => ' + error);
      setLoading(false);
    }
  };
  const getBookData = async item => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append('user_id', userid);
      formData.append('class_id', item.value);

      let resp = await fetch(`${Url.get_all_book}`, {
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
          // console.log("erroe",result);
          setClassId(result[0].class_id);
          setBookdata(result);
          // console.log('hi' + result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('BookDetail getBookData Error => ' + error);
      setLoading(false);
    }
  };
  const AssignBook = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('teacher_id', userid);
      formData.append('school_id', student.school_id);
      formData.append('library_member_id', getmemberid);
      formData.append('book_id', getbookid);
      formData.append('class_id', getclassid);
      formData.append('due_date', returndate);
      console.log('Send Data ==> ', formData);
      let resp = await fetch(`${Url.library_assign_book}`, {
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
          console.log(result);
          if (result.status == true) {
            props.navigation.navigate('AssignBook', {
              student: student,
              stream: selectedstream,
              book: selectedbook,
              currentdate: currentdate,
              returndate: returndate,
            });
          } else {
            alert('Retry');
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('BookDetail AssignBook Error => ' + error);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    CurrentDate();
  }, []);
  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
                style={{width: 42, height: 42, borderRadius: 50}}
                source={{uri: Url.student_IMG + student.photo}}
                backgroundColor={COLORS.black}
              />
            )}
          </View>
          <Text style={styles.txt}>
            Stream :<Text style={styles.datatxt}> {student.class_name}</Text>
          </Text>
          <Text style={styles.txt}>
            ID Card No :<Text style={styles.datatxt}> {student.card_no}</Text>
          </Text>
        </View>
        <View style={{marginTop: 15, paddingHorizontal: 20}}>
          <Text style={[paraGray.darkpara, {marginVertical: 10}]}>Stream</Text>
          <Dropdown
            style={{
              height: 50,
              borderColor: isstreamFocus ? 'blue' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 8,
            }}
            placeholderStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            selectedTextStyle={{
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
              fontFamily: 'Montserrat-Regular',
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={getdata.map(item => ({
              label: item.class_name,
              value: item.class_id,
            }))}
            search
            containerStyle={{
              backgroundColor: '#E5E5E5',
              borderColor: '#E5E5E5',
            }}
            fontFamily={'Montserrat-Regular'}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isstreamFocus ? 'Select Stream' : '...'}
            searchPlaceholder="Search..."
            value={stream}
            onFocus={() => setIsstreamFocus(true)}
            onBlur={() => setIsstreamFocus(false)}
            onChange={item => {
              // getsectionData(item);
              setselectedStream(item);
              setStream(item.value);
              setIsstreamFocus(false);
              getBookData(item);
            }}
          />
        </View>

        <View>
          <View style={{marginTop: 15, paddingHorizontal: 20}}>
            <Text style={[paraGray.darkpara, {marginVertical: 10}]}>
              Assign Book
            </Text>
            <Dropdown
              style={{
                height: 50,
                borderColor: isbookFocus ? 'blue' : 'gray',
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              placeholderStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              selectedTextStyle={{
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              inputSearchStyle={{
                height: 40,
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              data={getbookdata.map(item => ({
                label: item.title,
                value: item.title,
                book: item.book_id,
              }))}
              search
              containerStyle={{
                backgroundColor: '#E5E5E5',
                borderColor: '#E5E5E5',
              }}
              fontFamily={'Montserrat-Regular'}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isbookFocus ? 'Select Book' : '...'}
              searchPlaceholder="Search..."
              value={book}
              onFocus={() => setIsbookFocus(true)}
              onBlur={() => setIsbookFocus(false)}
              onChange={item => {
                setselectedbook(item);
                setBook(item.value);
                setIsbookFocus(false);
                setBookId(item.book);
              }}
            />
          </View>
        </View>
        {book != null && (
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#C4C4C4',
                width: '80%',
                height: 45,
                alignSelf: 'center',
                marginTop: 40,
                marginBottom: 20,
                justifyContent: 'center',
              }}
              onPress={AssignBook}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Assign Book
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BookDetail;

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
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  datatxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});
