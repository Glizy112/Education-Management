import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useFocusEffect} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../../../theme/Colors';
import {container, paraGray} from '../../../theme/styles/Base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Url from '../../../Config/Api/Url';
import {
  setShowModal,
  setuserId,
  setuserInfo,
  setuserName,
  setuserImage,
} from '../../../Redux/Actions/actions';

const MPINVerification = props => {
  const CELL_COUNT = 4;
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props1, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {userinfo, userid, username, showmodal, useremail, userimage} = useSelector(state => state.userReducer);

  // const dispatch = useDispatch();

  // const {userinfo, userid, username, showmodal, userimage} = useSelector(
  //   state => state.userReducer,
  // );
  useEffect(() => {
    StoreDatas();
  }, []);
  const StoreDatas = async () => {
    try {
      const user_Id = await AsyncStorage.getItem('user_id');
      const user_name = await AsyncStorage.getItem('user_name');
      const user_image = await AsyncStorage.getItem('user_image');
      dispatch(setuserId(user_Id));
      dispatch(setuserName(user_name));
      dispatch(setuserImage(user_image));
    } catch (error) {
      console.log('Catch' + error);
    }
  };

  const [enableMask, setEnableMask] = useState(true);

  useEffect(() => {
    setValue('');
  }, []);

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

  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? <Entypo name="dot-single" size={30} /> : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <View
        key={index}
        // darkShadowColor={props1.darkTheme ? "#070707" : "#97A7C3"} // <- set this
        // lightShadowColor={props1.darkTheme ? "#727272" : "white"}  // <- this
        // swapShadows
        // inner // <- enable inner shadow
        // useArt // <- set this prop to use non-native shadow on ios
        style={{
          borderRadius: 16,
          backgroundColor: COLORS.white,
          width: 56,
          height: 56,
          marginLeft: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.6,
          borderColor: COLORS.black,
          paddingTop: 4,
          // ...include most of View/Layout styles
        }}>
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell, paraGray.darklarge]}
          onLayout={getCellOnLayoutHandler(index)}>
          {/* {symbol || (isFocused ? <Cursor /> : null)} */}
          {textChild}
        </Text>
      </View>
    );
  };

  const VerifyPIN = async () => {
    setLoading(true);
    const PIN = await AsyncStorage.getItem('pin');
    if (value == '') {
      alert('Please Enter MPIN');
      setLoading(false);
    } else if (value.length != 4) {
      alert('MPIN Should be 4-digit');
      setLoading(false);
    } else if (value == PIN) {
      // alert('Login Successfully');
      dispatch(setShowModal(false));
      props.navigation.navigate('Bottomtabs');
      setLoading(false);
    } else {
      alert('InCorrect MPIN');
      setLoading(false);
    }
  };

  return (
    <View style={[container.container, {backgroundColor: COLORS.bgColor}]}>
      {loading == true && <Spinner visible={load} />}
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', marginTop: '25%'}}>
          <Text style={[paraGray.largebold, { fontSize: 30 }]}>MPIN Login</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 20,
            paddingHorizontal: 10,
          }}>
          <Avatar.Image
            style={{marginTop: 10, alignSelf: 'center'}}
            size={72}
            source={{uri: Url.profile_IMG + userimage}}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginBottom: 20,
            marginTop: 40,
          }}>
          <View
            style={{
              flex: 1,
              //paddingHorizontal: 15,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
              //borderWidth: 1,
              borderRadius: 12,
              backgroundColor: COLORS.white,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium', 
                fontSize: 18, 
                color: COLORS.secondary, 
                textAlign: 'center', 
                marginTop: 20
              }}
            > Enter Your MPIN </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 24,
                marginLeft: -16,
                borderWidth: 0
              }}>
              <CodeField
                autoFocus
                ref={ref}
                //{...props1}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                caretHidden={true}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                //rootStyle={{}}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 40,
              }}>
              <TouchableOpacity
                style={{
                  //flex: 1,
                  height: 56,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                  borderRadius: 12,
                  paddingHorizontal: 32,
                }}
                onPress={VerifyPIN}>
                <Text
                  style={[
                    paraGray.largeBoldLight,
                    { marginVertical: 10, marginHorizontal: 40, fontSize: 16 },
                  ]}>
                  Verify
                </Text>
                {/* <AntDesign
                  size={35}
                  name="arrowright"
                  color={COLORS.bg}
                  style={{marginHorizontal: 20, marginVertical: 10}}
                /> */}
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              style={{flex: 1, marginBottom: 20}}
              onPress={() => props.navigation.navigate('ForgetPIN')}>
              <Text
                style={[paraGray.darkpara, {textDecorationLine: 'underline'}]}>
                Forget MPIN?
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MPINVerification;

const styles = StyleSheet.create({
  cell: {
    color: 'black',
    textAlign: 'center',
    //borderBottomWidth: 1,
    width: '15%',
    marginTop: 10,
    marginBottom: 20,
  },
});
