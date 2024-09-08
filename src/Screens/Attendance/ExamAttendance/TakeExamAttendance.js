import React from 'react';
import {View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../theme/Colors';
import {Header} from '../../../Components/Header';
import {paraGray} from '../../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TakeExamAttendance = props => {
  const {classnumber} = props.route.params;
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName={'Classroom No : ' + classnumber}
          marginLeft
          back
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
        <Image
          style={{height: 250, resizeMode: 'contain'}}
          source={require('../../../../assets/classroom.png')}
        />
        <Text
          style={[
            paraGray.darkpara,
            {fontFamily: 'Montserrat-SemiBold', marginTop: 20},
          ]}>
          Scan QR Code to take Exam attendance
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.black,
            borderRadius: 30,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                paraGray.darkpara,
                {
                  fontFamily: 'Montserrat-SemiBold',
                  color: COLORS.white,
                  marginRight: 5,
                },
              ]}>
              Scan Code
            </Text>
            <MaterialIcons
              name="qr-code-scanner"
              size={22}
              color={COLORS.white}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: '95%',
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.section,
            alignSelf: 'center',
            marginVertical: 20,
          }}
        />
      </View>
    </View>
  );
};

export default TakeExamAttendance;
