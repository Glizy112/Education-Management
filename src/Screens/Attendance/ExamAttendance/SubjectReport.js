import React from 'react';
import {View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../theme/Colors';
import {Header} from '../../../Components/Header';
import {paraGray} from '../../../theme/styles/Base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DataTable, Avatar} from 'react-native-paper';

const SubjectReport = props => {
  const {classname} = props.route.params;

  const eventss = [
    {
      id: '1',
      name: 'Vikash Yadav',
      Date: '1/01/2023',
      stream: 'FY',
      eventname: 'kabbadi',
      present: 'Yes',
    },
    {
      id: '2',
      name: 'Vikash Gupta',
      Date: '1/01/2023',
      stream: 'SY',
      eventname: 'Cricket',
      present: 'Yes',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      Date: '1/01/2023',
      stream: 'TY',
      eventname: 'VolleyBall',
      present: 'No',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      Date: '1/01/2023',
      stream: 'TY',
      eventname: 'VolleyBall',
      present: 'Yes',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      Date: '1/01/2023',
      stream: 'TY',
      eventname: 'VolleyBall',
      present: 'No',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          headerFirstName={classname}
          marginLeft
          back
          rightdownload
          onPresss={() => {}}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[
                paraGray.darkpara,
                {fontFamily: 'Montserrat-SemiBold', marginTop: 20},
              ]}>
              Classroom No : 102
            </Text>
          </View>
          <View>
            <Text
              style={[
                paraGray.darkpara,
                {fontFamily: 'Montserrat-SemiBold', marginTop: 20},
              ]}>
              11(A)
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.section,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 5,
          }}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{flex: 1}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Date
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Student Name
              </Text>
            </DataTable.Title>
            <DataTable.Title
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Present
              </Text>
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        {eventss.map((events, index) => (
          <DataTable key={index}>
            <DataTable.Row style={{borderBottomWidth: 0}}>
              <DataTable.Cell style={{flex: 1}}>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                  {events.Date}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                  {events.name}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    color:
                      events.present == 'No' ? COLORS.red : COLORS.lightGreen,
                  }}>
                  {events.present}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
      </View>
    </View>
  );
};

export default SubjectReport;
