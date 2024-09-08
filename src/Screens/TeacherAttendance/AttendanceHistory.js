import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Button from '../../Components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/Colors';
import AttendanceCard from '../../Components/AttendanceCard';
import {paraGray} from '../../theme/styles/Base';

const AttendanceHistory = () => {
  const [status, setStatus] = useState('Present');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-between',

          width: '90%',
          alignSelf: 'center',
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            onPress={() => props.navigation.goBack()}>
            <Ionicons
              style={{marginVertical: 5}}
              name="arrow-back"
              size={25}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>

        {/* Centered Text */}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[paraGray.largebold]}>Attendance History</Text>
        </View>
      </View>

      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginLeft: 10, marginRight: 20}}
              onPress={() => setStatus('Present')}>
              <Button
                styles={{
                  width: '100%',
                  borderRadius: 45,
                  paddingHorizontal: 30,
                  marginHorizontal: 10,
                  paddingVertical: 14,
                  // paddingVertical: 1,
                  //height: 47,
                  backgroundColor:
                    status == 'Present' ? COLORS.primary : '#97A7C3',
                }}
                title="My Present"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => setStatus('Absent')}>
              <Button
                styles={{
                  width: '100%',
                  borderRadius: 45,
                  paddingHorizontal: 30,
                  marginHorizontal: 10,
                  paddingVertical: 14,
                  backgroundColor: status == 'Absent' ? '#E92020' : '#97A7C3',

                  // paddingVertical: 1,
                  //height: 47,
                }}
                title="My Absents"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStatus('Leave')}>
              <Button
                styles={{
                  width: '100%',
                  borderRadius: 45,
                  paddingHorizontal: 30,
                  marginHorizontal: 10,
                  paddingVertical: 14,
                  backgroundColor: status == 'Leave' ? COLORS.black : '#97A7C3',
                  // paddingVertical: 1,
                  //height: 47,
                }}
                title="My Leaves"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AttendanceCard data={[{}, {}, {}]} status={status} />
      </ScrollView>
    </View>
  );
};

export default AttendanceHistory;
