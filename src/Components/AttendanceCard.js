import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {paraGray} from '../theme/styles/Base';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../theme/Colors';

const AttendanceCard = ({data, status}) => {
  const flashStatus = (title, styles, fill) => {
    console.log(title);
    return (
      <View
        style={
          styles
            ? [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.black,
                  borderRadius: 10,
                  //justifyContent: 'center',
                  // alignSelf: 'flex-end',
                  padding: 6,
                  backgroundColor: 'rgba(0, 0, 0, 0.10)',
                },
                styles,
              ]
            : {
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLORS.black,
                borderRadius: 10,
                //justifyContent: 'center',
                // alignSelf: 'flex-end',
                padding: 6,
                backgroundColor: 'rgba(0, 0, 0, 0.10)',
              }
        }>
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 15,
            backgroundColor: fill ? fill : COLORS.black,
          }}
        />
        <Text
          style={[
            paraGray.largeBoldLight,
            {color: COLORS.black, fontSize: 12, marginLeft: 4},
          ]}>
          {title}
        </Text>
      </View>
    );
  };
  return (
    <View>
      {status == 'Present' ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: COLORS.bgColor,
                width: '90%',
                alignSelf: 'center',

                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,

                marginBottom: 15,
                borderLeftWidth: 5,
                borderColor: 'rgba(11, 172, 0, 0.50)',
                paddingVertical: 10,
                //height: 128,
              }}>
              {/* <View
                  style={{
                    height: '95%',

                    width: 4,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    backgroundColor: COLORS.green,
                  }}></View> */}
              <View
                style={{
                  alignSelf: 'center',

                  width: '90%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    // alignSelf: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                    borderBottomColor: '#97A7C380',
                    //borderWidth: 1,
                    //width: '70%',
                  }}>
                  <View>
                    <Text style={[paraGray.largebold, {fontSize: 16}]}>
                      Dec 14,2023
                    </Text>
                  </View>
                  {flashStatus(
                    'On Time',
                    {
                      backgroundColor: 'rgba(11, 172, 0, 0.10)',
                      borderColor: 'rgba(11, 172, 0, 0.50)',
                    },
                    '#0BAC00',
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 14, opacity: 0.5},
                        ]}>
                        Check In
                      </Text>
                      <Text style={[paraGray.largebold, {fontSize: 12}]}>
                        8:00 AM
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 14, opacity: 0.5},
                        ]}>
                        Check Out
                      </Text>
                      <Text style={[paraGray.largebold, {fontSize: 12}]}>
                        3:00 PM
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        paraGray.largebold,
                        {fontSize: 14, opacity: 0.5},
                      ]}>
                      Total Time
                    </Text>
                    <Text
                      style={[
                        paraGray.largebold,
                        {fontSize: 12, textAlign: 'right'},
                      ]}>
                      7 hours
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : status == 'Absent' ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: COLORS.bgColor,
                width: '90%',
                alignSelf: 'center',

                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                marginBottom: 15,
                borderLeftWidth: 5,
                borderColor: 'rgba(233, 32, 32, 0.50)',
                paddingVertical: 10,
                //height: 128,
              }}>
              {/* <View
                style={{
                  height: '95%',

                  width: 4,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  backgroundColor: COLORS.green,
                }}></View> */}
              <View
                style={{
                  alignSelf: 'center',

                  width: '90%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    // alignSelf: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                    borderBottomColor: '#97A7C380',
                    //borderWidth: 1,
                    //width: '70%',
                  }}>
                  <View>
                    <Text style={[paraGray.largebold, {fontSize: 16}]}>
                      Dec 14,2023
                    </Text>
                  </View>
                  {flashStatus(
                    'Absent',
                    {
                      backgroundColor: 'rgba(233, 32, 32, 0.10)',
                      borderColor: 'rgba(233, 32, 32, 0.50)',
                    },
                    '#E92020',
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 14, opacity: 0.5},
                        ]}>
                        Check In
                      </Text>
                      <Text style={[paraGray.largebold, {fontSize: 12}]}>
                        None
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          paraGray.largebold,
                          {fontSize: 14, opacity: 0.5},
                        ]}>
                        Check Out
                      </Text>
                      <Text style={[paraGray.largebold, {fontSize: 12}]}>
                        None
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        paraGray.largebold,
                        {fontSize: 14, opacity: 0.5},
                      ]}>
                      Total Time
                    </Text>
                    <Text
                      style={[
                        paraGray.largebold,
                        {fontSize: 12, textAlign: 'right'},
                      ]}>
                      0 hours
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: COLORS.bgColor,
                width: '90%',
                alignSelf: 'center',

                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                marginBottom: 15,
                borderLeftWidth: 5,
                borderColor: 'rgba(0, 0, 0, 0.50)',
                paddingVertical: 10,
                //height: 128,
              }}>
              {/* <View
              style={{
                height: '95%',

                width: 4,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: COLORS.green,
              }}></View> */}
              <View
                style={{
                  alignSelf: 'center',

                  width: '90%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    // alignSelf: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                    borderBottomColor: '#97A7C380',
                    //borderWidth: 1,
                    //width: '70%',
                  }}>
                  <View>
                    <Text style={[paraGray.largebold, {fontSize: 16}]}>
                      Dec 14,2023 - Dec 17,2023
                    </Text>
                  </View>
                  {flashStatus('On Leave')}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <View style={{width: '60%'}}>
                    <Text
                      style={[
                        paraGray.largebold,
                        {fontSize: 14, opacity: 0.5},
                      ]}>
                      Reason for Leave
                    </Text>
                    <Text style={[paraGray.largebold, {fontSize: 12}]}>
                      Falling sick for two days.
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        paraGray.largebold,
                        {fontSize: 14, opacity: 0.5},
                      ]}>
                      Total Time
                    </Text>
                    <Text
                      style={[
                        paraGray.largebold,
                        {fontSize: 12, textAlign: 'right'},
                      ]}>
                      7 hours
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AttendanceCard;
