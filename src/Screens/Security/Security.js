import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Avatar, Switch} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {btnStyles, container, paraGray} from '../../theme/styles/Base';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from '../../Config/Api/Url';
import {useFocusEffect} from '@react-navigation/native';
import {setIsSwitchOn} from '../../Redux/Actions/actions';

const Security = props => {
  const dispatch = useDispatch();
  const {userinfo, userid, username, userimage, isSwitchOn} = useSelector(
    state => state.userReducer,
  );
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    ToggleCheck();
  }, []);
  const ToggleCheck = async () => {
    const Toggle = await AsyncStorage.getItem('toggle');
    if (Toggle == null) {
      dispatch(setIsSwitchOn(false));
    } else {
      dispatch(setIsSwitchOn(true));
    }
    setRefreshing(false);
  };
  const onToggleSwitch = async () =>
    dispatch(
      setIsSwitchOn(
        !isSwitchOn,
        isSwitchOn != false
          ? props.navigation.navigate('MPINDisable')
          : (dispatch(setIsSwitchOn(true)),
            // AsyncStorage.setItem('toggle', 'true'),
            props.navigation.navigate('CreateMPIN')),
      ),
    );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    ToggleCheck();
  }, []);

  return (
    <View style={container.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{paddingHorizontal: 15}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {userimage == null ? (
              <Avatar.Image
                size={50}
                source={require('../../../assets/user.jpg')}
              />
            ) : (
              <Avatar.Image
                size={50}
                source={{uri: Url.profile_IMG + userimage}}
              />
            )}
            <Text
              style={[
                paraGray.darkpara,
                {
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 10,
                  alignSelf: 'center',
                  fontSize: 14,
                },
              ]}>
              {username}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            borderBottomWidth: 1,
            marginBottom: 20,
          }}
        />
        <Text style={[paraGray.darkpara, {color: '#ADADAD'}]}>
          Security Settings
        </Text>
        <TouchableOpacity
          onPress={() => {
            isSwitchOn != false
              ? props.navigation.navigate('ChangeMPIN')
              : props.navigation.navigate('CreateMPIN');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              borderWidth: 0.5,
              borderColor: COLORS.black,
              backgroundColor: COLORS.skypurple,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}>
              <Text style={[paraGray.parahome, {fontSize: 15}]}>
                Use your 4-digit IntraEdu PIN
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name="user-friends"
                  size={20}
                  color={COLORS.bluee}
                />
                <Text
                  style={[
                    paraGray.darkpara,
                    {
                      color: COLORS.lightblack,
                      fontSize: 12,
                      marginLeft: 5,
                      paddingRight: 15,
                    },
                  ]}>
                  User your IntraEdu PIN so only you can open your account and
                  use application
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="network-strength-3"
                  size={20}
                  color={COLORS.bluee}
                />
                <Text
                  style={[
                    paraGray.darkpara,
                    {color: COLORS.lightblack, fontSize: 12, marginLeft: 10},
                  ]}>
                  Needs internet connection
                </Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                color={COLORS.darkblue}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Security;
