import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from '../../theme/Colors';
import {btnStyles, container, paraGray} from '../../theme/styles/Base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import {
  setuserInfo,
  setAge,
  setuserId,
  setuserName,
} from '../../Redux/Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Url from '../../Config/Api/Url';
import {colors} from '@material-ui/core';

const SignIn = props => {
  const dispatch = useDispatch();
  const {userinfo} = useSelector(state => state.userReducer);
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [eye, eyeShow] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    if (username == '' || password == '') {
      props.navigation.navigate('CreateMPIN');
      //alert('Please Enter Email and Password');
      setLoading(false);
    } else {
      const formData = new FormData();
      formData.append('username', username.replace(/\s+/g, ''));
      formData.append('password', password.replace(/\s+/g, ''));
      let resp = await fetch(`${Url.login}`, {
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
            console.log(result.data.teacher_data[0].other_info)
            let userinfo = result.data.teacher_data[0];
            dispatch(setuserInfo(userinfo));
            // dispatch(setuserName(username.e_name));
            AsyncStorage.setItem(
              'user_id',
              result.data.teacher_data[0].user_id,
            );
            AsyncStorage.setItem(
              'teacher_id',
              result.data.teacher_data[0].teacher_id,
            );
            AsyncStorage.setItem(
              'academic_year_id',
              result.data.teacher_data[0].academic_year_id,
            );
            AsyncStorage.setItem('user_name', result.data.teacher_data[0].name);
            AsyncStorage.setItem(
              'school_id',
              result.data.teacher_data[0].school_id,
            );
            AsyncStorage.setItem(
              'user_email',
              result.data.teacher_data[0].email,
            );

            AsyncStorage.setItem(
              'user_image',
              result.data.teacher_data[0].photo,
            );
            AsyncStorage.setItem('dob', result.data.teacher_data[0].dob);
            AsyncStorage.setItem(
              'present_address',
              result.data.teacher_data[0].present_address,
            );
            AsyncStorage.setItem('phone', result.data.teacher_data[0].phone);
            AsyncStorage.setItem('other_info', result.data.teacher_data[0].other_info);
            AsyncStorage.setItem('role_id', result.data.login_auth.role_id);

            // dispatch(setuserName(username));
            // console.log('userID =>' + JSON.stringify(result.data.teacher_data[0].id));
            setLoading(false);
            // alert(result.message);
            setuserName('');
            setPassword('');
            props.navigation.navigate('CreateMPIN');
          } else {
            alert('Please enter Valid Email and Password');
            setLoading(false);
          }
        })
        .catch(err => {
          console.log('Error Reading data' + err);
          alert('Server Error');
          setLoading(false);
        });
    }
  };

  useFocusEffect(
    useCallback(() => {
      // dispatch(setShowModal(false));
      // console.log("Home => "+username)
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={[container.container, {backgroundColor: COLORS.white}]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{justifyContent: 'flex-end'}}>
        <StatusBar backgroundColor={'whitesmoke'} barStyle={'dark-content'} />
        <View style={{alignItems: 'flex-start', marginTop: 32}}>
          <Text style={[paraGray.parahome, {color: COLORS.black, paddingHorizontal: 14}]}>Welcome Back!</Text>
          <Text style={[paraGray.largebold, {color: COLORS.primary, marginTop: 8, paddingHorizontal: 12}]}> Login to Continue </Text>
        </View>
        <View style={{alignItems: 'flex-end', borderWidth: 0, marginTop: 24}}>
          <Image
            style={{height: 200, width: 320}}
            resizeMode={'contain'}
            source={require('../../../assets/onboard2.png')}
          />
        </View>
        {/* <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={[paraGray.darkpara, {color: COLORS.bg}]}>
            Login with following options
          </Text>
        </View> */}
        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginRight: 20,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: COLORS.bg,
              elevation: 3,
            }}>
            <AntDesign
              style={{marginVertical: 16}}
              name="google"
              size={30}
              color={COLORS.bg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: COLORS.bg,
              elevation: 3,
            }}>
            <Image
              style={{height: 55, width: 45, marginVertical: 5}}
              source={require('../../../assets/Pincode.png')}
            />
          </TouchableOpacity>
        </View> */}
        <KeyboardAvoidingView showsVerticalScrollIndicator={false}>
          <View 
            style={{
              flex: 1,
              marginTop: 48,
              //flexDirection: 'row',
              //alignItems: 'center',
              //backgroundColor: '#FFFFFF',
              //width: '90%',
              //height: 64,
              //borderRadius: 13,
              //marginHorizontal: 15,
              paddingHorizontal: 16,
              //borderWidth: 1
              //elevation: 8
            }}
          >
            <Text style={[paraGray.largebold, {fontSize: 16}]}> Username </Text>
            <TextInput
              placeholder="e.g. John Doe"
              placeholderTextColor={COLORS.txtGray}
              textAlignVertical={'center'}
              value={username}
              onChangeText={value => setuserName(value)}
              style={{
                flex: 1,
                height: 56,
                paddingHorizontal: 16,
                marginHorizontal: 4,
                marginTop: 15,
                marginBottom: 20,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: COLORS.primary,
                //elevation: 2,
                fontSize: 16,
                fontFamily: 'Montserrat-Medium',
                //backgroundColor: COLORS.bgColor,
                color: COLORS.black,
              }}
            />
            <View style={{borderWidth: 0, paddingHorizontal: 4}}>
              <Text style={[paraGray.largebold, {fontSize: 16}]}> Password </Text>
              <View 
                style={{
                  width: '100%',
                  height: 56, 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'space-between', 
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                  marginTop: 15,
                  marginBottom: 12,
                }}
              >
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#B9BCC5"
                  textAlignVertical={'center'}
                  value={password}
                  onChangeText={value => setPassword(value)}
                  secureTextEntry={eye == false ? true : false}
                  style={{
                    //flex: 1,
                    width: '80%',
                    //paddingHorizontal: 16,
                    marginLeft: 12,
                    //elevation: 2,
                    fontSize: 16,
                    fontFamily: 'Montserrat-Medium',
                    //backgroundColor: COLORS.bgColor,
                    color: COLORS.black,
                  }}
                />
                <TouchableOpacity
                  style={{
                    //zIndex: 999,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    //marginRight: 10,
                  }}
                  onPress={() => eyeShow(!eye)}>
                  {eye == false ? (
                    <AntDesign name="eye" size={26} color={COLORS.primary} />
                  ) : (
                    <AntDesign name="eyeo" size={26} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => props.navigation.navigate('ForgetPassword')}>
              <Text
                style={[
                  //paraGray.darkpara,
                  {
                    alignSelf: 'flex-end',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Medium',
                    color: COLORS.black,
                    paddingHorizontal: 10,
                  },
                ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={{marginTop: 32, marginBottom: 10, paddingHorizontal: 20}}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 56,
              //alignSelf: 'center',
              //alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
              borderRadius: 12,
              //elevation: 2,
            }}
            // onPress={() => props.navigation.navigate('CheckMPIN')}
            onPress={onLogin}>
            <Text
              style={[
                paraGray.largebold,
                {
                  textAlign: 'center',
                  color: COLORS.white,
                  //marginHorizontal: 70,
                  marginVertical: 5,
                  fontSize: 16,
                },
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
            marginTop: 12,
          }}>
          <Text style={[paraGray.darkpara, {fontSize: 14}]}>
            By login, I accept the {''}
          </Text>
          <Text
            style={[
              paraGray.darkpara,
              {fontSize: 14, color: COLORS.green},
            ]}>
            Terms & Conditions
          </Text>
        </View>

        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              marginRight: 20,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1
              //backgroundColor: COLORS.primary,
              //elevation: 4,
            }}>
            <AntDesign
              style={{marginVertical: 16}}
              name="google"
              size={30}
              color={COLORS.red}
            />
            <Text style={[paraGray.largebold, {fontSize: 16}]}> Signin </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1
              //backgroundColor: COLORS.primary,
              //elevation: 4,
            }}>
            <Image
              style={{height: 55, width: 45, marginVertical: 5}}
              source={require('../../../assets/Pincode.png')}
            />
          </TouchableOpacity>
        </View> */}
        {/* <View
        style={{
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={[paraGray.whitepara]}>Don’t have an account?</Text>
          <Text style={[paraGray.whitepara, {color: COLORS.red}]}>
            {' '}
            Sign up
          </Text>
        </TouchableOpacity>
      </View> */}
      </ScrollView>
    </View>
  );
};

export default SignIn;
