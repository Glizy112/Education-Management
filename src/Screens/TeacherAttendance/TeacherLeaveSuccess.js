import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

const TeacherLeaveSuccess = props => {
  return (
    <View style={[container.container, {backgroundColor: '#FCFBFC'}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <AntDesign name="checkcircle" size={50} color={COLORS.green} />
          <Text
            style={[
              paraGray.darkpara,
              {
                marginTop: 10,
                fontFamily: 'Montserrat-SemiBold',
                paddingHorizontal: 5,
              },
            ]}>
            Congratulations your leave has submitted and waiting for approval
            from administration
          </Text>
          <FastImage
            source={require('../../../assets/examSuccess.gif')}
            style={{height: 350, width: 350}}
          />
        </View>
        <View style={{paddingHorizontal: 25, marginTop: 20, marginBottom: 60}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TeacherLeaveApply')}
            style={{flex: 1, alignSelf: 'center'}}>
            <Text style={[paraGray.parahome, {color: COLORS.bluee}]}>
              GO Back
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default TeacherLeaveSuccess;
