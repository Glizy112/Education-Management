import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  //Button,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Linking,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem} from '@rneui/themed';
import DropDown from '../../Components/DropDown';
import Button from '../../Components/Button';
import DocumentPicker from 'react-native-document-picker';
import {Avatar, Snackbar} from 'react-native-paper';
import {container, paraGray} from '../../theme/styles/Base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../theme/Colors';
import Url from '../../Config/Api/Url';
import {ApiMethod} from '../../Config/Api/ApiMethod';
import Spinner from 'react-native-loading-spinner-overlay';
import FieldInputs from '../../Components/FieldInputs';
const Library = props => {
  const [filterhistory, setFilterHistory] = useState([
    {
      name: 'Akhil',
      class: 'Fifth',
      subject: 'science',
      from: '2023-4-28',

      submitted_on: '4th Sep 2010',
      penalty: 'forgive',
    },
    {
      name: 'SSS',
      class: 'Fifth',
      subject: 'science',
      from: '2023-4-28',

      submitted_on: '4th Sep 2010',
      penalty: 'forgive',
    },
    {
      name: 'Ak',
      class: 'Fifth',
      subject: 'science',
      from: '2023-4-28',

      submitted_on: '4th Sep 2010',
      penalty: 'forgive',
    },
  ]);
  const [booksFilter, setBooksFilter] = useState([
    {
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'Commerce',
      pubname: 'Balbharti',
    },
    {
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'Commerce',
      pubname: 'Balbharti',
    },
    {
      name: 'Mathematics',
      bookcode: 'Vikmath2575',
      class: 'Commerce',
      pubname: 'Balbharti',
    },
  ]);
  const [expandedTakeAttendace, setExpandedTakeAttendace] =
    React.useState(false);
  const [expandedAttendaceHistory, setExpandedAttendaceHistory] =
    React.useState(false);
  const [expandedReports, setExpandedReports] = React.useState(false);
  const [Collection, setCollection] = React.useState(false);
  const [openAttendanceClass, setOpenAttendanceClass] = useState(false);
  const [openAttendanceSection, setOpenAttendanceSection] = useState(false);
  const [openAttendanceSubject, setOpenAttendanceSubject] = useState(false);
  const [valueAttendanceClass, setValueAttendanceClass] = useState(null);
  const [valueAttendanceSection, setValueAttendanceSection] = useState(null);
  const [valueAttendanceSubject, setValueAttendanceSubject] = useState(null);

  const [itemsAttendanceClass, setItemsAttendanceClass] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [itemsAttendanceSection, setItemsAttendanceSection] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [ItemsAttendanceSubject, setItemsAttendanceSubject] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);
  const [showModal, setShowModal] = useState(false);
  // Modal Bulk Add Books

  const [file, setFile] = useState('');
  const [excelname, setExcelname] = useState();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [stream, setStream] = useState();
  const [isstreamFocus, setIsstreamFocus] = useState(false);
  const [getdata, setdata] = useState([]);
  const [getsampledata, setSampledata] = useState('');
  const {teacherid, schoolid, userid} = useSelector(state => state.userReducer);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '9th', value: '9th'},
    {label: '10th', value: '10th'},
    {label: '11th', value: '11th'},
    {label: '12th', value: '12th'},
  ]);

  useEffect(() => {
    getclassData();
    getsampleData();
  }, []);

  const getclassData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('teacher_id', teacherid);
    await ApiMethod(Url.get_all_class, formData).then(result => {
      // console.log("Class Result Response==> ", result);
      if (result != false) {
        setdata(result.data);
      }
      setLoading(false);
    });
  };
  const getsampleData = async () => {
    setLoading(true);
    const formData = new FormData();
    await ApiMethod(Url.download_sample_excel).then(result => {
      // console.log("Result Response==> ", result);
      if (result != false) {
        setSampledata(result.data);
      }
      setLoading(false);
    });
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.xlsx],
      }).then(res => {
        setFile(res);
        setExcelname(res[0].name);
      });
      // console.log("Selected File ===>",
      //   JSON.stringify(file),
      //   // res.type, // mime type
      //   // res.name,
      //   // res.size,
      // )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const removeItem = index => {
    setFile(file.filter((o, i) => index !== i));
  };

  const handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('Invalid Link');
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const uploadbooks = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('school_id', schoolid);
    formData.append('class_id', stream);
    formData.append('teacher_id', teacherid);
    formData.append('upload_file', {
      name: file[0].name,
      uri: file[0].uri,
      type: file[0].type,
    });
    console.log('Send Data==> ', JSON.stringify(formData));
    await ApiMethod(Url.addBulkBook, formData).then(result => {
      console.log('Add Bulk Book Response==> ', JSON.stringify(result));
      if (result != false) {
        if (result.status == true) {
          props.navigation.goBack();
          setLoading(false);
        } else {
          alert('Retry');
          setLoading(false);
        }
        // setdata(result.data)
      }
      setLoading(false);
    });
  };
  const height = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Assign');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Assign</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Collection');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Collection</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('HistoryLib');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>History</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('LibraryBook');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Library Books</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('AddBook');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Add Books</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('DownloadReport');
        }}>
        <View style={styles.arrow}>
          <Text style={styles.headerText}>Download Report</Text>
          <FontAwesome name="angle-right" size={25} color="#000000" />
        </View>
      </TouchableOpacity>
      <View style={styles.divline} /> */}
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          //   refreshControl={
          //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   }
        >
          {/* <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          // onPress={() => {
          //   props.navigation.navigate('AttendancePtm');
          // }}
          style={{
            backgroundColor: '#275CE0',
            borderWidth: 1,
            //height: 80,
            paddingVertical: 20,
            alignIt: 'center',
          }}>
          <View style={styles.arrow}>
            <Text style={[paraGray.parahome, {fontSize: 16, color: 'white'}]}>
              Take Attendance
            </Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('HistoryAtten');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>History</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ReportAtten');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Report</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // alert("Feature Coming Soon")
            props.navigation.navigate('ExamAttendance');
          }}>
          <View style={styles.arrow}>
            <Text style={styles.headerText}>Exam Attendance</Text>
            <FontAwesome name="angle-right" size={25} color="#000000" />
          </View>
        </TouchableOpacity>
      </View> */}
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
              <Text
                style={[paraGray.largebold, {fontSize: 16, color: 'black'}]}>
                Library
              </Text>
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center', marginTop: 25}}>
            <ListItem.Accordion
              containerStyle={{
                backgroundColor: '#EEF2FD',
                borderWidth: 0.4,
                borderColor: '#275CE0',
                //height: 80,
                paddingVertical: 20,
                borderRadius: 16,
                marginBottom: 25,
              }}
              content={
                <ListItem.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons
                        name="checkmark-circle"
                        size={36}
                        color={'#275CE0'}
                      />
                      <View style={{marginLeft: 20}}>
                        <Text style={[paraGray.parahome, {fontSize: 16}]}>
                          Assign
                        </Text>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                          ]}>
                          Class and subject wise attendance
                        </Text>
                      </View>
                    </View>
                  </View>
                </ListItem.Content>
              }
              icon={
                <View
                  style={{
                    backgroundColor: 'rgba(39, 92, 224, 0.15)',
                    borderRadius: 50,
                    alignItems: 'center',
                    alignSelf: 'center',
                    // width: 32,
                    // height: 32,
                    padding: 3,
                  }}>
                  <Ionicons name="chevron-down" size={20} color={'black'} />
                </View>
              }
              isExpanded={expandedTakeAttendace}
              onPress={() => {
                setExpandedTakeAttendace(!expandedTakeAttendace);
              }}>
              <ScrollView>
                <ListItem>
                  <ListItem.Content style={{}}>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <View style={{flex: 1, paddingRight: 10}}>
                        <Text
                          style={[
                            paraGray.header,
                            {color: 'black', fontSize: 14},
                          ]}>
                          Class
                        </Text>
                        <DropDown
                          open={openAttendanceClass}
                          value={valueAttendanceClass}
                          items={itemsAttendanceClass}
                          setOpen={setOpenAttendanceClass}
                          setValue={setValueAttendanceClass}
                          setItems={setItemsAttendanceClass}
                          style={{borderWidth: 1}}
                          containerStyle={{width: '100%'}}
                        />
                      </View>
                      <View style={{flex: 1, paddingLeft: 10}}>
                        <Text
                          style={[
                            paraGray.header,
                            {color: 'black', fontSize: 14},
                          ]}>
                          Section
                        </Text>
                        <DropDown
                          open={openAttendanceSection}
                          value={valueAttendanceSection}
                          items={itemsAttendanceSection}
                          setOpen={setOpenAttendanceSection}
                          setValue={setValueAttendanceSection}
                          setItems={setItemsAttendanceSection}
                          containerStyle={{width: '100%'}}
                        />
                      </View>
                    </View>
                    {/* <View style={{width: '100%', marginTop: 10}}>
                      <Text
                        style={[
                          paraGray.header,
                          {color: 'black', fontSize: 14},
                        ]}>
                        Subject
                      </Text>
                      <DropDown
                        open={openAttendanceSubject}
                        value={valueAttendanceSubject}
                        items={ItemsAttendanceSubject}
                        setOpen={setOpenAttendanceSubject}
                        setValue={setValueAttendanceSubject}
                        setItems={setItemsAttendanceSubject}
                        containerStyle={{width: '100%'}}
                      />
                    </View> */}
                    <TouchableOpacity
                      style={{width: '100%'}}
                      onPress={() => props.navigation.navigate('Assign')}>
                      <Button
                        title="Show Student "
                        styles={{
                          width: '100%',

                          paddingVertical: 15,
                        }}
                      />
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              </ScrollView>
            </ListItem.Accordion>
            <ListItem.Accordion
              containerStyle={{
                backgroundColor: '#EEF2FD',
                borderWidth: 0.4,
                borderColor: '#275CE0',
                //height: 80,
                paddingVertical: 20,
                borderRadius: 16,
                marginBottom: 25,
              }}
              content={
                <ListItem.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="documents" size={36} color={'#275CE0'} />
                      <View style={{marginLeft: 20}}>
                        <Text style={[paraGray.parahome, {fontSize: 16}]}>
                          Collection
                        </Text>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                          ]}>
                          Class and subject wise attendance
                        </Text>
                      </View>
                    </View>
                  </View>
                </ListItem.Content>
              }
              icon={
                <View
                  style={{
                    backgroundColor: 'rgba(39, 92, 224, 0.15)',
                    borderRadius: 50,
                    alignItems: 'center',
                    alignSelf: 'center',
                    // width: 32,
                    // height: 32,
                    padding: 3,
                  }}>
                  <Ionicons name="chevron-down" size={20} color={'black'} />
                </View>
              }
              isExpanded={Collection}
              onPress={() => {
                setCollection(!Collection);
              }}>
              <ScrollView>
                <ListItem.Content style={{}}>
                  <View style={{}}>
                    {booksFilter.map((books, index) => (
                      <View
                        key={index}
                        style={{width: '90%', alignSelf: 'center'}}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderWidth: 0.4,
                            borderColor: '#275CE0',
                            backgroundColor: '#EEF2FD',
                            alignItems: 'center',
                            borderRadius: 12,
                            width: '90%',
                            paddingHorizontal: 12,
                            paddingVertical: 15,
                            marginBottom: 20,
                          }}
                          onPress={() => {
                            props.navigation.navigate('LibraryBookDetail', {
                              student: array[index],
                            });
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
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginBottom: 50,
                      }}
                      onPress={() => props.navigation.navigate('Collection')}>
                      <Text style={[paraGray.darkpara, {fontSize: 15}]}>
                        View More
                      </Text>
                      <Ionicons
                        name="chevron-forward"
                        size={15}
                        color={'black'}
                        style={{marginTop: 2}}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() => props.navigation.navigate('Collection')}>
                    <Button
                      title="Collection "
                      styles={{
                        width: '100%',

                        paddingVertical: 15,
                      }}
                    />
                  </TouchableOpacity> */}
                </ListItem.Content>
              </ScrollView>
            </ListItem.Accordion>
            <ListItem.Accordion
              containerStyle={{
                backgroundColor: '#EEF2FD',
                borderWidth: 0.4,
                borderColor: '#275CE0',
                //height: 80,
                paddingVertical: 20,
                borderRadius: 16,
                marginBottom: 25,
              }}
              content={
                <ListItem.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AntDesign
                        name="clockcircle"
                        size={36}
                        color={'#275CE0'}
                      />
                      <View style={{marginLeft: 20}}>
                        <Text style={[paraGray.parahome, {fontSize: 16}]}>
                          History
                        </Text>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                          ]}>
                          Class, subject and student wise monthly history
                        </Text>
                      </View>
                    </View>
                  </View>
                </ListItem.Content>
              }
              icon={
                <View
                  style={{
                    backgroundColor: 'rgba(39, 92, 224, 0.15)',
                    borderRadius: 50,
                    alignItems: 'center',
                    alignSelf: 'center',
                    // width: 32,
                    // height: 32,
                    padding: 3,
                  }}>
                  <Ionicons name="chevron-down" size={20} color={'black'} />
                </View>
              }
              isExpanded={expandedAttendaceHistory}
              onPress={() => {
                setExpandedAttendaceHistory(!expandedAttendaceHistory);
              }}>
              <ListItem.Content>
                {console.log(filterhistory)}
                {filterhistory?.map((history, index) => (
                  <View
                    key={index}
                    style={{
                      width: '100%',

                      alignSelf: 'center',
                      marginHorizontal: 15,
                    }}>
                    <TouchableOpacity
                      style={{
                        // flex: 1,
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        borderWidth: 0.6,
                        borderColor: COLORS.primary,
                        marginBottom: 15,

                        width: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',

                          marginTop: 10,
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        <Text style={[paraGray.largebold, {fontSize: 16}]}>
                          {history.name}
                        </Text>
                        <View style={{width: '80%'}}>
                          <Text
                            style={[
                              paraGray.largebold,
                              {fontSize: 16, textAlign: 'right'},
                            ]}>
                            {history.class}
                          </Text>
                        </View>
                        <View></View>
                        <View>
                          {/* <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('EditEvent', {
                                eventdata: getdata[index],
                              })
                            }>
                            <View
                              style={{
                                backgroundColor: COLORS.bg,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: COLORS.background,
                              }}>
                              <FontAwesome5
                                name="pen"
                                size={12}
                                color={COLORS.black}
                              />
                            </View>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                      <View style={{}}>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {
                              color: COLORS.section,
                            },
                          ]}>
                          {history.subject}
                        </Text>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {
                              color: COLORS.section,
                            },
                          ]}>
                          {history.from}
                        </Text>
                      </View>
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 5,
                        }}>
                        <Text
                          style={[paraGray.darkpara, {color: COLORS.section}]}>
                          {history.event_from} to {history.event_to}
                        </Text>
                      </View> */}
                      <View
                        style={{
                          flex: 1,
                          borderBottomColor: COLORS.background,
                          borderBottomWidth: 1,
                          marginTop: 10,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'space-between',
                          marginBottom: 15,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {color: COLORS.lightblack},
                            ]}>
                            Submited On
                          </Text>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {color: COLORS.section},
                            ]}>
                            {history.submitted_on}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {color: COLORS.lightblack},
                            ]}>
                            Penalty
                          </Text>
                          <Text
                            style={[
                              paraGray.darkpara,
                              {
                                color: COLORS.section,
                              },
                            ]}>
                            {history.penalty}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: 50,
                    width: '100%',
                  }}
                  onPress={() => props.navigation.navigate('HistoryLib')}>
                  <Text style={[paraGray.darkpara, {fontSize: 15}]}>
                    View More
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={15}
                    color={'black'}
                    style={{marginTop: 2}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => props.navigation.navigate('HistoryLib')}>
                  <Button
                    title="View More "
                    styles={{
                      width: '100%',

                      paddingVertical: 15,
                    }}
                  />
                </TouchableOpacity> */}
              </ListItem.Content>
            </ListItem.Accordion>
            <ListItem.Accordion
              containerStyle={{
                backgroundColor: '#EEF2FD',
                borderWidth: 0.4,
                borderColor: '#275CE0',
                //height: 80,
                paddingVertical: 20,
                borderRadius: 16,
                marginBottom: 25,
              }}
              content={
                <ListItem.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicons name="clipboard" size={36} color={'#275CE0'} />
                      <View style={{marginLeft: 20}}>
                        <Text style={[paraGray.parahome, {fontSize: 16}]}>
                          Library Books
                        </Text>
                        <Text
                          style={[
                            paraGray.darkpara,
                            {fontSize: 11, marginTop: 5, fontStyle: 'italic'},
                          ]}>
                          Class, subject and type wise monthly report
                        </Text>
                      </View>
                    </View>
                  </View>
                </ListItem.Content>
              }
              icon={
                <View
                  style={{
                    backgroundColor: 'rgba(39, 92, 224, 0.15)',
                    borderRadius: 50,
                    alignItems: 'center',
                    alignSelf: 'center',
                    // width: 32,
                    // height: 32,
                    padding: 3,
                  }}>
                  <Ionicons name="chevron-down" size={20} color={'black'} />
                </View>
              }
              isExpanded={expandedReports}
              onPress={() => {
                setExpandedReports(!expandedReports);
              }}>
              <ListItem.Content>
                <View style={{}}>
                  {booksFilter.map((books, index) => (
                    <View
                      key={index}
                      style={{width: '90%', alignSelf: 'center'}}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderWidth: 0.4,
                          borderColor: '#275CE0',
                          backgroundColor: '#EEF2FD',
                          alignItems: 'center',
                          borderRadius: 12,
                          width: '90%',
                          paddingHorizontal: 12,
                          paddingVertical: 15,
                          marginBottom: 20,
                        }}
                        onPress={() => {
                          props.navigation.navigate('LibraryBookDetail', {
                            student: array[index],
                          });
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
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: 50,
                    width: '100%',
                  }}
                  onPress={() => props.navigation.navigate('LibraryBook')}>
                  <Text style={[paraGray.darkpara, {fontSize: 15}]}>
                    View More
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={15}
                    color={'black'}
                    style={{marginTop: 2}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => props.navigation.navigate('LibraryBook')}>
                  <Button
                    title="Check Books "
                    styles={{
                      width: '100%',

                      paddingVertical: 15,
                    }}
                  />
                </TouchableOpacity> */}
              </ListItem.Content>
            </ListItem.Accordion>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#275CE0',
                width: '100%',
                alignSelf: 'center',
                borderRadius: 10,
                height: 80,
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignSelf: 'center',
                }}
                onPress={() => props.navigation.navigate('AddNewBook')}>
                <View>
                  <Text style={[paraGray.parahome, {fontSize: 14}]}>
                    Add Books
                  </Text>
                  <View style={{marginTop: 5}}>
                    <Text tyle={paraGray.darkpara}>
                      View the attendance report for a recent examination
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#275CE0',
                width: '100%',
                alignSelf: 'center',
                borderRadius: 10,
                height: 80,
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignSelf: 'center',
                }}
                //onPress={() => props.navigation.navigate('AddBulkBook')}
                onPress={() => setShowModal(() => true)}>
                <View>
                  <Text style={[paraGray.parahome, {fontSize: 14}]}>
                    Bulk Add Books
                  </Text>
                  <View style={{marginTop: 5}}>
                    <Text tyle={paraGray.darkpara}>
                      View the attendance report for a recent examination
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name="arrow-forward" size={20} color={'#275CE0'} />
                </View>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
          style={{
            backgroundColor: '#EEF2FD',
            borderWidth: 0.4,
            borderColor: '#275CE0',
            //height: 80,
            paddingVertical: 20,
            borderRadius: 16,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name="clock" size={25} color={'#275CE0'} />
              <View style={{marginLeft: 10}}>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>
                  Attendance History
                </Text>
                <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                  Class, subject and student wise monthly history
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(39, 92, 224, 0.15)',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                // width: 32,
                // height: 32,
                padding: 3,
              }}>
              <Ionicons name="chevron-down" size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#EEF2FD',
            borderWidth: 0.4,
            borderColor: '#275CE0',
            //height: 80,
            paddingVertical: 20,
            borderRadius: 16,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="checkmark-circle" size={25} color={'#275CE0'} />
              <View style={{marginLeft: 10}}>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>Reports</Text>
                <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                  Class, subject and type wise monthly report
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(39, 92, 224, 0.15)',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                // width: 32,
                // height: 32,
                padding: 3,
              }}>
              <Ionicons name="chevron-down" size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#EEF2FD',
            borderWidth: 0.4,
            borderColor: '#275CE0',
            //height: 80,
            paddingVertical: 20,
            borderRadius: 16,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="checkmark-circle" size={25} color={'#275CE0'} />
              <View style={{marginLeft: 10}}>
                <Text style={[paraGray.parahome, {fontSize: 16}]}>
                  Exam Attendance
                </Text>
                <Text style={[paraGray.darkpara, {fontSize: 11}]}>
                  Take attendance for particular exam(s)
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(39, 92, 224, 0.15)',
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center',
                // width: 32,
                // height: 32,
                padding: 3,
              }}>
              <Ionicons name="chevron-down" size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity> */}
          </View>

          {/* <View style={styles.divline} /> */}
        </ScrollView>
      </View>
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
            height: height / 1.6,
            borderRadius: 12,
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              //width: '100%',
              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={paraGray.largebold}>Add Books</Text>
              <TouchableOpacity onPress={() => setShowModal(() => false)}>
                <Ionicons name="close-sharp" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <View style={[{paddingHorizontal: 0, justifyContent: 'center'}]}>
              {loading == true && <Spinner visible={load} />}
              <View
                style={{
                  marginBottom: 20,
                  marginTop: 10,

                  //          width: '100%',
                }}>
                <Text
                  style={[paraGray.parahome, {fontSize: 12, marginBottom: 5}]}>
                  Stream :
                </Text>
                {/* <DropDown
                  style={{
                    height: 50,
                    borderColor: isstreamFocus ? 'blue' : 'gray',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                  }}
                  placeholderStyle={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                  }}
                  inputSearchStyle={{
                    height: 40,
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                  }}
                  iconStyle={{
                    width: 20,
                    height: 20,
                  }}
                  data={getdata.map(item => ({
                    label: item.class_name,
                    value: item.class_id,
                  }))}
                  search
                  containerStyle={{
                    backgroundColor: '#E5E5E5',
                    borderColor: '#E5E5E5',
                  }}
                  fontFamily={'Montserrat-Regular'}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isstreamFocus ? 'Select Stream' : '...'}
                  searchPlaceholder="Search..."
                  value={stream}
                  onFocus={() => setIsstreamFocus(true)}
                  onBlur={() => setIsstreamFocus(false)}
                  onChange={item => {
                    setStream(item.value);
                    setIsstreamFocus(false);
                  }}
                /> */}
                <DropDown
                  open={open}
                  value={value}
                  items={getdata.map(item => ({
                    label: item.class_name,
                    value: item.class_id,
                  }))}
                  setItems={setItems}
                  setOpen={setOpen}
                  setValue={setValue}
                  onSelectItem={item => {
                    setStream(item.value);
                    setIsstreamFocus(false);
                  }}
                />
              </View>
              <Text
                style={[paraGray.parahome, {fontSize: 12, marginBottom: 5}]}>
                Upload Excel :
              </Text>
              <TouchableOpacity onPress={() => selectFile()}>
                <TextInput
                  placeholder="Select Books Excel"
                  placeholderTextColor="#808080"
                  editable={false}
                  style={{
                    //height: 40,
                    paddingVertical: 7,
                    paddingHorizontal: 10,
                    fontSize: 12,
                    borderWidth: 0.6,
                    borderColor: COLORS.primary,
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.black,
                    borderRadius: 12,
                  }}>
                  {excelname}
                </TextInput>
              </TouchableOpacity>
              <View>
                {/* <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: COLORS.primary,
                    width: '90%',
                    height: 45,
                    //borderColor: COLORS.lightbackground,
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 20,
                    borderRadius: 30,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (file != '') {
                      uploadbooks();
                    } else {
                      alert('Please select books excel file');
                    }
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    Add Books
                  </Text>
                </TouchableOpacity> */}
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#0BAC00',
                    width: '65%',
                    height: 45,
                    borderColor: COLORS.lightbackground,
                    alignSelf: 'center',
                    marginTop: 40,
                    marginBottom: 20,
                    borderRadius: 30,
                    justifyContent: 'center',
                  }}
                  onPress={() => handleClick(Url.bulkbook + getsampledata)}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontFamily: 'Montserrat-SemiBold',
                        marginRight: 3,
                      }}>
                      Download Sample Excel
                    </Text>
                    <MaterialCommunityIcons
                      name="download"
                      size={20}
                      color={COLORS.bg}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              width: '90%',
            }}
            onPress={() => {
              if (file != '') {
                uploadbooks();
              } else {
                alert('Please select books excel file');
              }
            }}>
            <Button title="Add Books" styles={{width: '100%'}} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Library;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  arrow: {
    paddingHorizontal: '6%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    // flexDirection: 'row',
    // textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    // width: "100%",
  },
  content: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#D3D3D3',
    padding: 10,
  },

  divline: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
  },
});
