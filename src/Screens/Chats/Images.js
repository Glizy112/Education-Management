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
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {btnStyles, container, paraGray} from '../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Url from '../../Config/Api/Url';
import {Header} from '../../Components/Header';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Images = props => {
  const {Images} = props.route.params;
  useEffect(() => {
    // console.log(Images);
  }, []);

  return (
    <View style={[container.container]}>
      <ImageBackground
        source={{uri: Url.gallery_IMG + Images.image}}
        style={{
          flex: 1,
          resizeMode: 'stretch',
          // alignSelf: 'center',
        }}>
        <View style={{paddingHorizontal: 15}}>
          <Header
            backgroundColor
            navigation={props.navigation}
            color={COLORS.bg}
            back
            headerFirstName={''}
            marginLeft
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default Images;
