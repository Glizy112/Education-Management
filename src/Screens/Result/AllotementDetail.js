import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, RefreshControl, TextInput} from 'react-native';
import {Avatar} from 'react-native-paper';
import {Header} from '../../Components/Header';
import {COLORS} from '../../theme/Colors';
import {container, paraGray} from '../../theme/styles/Base';
import Spinner from 'react-native-loading-spinner-overlay';

const AllotementDetail = props => {
  const {Sem} = props.route.params;
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [updatemarks, setMarks] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);
  useEffect(() => {
    getAttendance_data();
  }, []);

  // const Update = value => {
  //   console.log(value);
  // };
  const getAttendance_data = () => {
    let list = [];
    Sem.results.map((value, index) => {
      var json_data = {
        marks: value.marks,
        grade: value.grade,
      };
      list.push(json_data);
    });
    setMarks(list);
    // console.log(updatemarks);
    // setLoading(false);
  };
  return (
    <View style={[container.container]}>
      <View style={{paddingHorizontal: 15, backgroundColor: COLORS.black}}>
        <Header
          backgroundColor
          navigation={props.navigation}
          color={COLORS.bg}
          back
          headerFirstName={Sem.name}
          marginLeft
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        {loading == true && <Spinner visible={load} />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{marginTop: 10, paddingBottom: 20}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                marginBottom: 5,
              }}>
              <Text
                style={[
                  paraGray.darkpara,
                  {fontFamily: 'Montserrat-SemiBold'},
                ]}>
                Student Name
              </Text>
              <Text
                style={[
                  paraGray.darkpara,
                  {fontFamily: 'Montserrat-SemiBold'},
                ]}>
                Marks Obtained
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderBottomColor: COLORS.background,
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />
            <View
              style={{
                marginTop: 10,
              }}>
              {Sem.results.map(
                (result, index) =>
                  updatemarks.length > 0 && (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {
                              color: COLORS.active,
                              marginLeft: 10,
                              marginTop: 10,
                            },
                          ]}>
                          {result.subname}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.lighterblue,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {color: COLORS.lighterblack, marginTop: 10},
                          ]}>
                          100
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: COLORS.lightinggreen,
                          alignItems: 'center',
                          // borderTopRightRadius: 10,
                          // borderBottomRightRadius: 10,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                          }}>
                          <TextInput
                            style={[
                              paraGray.darkpara,
                              {
                                color:
                                  updatemarks[index].marks == 'Absent'
                                    ? COLORS.red
                                    : COLORS.lighterblack,
                                fontFamily: 'Poppins-SemiBold',
                              },
                            ]}
                            value={updatemarks[index].marks}
                            onChangeText={value => {
                              let list = [...updatemarks];
                              var json_data = {
                                marks: value,
                                grade: updatemarks[index].grade,
                              };
                              list[index] = json_data;
                              setMarks(list);
                              // console.log('first', updatemarks);
                            }}
                          />
                          {updatemarks[index].marks !== 'Absent' && (
                            <View>
                              <Text
                                style={[
                                  paraGray.darklarge,
                                  {marginTop: 8, marginHorizontal: 5},
                                ]}>
                                -
                              </Text>
                            </View>
                          )}
                          {updatemarks[index].marks !== 'Absent' && (
                            <TextInput
                              style={[
                                paraGray.darkpara,
                                {
                                  color: COLORS.lighterblack,
                                  fontFamily: 'Poppins-SemiBold',
                                },
                              ]}
                              value={updatemarks[index].grade}
                              onChangeText={value => {
                                let list = [...updatemarks];
                                var json_data = {
                                  marks: updatemarks[index].marks,
                                  grade: value,
                                };
                                list[index] = json_data;
                                setMarks(list);
                                // console.log('first', updatemarks);
                              }}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  ),
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllotementDetail;
