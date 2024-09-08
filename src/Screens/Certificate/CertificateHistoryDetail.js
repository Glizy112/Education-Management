import React from 'react';
import {dataIndexAttribute} from 'react-horizontal-scrolling-menu/dist/types/constants';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {DataTable, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
const CertificateHistoryDetail = props => {
  const {events} = props.route.params;

  const students = [
    {
      id: '1',
      name: 'Vikash Yadav',
      totaltime: '1hr',
      stream: 'FY',
      eventname: 'kabbadi',
      rank: '1st',
    },
    {
      id: '2',
      name: 'Vikash Gupta',
      totaltime: '45min',
      stream: 'SY',
      eventname: 'Cricket',
      rank: '2nd',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      totaltime: '50min',
      stream: 'TY',
      eventname: 'VolleyBall',
      rank: '3rd',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      totaltime: '50min',
      stream: 'TY',
      eventname: 'VolleyBall',
      rank: 'participated',
    },
  ];
  const rankHolders = (RankNumber, studentName, Stream) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#97A7C3',
        }}>
        <View
          style={{
            width: 64,
            //padding: 12,
            height: 64,
            backgroundColor: '#F3D33F',
            borderRadius: 50,
            //alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[paraGray.largebold, {fontSize: 16}]}>{RankNumber}</Text>
          <Text style={[paraGray.darkpara, {fontSize: 14}]}>Rank</Text>
        </View>

        <View style={{marginLeft: 10}}>
          <Text style={paraGray.darkpara}>Student Name</Text>
          <Text style={[paraGray.darkpara, {marginTop: 6}]}>
            Stream-{Stream}
          </Text>
        </View>
      </View>
    );
  };
  const Participants = (RankNumber, studentName, Stream) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
          borderBottomWidth: 1,
          paddingBottom: 10,

          borderBottomColor: '#97A7C3',
        }}>
        <View
          style={{
            width: 64,
            //padding: 12,
            height: 64,
            backgroundColor: '#EEF2FD',
            borderRadius: 50,
            //alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome name="user" size={25} color={'black'} />
        </View>

        <View style={{marginLeft: 10}}>
          <Text style={paraGray.darkpara}>Student Name</Text>
          <Text style={[paraGray.darkpara, {marginTop: 6}]}>
            Stream-{Stream}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-between',

          paddingHorizontal: 10,
          borderBottomColor: '#275CE0',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            onPress={() =>
              //   props.navigation.navigate('StudentEdit', {
              //     studentdetail: studentdetail,
              //   })
              props.navigation.goBack()
            }>
            <Ionicons
              style={{marginVertical: 5, paddingHorizontal: 7}}
              name="arrow-back"
              size={20}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
          }}>
          <Text style={[paraGray.largebold, {color: 'black'}]}>
            Event Title
          </Text>
        </View>
      </View>
      {/* <ScrollView>
        <View>
          <Text style={styles.subtxt}>{events.eventname}</Text>
        </View>
        <View>
          <Text style={styles.txt}>
            Date:
            <Text style={styles.datatxt}>{events.date}</Text>
          </Text>
          <Text style={styles.txt}>
            Day:
            <Text style={styles.datatxt}>{events.day}</Text>
          </Text>
        </View>
        <View style={styles.divline} />
        <DataTable>
          <DataTable.Header
            style={{marginTop: 10, borderBottomWidth: 0, marginBottom: -10}}>
            <DataTable.Title>
              <Text style={styles.tabletxt}>Events</Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 1.3}}>
              <Text style={styles.tabletxt}>Students</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tabletxt}>Stream</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.tabletxt}>rank No</Text>
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        {students.map((student, index) => (
          <DataTable key={index}>
            <DataTable.Row style={{borderBottomWidth: 0}}>
              <DataTable.Cell style={{flex: 1.2}}>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                  {student.eventname}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1.8, padding: 0}}>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                  {student.name}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat-Regular'}}>
                  {student.stream}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 1.2}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                  }}>
                  {student.rank}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
      </ScrollView> */}
      <ScrollView>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={[paraGray.largebold, {fontSize: 16, marginTop: 30}]}>
            Event Details
          </Text>
          <View
            style={{
              //paddingHorizontal: 10,
              // width: '90%',
              paddingHorizontal: 15,
              paddingBottom: 10,
              borderRadius: 10,
              marginTop: 15,
              backgroundColor: '#EEF2FD',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5
                  name="calendar-minus"
                  size={22}
                  color={COLORS.primary}
                />

                <Text
                  style={[paraGray.largebold, {fontSize: 12, marginLeft: 6}]}>
                  09-01-2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{}}>
                  <Text
                    style={[
                      paraGray.darkpara,
                      {
                        fontSize: 12,
                        color: 'rgba(0, 0, 0, 0.60)',
                        textAlign: 'center',
                      },
                    ]}>
                    Tuesday
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={[
                  paraGray.darkpara,
                  {marginTop: 10, textAlign: 'justify'},
                ]}>
                This is the event description which is to be passed on from the
                card on the main screen under the history section in
                Certificates module.
              </Text>
            </View>
          </View>
          <View>
            <View style={{marginTop: 40}}>
              <Text style={[paraGray.largebold, {fontSize: 16}]}>
                Event Results
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={[paraGray.darkpara, {fontSize: 14}]}>
                Rank Holders
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                borderBottomWidth: 1,
                paddingBottom: 10,
                borderBottomColor: '#97A7C3',
              }}>
              <View
                style={{
                  width: 64,
                  //padding: 12,
                  height: 64,
                  backgroundColor: '#F3D33F',
                  borderRadius: 50,
                  //alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[paraGray.largebold, {fontSize: 16}]}>1st</Text>
                <Text style={[paraGray.darkpara, {fontSize: 14}]}>Rank</Text>
              </View>

              <View style={{marginLeft: 10}}>
                <Text style={paraGray.darkpara}>Student Name</Text>
                <Text style={paraGray.darkpara}>Stream-Fy</Text>
              </View>
            </View> */}
            {rankHolders('1st', 'studentName', 'Fy')}
            {rankHolders('2st', 'studentName', 'Fy')}
            {rankHolders('3st', 'studentName', 'Fy')}
          </View>
          <View>
            <View style={{marginTop: 40}}>
              <Text style={[paraGray.darkpara, {fontSize: 14}]}>
                Participants
              </Text>
            </View>

            {Participants('1st', 'studentName', 'Fy')}
            {Participants('2nd', 'studentName', 'Fy')}
            {Participants('3rd', 'studentName', 'Fy')}
            <Text
              style={[
                paraGray.largebold,
                {fontSize: 14, textAlign: 'right', marginVertical: 30},
              ]}>
              ViewAll
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CertificateHistoryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: '6%',
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },

  txt: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  txtbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50,
    borderColor: '#D3D3D3',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
  },
  formtxt: {
    marginTop: 25,
    paddingHorizontal: 20,
    marginBottom: -10,
    color: '#000000',
  },
  datatxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    // fontSize: 18,
  },
  stlabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  stlabeltext: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    paddingHorizontal: 10,
  },
  sttext: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    paddingHorizontal: 15,
  },
  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
  },
  tabletxt: {
    // fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
});
