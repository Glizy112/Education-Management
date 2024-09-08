import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {List, Modal} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Url from '../../Config/Api/Url';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const HistoryDetailAnn = props => {
  const {notice} = props.route.params;
  const [showmodal, setShowModal] = useState(false);
  const [desc, setDesc] = useState(notice.notice);
  return (
    <View style={[container.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          {notice.image == null ? (
            <FastImage
              style={{
                height: deviceHeight / 2,
                width: deviceWidth / 1,
                alignSelf: 'center',
              }}
              source={require('../../../assets/nullimage.png')}
            />
          ) : (
            <FastImage
              source={{
                uri: Url.notice_IMG + notice.image,
              }}
              style={{
                height: deviceHeight / 2,
                width: deviceWidth / 1,
                alignSelf: 'center',
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 20,
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="clock-time-five-outline"
              size={20}
              color={COLORS.blue}
            />
            <Text
              style={[paraGray.darkpara, {color: COLORS.blue, marginLeft: 10}]}>
               {Moment(notice.created_at).format('d MMM')}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{marginTop: 5}}
            onPress={() => setShowModal(true)}>
            <ImageBackground
              style={{
                backgroundColor: COLORS.bg,
                justifyContent: 'center',
                alignItems: 'center',
                width: 35,
                height: 35,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: COLORS.background,
              }}>
              <FontAwesome5 name="pen" size={15} color={COLORS.black} />
            </ImageBackground>
          </TouchableOpacity> */}
        </View>
        <View style={{paddingHorizontal: 10, marginBottom: 10}}>
          <Text
            style={[
              paraGray.darklarge,
              {
                color: '#4F4F4F',
                paddingLeft: 5,
              },
            ]}>
            {notice.title}
          </Text>
          <Text style={[paraGray.darkpara]}>{notice.notice}</Text>
        </View>
      </ScrollView>
      {/* <Modal
        visible={showmodal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{
          width: '75%',
          height: 350,
          backgroundColor: COLORS.bg,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 5,
        }}>
        <AutoGrowingTextInput
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: 80,
            borderColor: '#D3D3D3',
            alignSelf: 'center',
            borderWidth: 1,
            marginTop: 20,
            borderRadius: 5,
            fontSize: 13,
            fontFamily: 'Montserrat-Regular',
          }}
          value={desc}
          onChangeText={value => setDesc(value)}
          placeholder="Reply"
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text
              style={[
                paraGray.whitepara,
                {
                  backgroundColor: COLORS.active,
                  paddingHorizontal: 40,
                  paddingVertical: 5,
                  borderRadius: 10,
                },
              ]}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
};
export default HistoryDetailAnn;
