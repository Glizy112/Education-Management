import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
// import SearchInput, { createFilter } from 'react-native-search-filter';
import {DataTable, Avatar} from 'react-native-paper';
import {COLORS} from '../../theme/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {paraGray} from '../../theme/styles/Base';
import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {Shadow} from 'react-native-shadow-2';
import Search from '../../Components/Search';
const Student = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userinfo, userid, username, showmodal, schoolid, reload} = useSelector(
    state => state.userReducer,
  );
  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['student_name', 'roll_no', 'class_name'];
  //const [search, setSearch] = useState('');
  const [getdata, setGetdata] = useState([]);
  const [studentfilter, setStudentFilter] = useState(null);

  //const studentfilter = getdata.filter(createFilter(search, KEYS_TO_FILTERS));
  // const searchUpdated = term => {
  //     setSearch(term);
  // };

  useEffect(() => {
    getapiData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );

  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.studentList}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => {
          // console.log('DATA' + JSON.stringify(response));
          return response.json();
        })
        .then(result => {
          // console.log(result);
          setGetdata(result.data);
          setStudentFilter(result.data);
          setLoading(false);
        });
    } catch (error) {
      console.log('Student List Error => ' + error);
      setLoading(false);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getapiData();
  }, []);

  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}
      <View style={{paddingTop: 12}}>
        <Search
          getdata={getdata}
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          filter={setStudentFilter}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingVertical: 12}}>
        <View style={{paddingHorizontal: 20, paddingVertical: 8}}>
          <Text style={[paraGray.largebold, {fontSize: 16}]}>
            {' '}
            Results ({studentfilter?.length}){' '}
          </Text>
        </View>
        {/* <View style={styles.search}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                            width: '100%',
                            height: 50,
                            borderColor: '#D3D3D3',
                            paddingHorizontal: 2,
                            borderWidth: 2,
                            marginTop: 15,
                            borderRadius: 10,
                        }}>
                        <TextInput
                            placeholder="Search by Names."
                            placeholderTextColor="#808080"
                            onChangeText={term => {
                                searchUpdated(term);
                            }}
                            style={{
                                marginLeft: 0,
                                backgroundColor: '#FFFFFF',
                                width: '90%',
                                height: 40,
                                fontSize: 12,
                                fontFamily: 'Montserrat-Regular',
                            }}
                        />
                        <Feather name="search" size={29} color="#000000" />
                    </View>
                </View> */}
        {studentfilter && studentfilter.length > 0
          ? studentfilter.map((student, index) => (
              <View style={{flex: 1}} key={index}>
                <TouchableOpacity
                  style={styles.userinfo}
                  key={index}
                  onPress={() =>
                    props.navigation.navigate('StudentProfile', {
                      studentdetail: studentfilter[index],
                    })
                  }>
                  <DataTable>
                    {/* <Shadow
                      distance={4}
                      style={{
                        width: '90%',
                        paddingVertical: 5,
                        borderRadius: 15,

                      }}> */}
                    <DataTable.Row
                      style={{paddingVertical: 5, borderBottomWidth: 0}}>
                      <DataTable.Cell>
                        {student.photo == '' ? (
                          <ImageBackground
                            style={{
                              backgroundColor: COLORS.black,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 45,
                              height: 45,
                              borderRadius: 30,
                            }}>
                            <FontAwesome5
                              name="user-alt"
                              size={25}
                              color="#FFFFFF"
                            />
                          </ImageBackground>
                        ) : (
                          <FastImage
                            style={{width: 50, height: 50, borderRadius: 50}}
                            source={{uri: Url.student_IMG + student.photo}}
                            backgroundColor={COLORS.black}
                          />
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell style={{flex: 3.5}}>
                        <View style={{}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                {color: COLORS.primary},
                              ]}>
                              Name-{' '}
                            </Text>
                            <Text
                              style={[
                                paraGray.largebold,
                                {fontSize: 14, color: COLORS.primary},
                              ]}>
                              {student.student_name}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', paddingTop: 4}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                {color: COLORS.primary},
                              ]}>
                              Class-{'  '}
                            </Text>
                            <Text
                              style={[
                                paraGray.largebold,
                                {fontSize: 14, color: COLORS.primary},
                              ]}>
                              {student.class_name}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', paddingTop: 4}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                {color: COLORS.primary},
                              ]}>
                              RollNo-{' '}
                            </Text>

                            <Text
                              style={[
                                paraGray.largebold,
                                {fontSize: 14, color: COLORS.primary},
                              ]}>
                              {student.roll_no}
                            </Text>
                          </View>
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                    {/* </Shadow> */}
                  </DataTable>
                </TouchableOpacity>
              </View>
            ))
          : getdata.map((student, index) => (
              <View style={{flex: 1}} key={index}>
                <TouchableOpacity
                  style={styles.userinfo}
                  key={index}
                  onPress={() =>
                    props.navigation.navigate('StudentProfile', {
                      studentdetail: studentfilter[index],
                    })
                  }>
                  <DataTable>
                    {/* <Shadow
                      distance={6}
                      style={{
                        width: '80%',
                        paddingVertical: 5,
                        borderRadius: 15,
                        backgroundColor: '#FFFFFF',
                      }}> */}
                    <DataTable.Row
                      style={{paddingVertical: 5, borderBottomWidth: 0}}>
                      <DataTable.Cell>
                        {student.photo == '' ? (
                          <ImageBackground
                            style={{
                              backgroundColor: COLORS.black,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 45,
                              height: 45,
                              borderRadius: 30,
                            }}>
                            <FontAwesome5
                              name="user-alt"
                              size={25}
                              color="#FFFFFF"
                            />
                          </ImageBackground>
                        ) : (
                          <FastImage
                            style={{width: 50, height: 50, borderRadius: 50}}
                            source={{uri: Url.student_IMG + student.photo}}
                            backgroundColor={COLORS.black}
                          />
                        )}
                      </DataTable.Cell>
                      <DataTable.Cell style={{flex: 3.5, borderWidth: 0}}>
                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                {color: COLORS.primary},
                              ]}>
                              Name-{' '}
                            </Text>
                            <Text
                              style={[
                                paraGray.largebold,
                                {fontSize: 14, color: COLORS.primary},
                              ]}>
                              {student.student_name}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                {color: COLORS.primary},
                              ]}>
                              Class-{'  '}
                            </Text>
                            <Text
                              style={[
                                paraGray.largebold,
                                {fontSize: 14, color: COLORS.primary},
                              ]}>
                              {student.class_name}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                {color: COLORS.primary},
                              ]}>
                              RollNo-{' '}
                            </Text>

                            <Text
                              style={[
                                paraGray.largebold,
                                {fontSize: 14, color: COLORS.primary},
                              ]}>
                              {student.roll_no}
                            </Text>
                          </View>
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                    {/* </Shadow> */}
                  </DataTable>
                </TouchableOpacity>
              </View>
            ))}
        {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              marginTop: 80,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )}
      </ScrollView>
      {loading == false && (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              height: 60,
              //width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary,
              borderRadius: 30,
              marginTop: 20,
              flexDirection: 'row',
              paddingHorizontal: 16,
              elevation: 4,
            }}
            onPress={() => props.navigation.navigate('Info')}>
            <Feather name="plus" size={30} color="white" />
            {/* <Text style={[paraGray.largebold, {fontSize: 14, color: COLORS.white}]}> Create Event </Text> */}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Student;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  search: {
    // height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#E4E4E4',
    paddingBottom: 4,
  },
  userinfo: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    //marginBottom: 5,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.secondary,
    borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    //elevation: .5,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: (color, fontFamily, fontSize) => ({
    flexDirection: 'row',
    color: color, // <-- The magic
    textAlign: 'left', // <-- The magic
    fontFamily: fontFamily ? fontFamily : 'Montserrat-SemiBold',
    fontSize: fontSize ? fontSize : 12,
    lineHeight: 18,
  }),
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    color: '#000000',
  },
  centeredView: {
    // flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '30%',
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});
