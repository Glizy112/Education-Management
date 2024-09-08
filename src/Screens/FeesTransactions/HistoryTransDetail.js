import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';
import {DataTable, Avatar} from 'react-native-paper';
import {paraGray} from '../../theme/styles/Base';

const HistoryTransDetail = props => {
  const fees = [
    {
      id: '1',
      name: 'Vikash Yadav',
      mode: 'Offline',
      stream: 'FYBCOM',
      amount: '10000',
      date: '1/7/2021',
    },
    {
      id: '2',
      name: 'Vikash Gupta',
      mode: 'IntraEdu',
      stream: 'FYBMS',
      amount: '10000',
      date: '10/7/2021',
    },
    {
      id: '3',
      name: 'Ayush Dubey',
      mode: 'Offline',
      stream: '11th STD',
      amount: '10000',
      date: '15/7/2021',
    },
    {
      id: '4',
      name: 'Ayush Dubey',
      mode: 'IntraEdu',
      stream: '12th STD',
      amount: '10000',
      date: '20/7/2021',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName="History"
          marginLeft
          rightdownload
          onPresss={{}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingTop: 10, paddingBottom: 20}}>
          {fees.map((data, index) => (
            <View style={{flex: 1, paddingTop: 10}}>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: COLORS.background,
                  borderBottomWidth: 0.5,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    paraGray.darklarge,
                    {fontFamily: 'Montserrat-SemiBold'},
                  ]}>
                  {data.stream}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderBottomColor: COLORS.background,
                  borderBottomWidth: 0.5,
                  marginTop: 15,
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
                      Name
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Mode
                    </Text>
                  </DataTable.Title>
                  <DataTable.Title style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Amount
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
                      Date
                    </Text>
                  </DataTable.Title>
                </DataTable.Header>
              </DataTable>
              {fees.map((data, index) => (
                <DataTable>
                  <DataTable.Row style={{borderBottomWidth: 0}}>
                    <DataTable.Cell style={{flex: 1}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {data.name}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 1, justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {data.mode}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 1, justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {data.amount}
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
                        }}>
                        {data.date}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryTransDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignbooks: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
  },
  subtxt: {
    marginTop: 25,
    fontSize: 13,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: '6%',
  },
});
