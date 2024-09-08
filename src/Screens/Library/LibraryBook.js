import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Url from '../../Config/Api/Url';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import {paraGray} from '../../theme/styles/Base';
import {useFocusEffect} from '@react-navigation/native';
import {Header} from '../../Components/Header';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import Search from '../../Components/Search';

const LibraryBook = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [booksData, setBooksData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const {userinfo, userid, username, showmodal, schoolid} = useSelector(
    state => state.userReducer,
  );
  const [getdata, setData] = useState([]);
  const bookArray = [
    {
      id: 1,
      name: 'Vikas Gupta',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
    {
      id: 2,
      name: 'Student Name',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
    {
      id: 3,
      name: 'Student Name',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
    {
      id: 4,
      name: 'Student Name',
      bookname: 'Book Name',
      class: 'TYBCOM',
      date: '10/10/2021',
      number: '9082111479',
      assigneddate: '8/12/2010',
      submissiondate: '16/12/2010',
      ISBNno: '978-93-86758-51-4',
      code: 'Vikbcom2568',
      degree: 'Semester 2',
      publisher: 'Manan Prakashan',
      Author: 'Michael vaz, Madhu nair, Meeta seta',
      LateSubmission: '4 days',
      Penalty: '40 Rs',
      BookEdition: 'June 2018',
      Submittedon: '20/12/10',
      Peanalty: 'Settlement 50 RS online',
      Collectedby: 'Sheela yadav',
    },
  ];
  const array = [
    {
      id: 1,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
    {
      id: 2,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
    {
      id: 3,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
    {
      id: 4,
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'TYBCOM',
      pubname: 'Balbharti',
      degree: 'Semester 2',
      author: 'Vikash Gupta',
      IsbnNo: '978-93-86758-51-4',
      edition: 'June 2023',
      stock: '10 Books',
      available: '3 Books',
    },
  ];

  //----------Search filter-------------
  const KEYS_TO_FILTERS = ['name', 'class'];
  const [state, setState] = useState({searchTerm: ''});

  const booksFilter = array.filter(
    createFilter(state.searchTerm, KEYS_TO_FILTERS),
  );
  const searchUpdated = term => {
    setState({searchTerm: term});
  };

  useEffect(() => {
    getapiData();
  }, []);
  // --------APICall----------

  const getapiData = async () => {
    setRefreshing(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('school_id', schoolid);
      formData.append('teacher_id', userid);
      let resp = await fetch(`${Url.library_student_list}`, {
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
          setData(result.data);
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

  useFocusEffect(
    useCallback(() => {
      getapiData();
    }, []),
  );
  const height = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      {loading == true && <Spinner visible={load} />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View style={styles.search}>
          {/* <View
            style={{
              flexDirection: 'row',
              alignbooks: 'center',
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: 50,
              borderColor: '#D3D3D3',
              paddingHorizontal: 0,
              borderWidth: 2,
              marginTop: 15,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Search by Names./Stream"
              placeholderTextColor="#808080"
              onChangeText={term => {
                searchUpdated(term);
              }}
              style={{
                marginLeft: 2,
                marginTop: 2,
                backgroundColor: '#FFFFFF',
                width: '90%',
                height: 40,
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
              }}
            />
            <Feather
              style={{marginTop: 6}}
              name="search"
              size={29}
              color="#000000"
            />
          </View> */}
        {/* /</View> */}
        <Search
          getdata={array}
          KEYS_TO_FILTERS={KEYS_TO_FILTERS}
          filter={setSearchData}
        />
        <View style={{paddingBottom: 20, marginTop: 20}}>
          {searchData != null
            ? searchData.map((books, index) => (
                <View key={index} style={{width: '90%', alignSelf: 'center'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderWidth: 0.4,
                      borderColor: '#275CE0',
                      backgroundColor: '#EEF2FD',
                      alignItems: 'center',
                      borderRadius: 12,

                      paddingHorizontal: 12,
                      paddingVertical: 15,
                      marginBottom: 20,
                    }}
                    // onPress={() => {
                    //   props.navigation.navigate('LibraryBookDetail', {
                    //     student: array[index],
                    //   });
                    // }}
                    onPress={() => {
                      setBooksData(() => array[index]);
                      setShowModal(() => true);
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        {books.name}
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Montserrat-Regular',
                          marginTop: 5,
                        }}>
                        Book Code- {books.bookcode}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Montserrat-SemiBold',
                          textAlign: 'right',
                        }}>
                        {books.class}
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Montserrat-Regular',
                          marginTop: 5,
                          textAlign: 'right',
                        }}>
                        Name-{books.pubname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            : booksFilter.map((books, index) => (
                <View key={index} style={{width: '90%', alignSelf: 'center'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderWidth: 0.4,
                      borderColor: '#275CE0',
                      backgroundColor: '#EEF2FD',
                      alignItems: 'center',
                      borderRadius: 12,

                      paddingHorizontal: 12,
                      paddingVertical: 15,
                      marginBottom: 20,
                    }}
                    // onPress={() => {
                    //   props.navigation.navigate('LibraryBookDetail', {
                    //     student: array[index],
                    //   });
                    // }}
                    onPress={() => {
                      setBooksData(() => array[index]);
                      setShowModal(() => true);
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        {books.name}
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Montserrat-Regular',
                          marginTop: 5,
                        }}>
                        Book Code- {books.bookcode}
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Montserrat-SemiBold',
                          textAlign: 'right',
                        }}>
                        {books.class}
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: 'Montserrat-Regular',
                          marginTop: 5,
                          textAlign: 'right',
                        }}>
                        Name-{books.pubname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
        </View>
        {/* {getdata == '' && loading == false && (
          <View
            style={{
              flex: 1,
              marginBottom: 80,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 120,
            }}>
            <Text style={[paraGray.darklarge, {textAlign: 'center'}]}>
              NO Data Found
            </Text>
          </View>
        )} */}
      </ScrollView>
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="slideOutDown"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          //position: 'absolute',
          //bottom: 0,
        }}
        onBackdropPress={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            height: height / 1.1,
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',

              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={paraGray.largebold}>
                {booksData != null ? booksData.name : 'Book Name'}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <View showsVerticalScrollIndicator={false} style={{height: '82%'}}>
              <View style={{backgroundColor: COLORS.white}}>
                <View
                  style={{
                    marginTop: 15,
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: COLORS.primary,
                  }}>
                  {/* <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.txt}>Book Info</Text>
                    <TouchableOpacity
                      style={{
                        height: 30,
                        width: 30,
                        borderWidth: 1,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                        borderColor: COLORS.section,
                      }}>
                      <MaterialCommunityIcons
                        name="pencil"
                        color={COLORS.black}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View> */}
                  <View
                    style={{
                      flex: 1,

                      justifyContent: 'center',
                      //marginRight: 20,
                      alignItems: 'center',
                    }}>
                    {/* <View style={[paraGray.darkpara, styles.txt]}>
                      <Text
                        style={[
                          paraGray.largebold,
                          {textAlign: 'center', fontSize: 14},
                        ]}>
                        {booksData.name}
                      </Text>
                    </View> */}
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                      //   borderWidth: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        //marginTop: 10,
                        //marginVertical: 10,
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View>
                          <View style={{}}>
                            <Text
                              style={[
                                paraGray.darkpara,
                                styles.txt,
                                {marginTop: 0},
                              ]}>
                              Stream :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.class}
                            </Text>
                          </View>
                          <View>
                            <Text style={[paraGray.darkpara, styles.txt]}>
                              Degree :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.degree}
                            </Text>
                          </View>
                          <View>
                            <Text style={[paraGray.darkpara, styles.txt]}>
                              Publisher :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.pubname}
                            </Text>
                          </View>
                          <View>
                            <Text style={[paraGray.darkpara, styles.txt]}>
                              Author :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.author}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                          <View>
                            <Text
                              style={[
                                paraGray.darkpara,
                                styles.txt,
                                {marginTop: 0},
                              ]}>
                              Books Available :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.available}
                            </Text>
                          </View>
                          <View>
                            <Text style={[paraGray.darkpara, styles.txt]}>
                              Book code :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.bookcode}
                            </Text>
                          </View>
                          <View>
                            <Text style={[paraGray.darkpara, styles.txt]}>
                              Book Edition :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.edition}
                            </Text>
                          </View>
                          <View>
                            <Text style={[paraGray.darkpara, styles.txt]}>
                              Total Stock :
                            </Text>
                            <Text style={[paraGray.largebold, styles.dataTxt]}>
                              {booksData.stock}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{}}>
                      <Text style={[paraGray.darkpara, styles.txt]}>
                        ISBN no :
                      </Text>

                      <Text style={[paraGray.largebold, styles.dataTxt]}>
                        {booksData.IsbnNo}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.divline} />
                <View style={{marginTop: 30, marginBottom: 80}}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      // marginBottom: height / 6,
                      // paddingBottom: 20,
                      //   borderWidth: 1,
                      // ,
                      paddingTop: 20,

                      paddingBottom: 30,
                      height: '52%',
                    }}>
                    {bookArray.map((books, index) => (
                      <View
                        key={index}
                        style={{
                          width: '100%',
                          // marginBottom: 20,
                          paddingBottom: 5,
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderWidth: 0.4,
                            borderColor: '#275CE0',
                            backgroundColor: '#EEF2FD',
                            alignItems: 'center',
                            borderRadius: 12,
                            width: '100%',
                            alignSelf: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 15,
                            marginBottom: 20,
                          }}
                          //   onPress={() => {
                          //     props.navigation.navigate('LibraryBookDetail', {
                          //       student: array[index],
                          //     });
                          //   }}
                        >
                          <View>
                            <Text
                              style={{
                                color: '#000000',
                                fontSize: 15,
                                fontFamily: 'Montserrat-SemiBold',
                              }}>
                              {books.name}
                            </Text>
                            <Text
                              style={{
                                color: '#000000',
                                fontFamily: 'Montserrat-Regular',
                                marginTop: 5,
                              }}>
                              Book Code- {books.bookcode}
                            </Text>
                          </View>
                          <View style={{width: '60%'}}>
                            <Text
                              style={{
                                color: '#000000',
                                fontSize: 15,
                                fontFamily: 'Montserrat-SemiBold',
                                textAlign: 'right',
                              }}>
                              {books.class}
                            </Text>
                            <Text
                              style={{
                                color: '#000000',
                                fontFamily: 'Montserrat-Regular',
                                marginTop: 5,
                                textAlign: 'right',
                              }}>
                              Name-{books.pubname}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              width: '90%',
            }}>
            <Button title="Assign Book" styles={{width: '100%'}} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default LibraryBook;

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
  txt: {
    color: '#97A7C3',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'left',
  },
  dataTxt: {
    fontSize: 13,
    color: COLORS.black,
    marginTop: 4,
    textAlign: 'left',
  },
});
