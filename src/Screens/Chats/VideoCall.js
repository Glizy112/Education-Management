import React, {useState} from 'react';
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
} from 'react-native';
import {Avatar, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {btnStyles, container, paraGray} from '../../theme/styles/Base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
// import call from 'react-native-phone-call';

const VideoCall = props => {
  const [inputValue, setInputValue] = useState('9999999999');
  const {Notification} = props.route.params;

  // const triggerCall = () => {
  //   // Check for perfect 10 digit length
  //   if (inputValue.length != 10) {
  //     alert('Please insert correct contact number');
  //     return;
  //   }

  //   const args = {
  //     number: inputValue,
  //     prompt: true,
  //   };
  //   // Make a call
  //   call(args).catch(console.error);
  // };

  return (
    <ImageBackground
      style={{flex: 1, height: '100%', width: '100%'}}
      source={Notification.image}>
      <View>
        <View style={{paddingTop: '30%', alignItems: 'center'}}>
          <Avatar.Image size={150} source={Notification.image} />
          <Text
            style={[
              paraGray.darkpara,
              {fontSize: 22, color: '#181818', marginTop: 20},
            ]}>
            {Notification.name}
          </Text>
          <Text style={[paraGray.darkpara, {fontSize: 15, color: '#4F4F4F'}]}>
            Ringing...
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 120,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(236, 95, 95, 0.2)',
              height: 50,
              width: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 50,
            }}>
            <Entypo
              // style={}
              name="circle-with-cross"
              size={30}
              color={COLORS.red}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(45, 140, 255, 0.2)',
              height: 50,
              width: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}
            onPress={() =>
              props.navigation.navigate('PhoneCall', {
                Notification: Notification,
              })
            }>
            <FontAwesome5
              // style={}
              name="video"
              size={25}
              color={COLORS.blue}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default VideoCall;
